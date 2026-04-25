'use client';

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode
} from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowSquareOut,
  ChatCircle,
  PaperPlaneTilt,
  X
} from '@phosphor-icons/react/dist/ssr';
import type { ChatAction, ChatMessage } from '@/types/domain';
import { useVillas } from '@/components/VillasProvider';
import { Spinner } from '@/components/ui/skeleton';
import { replyTo, SUGGESTIONS } from '@/lib/chatEngine';
import { genId } from '@/lib/utils';
import VoiceInput from './VoiceInput';

const STORAGE_KEY = 'aq-chat-history';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi - I'm the Aquamarine concierge. Ask about our three villas, pricing, or how booking works. I'll link you to the right page if it helps."
};

function isChatMessage(value: unknown): value is ChatMessage {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'role' in value &&
    'content' in value &&
    typeof value.id === 'string' &&
    (value.role === 'assistant' || value.role === 'user') &&
    typeof value.content === 'string'
  );
}

function getInitialMessages(): ChatMessage[] {
  if (typeof window === 'undefined') {
    return [WELCOME];
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [WELCOME];
    }

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return [WELCOME];
    }

    const messages = parsed.filter(isChatMessage);
    return messages.length ? messages : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

function renderInline(text: string): ReactNode[] {
  const output: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      output.push(text.slice(lastIndex, match.index));
    }

    output.push(<strong key={`bold-${key++}`}>{match[1]}</strong>);
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    output.push(text.slice(lastIndex));
  }

  return output;
}

function renderMarkdown(text: string): ReactNode[] {
  const lines = text.split('\n');
  const nodes: ReactNode[] = [];
  let listBuffer: string[] = [];

  const flushList = () => {
    if (!listBuffer.length) {
      return;
    }

    nodes.push(
      <ul key={`list-${nodes.length}`}>
        {listBuffer.map((line, index) => (
          <li key={`${line}-${index}`}>{renderInline(line)}</li>
        ))}
      </ul>
    );
    listBuffer = [];
  };

  lines.forEach((rawLine, index) => {
    const listMatch = rawLine.match(/^- (.+)$/);

    if (listMatch) {
      listBuffer.push(listMatch[1]);
      return;
    }

    flushList();

    if (!rawLine.length) {
      nodes.push(<br key={`break-${index}`} />);
      return;
    }

    nodes.push(
      <span key={`line-${index}`}>
        {renderInline(rawLine)}
        {index < lines.length - 1 ? <br /> : null}
      </span>
    );
  });

  flushList();
  return nodes;
}

export default function Chat() {
  const villas = useVillas();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(getInitialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const typingTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current !== null) {
        window.clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}

    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeoutId = window.setTimeout(() => inputRef.current?.focus(), 150);
    return () => window.clearTimeout(timeoutId);
  }, [open]);

  const openRef = useRef(open);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && openRef.current) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) {
      return;
    }

    const userMessage: ChatMessage = { id: genId(), role: 'user', content: trimmed };
    setMessages((current) => [...current, userMessage]);
    setInput('');
    setTyping(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 400 + Math.random() * 500);
    });

    const { reply, action } = replyTo(trimmed, villas);
    const assistantId = genId();

    setMessages((current) => [
      ...current,
      { id: assistantId, role: 'assistant', content: '', action }
    ]);

    let cursor = 0;

    const streamNextChunk = () => {
      if (cursor >= reply.length) {
        setTyping(false);
        typingTimeoutRef.current = null;
        return;
      }

      const step = Math.max(1, Math.ceil(Math.random() * 3));
      cursor = Math.min(reply.length, cursor + step);

      setMessages((current) =>
        current.map((message) =>
          message.id === assistantId ? { ...message, content: reply.slice(0, cursor) } : message
        )
      );

      typingTimeoutRef.current = window.setTimeout(streamNextChunk, 15);
    };

    streamNextChunk();
  };

  const reset = () => {
    if (typingTimeoutRef.current !== null) {
      window.clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    setTyping(false);
    setMessages([WELCOME]);

    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 22 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed right-4 bottom-28 z-[65] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_14px_40px_rgba(14,124,136,0.4)] md:right-6 md:bottom-6 ${
          open ? 'pointer-events-none opacity-0' : ''
        }`}
      >
        <ChatCircle size={24} weight="regular" />
        <span
          className="absolute top-0 right-0 h-3 w-3 rounded-full border-2 border-[var(--bg)] bg-[var(--punch)]"
          aria-hidden
        />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-4 bottom-4 z-[66] flex h-[min(600px,calc(100svh-2rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-[0_24px_80px_rgba(14,124,136,0.3)] md:right-6 md:bottom-6"
            role="region"
            aria-label="Chat with Aquamarine concierge - non-modal. Press Escape to close."
          >
            <div className="flex items-center justify-between bg-[var(--accent)] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                  <ChatCircle size={18} weight="regular" />
                  <span
                    className="absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 border-[var(--accent)] bg-emerald-400"
                    aria-hidden
                  />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-[1.05rem] font-medium">
                    Aquamarine concierge
                  </span>
                  <span className="text-xs text-white/75">
                    Online - replies usually within an hour
                  </span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-white/15"
              >
                <X size={16} weight="regular" />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto bg-[var(--bg)] px-4 py-5">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {typing ? (
                <div className="flex items-center gap-2 px-3 py-2 text-sm text-[var(--fg-muted)]">
                  <Spinner size={12} />
                  <span className="font-mono text-xs uppercase tracking-wider">Typing</span>
                </div>
              ) : null}

              {messages.length <= 1 && !typing ? (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => void send(suggestion)}
                      className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--fg-2)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <form
              onSubmit={(event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                void send(input);
              }}
              className="flex items-center gap-2 border-t border-[var(--line)] bg-[var(--surface)] p-3"
            >
              <VoiceInput
                disabled={typing}
                onTranscript={(transcript: string) => setInput(transcript)}
                onSubmit={(transcript: string) => void send(transcript)}
              />
              <input
                ref={inputRef}
                value={input}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)}
                placeholder="Ask or speak..."
                className="h-10 flex-1 rounded-full border border-[var(--line)] bg-[var(--bg)] px-3 text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none"
                disabled={typing}
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || typing}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white transition hover:bg-[var(--accent-deep)] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <PaperPlaneTilt size={16} weight="regular" />
              </button>
            </form>
            {messages.length > 3 ? (
              <button
                onClick={reset}
                className="absolute top-4 right-14 font-mono text-[0.68rem] uppercase tracking-wider text-white/70 hover:text-white"
              >
                Reset
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-[var(--accent)] text-white'
            : 'rounded-bl-sm border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)]'
        }`}
      >
        <div
          className={
            isUser
              ? ''
              : '[&_strong]:font-semibold [&_ul]:mt-1 [&_ul]:space-y-0.5 [&_li]:relative [&_li]:pl-3 [&_li:before]:absolute [&_li:before]:left-0 [&_li:before]:text-[var(--accent)] [&_li:before]:content-["-"]'
          }
        >
          {renderMarkdown(message.content)}
        </div>
        {message.action && !isUser ? <ActionLink action={message.action} /> : null}
      </div>
    </motion.div>
  );
}

function ActionLink({ action }: { action: ChatAction }) {
  const className =
    'mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent)] underline-offset-4 hover:underline';

  if (action.type === 'link') {
    if (action.external) {
      return (
        <a href={action.to} className={className} target="_blank" rel="noopener noreferrer">
          {action.label}
          <ArrowSquareOut size={12} />
        </a>
      );
    }

    return (
      <Link href={action.to} className={className}>
        {action.label}
        <ArrowRight size={12} />
      </Link>
    );
  }

  return (
    <a
      href={action.to}
      onClick={(event) => {
        event.preventDefault();
        const target = document.querySelector(action.to);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }}
      className={className}
    >
      {action.label}
      <ArrowRight size={12} />
    </a>
  );
}

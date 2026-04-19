'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatCircle, PaperPlaneTilt, X, ArrowRight, ArrowSquareOut } from '@phosphor-icons/react/dist/ssr';
import { replyTo, SUGGESTIONS } from '@/lib/chatEngine';
import { Spinner } from '@/components/ui/skeleton';
import VoiceInput from './VoiceInput';

const STORAGE_KEY = 'aq-chat-history';

const WELCOME = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hi — I'm the Aquamarine concierge. Ask about our three villas, pricing, or how booking works. I'll link you to the right page if it helps."
};

// Render the subset of markdown we use (**bold** inline, - lists, paragraphs)
// as React elements. Never returns HTML strings, so dangerouslySetInnerHTML
// is not needed — user-supplied chat input can't inject markup.
function renderInline(text) {
  const out = [];
  const re = /\*\*(.+?)\*\*/g;
  let last = 0;
  let m;
  let i = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(<strong key={`b${i++}`}>{m[1]}</strong>);
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function renderMarkdown(text) {
  const lines = text.split('\n');
  const nodes = [];
  let buf = [];
  const flushList = () => {
    if (buf.length) {
      nodes.push(
        <ul key={`ul${nodes.length}`}>
          {buf.map((l, i) => (
            <li key={i}>{renderInline(l)}</li>
          ))}
        </ul>
      );
      buf = [];
    }
  };
  lines.forEach((raw, idx) => {
    const listMatch = raw.match(/^- (.+)$/);
    if (listMatch) {
      buf.push(listMatch[1]);
      return;
    }
    flushList();
    if (raw.length === 0) {
      nodes.push(<br key={`br${idx}`} />);
    } else {
      nodes.push(
        <span key={`s${idx}`}>
          {renderInline(raw)}
          {idx < lines.length - 1 ? <br /> : null}
        </span>
      );
    }
  });
  flushList();
  return nodes;
}

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    if (typeof window === 'undefined') return [WELCOME];
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [WELCOME];
    } catch {
      return [WELCOME];
    }
  });
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Persist + autoscroll
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {}
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
    const onKey = (e) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;

    const userMsg = { id: Date.now().toString(), role: 'user', content: trimmed };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    // Pretend to "think" briefly — feels more natural than instant reply
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 500));

    const { reply, action } = replyTo(trimmed);
    const assistantId = (Date.now() + 1).toString();

    // Add empty assistant message, then stream characters into it
    setMessages((m) => [...m, { id: assistantId, role: 'assistant', content: '', action }]);

    // Streaming typewriter — 12ms/char feels like natural typing
    let i = 0;
    const perChar = () => {
      if (i >= reply.length) {
        setTyping(false);
        return;
      }
      const step = Math.max(1, Math.ceil(Math.random() * 3));
      i = Math.min(reply.length, i + step);
      setMessages((m) =>
        m.map((msg) => (msg.id === assistantId ? { ...msg, content: reply.slice(0, i) } : msg))
      );
      setTimeout(perChar, 15);
    };
    perChar();
  };

  const reset = () => {
    setMessages([WELCOME]);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 22 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed z-[55] bottom-20 md:bottom-6 right-4 md:right-6 w-14 h-14 rounded-full bg-[var(--accent)] text-white shadow-[0_14px_40px_rgba(14,124,136,0.4)] inline-flex items-center justify-center ${
          open ? 'pointer-events-none opacity-0' : ''
        }`}
      >
        <ChatCircle size={24} weight="regular" />
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[var(--punch)] border-2 border-[var(--bg)]" aria-hidden />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[56] bottom-4 right-4 md:bottom-6 md:right-6 w-[min(380px,calc(100vw-2rem))] h-[min(600px,calc(100svh-2rem))] flex flex-col bg-[var(--surface)] border border-[var(--line)] rounded-2xl shadow-[0_24px_80px_rgba(14,124,136,0.3)] overflow-hidden"
            role="dialog"
            aria-label="Chat with Aquamarine concierge"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-[var(--accent)] text-white">
              <div className="flex items-center gap-3">
                <span className="relative w-9 h-9 rounded-full bg-white/15 inline-flex items-center justify-center">
                  <ChatCircle size={18} weight="regular" />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[var(--accent)]" aria-hidden />
                </span>
                <div className="flex flex-col leading-tight">
                  <span className="font-display text-[1.05rem] font-medium">Aquamarine concierge</span>
                  <span className="text-xs text-white/75">Online · replies usually within an hour</span>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full hover:bg-white/15 inline-flex items-center justify-center transition"
              >
                <X size={16} weight="regular" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={listRef}
              className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-[var(--bg)]"
            >
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} />
              ))}
              {typing && (
                <div className="flex items-center gap-2 px-3 py-2 text-[var(--fg-muted)] text-sm">
                  <Spinner size={12} />
                  <span className="font-mono text-xs tracking-wider uppercase">Typing</span>
                </div>
              )}

              {/* Suggestion chips, shown when chat is empty-ish */}
              {messages.length <= 1 && !typing && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--fg-2)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 p-3 border-t border-[var(--line)] bg-[var(--surface)]"
            >
              <VoiceInput
                disabled={typing}
                onTranscript={(t) => setInput(t)}
                onSubmit={(t) => send(t)}
              />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask or speak…"
                className="flex-1 h-10 px-3 rounded-full bg-[var(--bg)] border border-[var(--line)] text-sm text-[var(--fg)] placeholder:text-[var(--fg-muted)] focus:outline-none focus:border-[var(--accent)]"
                disabled={typing}
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-full bg-[var(--accent)] text-white inline-flex items-center justify-center hover:bg-[var(--accent-deep)] disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <PaperPlaneTilt size={16} weight="regular" />
              </button>
            </form>
            {messages.length > 3 && (
              <button
                onClick={reset}
                className="absolute top-4 right-14 text-[0.68rem] font-mono uppercase tracking-wider text-white/70 hover:text-white"
              >
                Reset
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] text-sm leading-relaxed rounded-2xl px-4 py-2.5 ${
          isUser
            ? 'bg-[var(--accent)] text-white rounded-br-sm'
            : 'bg-[var(--surface)] text-[var(--fg)] border border-[var(--line)] rounded-bl-sm'
        }`}
      >
        <div
          className={isUser ? '' : '[&_strong]:font-semibold [&_ul]:mt-1 [&_ul]:space-y-0.5 [&_li]:pl-3 [&_li]:relative [&_li:before]:content-["·"] [&_li:before]:absolute [&_li:before]:left-0 [&_li:before]:text-[var(--accent)]'}
        >
          {renderMarkdown(message.content)}
        </div>
        {message.action && !isUser && <ActionLink action={message.action} />}
      </div>
    </motion.div>
  );
}

function ActionLink({ action }) {
  const common = 'mt-2.5 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[var(--accent)] hover:underline underline-offset-4';
  if (action.type === 'link') {
    const Component = action.external ? 'a' : Link;
    return (
      <Component
        href={action.to}
        className={common}
        target={action.external ? '_blank' : undefined}
        rel={action.external ? 'noopener noreferrer' : undefined}
      >
        {action.label}
        {action.external ? <ArrowSquareOut size={12} /> : <ArrowRight size={12} />}
      </Component>
    );
  }
  if (action.type === 'scroll') {
    return (
      <a
        href={action.to}
        onClick={(e) => {
          e.preventDefault();
          const el = document.querySelector(action.to);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        className={common}
      >
        {action.label}
        <ArrowRight size={12} />
      </a>
    );
  }
  return null;
}

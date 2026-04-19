'use client';

import { useEffect, useRef, useState } from 'react';
import { Microphone, MicrophoneSlash } from '@phosphor-icons/react/dist/ssr';
import { toast } from 'sonner';

/**
 * Microphone button that feeds speech-to-text into `onTranscript(text)`.
 * Uses the native Web Speech API — zero deps, runs in the browser.
 * Auto-hides when the API isn't supported (Firefox, some locked-down mobile builds).
 */
export default function VoiceInput({ onTranscript, onSubmit, disabled, className = '' }) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    setSupported(true);

    const r = new SR();
    r.continuous = false;
    r.interimResults = true;
    r.lang = navigator.language || 'en-US';
    r.maxAlternatives = 1;

    let final = '';
    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      onTranscript?.((final + interim).trim());
    };
    r.onerror = (e) => {
      setListening(false);
      if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        toast.error('Microphone blocked', {
          description: 'Allow mic access in your browser to speak to the concierge.'
        });
      } else if (e.error === 'no-speech') {
        toast("Didn't catch that", { description: 'Try speaking again.' });
      }
    };
    r.onend = () => {
      setListening(false);
      if (final.trim()) onSubmit?.(final.trim());
      final = '';
    };

    recognitionRef.current = r;
    return () => {
      try { r.stop(); } catch {}
    };
  }, [onTranscript, onSubmit]);

  if (!supported) return null;

  const toggle = () => {
    const r = recognitionRef.current;
    if (!r) return;
    if (listening) {
      try { r.stop(); } catch {}
      setListening(false);
    } else {
      try {
        r.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={disabled}
      aria-label={listening ? 'Stop recording' : 'Record voice message'}
      aria-pressed={listening}
      className={`relative w-10 h-10 rounded-full inline-flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed ${
        listening
          ? 'bg-[var(--punch)] text-white shadow-[0_0_0_4px_color-mix(in_srgb,var(--punch)_25%,transparent)]'
          : 'bg-[var(--bg)] border border-[var(--line)] text-[var(--fg-2)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
      } ${className}`}
    >
      {listening ? <MicrophoneSlash size={16} weight="regular" /> : <Microphone size={16} weight="regular" />}
      {listening && (
        <span className="absolute inset-0 rounded-full animate-ping bg-[var(--punch)] opacity-40" aria-hidden />
      )}
    </button>
  );
}

import React, { useState, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Bot, User, Maximize2, Minimize2 } from 'lucide-react';
import { SybilContactForm } from './SybilContactForm';
import RobotPeek from './RobotPeek';
import { SYBIL_CHAT_OPEN_CHANGE_EVENT } from '../constants/sybilChatOpenEvent';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

/**
 * Render plain text containing markdown links and bare URLs as a React fragment
 * with real <a> tags opening in a new tab.
 *
 * Supports:
 *   - Markdown links: [link text](https://example.com)
 *   - Bare full URLs: https://example.com or http://example.com
 *   - Bare sysbilt.com URLs: sysbilt.com/path
 */
function renderMessageWithLinks(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)|(https?:\/\/[^\s<>()]+)|(\bsysbilt\.com\/[^\s<>()]+)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  const linkClass =
    'text-gold underline underline-offset-2 transition-opacity hover:opacity-80 break-words';

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1] != null && match[2] != null) {
      parts.push(
        <a key={`link-${key++}`} href={match[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <a key={`link-${key++}`} href={match[3]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {match[3]}
        </a>
      );
    } else if (match[4]) {
      const url = `https://${match[4]}`;
      parts.push(
        <a key={`link-${key++}`} href={url} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {match[4]}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

const SHOW_FORM_MARKER = '[SHOW_FORM]';

function stripShowFormMarker(text: string): { cleanText: string; showFormCta: boolean } {
  if (text.includes(SHOW_FORM_MARKER)) {
    return {
      cleanText: text.replace(SHOW_FORM_MARKER, '').trim(),
      showFormCta: true,
    };
  }
  return { cleanText: text, showFormCta: false };
}

function detectFrictionFromTranscript(msgs: Array<{ role: string; text: string }>): string {
  const joined = msgs.map((m) => m.text.toLowerCase()).join(' ');
  if (joined.includes('crm') || joined.includes('losing leads') || joined.includes('track')) {
    return "CRM & Sales — I'm losing track of leads";
  }
  if (joined.includes('automat') || joined.includes('manual')) return 'Automation — Too much manual work';
  if (joined.includes('website') || joined.includes('enquir')) return 'Website & Leads — I need more enquiries';
  if (joined.includes(' ai ') || joined.includes('chatbot') || joined.includes('assistant')) {
    return 'AI — I want bots to handle things';
  }
  if (joined.includes('content') || joined.includes('blog') || joined.includes('social')) {
    return "Content — I can't keep up with posting";
  }
  if (joined.includes('training') || joined.includes('team won')) {
    return "Training — My team won't use the tools";
  }
  if (joined.includes('dashboard') || joined.includes('report') || joined.includes('numbers')) {
    return "Dashboards — I can't see my numbers";
  }
  return '';
}

export default function SybilChat() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contactFormState, setContactFormState] = useState<'hidden' | 'shown' | 'submitted'>('hidden');
  const [peekHiddenByScroll, setPeekHiddenByScroll] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelRect, setPanelRect] = useState<{ left: number; top: number; height: number } | null>(null);

  // Only show if ?ai=on is in the URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('ai') === 'on') {
        setIsVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    const shellOpen = isVisible && isOpen;
    if (shellOpen) {
      document.body.dataset.sybilOpen = 'true';
    } else {
      delete document.body.dataset.sybilOpen;
    }
    window.dispatchEvent(new Event(SYBIL_CHAT_OPEN_CHANGE_EVENT));
    return () => {
      delete document.body.dataset.sybilOpen;
      window.dispatchEvent(new Event(SYBIL_CHAT_OPEN_CHANGE_EVENT));
    };
  }, [isVisible, isOpen]);

  // Load history from localStorage
  useEffect(() => {
    if (isVisible) {
      const saved = localStorage.getItem('sybil_chat_history');
      if (saved) {
        try {
          setMessages(JSON.parse(saved));
        } catch {
          console.error('Failed to parse chat history');
        }
      } else {
        // Initial greeting
        const initialMsg: ChatMessage = {
          role: 'model',
          text: "Hi, I'm Sybil. We build systems for Australian businesses to get clients, scale faster, and see clearly. What are you trying to work out?",
        };
        setMessages([initialMsg]);
        localStorage.setItem('sybil_chat_history', JSON.stringify([initialMsg]));
      }
    }
  }, [isVisible]);

  // Save history on update
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('sybil_chat_history', JSON.stringify(messages));
    }
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
  }, [messages]);

  useEffect(() => {
    if (!isLoading) {
      setPeekHiddenByScroll(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isOpen) {
      setPeekHiddenByScroll(false);
      setIsFullscreen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isFullscreen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, isFullscreen]);

  const measurePanel = useCallback(() => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPanelRect({ left: r.left, top: r.top, height: r.height });
  }, []);

  /** Keep robot coords in sync with the fixed panel; dismiss peek on any *page* scroll (capture), not in-panel scroll. */
  useLayoutEffect(() => {
    if (!isOpen) {
      setPanelRect(null);
      return;
    }

    measurePanel();

    const onScrollCapture = (e: Event) => {
      measurePanel();
      if (!isLoading && !input.trim()) return;
      const t = e.target;
      if (t instanceof Node && panelRef.current?.contains(t)) return;
      setPeekHiddenByScroll(true);
    };

    const onWheel = (e: WheelEvent) => {
      measurePanel();
      if (!isLoading && !input.trim()) return;
      const el = e.target as HTMLElement | null;
      if (el?.closest('[data-sybil-chat-panel]')) return;
      setPeekHiddenByScroll(true);
    };

    const ro = new ResizeObserver(measurePanel);
    if (panelRef.current) ro.observe(panelRef.current);
    window.addEventListener('resize', measurePanel);
    document.addEventListener('scroll', onScrollCapture, { capture: true, passive: true });
    document.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measurePanel);
      document.removeEventListener('scroll', onScrollCapture, true);
      document.removeEventListener('wheel', onWheel);
    };
  }, [isOpen, isLoading, input, measurePanel]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: 'user' as const, text: input.trim() }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'model', text: data.reply }]);
      } else {
        throw new Error('No reply in response');
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "I'm having trouble connecting right now. The contact form on sysbilt.com is the best way to reach the team.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      className={
        isOpen && isFullscreen
          ? 'fixed inset-0 z-[500] flex min-h-0 flex-col bg-white'
          : 'fixed bottom-6 right-6 z-50 flex flex-col items-end'
      }
    >
      {isOpen ? (
        <div
          ref={panelRef}
          className={`flex min-h-0 flex-col ${
            isFullscreen
              ? 'relative h-full w-full flex-1 mb-0'
              : 'relative mb-4 h-[550px] max-h-[80vh] w-[350px] sm:w-[400px]'
          }`}
          data-sybil-chat-panel
        >
          <div
            className={`relative z-10 flex h-full min-h-0 w-full flex-col overflow-hidden border border-zinc-200 bg-white shadow-2xl ${
              isFullscreen ? 'rounded-none' : 'rounded-lg'
            }`}
          >
          <div className="shrink-0 bg-zinc-900 text-white">
            <div className="flex items-center justify-between gap-3 p-4">
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <div className="shrink-0 rounded-full bg-zinc-800 p-1.5">
                  <Bot size={20} className="text-zinc-300" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold">Sybil</h3>
                  <p className="truncate text-xs text-zinc-400">SYSBILT AI Assistant</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="shrink-0 rounded p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-zinc-700/80 px-4 py-2">
              <p className="hidden text-[10px] text-zinc-500 sm:block">
                {isFullscreen ? 'Press Esc to exit fullscreen' : 'Expand for a larger view'}
              </p>
              <button
                type="button"
                onClick={() => setIsFullscreen((v) => !v)}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                className="ml-auto flex shrink-0 items-center gap-2 rounded px-2 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 size={18} className="shrink-0" />
                    <span className="hidden sm:inline">Exit fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 size={18} className="shrink-0" />
                    <span className="hidden sm:inline">Fullscreen</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex min-h-0 min-w-0 flex-1 flex-col">
            {/* Chat Area (scroll) */}
            <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto bg-zinc-50 p-4">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${msg.role === 'user' ? 'bg-zinc-200' : 'bg-zinc-900 text-white'}`}
                  >
                    {msg.role === 'user' ? <User size={16} className="text-zinc-600" /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`rounded-lg p-3 text-sm whitespace-pre-wrap ${msg.role === 'user' ? 'rounded-tr-none bg-zinc-200 text-zinc-900' : 'rounded-tl-none border border-zinc-200 bg-white text-zinc-800 shadow-sm'}`}
                  >
                    {msg.role === 'user' ? (
                      msg.text
                    ) : (
                      (() => {
                        const { cleanText, showFormCta } = stripShowFormMarker(msg.text);
                        const isLastAssistantMessage = idx === messages.length - 1;
                        return (
                          <>
                            {renderMessageWithLinks(cleanText)}
                            {showFormCta && isLastAssistantMessage && contactFormState === 'hidden' && (
                              <button
                                type="button"
                                onClick={() => setContactFormState('shown')}
                                className="mt-3 inline-block border-2 border-dark bg-dark px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cream transition-colors hover:bg-gold hover:text-dark"
                              >
                                [ SEND DETAILS TO THE TEAM ]
                              </button>
                            )}
                          </>
                        );
                      })()
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto flex max-w-[85%] gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Bot size={16} />
                  </div>
                  <div className="flex items-center gap-1 rounded-lg rounded-tl-none border border-zinc-200 bg-white p-3 text-sm text-zinc-500 shadow-sm">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {contactFormState !== 'hidden' && (
              <div className="max-h-[45%] shrink-0 overflow-y-auto border-t border-zinc-200 bg-zinc-50">
                <SybilContactForm
                  transcript={messages}
                  initialFrictionFromContext={detectFrictionFromTranscript(messages)}
                  onSuccess={() => setContactFormState('submitted')}
                  onClose={() => setContactFormState('hidden')}
                  isSubmitted={contactFormState === 'submitted'}
                />
              </div>
            )}
          </div>

          {/* Footer Input */}
          <div className="shrink-0 border-t border-zinc-100 bg-white p-3">
            <form onSubmit={sendMessage} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our systems..."
                className="w-full rounded-lg border-none bg-zinc-100 py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 transition-colors hover:text-zinc-900 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="mt-2 text-center">
              <span className="text-[10px] text-zinc-400">
                Responses are AI-generated. A human follows up on serious queries.
              </span>
            </div>
          </div>
          </div>
          <RobotPeek
            attachment="chat"
            isActive={isOpen && (isLoading || !!input.trim()) && !peekHiddenByScroll}
            chatPanelRect={panelRect}
          />
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center rounded-full bg-zinc-900 p-4 text-white shadow-lg transition-transform hover:scale-105 hover:bg-zinc-800"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
}

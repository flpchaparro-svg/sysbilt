import React, {useEffect, useRef, useState} from 'react'
import {m, AnimatePresence, useReducedMotion} from 'framer-motion'
import {Bot, MessageCircle, Send, X} from 'lucide-react'
import {
  ACCESS_OPTIONS,
  JOBS,
  MATERIALS_OPTIONS,
  SITE_CONDITIONS,
  SITUATIONS,
  SIZE_PRESETS,
  type SituationId,
} from './landscapingRateCard'

export type ConciergeContextPayload = {
  mode: 'sandbox' | 'live'
  step: string
  businessName?: string
  situationLabel?: string | null
  jobLabel?: string | null
  sizeLabel?: string | null
  materialsLabel?: string | null
  finishLabel?: string | null
  accessLabel?: string | null
  siteLabel?: string | null
}

type ChatMsg = {role: 'user' | 'model'; text: string; suggestions?: string[]}

const DOCK_OPENER =
  'Stuck on a step. Ask what an option means, or which one fits your place. I will explain the difference in plain English, not just repeat the cards.'

function isSandbox(ctx: ConciergeContextPayload): boolean {
  return ctx.mode !== 'live'
}

function conciergeBrand(ctx: ConciergeContextPayload): string {
  return isSandbox(ctx) ? 'Sample Concierge' : 'AI Concierge'
}

function talkOpener(ctx: ConciergeContextPayload): string {
  if (isSandbox(ctx)) {
    return "Hi. I'm the sample Concierge for this Quote Capture demo. Tap a problem below, or type what you see in your yard. I explain the options in plain English and help you choose. I stay in this chat unless you pick Prefer the sample wizard underneath."
  }
  const name = ctx.businessName?.trim() || 'us'
  return `Hi. I'm here to help you get a quotation from ${name}. Tap a problem below, or type what you see in your yard. I explain the options in plain English and help you choose. I stay in this chat unless you pick Prefer the quote wizard underneath.`
}

function talkStarters(): string[] {
  return SITUATIONS.map((s) => s.label)
}

function dockStarters(step: string, ctx?: ConciergeContextPayload): string[] {
  switch (step) {
    case 'situation':
    case 'scope':
      return SITUATIONS.map((s) => s.label)
    case 'job': {
      const sit = SITUATIONS.find((s) => s.label === ctx?.situationLabel)
      const jobs = sit ? sit.nextJobs.map((id) => JOBS[id]?.label).filter(Boolean) : []
      return (jobs.length ? jobs : Object.values(JOBS).slice(0, 4).map((j) => j.label)) as string[]
    }
    case 'size':
      return [
        SIZE_PRESETS['one-bay']?.label,
        SIZE_PRESETS['two-bays']?.label,
        SIZE_PRESETS['half-back']?.label,
        'Help me guess the size',
      ].filter(Boolean) as string[]
    case 'materials':
      return MATERIALS_OPTIONS.map((m) => m.label).slice(0, 4)
    case 'access':
      return ACCESS_OPTIONS.map((a) => a.label)
    case 'site':
      return SITE_CONDITIONS.map((s) => s.label)
    case 'details':
      return isSandbox(ctx || {mode: 'sandbox', step: 'details'})
        ? ['Why do you need my details', 'Is this a real quote']
        : ['Why do you need my details', 'What happens after I submit']
    case 'quote':
      return isSandbox(ctx || {mode: 'sandbox', step: 'quote'})
        ? ['Explain the total', 'What happens on a real install']
        : ['Explain the total', 'What happens when I pay']
    default:
      return ['What do these cards mean', 'Not sure yet']
  }
}

function mergeSuggestions(
  model: string[] | undefined,
  fallback: string[],
): string[] {
  const cleaned = (model || [])
    .map((s) => s.trim())
    .filter((s) => s && !s.startsWith('{') && !s.includes('"reply"'))
  const out: string[] = []
  for (const s of [...cleaned, ...fallback]) {
    if (!out.some((x) => x.toLowerCase() === s.toLowerCase())) out.push(s)
    if (out.length >= 4) break
  }
  return out
}

function splitSandboxNote(text: string): {body: string; note: string | null} {
  const lines = text.split(/\n+/)
  const noteLines: string[] = []
  const bodyLines: string[] = []
  for (const line of lines) {
    if (
      /simulated|sample rate|sandbox|not a real client|demonstration only|demo only|proof install/i.test(
        line,
      )
    ) {
      noteLines.push(line.trim())
    } else {
      bodyLines.push(line)
    }
  }
  const body = bodyLines.join('\n').trim() || text.trim()
  const note = noteLines.length ? noteLines.join(' ') : null
  return {body, note}
}

function TypingOrb() {
  return (
    <div className="flex items-center gap-3 pl-1">
      <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FFF2EC] shadow-[0_10px_24px_-12px_rgba(26,26,26,0.7)]">
        <Bot className="h-4 w-4" strokeWidth={1.75} />
        <span className="absolute inset-0 animate-ping rounded-full bg-[#E21E3F]/20" />
      </div>
      <div className="flex items-center gap-1.5 rounded-2xl border border-dark/10 bg-white px-3.5 py-2.5 shadow-[0_12px_28px_-14px_rgba(26,26,26,0.45)]">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-dark/45"
            style={{
              animation: 'qcConciergeDot 1.05s ease-in-out infinite',
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes qcConciergeDot {
          0%, 80%, 100% { opacity: 0.28; transform: translateY(0); }
          40% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  )
}

function SuggestionChip({
  label,
  disabled,
  onClick,
}: {
  label: string
  disabled?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="rounded-full border border-[#C4A574]/55 bg-gradient-to-b from-[#FFF8F2] to-[#F3E6D6] px-3.5 py-2 font-sans text-[12px] font-medium text-dark shadow-[0_8px_18px_-10px_rgba(26,26,26,0.55),inset_0_1px_0_rgba(255,255,255,0.85)] transition-[transform,box-shadow,border-color] hover:-translate-y-0.5 hover:border-[#E21E3F]/55 hover:shadow-[0_14px_28px_-12px_rgba(226,30,63,0.35),inset_0_1px_0_rgba(255,255,255,0.9)] active:translate-y-0 disabled:opacity-40 disabled:hover:translate-y-0"
    >
      {label}
    </button>
  )
}

function MsgBubble({
  role,
  text,
  suggestions,
  onSuggestion,
  busy,
  brand,
}: ChatMsg & {
  onSuggestion?: (text: string) => void
  busy?: boolean
  brand: string
}) {
  const mine = role === 'user'
  const {body, note} = mine ? {body: text, note: null} : splitSandboxNote(text)

  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[94%] ${mine ? '' : 'space-y-2.5'}`}>
        {!mine ? (
          <div className="mb-1.5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FFF2EC] shadow-[0_6px_14px_-8px_rgba(26,26,26,0.7)]">
              <Bot className="h-3 w-3" strokeWidth={1.75} />
            </span>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-dark/40">
              {brand}
            </span>
          </div>
        ) : null}
        <div
          className={`rounded-2xl px-3.5 py-2.5 font-sans text-[13px] leading-relaxed whitespace-pre-wrap md:text-[14px] ${
            mine
              ? 'bg-[#1A1A1A] text-[#FFF2EC] shadow-[0_12px_28px_-14px_rgba(26,26,26,0.55)]'
              : 'border border-dark/10 bg-white text-dark/85 shadow-[0_12px_28px_-16px_rgba(26,26,26,0.4)]'
          }`}
        >
          {body}
        </div>
        {note ? (
          <p className="rounded-xl border border-[#C4A574]/35 bg-[#F7EFDF] px-3 py-2 font-sans text-[11px] leading-relaxed text-[#6E5428]">
            {note}
          </p>
        ) : null}
        {!mine && suggestions?.length && onSuggestion ? (
          <div className="flex flex-wrap gap-2 pt-0.5">
            {suggestions.map((s) => (
              <SuggestionChip
                key={s}
                label={s}
                disabled={busy}
                onClick={() => onSuggestion(s)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

async function askConcierge(
  messages: ChatMsg[],
  context: ConciergeContextPayload,
): Promise<{reply: string; suggestions: string[]}> {
  const res = await fetch('/api/quote-capture/concierge', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      messages: messages.map(({role, text}) => ({role, text})),
      context,
    }),
  })
  const data = (await res.json().catch(() => ({}))) as {
    reply?: string
    suggestions?: string[]
    error?: string
  }
  if (!res.ok) throw new Error(data.error || 'Concierge unavailable')
  return {
    reply: data.reply || 'No reply came back. Try again in a moment.',
    suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
  }
}

function ConciergeShell({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-[1.35rem] border border-dark/12 bg-[#FAFAF8] shadow-[0_28px_70px_-34px_rgba(26,26,26,0.55)] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            'radial-gradient(120% 80% at 0% 0%, rgba(226,30,63,0.07), transparent 42%), radial-gradient(90% 70% at 100% 0%, rgba(168,132,63,0.1), transparent 45%), linear-gradient(180deg, rgba(255,242,236,0.65), transparent 28%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}

/** Full-page talk path (sandbox demo or live install). */
export function QuoteCaptureConciergeTalk({
  context,
  onStartWizard,
  onBack,
}: {
  context: ConciergeContextPayload
  onStartWizard: () => void
  onBack?: () => void
}) {
  const reduceMotion = useReducedMotion()
  const brand = conciergeBrand(context)
  const starters = talkStarters()
  const [messages, setMessages] = useState<ChatMsg[]>([
    {role: 'model', text: talkOpener(context), suggestions: starters},
  ])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, busy])

  async function sendText(textRaw: string) {
    const text = textRaw.trim()
    if (!text || busy) return

    const next: ChatMsg[] = [...messages, {role: 'user', text}]
    setMessages(next)
    setDraft('')
    setBusy(true)
    setError(null)
    try {
      const {reply, suggestions} = await askConcierge(next, context)
      setMessages((m) => [
        ...m,
        {
          role: 'model',
          text: reply,
          suggestions: mergeSuggestions(suggestions, starters.slice(0, 4)),
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Concierge unavailable')
    } finally {
      setBusy(false)
    }
  }

  const sandbox = isSandbox(context)

  return (
    <section className="max-w-3xl">
      <m.div
        initial={reduceMotion ? false : {opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.35}}
      >
        <h1 className="font-serif text-3xl md:text-4xl leading-tight tracking-tight">
          Talk it through
        </h1>
        <p className="mt-3 font-sans text-base text-dark/60 max-w-xl">
          {sandbox
            ? 'Same choices as the sample wizard cards. Tap one to jump in, or type. Simulated landscaping rates only.'
            : `Same choices as the quote cards. Tap one to jump in, or type.`}
        </p>
      </m.div>

      <ConciergeShell className="mt-8 h-[min(42rem,82vh)] min-h-[28rem]">
        <div className="flex items-center gap-3 border-b border-dark/10 bg-white/70 px-4 py-3 backdrop-blur-sm">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FFF2EC] shadow-[0_10px_22px_-12px_rgba(26,26,26,0.7)]">
            <Bot className="h-4 w-4" strokeWidth={1.75} />
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2F9B5F]" />
          </span>
          <div>
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-dark/45">
              {brand}
            </p>
            <p className="font-serif text-[15px] text-dark">
              {sandbox
                ? 'Simulated landscaping help'
                : context.businessName
                  ? `${context.businessName} quote help`
                  : 'Quote help'}
            </p>
          </div>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
          {messages.map((msg, i) => (
            <MsgBubble
              key={`${msg.role}-${i}`}
              {...msg}
              brand={brand}
              busy={busy}
              onSuggestion={(t) => void sendText(t)}
            />
          ))}
          {busy ? <TypingOrb /> : null}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-dark/10 bg-white/85 p-3 backdrop-blur-sm">
          {error ? <p className="mb-2 font-sans text-sm text-[#9A1730]">{error}</p> : null}
          <div className="flex gap-2">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  void sendText(draft)
                }
              }}
              placeholder={sandbox ? 'Ask about the sample quote…' : 'Ask about this quote…'}
              className="min-w-0 flex-1 rounded-full border border-dark/15 bg-[#FFF2EC] px-4 py-3 font-sans text-sm text-dark shadow-[inset_0_1px_2px_rgba(26,26,26,0.04)] outline-none focus:border-[#E21E3F]"
              disabled={busy}
            />
            <button
              type="button"
              onClick={() => void sendText(draft)}
              disabled={busy || !draft.trim()}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dark text-cream shadow-[0_12px_28px_-14px_rgba(26,26,26,0.65)] disabled:opacity-40"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </ConciergeShell>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="button"
          onClick={onStartWizard}
          className="inline-flex items-center justify-center rounded-full border border-dark/15 bg-white px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-dark shadow-[0_10px_24px_-16px_rgba(26,26,26,0.45)] hover:border-dark/30"
        >
          {sandbox ? 'Prefer the sample wizard instead' : 'Prefer the quote wizard instead'}
        </button>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="font-sans text-sm text-dark/45 underline-offset-4 hover:text-dark/70 hover:underline"
          >
            Back to start
          </button>
        ) : null}
      </div>
    </section>
  )
}

/** Persistent dock while walking the wizard. */
export function QuoteCaptureConciergeDock({
  context,
  resetKey,
  onSyncSituation,
}: {
  context: ConciergeContextPayload
  resetKey: number
  onSyncSituation?: (id: SituationId) => void
}) {
  const reduceMotion = useReducedMotion()
  const brand = conciergeBrand(context)
  const [open, setOpen] = useState(false)
  const fallback = dockStarters(context.step, context)
  const [messages, setMessages] = useState<ChatMsg[]>([
    {role: 'model', text: DOCK_OPENER, suggestions: fallback},
  ])
  const [draft, setDraft] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setOpen(false)
    setMessages([
      {role: 'model', text: DOCK_OPENER, suggestions: dockStarters(context.step, context)},
    ])
    setDraft('')
    setError(null)
  }, [resetKey])

  useEffect(() => {
    setMessages((m) => {
      if (m.length === 1 && m[0]?.role === 'model') {
        return [{...m[0], suggestions: dockStarters(context.step, context)}]
      }
      return m
    })
  }, [context.step, context.situationLabel, context.jobLabel])

  useEffect(() => {
    if (!open) return
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages, busy, open])

  async function sendText(textRaw: string) {
    const text = textRaw.trim()
    if (!text || busy) return

    let liveContext = context
    const matchedSit = SITUATIONS.find((s) => s.label.toLowerCase() === text.toLowerCase())
    if (matchedSit) {
      onSyncSituation?.(matchedSit.id)
      liveContext = {
        ...context,
        situationLabel: matchedSit.label,
        jobLabel: null,
        sizeLabel: null,
        step: context.step === 'situation' ? 'situation' : 'job',
      }
    }

    const next: ChatMsg[] = [...messages, {role: 'user', text}]
    setMessages(next)
    setDraft('')
    setBusy(true)
    setError(null)
    try {
      const {reply, suggestions} = await askConcierge(next, liveContext)
      const fallbackChips = matchedSit
        ? (matchedSit.nextJobs.map((id) => JOBS[id]?.label).filter(Boolean) as string[]).slice(0, 4)
        : dockStarters(liveContext.step, liveContext)
      setMessages((m) => [
        ...m,
        {
          role: 'model',
          text: reply,
          suggestions: mergeSuggestions(suggestions, fallbackChips),
        },
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Concierge unavailable')
    } finally {
      setBusy(false)
    }
  }

  const contextHint = [context.jobLabel, context.sizeLabel || context.step]
    .filter(Boolean)
    .slice(0, 2)
    .join(' · ')

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-3 print:hidden sm:justify-end sm:p-4 md:bottom-4 md:right-4 md:left-auto md:p-0">
      <div className="pointer-events-auto flex w-full max-w-2xl flex-col items-stretch gap-3 md:w-[min(36rem,calc(100vw-1.5rem))]">
        <AnimatePresence>
          {open ? (
            <m.div
              key="dock"
              initial={reduceMotion ? false : {opacity: 0, y: 18, scale: 0.98}}
              animate={{opacity: 1, y: 0, scale: 1}}
              exit={reduceMotion ? undefined : {opacity: 0, y: 12, scale: 0.98}}
              transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
            >
              <ConciergeShell className="h-[min(44rem,85vh)] min-h-[28rem] sm:h-[min(46rem,88vh)]">
                <div className="flex items-start justify-between gap-3 border-b border-dark/10 bg-white/75 px-4 py-3.5 backdrop-blur-sm md:px-5">
                  <div className="flex items-start gap-3">
                    <span className="relative mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1A1A1A] text-[#FFF2EC] shadow-[0_10px_22px_-12px_rgba(26,26,26,0.7)]">
                      <Bot className="h-4 w-4" strokeWidth={1.75} />
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2F9B5F]" />
                    </span>
                    <div>
                      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-dark/45">
                        {brand}
                      </p>
                      <p className="mt-0.5 font-serif text-[17px] text-dark md:text-[18px]">
                        Ask about this quote
                      </p>
                      {contextHint ? (
                        <p className="mt-1 font-sans text-[12px] text-dark/45 line-clamp-1">
                          {contextHint}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full p-1.5 text-dark/45 hover:bg-dark/5 hover:text-dark"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4 md:px-5">
                  {messages.map((msg, i) => (
                    <MsgBubble
                      key={`${msg.role}-${i}`}
                      {...msg}
                      brand={brand}
                      busy={busy}
                      onSuggestion={(t) => void sendText(t)}
                    />
                  ))}
                  {busy ? <TypingOrb /> : null}
                  <div ref={bottomRef} />
                </div>

                <div className="border-t border-dark/10 bg-white/85 p-3.5 backdrop-blur-sm md:p-4">
                  {error ? (
                    <p className="mb-1.5 px-1 font-sans text-xs text-[#9A1730]">{error}</p>
                  ) : null}
                  <div className="flex gap-2">
                    <input
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          void sendText(draft)
                        }
                      }}
                      placeholder="What is this step asking…"
                      className="min-w-0 flex-1 rounded-full border border-dark/15 bg-[#FFF2EC] px-4 py-3 font-sans text-sm text-dark shadow-[inset_0_1px_2px_rgba(26,26,26,0.04)] outline-none focus:border-[#E21E3F]"
                      disabled={busy}
                    />
                    <button
                      type="button"
                      onClick={() => void sendText(draft)}
                      disabled={busy || !draft.trim()}
                      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-dark text-cream shadow-[0_12px_28px_-14px_rgba(26,26,26,0.65)] disabled:opacity-40"
                      aria-label="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </ConciergeShell>
            </m.div>
          ) : null}
        </AnimatePresence>

        <div className="flex justify-end">
          <m.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            whileTap={reduceMotion ? undefined : {scale: 0.97}}
            className="inline-flex items-center gap-2.5 rounded-full bg-[#1A1A1A] px-6 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[#FFF2EC] shadow-[0_18px_44px_-14px_rgba(26,26,26,0.75),0_0_0_1px_rgba(255,242,236,0.08)] ring-2 ring-[#E21E3F]/30"
          >
            <MessageCircle className="h-5 w-5" />
            {open ? 'Hide ask' : 'Ask about this'}
          </m.button>
        </div>
      </div>
    </div>
  )
}

import React, {useState} from 'react'
import {AnimatePresence, m} from 'framer-motion'
import {Check, X} from 'lucide-react'
import type {PublicActivity} from '../types'
import {GoldRule, Kicker, Marker, StampWell, learnEase} from './learnChrome'

const ease = learnEase

type Attempt = {score: number | null; passed: boolean; answers: unknown}

type Props = {
  activity: PublicActivity
  attempt?: Attempt
  onSubmit: (answers: unknown) => Promise<{score: number; passed: boolean; explainAfter: string | null}>
  onFinished?: () => void
}

function PickMark({state}: {state: 'idle' | 'picked' | 'right' | 'wrong'}) {
  const tone =
    state === 'right'
      ? 'bg-teal text-cream'
      : state === 'wrong'
        ? 'bg-cream text-red-solid'
        : state === 'picked'
          ? 'bg-gold text-dark'
          : 'ring-2 ring-gold/50'
  return (
    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone}`}>
      {state === 'right' ? <Check className="h-4 w-4" strokeWidth={2.5} /> : null}
      {state === 'wrong' ? <X className="h-4 w-4" strokeWidth={2.5} /> : null}
    </span>
  )
}
const focusRing =
  'outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream'

function QuestionHead({
  kicker,
  title,
  hint,
  marker,
}: {
  kicker: string
  title: string
  hint: string
  marker?: string
}) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <Kicker>{kicker}</Kicker>
        {marker ? <Marker>{marker}</Marker> : null}
      </div>
      <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl">{title}</h1>
      <GoldRule />
      <p className="mt-5 font-serif text-lg italic text-dark/55">{hint}</p>
    </>
  )
}

function TryAgainBox({copy, onClick}: {copy: string; onClick: () => void}) {
  return (
    <StampWell className="mt-8">
      <div className="px-6 py-6">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-red-text">/ Try again</p>
        <p className="mt-3 font-serif text-xl leading-snug text-dark/80">{copy}</p>
        <button
          type="button"
          onClick={onClick}
          className={`${focusRing} mt-5 inline-flex min-h-[3rem] items-center bg-dark px-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059] animate-heartbeat`}
        >
          Try again
        </button>
      </div>
    </StampWell>
  )
}
function ConfirmAnswer({onClick, busy}: {onClick: () => void; busy: boolean}) {
  return (
    <div className="mt-5">
      <p className="font-serif text-base text-cream/80">Is this your answer?</p>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className={`mt-3 inline-flex min-h-[2.5rem] items-center bg-cream px-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-dark shadow-[4px_4px_0_0_#C5A059] disabled:opacity-30 ${focusRing}`}
      >
        {busy ? 'Checking' : 'Confirm your answer'}
      </button>
    </div>
  )
}

export function ActivityRenderer({activity, attempt, onSubmit, onFinished}: Props) {
  if (activity.template === 'trueFalse') {
    return <TrueFalse activity={activity} attempt={attempt} onSubmit={onSubmit} onFinished={onFinished} />
  }
  if (activity.template === 'threeColumn' || activity.template === 'multipleChoice') {
    return <ThreeColumn activity={activity} attempt={attempt} onSubmit={onSubmit} onFinished={onFinished} />
  }
  return <DropdownFind activity={activity} attempt={attempt} onSubmit={onSubmit} onFinished={onFinished} />
}

function TrueFalse({activity, onSubmit, onFinished}: Props) {
  const [picked, setPicked] = useState<boolean | null>(null)
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null)
  const [busy, setBusy] = useState(false)

  async function check() {
    if (picked == null || busy) return
    setBusy(true)
    const result = await onSubmit(picked)
    setVerdict(result.passed ? 'right' : 'wrong')
    setBusy(false)
    if (result.passed) onFinished?.()
  }

  const hint = picked == null ? '' : picked ? activity.trueHint || '' : activity.falseHint || ''
  const teach =
    picked == null
      ? ''
      : (picked ? activity.trueTeach : activity.falseTeach) || activity.explainAfter

  return (
    <section>
      <QuestionHead kicker="Question" title={activity.prompt} hint="Pick one: true or false." />
      <StampWell className="mt-12">
        <div className="flex items-start justify-center gap-10 px-6 py-10 pb-14 md:gap-14">
          {([true, false] as const).map((value) => {
            const selected = picked === value
            const show = selected && verdict
            const wrong = show === 'wrong'
            const right = show === 'right'
            return (
              <button
                key={String(value)}
                type="button"
                onClick={() => {
                  setPicked(value)
                  setVerdict(null)
                }}
                className={`${focusRing} flex h-36 w-36 flex-col items-center justify-center rounded-full font-serif text-3xl transition-[box-shadow,background-color,color] duration-300 ${
                  right ? 'bg-gold text-dark shadow-[10px_10px_0_0_#8B6914]' : ''
                } ${wrong ? 'bg-red-solid text-cream shadow-[10px_10px_0_0_#C5A059]' : ''} ${
                  selected && !show ? 'bg-dark text-cream shadow-[10px_10px_0_0_#C5A059]' : ''
                } ${!selected && !show ? 'bg-white text-dark shadow-[10px_10px_0_0_rgba(197,160,89,0.45)]' : ''}`}
              >
                {value ? 'True' : 'False'}
              </button>
            )
          })}
        </div>
      </StampWell>
      {picked != null && hint ? (
        <p className="mt-6 text-sm leading-relaxed text-dark/60">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-cream">
            / Hint
          </span>
          <span className="mt-2 block">{hint}</span>
        </p>
      ) : null}
      {verdict === 'right' && teach ? (
        <p className="mt-6 text-base leading-relaxed text-dark/75">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-teal">/ Right</span>
          <span className="mt-2 block font-serif text-xl leading-snug">{teach}</span>
        </p>
      ) : null}
      {picked != null && verdict == null ? (
        <div className="mt-8">
          <p className="font-serif text-lg text-dark/70">Is this your answer?</p>
          <button
            type="button"
            onClick={() => void check()}
            disabled={busy}
            className={`mt-3 inline-flex min-h-[2.75rem] items-center bg-dark px-5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059] disabled:opacity-30 ${focusRing}`}
          >
            {busy ? 'Checking' : 'Confirm your answer'}
          </button>
        </div>
      ) : null}
      {verdict === 'wrong' ? (
        <TryAgainBox
          copy="This one is not right. Click the button and pick again."
          onClick={() => {
            setPicked(null)
            setVerdict(null)
          }}
        />
      ) : null}
    </section>
  )
}

function ThreeColumn({activity, onSubmit, onFinished}: Props) {
  const [picked, setPicked] = useState<string | null>(null)
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null)
  const [busy, setBusy] = useState(false)

  async function check() {
    if (!picked || busy) return
    setBusy(true)
    const result = await onSubmit({key: picked})
    setVerdict(result.passed ? 'right' : 'wrong')
    setBusy(false)
    if (result.passed) onFinished?.()
  }

  function reset() {
    setPicked(null)
    setVerdict(null)
  }

  return (
    <section>
      <QuestionHead kicker="Question" title={activity.prompt} hint="Pick one, then confirm." />
      <StampWell className="mt-10">
        <ul className="grid grid-cols-1 gap-4 p-5 pb-8 pr-6 md:grid-cols-3 md:items-stretch">
        {activity.options.map((opt) => {
          const selected = picked === opt.key
          const show = selected && verdict
          const wrong = show === 'wrong'
          const right = show === 'right'
          const box =
            right
              ? 'bg-gold text-dark shadow-[8px_8px_0_0_#8B6914]'
              : wrong
                ? 'bg-red-solid text-cream shadow-[8px_8px_0_0_#C5A059]'
                : selected
                  ? 'bg-dark text-cream shadow-[8px_8px_0_0_#C5A059]'
                  : 'border border-dark/14 bg-white text-dark shadow-[8px_8px_0_0_rgba(26,26,26,0.08)]'
          return (
            <li
              key={opt.key}
              className={`${box} flex h-full min-h-[13.5rem] cursor-pointer flex-col p-7 transition-[box-shadow,background-color,color] duration-300`}
              onClick={() => {
                if (right) return
                setPicked(opt.key)
                setVerdict(null)
              }}
            >
              <div className="flex w-full items-start gap-5 text-left">
                <span className="min-h-[5.25rem] min-w-0 flex-1 font-serif text-lg leading-snug md:text-xl">
                  {opt.label}
                </span>
                <PickMark state={right ? 'right' : wrong ? 'wrong' : selected ? 'picked' : 'idle'} />
              </div>
              <AnimatePresence initial={false}>
                {selected ? (
                  <m.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: 'auto', opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{duration: 0.42, ease}}
                    className="overflow-hidden"
                  >
                    {opt.hint ? (
                      <p className={`mt-6 text-left text-sm leading-relaxed ${wrong ? 'text-cream/90' : right ? 'text-dark/75' : 'text-cream/80'}`}>
                        <span className={`block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] ${right ? 'text-teal' : wrong ? 'text-cream' : 'text-gold-on-dark'}`}>
                          / Hint
                        </span>
                        <span className="mt-2 block">{opt.hint}</span>
                      </p>
                    ) : null}
                    {show && opt.teach ? (
                      <p className="mt-4 text-left">
                        <span
                          className={`block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] ${
                            right ? 'text-teal' : 'text-cream'
                          }`}
                        >
                          {right ? '/ Right' : '/ Try again'}
                        </span>
                        <span className={`mt-2 block text-sm leading-relaxed ${right ? 'text-dark/80' : 'text-cream'}`}>
                          {opt.teach}
                        </span>
                      </p>
                    ) : null}
                    {verdict == null ? (
                      <div
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => e.stopPropagation()}
                      >
                        <ConfirmAnswer onClick={() => void check()} busy={busy} />
                      </div>
                    ) : null}
                  </m.div>
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
        </ul>
      </StampWell>
      {verdict === 'wrong' ? (
        <TryAgainBox copy="This one is not right. Click the button and pick a different box." onClick={reset} />
      ) : null}
    </section>
  )
}

function DropdownFind({activity, onSubmit, onFinished}: Props) {
  const [index, setIndex] = useState(0)
  const [picked, setPicked] = useState<string | null>(null)
  const [shown, setShown] = useState<string | null>(null)
  const [open, setOpen] = useState(false)
  const [closing, setClosing] = useState(false)
  const [verdict, setVerdict] = useState<'right' | 'wrong' | null>(null)
  const [map, setMap] = useState<Record<string, string>>({})
  const item = activity.matchItems[index]
  const choice = activity.matchChoices.find((c) => c.key === shown)
  const last = index >= activity.matchItems.length - 1
  const wrongWhy = picked && item?.wrongTeach ? item.wrongTeach[picked] : ''
  const listUp = open || closing

  async function check() {
    if (!item || !picked) return
    const right = item.correctKey === picked
    setVerdict(right ? 'right' : 'wrong')
    const nextMap = {...map, [String(index)]: picked}
    setMap(nextMap)
    if (right && last) {
      await onSubmit(nextMap)
      onFinished?.()
    }
  }

  function goNext() {
    setPicked(null)
    setShown(null)
    setVerdict(null)
    setOpen(false)
    setClosing(false)
    setIndex((i) => i + 1)
  }

  if (!item) return null

  return (
    <section>
      <QuestionHead
        kicker="Question"
        title={item.prompt}
        hint="Open the list and find the right next step."
        marker={`${String(index + 1).padStart(2, '0')} / ${String(activity.matchItems.length).padStart(2, '0')}`}
      />

      <StampWell className="mt-10">
        <button
          type="button"
          onClick={() => {
            if (verdict === 'right' || closing) return
            if (open) {
              setClosing(true)
              setOpen(false)
            } else {
              setOpen(true)
            }
          }}
          className={`${focusRing} flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-300 ${
            verdict === 'right'
              ? 'bg-gold text-dark'
              : verdict === 'wrong'
                ? 'bg-red-solid text-cream'
                : 'bg-dark text-cream'
          }`}
        >
          <span className="min-w-0 flex-1 font-serif text-xl leading-snug">
            {shown && choice ? (
              <>
                {item.prompt}
                {' \u2014 '}
                <span
                  className={`italic ${
                    verdict === 'right' ? 'text-teal' : verdict === 'wrong' ? 'text-cream' : 'text-gold-on-dark'
                  }`}
                >
                  {choice.label}
                </span>
              </>
            ) : (
              'Find the right next step'
            )}
          </span>
          <span className="shrink-0 font-sans text-[10px] font-semibold uppercase tracking-[0.2em]">
            {verdict === 'right' ? 'Right' : listUp ? 'Close' : 'Open'}
          </span>
        </button>
        <AnimatePresence
          initial={false}
          onExitComplete={() => {
            setClosing(false)
            setShown(picked)
          }}
        >
          {open ? (
            <m.div
              key="choices"
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.3, ease}}
              className="overflow-hidden border-t border-dark/10 bg-white"
            >
              <ul>
                {activity.matchChoices.map((c) => (
                  <li key={c.key} className="border-t border-dark/10 first:border-t-0">
                    <button
                      type="button"
                      onClick={() => {
                        setPicked(c.key)
                        setVerdict(null)
                        setShown(null)
                        setClosing(true)
                        setOpen(false)
                      }}
                      className={`${focusRing} w-full px-5 py-4 text-left font-serif text-lg leading-snug hover:bg-cream-warm`}
                    >
                      {c.label}
                    </button>
                  </li>
                ))}
              </ul>
            </m.div>
          ) : null}
        </AnimatePresence>
      </StampWell>

      {shown && verdict == null && item.hint ? (
        <p className="mt-5 text-sm leading-relaxed text-dark/60">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-cream">
            / Hint
          </span>
          <span className="mt-2 block">{item.hint}</span>
        </p>
      ) : null}

      {verdict === 'right' ? (
        <p className="mt-6 text-base leading-relaxed text-dark/75">
          <span className="block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-teal">/ Right</span>
          <span className="mt-2 block font-serif text-xl leading-snug">{choice?.teach || activity.explainAfter}</span>
        </p>
      ) : null}

      {verdict === 'wrong' ? (
        <TryAgainBox
          copy={
            wrongWhy
              ? `${wrongWhy} Click try again and pick a different step.`
              : 'This one is not right. Click try again and pick a different step.'
          }
          onClick={() => {
            setPicked(null)
            setShown(null)
            setVerdict(null)
            setClosing(false)
            setOpen(true)
          }}
        />
      ) : null}

      {verdict === 'right' && !last ? (
        <button
          type="button"
          onClick={goNext}
          className={`${focusRing} mt-10 inline-flex min-h-[3rem] items-center bg-dark px-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059] animate-heartbeat`}
        >
          Next
        </button>
      ) : shown && verdict == null ? (
        <div className="mt-8">
          <p className="font-serif text-lg text-dark/70">Is this your answer?</p>
          <button
            type="button"
            onClick={() => void check()}
            className={`${focusRing} mt-3 inline-flex min-h-[2.75rem] items-center bg-dark px-5 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059]`}
          >
            Confirm your answer
          </button>
        </div>
      ) : null}
    </section>
  )
}

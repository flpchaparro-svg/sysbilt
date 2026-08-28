import React, {useState} from 'react'
import type {PublicActivity} from '../types'
import CTAButton from '../../components/CTAButton'

type Attempt = {score: number | null; passed: boolean; answers: unknown}

type Props = {
  activity: PublicActivity
  attempt?: Attempt
  onSubmit: (answers: unknown) => Promise<{score: number; passed: boolean; explainAfter: string | null}>
}

export function ActivityRenderer({activity, attempt, onSubmit}: Props) {
  const [busy, setBusy] = useState(false)
  const [tf, setTf] = useState<boolean | null>(
    typeof attempt?.answers === 'boolean' ? attempt.answers : null,
  )
  const [choice, setChoice] = useState(
    typeof attempt?.answers === 'string'
      ? attempt.answers
      : typeof (attempt?.answers as {key?: string} | undefined)?.key === 'string'
        ? (attempt?.answers as {key: string}).key
        : '',
  )
  const [match, setMatch] = useState<Record<string, string>>(() => {
    if (attempt?.answers && typeof attempt.answers === 'object' && !Array.isArray(attempt.answers)) {
      return attempt.answers as Record<string, string>
    }
    return {}
  })
  const [result, setResult] = useState<{score: number; passed: boolean; explainAfter: string | null} | null>(
    attempt
      ? {score: attempt.score ?? 0, passed: attempt.passed, explainAfter: activity.explainAfter}
      : null,
  )
  const [error, setError] = useState('')

  async function submit(answers: unknown) {
    setBusy(true)
    setError('')
    try {
      const next = await onSubmit(answers)
      setResult(next)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save that attempt')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="border border-dark/10 bg-white p-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Activity</p>
      <h3 className="mt-3 font-serif text-2xl">{activity.prompt}</h3>

      {activity.template === 'trueFalse' ? (
        <div className="mt-6 flex gap-3">
          {[true, false].map((value) => (
            <button
              key={String(value)}
              type="button"
              onClick={() => setTf(value)}
              className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
                tf === value ? 'border-dark bg-dark text-cream' : 'border-dark/20 bg-cream'
              }`}
            >
              {value ? 'True' : 'False'}
            </button>
          ))}
        </div>
      ) : null}

      {activity.template === 'multipleChoice' ? (
        <ul className="mt-6 space-y-2">
          {activity.options.map((opt) => (
            <li key={opt.key}>
              <label className="flex cursor-pointer items-start gap-3 border border-dark/10 px-4 py-3 has-[:checked]:border-dark">
                <input
                  type="radio"
                  name={activity._key}
                  checked={choice === opt.key}
                  onChange={() => setChoice(opt.key)}
                  className="mt-1"
                />
                <span className="text-sm">{opt.label}</span>
              </label>
            </li>
          ))}
        </ul>
      ) : null}

      {activity.template === 'match' ? (
        <ul className="mt-6 space-y-4">
          {activity.matchItems.map((item, index) => (
            <li key={`${activity._key}-${index}`}>
              <p className="text-sm leading-relaxed">{item.prompt}</p>
              <select
                className="mt-2 w-full border border-dark/15 bg-cream px-3 py-2 text-sm"
                value={match[String(index)] || ''}
                onChange={(e) => setMatch((prev) => ({...prev, [String(index)]: e.target.value}))}
              >
                <option value="">Choose the best answer</option>
                {activity.matchChoices.map((c) => (
                  <option key={c.key} value={c.key}>
                    {c.label}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-6">
        <CTAButton
          type="button"
          size="sm"
          onClick={() => {
            if (activity.template === 'trueFalse') {
              if (tf == null) {
                setError('Pick true or false')
                return
              }
              void submit(tf)
              return
            }
            if (activity.template === 'multipleChoice') {
              if (!choice) {
                setError('Pick an answer')
                return
              }
              void submit({key: choice})
              return
            }
            const missing = activity.matchItems.some((_, i) => !match[String(i)])
            if (missing) {
              setError('Match every case')
              return
            }
            void submit(match)
          }}
        >
          {busy ? 'Checking' : result ? 'Try again' : 'Check'}
        </CTAButton>
      </div>

      {result ? (
        <div className="mt-6 border-t border-dark/10 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50">
            {result.passed ? 'Correct' : 'Not yet'} · {result.score}/100
          </p>
          {result.explainAfter ? (
            <p className="mt-2 text-sm leading-relaxed text-dark/70">{result.explainAfter}</p>
          ) : null}
        </div>
      ) : null}
      {error ? <p className="mt-3 text-sm text-red">{error}</p> : null}
    </section>
  )
}

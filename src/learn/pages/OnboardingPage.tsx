import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {LearnShell} from '../LearnShell'
import {useLearnSession} from '../lib/LearnSession'
import {LEARN_GOALS, LEARN_INTERESTS} from '../lib/profileStore'

export function OnboardingPage() {
  const {profile, saveProfile} = useLearnSession()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [name, setName] = useState(profile.displayName)
  const [interest, setInterest] = useState<string[]>(profile.interest)
  const [goal, setGoal] = useState(profile.goal)
  const [busy, setBusy] = useState(false)

  function toggle(id: string) {
    setInterest((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  async function finish(skipped = false) {
    setBusy(true)
    await saveProfile({
      displayName: skipped ? name.trim() || profile.displayName : name.trim(),
      interest: skipped ? interest : interest,
      goal: skipped ? goal : goal,
      onboarded: true,
    })
    navigate('/learn', {replace: true})
  }

  return (
    <LearnShell layout="auth">
      <div className="w-full max-w-[28rem] border border-dark/10 bg-white">
        <div className="h-[3px] bg-gold" />
        <div className="px-8 py-10 md:px-11 md:py-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">
            / Step {step + 1} of 3
          </p>

          {step === 0 ? (
            <>
              <h1 className="mt-4 font-serif text-4xl leading-tight">What should we call you</h1>
              <p className="mt-4 text-sm leading-relaxed text-dark/70">
                First name is enough. Skip if you would rather not.
              </p>
              <label className="mt-8 block">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50">Name</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full border border-dark/15 bg-cream-light px-4 py-3 text-sm outline-none focus:border-dark"
                  autoComplete="nickname"
                />
              </label>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="mt-8 flex min-h-[3rem] w-full items-center justify-center border border-dark bg-dark px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream"
              >
                Continue
              </button>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h1 className="mt-4 font-serif text-4xl leading-tight">What do you want to learn</h1>
              <p className="mt-4 text-sm leading-relaxed text-dark/70">
                Pick anything that sounds close. You can skip.
              </p>
              <ul className="mt-8 space-y-2">
                {LEARN_INTERESTS.map((item) => {
                  const on = interest.includes(item.id)
                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => toggle(item.id)}
                        className={`w-full border px-4 py-3 text-left text-sm ${
                          on ? 'border-dark bg-cream' : 'border-dark/15 bg-white hover:border-dark/40'
                        }`}
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="mt-8 flex min-h-[3rem] w-full items-center justify-center border border-dark bg-dark px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream"
              >
                Continue
              </button>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h1 className="mt-4 font-serif text-4xl leading-tight">Why are you here</h1>
              <p className="mt-4 text-sm leading-relaxed text-dark/70">One is enough. Skip is fine too.</p>
              <ul className="mt-8 space-y-2">
                {LEARN_GOALS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setGoal(item.id)}
                      className={`w-full border px-4 py-3 text-left text-sm ${
                        goal === item.id ? 'border-dark bg-cream' : 'border-dark/15 bg-white hover:border-dark/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                disabled={busy}
                onClick={() => finish(false)}
                className="mt-8 flex min-h-[3rem] w-full items-center justify-center border border-dark bg-dark px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream disabled:opacity-40"
              >
                {busy ? 'Saving' : 'Go to the dashboard'}
              </button>
            </>
          ) : null}

          <button
            type="button"
            disabled={busy}
            onClick={() => finish(true)}
            className="mt-4 w-full py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45 hover:text-dark"
          >
            Skip
          </button>
        </div>
      </div>
    </LearnShell>
  )
}

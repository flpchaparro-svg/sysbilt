import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {LearnShell} from '../LearnShell'
import {useLearnSession} from '../lib/LearnSession'
import {LEARN_GOALS, LEARN_INTERESTS} from '../lib/profileStore'
import {GoldRule, Kicker, StampWell, learnBtn} from '../components/learnChrome'

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
      <StampWell className="w-full max-w-[28rem]">
        <div className="px-8 py-10 md:px-11 md:py-12">
          <Kicker>Step {step + 1} of 3</Kicker>

          {step === 0 ? (
            <>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-tight">What should we call you</h1>
              <GoldRule />
              <p className="mt-5 text-sm leading-relaxed text-dark/70">
                First name is enough. Skip if you would rather not.
              </p>
              <label className="mt-8 block">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">Name</span>
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
                className={`${learnBtn} mt-8 w-full`}
              >
                Continue
              </button>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-tight">What do you want to learn</h1>
              <GoldRule />
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
                        className={`w-full px-4 py-3 text-left text-sm ${
                          on ? 'bg-dark text-cream shadow-[6px_6px_0_0_#C5A059]' : 'border border-dark/15 bg-white hover:border-dark/40'
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
                className={`${learnBtn} mt-8 w-full`}
              >
                Continue
              </button>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <h1 className="mt-5 font-serif text-4xl font-medium leading-tight">Why are you here</h1>
              <GoldRule />
              <p className="mt-4 text-sm leading-relaxed text-dark/70">One is enough. Skip is fine too.</p>
              <ul className="mt-8 space-y-2">
                {LEARN_GOALS.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setGoal(item.id)}
                      className={`w-full px-4 py-3 text-left text-sm ${
                        goal === item.id ? 'bg-dark text-cream shadow-[6px_6px_0_0_#C5A059]' : 'border border-dark/15 bg-white hover:border-dark/40'
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
                className={`${learnBtn} mt-8 w-full disabled:opacity-40`}
              >
                {busy ? 'Saving' : 'Go to the dashboard'}
              </button>
            </>
          ) : null}

          <button
            type="button"
            disabled={busy}
            onClick={() => finish(true)}
            className="mt-4 w-full py-3 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/45 hover:text-gold-on-cream"
          >
            Skip
          </button>
        </div>
      </StampWell>
    </LearnShell>
  )
}

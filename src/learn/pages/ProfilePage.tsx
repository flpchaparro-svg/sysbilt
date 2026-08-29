import React, {useEffect, useMemo, useState} from 'react'
import {useLearnSession} from '../lib/LearnSession'
import {getLearnSupabase, learnSupabaseConfigured} from '../lib/supabaseClient'
import {
  LEARN_COUNTRIES,
  LEARN_GOALS,
  LEARN_INTERESTS,
} from '../lib/profileStore'
import {GoldRule, Kicker, LearnPage, PageHead, StampWell, learnBtn} from '../components/learnChrome'

const fieldClass =
  'mt-2 w-full border border-dark/15 bg-white px-4 py-3 text-sm outline-none focus:border-dark'
const labelClass = 'font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50'

function pickClass(on: boolean) {
  return on
    ? 'bg-dark text-cream shadow-[6px_6px_0_0_#C5A059]'
    : 'border border-dark/15 bg-white hover:border-dark/40'
}

export function ProfilePage() {
  const {profile, session, saveProfile} = useLearnSession()
  const live = learnSupabaseConfigured() && Boolean(session)
  const googleOnly = useMemo(() => {
    const identities = session?.user.identities || []
    if (!identities.length) return false
    return identities.some((row) => row.provider === 'google') && !identities.some((row) => row.provider === 'email')
  }, [session])

  const [name, setName] = useState(profile.displayName)
  const [phone, setPhone] = useState(profile.phone)
  const [country, setCountry] = useState(profile.country || 'AU')
  const [interest, setInterest] = useState<string[]>(profile.interest)
  const [goal, setGoal] = useState(profile.goal)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [accountBusy, setAccountBusy] = useState(false)
  const [prefBusy, setPrefBusy] = useState(false)
  const [passBusy, setPassBusy] = useState(false)
  const [accountNote, setAccountNote] = useState('')
  const [prefNote, setPrefNote] = useState('')
  const [passNote, setPassNote] = useState('')
  const [passError, setPassError] = useState('')

  const first = (profile.displayName.split(' ')[0] || '').trim()

  useEffect(() => {
    setName(profile.displayName)
    setPhone(profile.phone)
    setCountry(profile.country || 'AU')
    setInterest(profile.interest)
    setGoal(profile.goal)
  }, [profile])

  function toggleInterest(id: string) {
    setInterest((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  async function saveAccount(e: React.FormEvent) {
    e.preventDefault()
    setAccountBusy(true)
    setAccountNote('')
    await saveProfile({
      displayName: name.trim(),
      phone: phone.trim(),
      country,
    })
    setAccountBusy(false)
    setAccountNote('Saved.')
  }

  async function savePrefs(e: React.FormEvent) {
    e.preventDefault()
    setPrefBusy(true)
    setPrefNote('')
    await saveProfile({interest, goal})
    setPrefBusy(false)
    setPrefNote('Saved. Featured will follow what you picked.')
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault()
    setPassNote('')
    setPassError('')
    if (password !== confirm) {
      setPassError('Those passwords do not match.')
      return
    }
    if (password.length < 6) {
      setPassError('Password must be at least 6 characters.')
      return
    }
    if (!live) {
      setPassError('Sign in with an account to change a password.')
      return
    }
    setPassBusy(true)
    try {
      const {error} = await getLearnSupabase().auth.updateUser({password})
      if (error) throw error
      setPassword('')
      setConfirm('')
      setPassNote('Password updated.')
    } catch (err) {
      setPassError(err instanceof Error ? err.message : 'Could not update the password.')
    } finally {
      setPassBusy(false)
    }
  }

  return (
    <LearnPage>
      <PageHead kicker="You" title={first ? first : 'Profile'}>
        Name, contact, password, and the topics you want more of. Featured follows this.
      </PageHead>

      <StampWell className="mt-10">
        <form onSubmit={saveAccount} className="px-6 py-8 md:px-8">
          <Kicker>Account</Kicker>
          <h2 className="mt-4 font-serif text-2xl font-medium md:text-3xl">Your details</h2>
          <GoldRule />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className={labelClass}>Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className={labelClass}>Email</span>
              <input value={profile.email} readOnly className={`${fieldClass} text-dark/50`} autoComplete="email" />
            </label>
            <label className="block">
              <span className={labelClass}>Phone</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={fieldClass}
                autoComplete="tel"
                placeholder="04"
              />
            </label>
            <label className="block">
              <span className={labelClass}>Country</span>
              <select value={country} onChange={(e) => setCountry(e.target.value)} className={fieldClass}>
                {LEARN_COUNTRIES.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button type="submit" disabled={accountBusy} className={`${learnBtn} mt-8 disabled:opacity-40`}>
            {accountBusy ? 'Saving' : 'Save details'}
          </button>
          {accountNote ? <p className="mt-4 text-sm text-dark/70">{accountNote}</p> : null}
        </form>
      </StampWell>

      <StampWell className="mt-10">
        <form onSubmit={savePrefs} className="px-6 py-8 md:px-8">
          <Kicker>For you</Kicker>
          <h2 className="mt-4 font-serif text-2xl font-medium md:text-3xl">What you want more of</h2>
          <GoldRule />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-dark/70">
            Pick the topics you want in front of you. We will put matching courses first on Featured.
          </p>
          <ul className="mt-8 grid gap-2 sm:grid-cols-2">
            {LEARN_INTERESTS.map((item) => {
              const on = interest.includes(item.id)
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => toggleInterest(item.id)}
                    className={`w-full px-4 py-3 text-left text-sm ${pickClass(on)}`}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>

          <p className={`${labelClass} mt-10`}>Why you are here</p>
          <ul className="mt-4 space-y-2">
            {LEARN_GOALS.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setGoal(item.id)}
                  className={`w-full px-4 py-3 text-left text-sm ${pickClass(goal === item.id)}`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <button type="submit" disabled={prefBusy} className={`${learnBtn} mt-8 disabled:opacity-40`}>
            {prefBusy ? 'Saving' : 'Save preferences'}
          </button>
          {prefNote ? <p className="mt-4 text-sm text-dark/70">{prefNote}</p> : null}
        </form>
      </StampWell>

      <StampWell className="mt-10">
        <div className="px-6 py-8 md:px-8">
          <Kicker>Password</Kicker>
          <h2 className="mt-4 font-serif text-2xl font-medium md:text-3xl">Change password</h2>
          <GoldRule />
          {googleOnly ? (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-dark/70">
              You came in with Google. Change the password there if you need to.
            </p>
          ) : !live ? (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-dark/70">
              Sign in with an account to change a password.
            </p>
          ) : (
            <form onSubmit={savePassword} className="mt-8 max-w-md space-y-4">
              <label className="block">
                <span className={labelClass}>New password</span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={fieldClass}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </label>
              <label className="block">
                <span className={labelClass}>Confirm password</span>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className={fieldClass}
                  autoComplete="new-password"
                  minLength={6}
                  required
                />
              </label>
              <button type="submit" disabled={passBusy} className={`${learnBtn} disabled:opacity-40`}>
                {passBusy ? 'Saving' : 'Save password'}
              </button>
              {passNote ? <p className="text-sm text-dark/70">{passNote}</p> : null}
              {passError ? <p className="text-sm text-red-text">{passError}</p> : null}
            </form>
          )}
        </div>
      </StampWell>
    </LearnPage>
  )
}

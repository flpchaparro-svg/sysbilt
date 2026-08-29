import React, {useState} from 'react'
import {ArrowRight} from 'lucide-react'
import {LearnShell} from '../LearnShell'
import {getLearnSupabase} from '../lib/supabaseClient'
import {GoldRule, Kicker, StampWell, learnBtn} from '../components/learnChrome'

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="currentColor"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="currentColor"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="currentColor"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  )
}

function authMessage(err: unknown, fallback: string): string {
  const raw = err instanceof Error ? err.message : fallback
  const lower = raw.toLowerCase()
  if (lower.includes('invalid login')) return 'Email or password is wrong.'
  if (lower.includes('already registered') || lower.includes('already been registered')) {
    return 'That email already has an account. Sign in instead.'
  }
  if (lower.includes('password')) return 'Password must be at least 6 characters.'
  return raw
}

export function SignInPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [status, setStatus] = useState<'idle' | 'google' | 'form' | 'confirm' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const busy = status === 'google' || status === 'form'

  async function google() {
    setStatus('google')
    setMessage('')
    try {
      const {error} = await getLearnSupabase().auth.signInWithOAuth({
        provider: 'google',
        options: {redirectTo: `${window.location.origin}/learn`},
      })
      if (error) throw error
    } catch (err) {
      setStatus('error')
      setMessage(authMessage(err, 'Could not open Google'))
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    if (mode === 'signup' && password !== confirm) {
      setStatus('error')
      setMessage('Those passwords do not match.')
      return
    }
    setStatus('form')
    try {
      const supabase = getLearnSupabase()
      if (mode === 'signin') {
        const {error} = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        })
        if (error) throw error
        return
      }
      const {data, error} = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/learn`,
          data: {full_name: name.trim()},
        },
      })
      if (error) throw error
      if (!data.session) {
        setStatus('confirm')
        return
      }
    } catch (err) {
      setStatus('error')
      setMessage(authMessage(err, mode === 'signin' ? 'Could not sign in' : 'Could not create the account'))
    }
  }

  function switchMode(next: 'signin' | 'signup') {
    setMode(next)
    setStatus('idle')
    setMessage('')
    setPassword('')
    setConfirm('')
  }

  return (
    <LearnShell layout="auth">
      <StampWell className="w-full max-w-[28rem]">
        <div className="px-8 py-10 md:px-11 md:py-12">
          <Kicker>Learn</Kicker>
          <h1 className="mt-5 font-serif text-4xl font-medium leading-[1.08] tracking-tight md:text-[2.75rem]">Welcome to Learn</h1>
          <GoldRule />
          <p className="mt-5 text-[15px] leading-relaxed text-dark/70">
            Enjoy the courses. AI, automation, and how to build a business that holds up as you grow.
          </p>

          <button
            type="button"
            onClick={google}
            disabled={busy}
            className="group relative mt-10 flex min-h-[3rem] w-full items-center justify-center overflow-hidden bg-dark px-6 py-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059] transition-transform duration-[250ms] active:scale-[0.97] disabled:opacity-60"
          >
            <span className="pointer-events-none absolute inset-0 translate-y-full bg-gold transition-transform duration-[250ms] group-hover:translate-y-0" />
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-dark">
              <span className="text-gold transition-colors duration-[250ms] group-hover:text-dark">
                <GoogleMark />
              </span>
              <span>{status === 'google' ? 'Opening Google' : 'Continue with Google'}</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </span>
          </button>

          <div className="mt-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-dark/10" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/40">Or email</span>
            <span className="h-px flex-1 bg-dark/10" />
          </div>

          <div className="mt-8 grid grid-cols-2 border-b border-dark/10">
            <button
              type="button"
              onClick={() => switchMode('signin')}
              className={`pb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] ${
                mode === 'signin' ? 'border-b-2 border-gold text-dark' : 'text-dark/40 hover:text-dark/70'
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => switchMode('signup')}
              className={`pb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] ${
                mode === 'signup' ? 'border-b-2 border-gold text-dark' : 'text-dark/40 hover:text-dark/70'
              }`}
            >
              Create account
            </button>
          </div>

          {status === 'confirm' ? (
            <p className="mt-8 text-sm leading-relaxed text-dark/70">
              Check {email.trim()} and confirm the address, then come back here to sign in.
            </p>
          ) : (
            <form onSubmit={submit} className="mt-8 space-y-4">
              {mode === 'signup' ? (
                <label className="block">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">Name</span>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full border border-dark/15 bg-cream-light px-4 py-3 text-sm outline-none focus:border-dark"
                    autoComplete="name"
                    disabled={busy}
                  />
                </label>
              ) : null}
              <label className="block">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">Email</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full border border-dark/15 bg-cream-light px-4 py-3 text-sm outline-none placeholder:text-dark/30 focus:border-dark"
                  autoComplete="email"
                  disabled={busy}
                />
              </label>
              <label className="block">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">Password</span>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full border border-dark/15 bg-cream-light px-4 py-3 text-sm outline-none focus:border-dark"
                  autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                  disabled={busy}
                />
              </label>
              {mode === 'signup' ? (
                <label className="block">
                  <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="mt-2 w-full border border-dark/15 bg-cream-light px-4 py-3 text-sm outline-none focus:border-dark"
                    autoComplete="new-password"
                    disabled={busy}
                  />
                </label>
              ) : null}
              <button
                type="submit"
                disabled={busy}
                className={`${learnBtn} w-full disabled:opacity-60`}
              >
                {status === 'form'
                  ? mode === 'signin'
                    ? 'Signing in'
                    : 'Creating account'
                  : mode === 'signin'
                    ? 'Sign in'
                    : 'Create account'}
              </button>
            </form>
          )}

          {message ? <p className="mt-6 text-sm text-red-text">{message}</p> : null}
        </div>
      </StampWell>
    </LearnShell>
  )
}

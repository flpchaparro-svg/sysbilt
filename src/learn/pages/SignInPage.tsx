import React, {useState} from 'react'
import {LearnShell} from '../LearnShell'
import {getLearnSupabase} from '../lib/supabaseClient'
import CTAButton from '../../components/CTAButton'

export function SignInPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'google' | 'email' | 'sent' | 'error'>('idle')
  const [message, setMessage] = useState('')

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
      setMessage(err instanceof Error ? err.message : 'Google sign-in failed')
    }
  }

  async function magic(e: React.FormEvent) {
    e.preventDefault()
    setStatus('email')
    setMessage('')
    try {
      const {error} = await getLearnSupabase().auth.signInWithOtp({
        email: email.trim(),
        options: {emailRedirectTo: `${window.location.origin}/learn`},
      })
      if (error) throw error
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof Error ? err.message : 'Could not send the link')
    }
  }

  return (
    <LearnShell>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Learn</p>
      <h1 className="mt-3 max-w-xl font-serif text-4xl leading-tight md:text-5xl">Sign in to continue</h1>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-dark/70">
        Google is the fastest path. You can also get a link by email if you prefer.
      </p>
      <div className="mt-10 max-w-md space-y-8">
        <CTAButton type="button" onClick={google}>
          {status === 'google' ? 'Opening Google' : 'Continue with Google'}
        </CTAButton>
        <form onSubmit={magic} className="space-y-4 border-t border-dark/10 pt-8">
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50">Email</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-dark/15 bg-white px-4 py-3 text-sm outline-none focus:border-dark"
              autoComplete="email"
            />
          </label>
          <CTAButton type="submit" variant="bracket">
            {status === 'email' ? 'Sending' : status === 'sent' ? 'Link sent' : 'Email me a link'}
          </CTAButton>
        </form>
        {status === 'sent' ? (
          <p className="text-sm text-dark/70">Check your inbox and open the link on this device.</p>
        ) : null}
        {message ? <p className="text-sm text-red">{message}</p> : null}
      </div>
    </LearnShell>
  )
}

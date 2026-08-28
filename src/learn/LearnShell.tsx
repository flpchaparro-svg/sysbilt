import React from 'react'
import {Link} from 'react-router-dom'
import {SysbiltLogo} from '../components/SysbiltLogo'

type LearnShellProps = {
  children: React.ReactNode
  email?: string | null
  onSignOut?: () => void
  layout?: 'page' | 'auth'
}

export function LearnShell({children, email, onSignOut, layout = 'page'}: LearnShellProps) {
  const auth = layout === 'auth'

  return (
    <div className="flex min-h-screen flex-col bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
      <header className="border-b border-dark/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
          <Link to="/learn" aria-label="Learn home">
            <SysbiltLogo className="w-[110px] md:w-[130px]" />
          </Link>
          <div className="flex items-center gap-4">
            <p className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50 sm:block">Learn</p>
            {email ? (
              <div className="flex items-center gap-3">
                <p className="max-w-[12rem] truncate text-xs text-dark/60">{email}</p>
                {onSignOut ? (
                  <button
                    type="button"
                    onClick={onSignOut}
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/70 underline-offset-4 hover:text-dark hover:underline"
                  >
                    Sign out
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>
      <main
        className={
          auth
            ? 'flex flex-1 items-center justify-center px-5 py-12 md:px-6 md:py-16'
            : 'mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-14'
        }
      >
        {children}
      </main>
    </div>
  )
}

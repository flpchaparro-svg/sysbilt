import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {SysbiltLogo} from '../components/SysbiltLogo'
import {LearnBackdrop} from './components/LearnBackdrop'
import {Kicker} from './components/learnChrome'

const NAV = [
  {to: '/learn', label: 'Home', end: true},
  {to: '/learn/courses', label: 'Courses', end: true},
  {to: '/learn/featured', label: 'Featured', end: true},
  {to: '/learn/progress', label: 'Progress', end: true},
  {to: '/learn/profile', label: 'You', end: true},
]

type LearnLayoutProps = {
  children: React.ReactNode
  displayName?: string | null
  email?: string | null
  onSignOut?: () => void
}

export function LearnLayout({children, displayName, email, onSignOut}: LearnLayoutProps) {
  const who = displayName || email || ''

  return (
    <div className="flex min-h-screen bg-cream font-sans text-dark selection:bg-dark selection:text-cream">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-dark/10 md:flex">
        <div className="border-b border-dark/10 px-5 py-6">
          <Link to="/learn" aria-label="Learn home">
            <SysbiltLogo className="w-[110px]" />
          </Link>
          <div className="mt-4">
            <Kicker>Learn</Kicker>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-6">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({isActive}) =>
                `px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] ${
                  isActive ? 'bg-cream-warm text-dark shadow-[4px_4px_0_0_#C5A059]' : 'text-dark/50 hover:text-dark'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="relative flex min-w-0 flex-1 flex-col">
        <LearnBackdrop />
        <header className="sticky top-0 z-20 border-b border-dark/10 bg-cream">
          <div className="flex items-center justify-between gap-4 px-5 py-4 md:px-8">
            <Link to="/learn" className="md:hidden" aria-label="Learn home">
              <SysbiltLogo className="w-[100px]" />
            </Link>
            <nav className="flex gap-4 overflow-x-auto md:hidden">
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({isActive}) =>
                    `whitespace-nowrap font-sans text-[11px] font-semibold uppercase tracking-[0.2em] ${
                      isActive ? 'text-gold-on-cream' : 'text-dark/45'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-4">
              {who ? (
                <Link
                  to="/learn/profile"
                  className="max-w-[10rem] truncate text-xs text-dark/60 underline-offset-4 hover:text-gold-on-cream hover:underline md:max-w-[16rem]"
                >
                  {who}
                </Link>
              ) : null}
              {onSignOut ? (
                <button
                  type="button"
                  onClick={onSignOut}
                  className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/70 underline-offset-4 hover:text-gold-on-cream hover:underline"
                >
                  Sign out
                </button>
              ) : null}
            </div>
          </div>
        </header>
        <main className="relative z-10 flex-1 overflow-visible px-5 py-8 md:px-10 md:py-10" style={{overflowAnchor: 'none'}}>
          {children}
        </main>
      </div>
    </div>
  )
}

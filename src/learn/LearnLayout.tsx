import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {SysbiltLogo} from '../components/SysbiltLogo'

const NAV = [
  {to: '/learn', label: 'Home', end: true},
  {to: '/learn/courses', label: 'Courses', end: true},
  {to: '/learn/featured', label: 'Featured', end: true},
  {to: '/learn/comments', label: 'Comments', end: true},
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
          <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">Learn</p>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3 py-6">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({isActive}) =>
                `px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] ${
                  isActive ? 'bg-white text-dark' : 'text-dark/50 hover:text-dark'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-dark/10">
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
                    `whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.2em] ${
                      isActive ? 'text-dark' : 'text-dark/45'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-4">
              {who ? <p className="max-w-[10rem] truncate text-xs text-dark/60 md:max-w-[16rem]">{who}</p> : null}
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
          </div>
        </header>
        <main className="flex-1 px-5 py-8 md:px-10 md:py-10">{children}</main>
      </div>
    </div>
  )
}

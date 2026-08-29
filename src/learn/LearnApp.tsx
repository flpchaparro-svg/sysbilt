import React, {useEffect, useState} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import type {Session} from '@supabase/supabase-js'
import {PageMeta} from '../components/PageMeta'
import {getLearnSupabase, learnSupabaseConfigured} from './lib/supabaseClient'
import {LearnSessionProvider, useLearnSession} from './lib/LearnSession'
import {learnPathParts} from './lib/learnPath'
import {LearnShell} from './LearnShell'
import {LearnLayout} from './LearnLayout'
import {SignInPage} from './pages/SignInPage'
import {OnboardingPage} from './pages/OnboardingPage'
import {DashboardPage, CoursesPage, FeaturedPage} from './pages/DashboardPage'
import {ProgressPage} from './pages/ProgressPage'
import {CoursePage} from './pages/CoursePage'
import {LessonPage} from './pages/LessonPage'
import {ProfilePage} from './pages/ProfilePage'
import {LearnPreviewProvider} from './previewData'

function SignedRoutes({onSignOut}: {onSignOut?: () => void}) {
  const {profile} = useLearnSession()
  const location = useLocation()
  const rest = learnPathParts(location.pathname)
  const section = rest[0] || ''

  if (!profile.onboarded && section !== 'welcome') {
    return <Navigate to="/learn/welcome" replace />
  }
  if (profile.onboarded && section === 'welcome') {
    return <Navigate to="/learn" replace />
  }
  if (section === 'welcome') {
    return <OnboardingPage />
  }

  let page: React.ReactNode = <DashboardPage />
  if (section === 'courses') page = <CoursesPage />
  else if (section === 'featured') page = <FeaturedPage />
  else if (section === 'progress' || section === 'comments') page = <ProgressPage />
  else if (section === 'profile') page = <ProfilePage />
  else if (rest.length >= 2) page = <LessonPage />
  else if (section) page = <CoursePage />

  return (
    <LearnLayout displayName={profile.displayName} email={profile.email} onSignOut={onSignOut}>
      {page}
    </LearnLayout>
  )
}

export default function LearnApp() {
  const configured = learnSupabaseConfigured()
  const preview = !configured
  const [session, setSession] = useState<Session | null>(null)
  const [ready, setReady] = useState(!configured)

  useEffect(() => {
    if (!configured) return
    const supabase = getLearnSupabase()
    supabase.auth.getSession().then(({data}) => {
      setSession(data.session)
      setReady(true)
    })
    const {data: sub} = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next)
    })
    return () => {
      sub.subscription.unsubscribe()
    }
  }, [configured])

  async function signOut() {
    if (preview) return
    await getLearnSupabase().auth.signOut()
  }

  return (
    <>
      <PageMeta
        title="Learn | SYSBILT"
        description="SYSBILT Learn membership"
        robots="noindex, nofollow"
      />
      <LearnPreviewProvider enabled={preview}>
        {!ready ? (
          <LearnShell>
            <p className="font-sans text-xs uppercase tracking-[0.2em] text-dark/50">Loading</p>
          </LearnShell>
        ) : preview || session ? (
          <LearnSessionProvider session={preview ? null : session}>
            <SignedRoutes onSignOut={preview ? undefined : signOut} />
          </LearnSessionProvider>
        ) : (
          <SignInPage />
        )}
      </LearnPreviewProvider>
    </>
  )
}

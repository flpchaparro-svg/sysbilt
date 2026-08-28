import React, {useEffect, useState} from 'react'
import {Navigate, Route, Routes, useLocation} from 'react-router-dom'
import type {Session} from '@supabase/supabase-js'
import {PageMeta} from '../components/PageMeta'
import {getLearnSupabase, learnSupabaseConfigured} from './lib/supabaseClient'
import {LearnSessionProvider, useLearnSession} from './lib/LearnSession'
import {LearnShell} from './LearnShell'
import {LearnLayout} from './LearnLayout'
import {SignInPage} from './pages/SignInPage'
import {OnboardingPage} from './pages/OnboardingPage'
import {DashboardPage, CoursesPage, FeaturedPage} from './pages/DashboardPage'
import {CommentsPage} from './pages/CommentsPage'
import {CoursePage} from './pages/CoursePage'
import {LessonPage} from './pages/LessonPage'
import {LearnPreviewProvider} from './previewData'

function SignedRoutes({onSignOut}: {onSignOut?: () => void}) {
  const {profile} = useLearnSession()
  const location = useLocation()

  if (!profile.onboarded && location.pathname !== '/learn/welcome') {
    return <Navigate to="/learn/welcome" replace />
  }
  if (profile.onboarded && location.pathname === '/learn/welcome') {
    return <Navigate to="/learn" replace />
  }
  if (location.pathname === '/learn/welcome') {
    return <OnboardingPage />
  }

  return (
    <LearnLayout displayName={profile.displayName} email={profile.email} onSignOut={onSignOut}>
      <Routes>
        <Route path="/learn" element={<DashboardPage />} />
        <Route path="/learn/courses" element={<CoursesPage />} />
        <Route path="/learn/featured" element={<FeaturedPage />} />
        <Route path="/learn/comments" element={<CommentsPage />} />
        <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonPage />} />
        <Route path="/learn/:courseSlug" element={<CoursePage />} />
        <Route path="*" element={<Navigate to="/learn" replace />} />
      </Routes>
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
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">Loading</p>
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

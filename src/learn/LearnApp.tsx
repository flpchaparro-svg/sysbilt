import React, {useEffect, useState} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import type {Session} from '@supabase/supabase-js'
import {PageMeta} from '../components/PageMeta'
import {getLearnSupabase, learnSupabaseConfigured} from './lib/supabaseClient'
import {LearnShell} from './LearnShell'
import {SignInPage} from './pages/SignInPage'
import {CataloguePage} from './pages/CataloguePage'
import {CoursePage} from './pages/CoursePage'
import {LessonPage} from './pages/LessonPage'
import {LearnPreviewProvider} from './previewData'

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

  const email = preview ? 'design preview' : session?.user.email

  return (
    <>
      <PageMeta
        title="Learn | SYSBILT"
        description="SYSBILT Learn membership"
        robots="noindex, nofollow"
      />
      <LearnPreviewProvider enabled={preview}>
        {!configured || preview ? (
          <LearnShell email={email} onSignOut={undefined}>
            <p className="mb-8 border border-dark/10 bg-white px-4 py-3 text-sm text-dark/70">
              Design preview. Sign-in, saved progress, and payments wait until the database is connected. Click through the sample course.
            </p>
            <Routes>
              <Route path="/learn" element={<CataloguePage />} />
              <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonPage />} />
              <Route path="/learn/:courseSlug" element={<CoursePage />} />
              <Route path="*" element={<Navigate to="/learn" replace />} />
            </Routes>
          </LearnShell>
        ) : !ready ? (
          <LearnShell>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">Loading</p>
          </LearnShell>
        ) : !session ? (
          <SignInPage />
        ) : (
          <LearnShell email={email} onSignOut={signOut}>
            <Routes>
              <Route path="/learn" element={<CataloguePage />} />
              <Route path="/learn/:courseSlug/:lessonSlug" element={<LessonPage />} />
              <Route path="/learn/:courseSlug" element={<CoursePage />} />
              <Route path="*" element={<Navigate to="/learn" replace />} />
            </Routes>
          </LearnShell>
        )}
      </LearnPreviewProvider>
    </>
  )
}

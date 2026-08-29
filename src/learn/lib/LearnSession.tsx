import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react'
import type {Session} from '@supabase/supabase-js'
import type {CatalogueCourse} from '../types'
import {DUMMY_CATALOGUE, DUMMY_COURSE, dummyOutline} from '../dummyCourse'
import {getLearnSupabase} from './supabaseClient'
import {learnGet} from './api'
import {
  type LearnProfile,
  normaliseProfile,
  readLocalProfile,
  readLocalProgress,
  writeLocalProfile,
} from './profileStore'

type LearnSessionValue = {
  session: Session | null
  profile: LearnProfile
  courses: CatalogueCourse[]
  source: 'api' | 'sanity' | 'local'
  saveProfile: (patch: Partial<LearnProfile>) => Promise<void>
}

const LearnSessionContext = createContext<LearnSessionValue | null>(null)

function coursesWithProgress(list: CatalogueCourse[]): CatalogueCourse[] {
  const done = readLocalProgress()
  return list.map((course) => {
    const lessonCount = course.lessonCount || 3
    if (course.slug !== DUMMY_COURSE.slug && course.id !== DUMMY_COURSE.id) {
      return {...course, lessonCount}
    }
    const outline = dummyOutline(done)
    const completedLessons = outline.filter((l) => l.completed).length
    const last = [...outline].reverse().find((l) => l.completed)
    return {
      ...course,
      lessonCount: outline.length,
      completedLessons,
      continueLessonId: last?.id || outline[0]?.id || null,
    }
  })
}

export function LearnSessionProvider({
  session,
  children,
}: {
  session: Session | null
  children: React.ReactNode
}) {
  const email = (session?.user.email || 'preview@learn').toLowerCase()
  const googleName =
    (typeof session?.user.user_metadata?.full_name === 'string' && session.user.user_metadata.full_name) ||
    (typeof session?.user.user_metadata?.name === 'string' && session.user.user_metadata.name) ||
    ''
  const [profile, setProfile] = useState<LearnProfile>(() => {
    if (!session) {
      return normaliseProfile({
        displayName: 'Felipe',
        email,
        interest: ['automation'],
        goal: 'better',
        onboarded: true,
        country: 'AU',
      })
    }
    const local = readLocalProfile(email)
    return normaliseProfile({
      ...local,
      email,
      displayName: local.displayName || googleName,
    })
  })
  const [courses, setCourses] = useState<CatalogueCourse[]>(() => coursesWithProgress(DUMMY_CATALOGUE))
  const [source, setSource] = useState<'api' | 'sanity' | 'local'>('local')

  useEffect(() => {
    function onProgress() {
      setCourses((list) => coursesWithProgress(list))
    }
    window.addEventListener('sysbilt-learn-progress', onProgress)
    return () => window.removeEventListener('sysbilt-learn-progress', onProgress)
  }, [])

  useEffect(() => {
    if (!session) return
    let alive = true
    const supabase = getLearnSupabase()

    supabase
      .from('learn_profiles')
      .select('display_name, interest, goal, onboarded_at, email, phone, country')
      .eq('id', session.user.id)
      .maybeSingle()
      .then(({data, error}) => {
        if (!alive || error || !data) return
        const interest = data.interest
          ? String(data.interest)
              .split(',')
              .map((s) => s.trim())
              .filter(Boolean)
          : []
        const local = readLocalProfile(email)
        const next = normaliseProfile({
          email: data.email || email,
          displayName: (data.display_name || '').trim() || local.displayName || googleName,
          phone: (data.phone || '').trim() || local.phone,
          country: data.country || local.country,
          interest: interest.length ? interest : local.interest,
          goal: data.goal || local.goal,
          onboarded: Boolean(data.onboarded_at) || local.onboarded,
        })
        setProfile(next)
        writeLocalProfile(next)
      }, () => undefined)

    async function loadCatalogue() {
      try {
        const data = await learnGet<{courses: CatalogueCourse[]}>('/api/learn/catalogue')
        if (!alive) return
        if (data.courses?.length) {
          setCourses(data.courses)
          setSource('api')
          return
        }
      } catch {
        // Vite has no Learn API. Fall through to published Sanity.
      }
      try {
        const {fetchSanityCatalogue} = await import('./sanityLearn')
        const fromSanity = await fetchSanityCatalogue()
        if (!alive) return
        if (fromSanity.length) {
          const extras = DUMMY_CATALOGUE.filter((card) => !fromSanity.some((row) => row.slug === card.slug))
          setCourses(coursesWithProgress([...fromSanity, ...extras]))
          setSource('sanity')
          return
        }
      } catch {
        // Fall through to the built-in cards.
      }
      if (!alive) return
      setSource('local')
      setCourses(coursesWithProgress(DUMMY_CATALOGUE))
    }

    loadCatalogue()

    return () => {
      alive = false
    }
  }, [session, email, googleName])

  const saveProfile = useCallback(
    async (patch: Partial<LearnProfile>) => {
      const next = normaliseProfile({...profile, ...patch, email})
      setProfile(next)
      writeLocalProfile(next)
      if (!session) return
      try {
        await getLearnSupabase().from('learn_profiles').upsert({
          id: session.user.id,
          email,
          display_name: next.displayName || null,
          phone: next.phone || null,
          country: next.country || null,
          interest: next.interest.join(','),
          goal: next.goal || null,
          onboarded_at: next.onboarded ? new Date().toISOString() : null,
        })
      } catch {
        // Local still holds the name if the extra columns are not in Supabase yet.
      }
    },
    [profile, email, session],
  )

  const value = useMemo(
    () => ({session, profile, courses, source, saveProfile}),
    [session, profile, courses, source, saveProfile],
  )

  return <LearnSessionContext.Provider value={value}>{children}</LearnSessionContext.Provider>
}

export function useLearnSession(): LearnSessionValue {
  const ctx = useContext(LearnSessionContext)
  if (!ctx) throw new Error('Learn session missing')
  return ctx
}

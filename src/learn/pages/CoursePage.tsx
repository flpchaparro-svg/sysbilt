import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {learnGet, learnSend} from '../lib/api'
import {ProgressBar} from '../components/ProgressBar'
import {ProgressRing} from '../components/ProgressRing'
import type {CoursePayload} from '../types'
import {DUMMY_CATALOGUE, DUMMY_COURSE, dummyOutline} from '../dummyCourse'
import {readLocalProgress} from '../lib/profileStore'
import {useLearnSlugs} from '../lib/learnPath'
import {fetchSanityCourse} from '../lib/sanityLearn'
import {Chip, Kicker, LearnPage, PageHead, StampWell, learnBtn, learnLink} from '../components/learnChrome'

function localPayload(slug: string): CoursePayload | null {
  const course = DUMMY_CATALOGUE.find((item) => item.slug === slug)
  if (!course) return null
  if (course.locked || course.slug !== DUMMY_COURSE.slug) {
    return {
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        dek: course.dek,
        access: course.access,
        locked: course.locked,
        entitled: course.entitled,
        hasPrice: false,
      },
      lessons: [],
      continueLessonSlug: null,
    }
  }
  const lessons = dummyOutline(readLocalProgress())
  const next = lessons.find((l) => !l.completed) || lessons[0]
  return {
    course: {
      id: course.id,
      title: course.title,
      slug: course.slug,
      dek: course.dek,
      access: course.access,
      locked: false,
      entitled: true,
      hasPrice: false,
    },
    lessons,
    continueLessonSlug: next?.slug || null,
  }
}

export function CoursePage() {
  const {courseSlug} = useLearnSlugs()
  const [data, setData] = useState<CoursePayload | null>(null)
  const [error, setError] = useState('')
  const [checkoutBusy, setCheckoutBusy] = useState(false)

  useEffect(() => {
    if (!courseSlug) return
    let alive = true
    const dummy = localPayload(courseSlug)
    const paid = new URLSearchParams(window.location.search).get('session_id')
    const qs = new URLSearchParams({slug: courseSlug})
    if (paid) qs.set('session_id', paid)

    async function load() {
      try {
        const payload = await learnGet<CoursePayload>(`/api/learn/course?${qs.toString()}`)
        if (!alive) return
        setData(payload)
        if (paid) {
          const url = new URL(window.location.href)
          url.searchParams.delete('session_id')
          window.history.replaceState({}, '', url.pathname)
        }
        return
      } catch {
        // Local Vite has no Learn API.
      }
      try {
        const fromSanity = await fetchSanityCourse(courseSlug)
        if (!alive) return
        if (fromSanity) {
          setData(fromSanity)
          return
        }
      } catch {
        // Fall through to dummy cards.
      }
      if (!alive) return
      if (dummy) setData(dummy)
      else setError('Could not load course')
    }

    load()
    return () => {
      alive = false
    }
  }, [courseSlug])

  async function checkout() {
    if (!courseSlug) return
    setCheckoutBusy(true)
    setError('')
    try {
      const result = await learnSend<{url?: string; alreadyEntitled?: boolean}>('/api/learn/checkout', {
        slug: courseSlug,
      })
      if (result.alreadyEntitled) {
        window.location.reload()
        return
      }
      if (result.url) window.location.href = result.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Checkout failed')
      setCheckoutBusy(false)
    }
  }

  if (error && !data) return <p className="text-sm text-red-text">{error}</p>
  if (!data) return <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/50">Loading course</p>

  const {course, lessons, continueLessonSlug} = data
  const done = lessons.filter((l) => l.completed).length
  const finished = lessons.length > 0 && done >= lessons.length
  const continueTo = continueLessonSlug
    ? `/learn/${course.slug}/${continueLessonSlug}`
    : lessons[0]
      ? `/learn/${course.slug}/${lessons[0].slug}`
      : '/learn/courses'

  return (
    <LearnPage>
      <Link to="/learn/courses" className={learnLink}>
        All courses
      </Link>
      <PageHead kicker="Course" title={course.title}>
        {course.dek}
      </PageHead>

      {course.locked ? (
        <StampWell className="mt-10 max-w-xl">
          <div className="px-6 py-7">
            <Kicker>Reserved</Kicker>
            <p className="mt-4 text-sm leading-relaxed text-dark/70">
              This course is listed, and access is reserved. If you were granted a seat, sign in with that account. If
              it is a paid course, continue below.
            </p>
            {course.hasPrice ? (
              <button type="button" onClick={checkout} className={`${learnBtn} mt-6`}>
                {checkoutBusy ? 'Opening payment' : 'Get access'}
              </button>
            ) : null}
            {error ? <p className="mt-4 text-sm text-red-text">{error}</p> : null}
          </div>
        </StampWell>
      ) : (
        <>
          <div className="mt-8 flex items-center gap-6">
            <div className="min-w-0 max-w-xl flex-1">
              <ProgressBar value={lessons.length ? done / lessons.length : 0} label={`${done} of ${lessons.length} lessons`} />
            </div>
            <ProgressRing value={lessons.length ? done / lessons.length : 0} done={finished} size={56} />
          </div>
          {finished ? (
            <p className="mt-6 font-serif text-lg italic text-dark/70">You finished this course.</p>
          ) : null}
          <div className="mt-8">
            <Link to={continueTo} className={learnBtn}>
              {finished ? 'View again' : done > 0 ? 'Continue' : 'Start'}
            </Link>
          </div>
          <StampWell className="mt-12">
            <ol>
              {lessons.map((lesson) => (
                <li key={lesson.id} className="border-t border-dark/10 first:border-t-0">
                  {lesson.unlocked ? (
                    <Link
                      to={`/learn/${course.slug}/${lesson.slug}`}
                      className="flex items-center justify-between gap-4 px-5 py-5"
                    >
                      <span>
                        <Chip>
                          Lesson {String(lesson.order).padStart(2, '0')}
                          {lesson.completed ? ' · Done' : ''}
                        </Chip>
                        <span className="mt-3 block font-serif text-xl">{lesson.title}</span>
                      </span>
                      {lesson.completed ? <ProgressRing value={1} done size={40} /> : null}
                    </Link>
                  ) : (
                    <div className="flex items-baseline justify-between gap-4 px-5 py-5 opacity-50">
                      <span>
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em]">
                          Opens after {lesson.unlockAfterDays} days
                        </span>
                        <span className="mt-2 block font-serif text-xl">{lesson.title}</span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </StampWell>
        </>
      )}
    </LearnPage>
  )
}

import React, {useEffect, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {learnGet, learnSend} from '../lib/api'
import CTAButton from '../../components/CTAButton'
import {ProgressBar} from '../components/ProgressBar'
import type {CourseOutlineLesson} from '../types'
import {PREVIEW_COURSE, PREVIEW_LOCKED, PREVIEW_OUTLINE, useLearnPreview} from '../previewData'

type CoursePayload = {
  course: {
    id: string
    title: string
    slug: string
    dek: string | null
    access: string
    locked: boolean
    entitled: boolean
    hasPrice: boolean
  }
  lessons: CourseOutlineLesson[]
  continueLessonSlug: string | null
}

export function CoursePage() {
  const {courseSlug} = useParams()
  const preview = useLearnPreview()
  const [data, setData] = useState<CoursePayload | null>(null)
  const [error, setError] = useState('')
  const [checkoutBusy, setCheckoutBusy] = useState(false)

  useEffect(() => {
    if (!courseSlug) return
    if (preview) {
      if (courseSlug === PREVIEW_LOCKED.slug) {
        setData({
          course: {
            id: PREVIEW_LOCKED.id,
            title: PREVIEW_LOCKED.title,
            slug: PREVIEW_LOCKED.slug,
            dek: PREVIEW_LOCKED.dek,
            access: PREVIEW_LOCKED.access,
            locked: true,
            entitled: false,
            hasPrice: false,
          },
          lessons: [],
          continueLessonSlug: null,
        })
        return
      }
      setData({
        course: {
          id: PREVIEW_COURSE.id,
          title: PREVIEW_COURSE.title,
          slug: PREVIEW_COURSE.slug,
          dek: PREVIEW_COURSE.dek,
          access: PREVIEW_COURSE.access,
          locked: false,
          entitled: true,
          hasPrice: false,
        },
        lessons: PREVIEW_OUTLINE,
        continueLessonSlug: 'welcome',
      })
      return
    }
    const paid = new URLSearchParams(window.location.search).get('session_id')
    const qs = new URLSearchParams({slug: courseSlug})
    if (paid) qs.set('session_id', paid)
    learnGet<CoursePayload>(`/api/learn/course?${qs.toString()}`)
      .then((payload) => {
        setData(payload)
        if (paid) {
          const url = new URL(window.location.href)
          url.searchParams.delete('session_id')
          window.history.replaceState({}, '', url.pathname)
        }
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load course'))
  }, [courseSlug, preview])

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

  if (error && !data) return <p className="text-sm text-red">{error}</p>
  if (!data) return <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">Loading course</p>

  const {course, lessons, continueLessonSlug} = data
  const done = lessons.filter((l) => l.completed).length
  const continueTo = continueLessonSlug
    ? `/learn/${course.slug}/${continueLessonSlug}`
    : lessons[0]
      ? `/learn/${course.slug}/${lessons[0].slug}`
      : '/learn'

  return (
    <div>
      <Link to="/learn" className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50 hover:text-dark">
        All courses
      </Link>
      <h1 className="mt-4 font-serif text-4xl md:text-5xl">{course.title}</h1>
      {course.dek ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-dark/70">{course.dek}</p> : null}

      {course.locked ? (
        <div className="mt-10 max-w-xl border border-dark/10 bg-white p-6">
          <p className="text-sm leading-relaxed text-dark/70">
            This course is listed, and access is reserved. If you were granted a seat, sign in with that Google account. If it is a paid course, continue below.
          </p>
          {course.hasPrice ? (
            <div className="mt-6">
              <CTAButton type="button" onClick={checkout}>
                {checkoutBusy ? 'Opening payment' : 'Get access'}
              </CTAButton>
            </div>
          ) : null}
          {error ? <p className="mt-4 text-sm text-red">{error}</p> : null}
        </div>
      ) : (
        <>
          <div className="mt-8 max-w-xl">
            <ProgressBar value={lessons.length ? done / lessons.length : 0} label={`${done} of ${lessons.length} lessons`} />
          </div>
          <div className="mt-8">
            <CTAButton to={continueTo}>{done > 0 ? 'Continue' : 'Start'}</CTAButton>
          </div>
          <ol className="mt-12 divide-y divide-dark/10 border-y border-dark/10">
            {lessons.map((lesson) => (
              <li key={lesson.id}>
                {lesson.unlocked ? (
                  <Link
                    to={`/learn/${course.slug}/${lesson.slug}`}
                    className="flex items-baseline justify-between gap-4 py-4 hover:bg-white/60"
                  >
                    <span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">
                        Lesson {String(lesson.order).padStart(2, '0')}
                        {lesson.completed ? ' · Done' : ''}
                      </span>
                      <span className="mt-1 block font-serif text-xl">{lesson.title}</span>
                    </span>
                  </Link>
                ) : (
                  <div className="flex items-baseline justify-between gap-4 py-4 opacity-50">
                    <span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                        Unlocks after {lesson.unlockAfterDays} days
                      </span>
                      <span className="mt-1 block font-serif text-xl">{lesson.title}</span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  )
}

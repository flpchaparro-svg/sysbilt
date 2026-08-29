import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import {AnimatePresence, m} from 'framer-motion'
import {Bookmark} from 'lucide-react'
import {PortableText} from '@portabletext/react'
import {learnGet, learnSend, lessonQuery} from '../lib/api'
import {ActivityRenderer} from '../components/ActivityRenderer'
import {SybilInstructor} from '../components/SybilInstructor'
import {YouTubePlayer} from '../components/YouTubePlayer'
import {EmailPlaceholder, LessonDiagram, VideoPlaceholder} from '../components/LessonMedia'
import type {LessonPayload} from '../types'
import {dummyLesson, gradeDummy, mergeDummyStartHere} from '../dummyCourse'
import {isLessonSaved, markStartHereLessonDone, toggleSavedLesson} from '../lib/profileStore'
import {useLearnSession} from '../lib/LearnSession'
import {useLearnSlugs} from '../lib/learnPath'
import {Chip, GoldRule, Kicker, LessonChartGrid, Marker, StampWell, learnEase} from '../components/learnChrome'

function portablePlain(blocks: unknown[]): string {
  if (!Array.isArray(blocks)) return ''
  return blocks
    .map((block) => {
      const b = block as {children?: Array<{text?: string}>}
      return (b.children || []).map((c) => c.text || '').join('')
    })
    .filter(Boolean)
    .join('\n')
}

function firstPara(blocks: unknown[]): string {
  return portablePlain(blocks).split('\n').filter(Boolean)[0] || ''
}

function railValue(order: number, total: number, stage: 'read' | 'check') {
  const slice = 1 / Math.max(total, 1)
  return (order - 1) * slice + slice * (stage === 'check' ? 1 : 0.42)
}

function NavBar({
  previousTo,
  onPrevious,
  previousLabel,
  nextLabel,
  onNext,
  nextTo,
  nextReady,
  glow,
}: {
  previousTo?: string
  onPrevious?: () => void
  previousLabel: string
  nextLabel: string
  onNext?: () => void
  nextTo?: string
  nextReady: boolean
  glow?: boolean
}) {
  const prevClass =
    'font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/45 underline-offset-4 hover:text-gold-on-cream hover:underline'
  const nextClass = `inline-flex min-h-[3rem] items-center bg-dark px-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059] ${
    glow ? 'animate-heartbeat' : ''
  }`

  return (
    <div className="mt-16 flex w-full items-center justify-between gap-4">
      {onPrevious ? (
        <button type="button" onClick={onPrevious} className={prevClass}>
          {previousLabel}
        </button>
      ) : previousTo ? (
        <Link to={previousTo} className={prevClass}>
          {previousLabel}
        </Link>
      ) : (
        <span />
      )}
      {nextReady && onNext ? (
        <button type="button" onClick={onNext} className={nextClass}>
          {nextLabel}
        </button>
      ) : null}
      {nextReady && nextTo ? (
        <Link to={nextTo} className={nextClass}>
          {nextLabel}
        </Link>
      ) : null}
    </div>
  )
}

export function LessonPage() {
  const {courseSlug, lessonSlug} = useLearnSlugs()
  const {source} = useLearnSession()
  const local = source !== 'api'
  const [params, setParams] = useSearchParams()
  const stage = params.get('step') === 'check' ? 'check' : 'read'
  const [data, setData] = useState<LessonPayload | null>(null)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [checkDone, setCheckDone] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  const q = courseSlug && lessonSlug ? lessonQuery(courseSlug, lessonSlug) : ''

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    const snap = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    }
    snap()
    const a = window.setTimeout(snap, 0)
    const b = window.setTimeout(snap, 80)
    const c = window.setTimeout(snap, 520)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
      window.clearTimeout(c)
    }
  }, [lessonSlug, stage, courseSlug, data?.lesson.id])

  useEffect(() => {
    if (!courseSlug || !lessonSlug) return
    let alive = true
    const dummy = dummyLesson(lessonSlug, courseSlug)

    async function load() {
      try {
        const payload = await learnGet<LessonPayload>(`/api/learn/lesson?${q}`)
        if (alive) setData(payload)
        return
      } catch {
        // Local Vite has no Learn API.
      }
      try {
        const fromSanity = await fetchSanityLesson(courseSlug, lessonSlug)
        if (!alive) return
        if (fromSanity) {
          setData(mergeDummyStartHere(fromSanity))
          return
        }
      } catch {
        // Fall through to dummy lessons.
      }
      if (!alive) return
      if (dummy) setData(dummy)
      else setError('Could not load lesson')
    }

    load()
    return () => {
      alive = false
    }
  }, [q, courseSlug, lessonSlug])

  useEffect(() => {
    if (data?.lesson.id) setSaved(isLessonSaved(data.lesson.id))
  }, [data?.lesson.id])

  useEffect(() => {
    setCheckDone(false)
  }, [lessonSlug, stage])

  const lessonPlain = useMemo(() => (data ? portablePlain(data.lesson.body as unknown[]) : ''), [data])

  if (error && !data) return <p className="text-sm text-red-text">{error}</p>
  if (!data || !courseSlug || !lessonSlug) {
    return <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">Loading lesson</p>
  }

  const {course, lesson, completed, attempts, prev, next} = data
  const total = 3
  const progress = railValue(lesson.order, total, stage)
  const summary = lesson.summary || firstPara(lesson.body as unknown[])
  const hasVideo = Boolean(lesson.videoUrl)
  const previousLesson = prev ? `/learn/${course.slug}/${prev.slug}` : `/learn/${course.slug}`
  const nextLesson = next ? `/learn/${course.slug}/${next.slug}` : `/learn/${course.slug}`

  async function finishCheck() {
    if (local) {
      markStartHereLessonDone(lesson.id, lesson.slug)
      setData((prevData) => (prevData ? {...prevData, completed: true} : prevData))
      setCheckDone(true)
      return
    }
    try {
      await learnSend(`/api/learn/progress?${q}`, {action: 'complete'})
      markStartHereLessonDone(lesson.id, lesson.slug)
      setData((prevData) => (prevData ? {...prevData, completed: true} : prevData))
      setCheckDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not mark done')
    }
  }

  return (
    <div className="lg:flex lg:items-start lg:gap-10" style={{overflowAnchor: 'none'}}>
      <div className="relative min-w-0 flex-1">
        <LessonChartGrid />
        <div ref={topRef} className="relative scroll-mt-[4.75rem]">
          <div
            className="h-3 w-full bg-dark/10"
            role="progressbar"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-gold transition-[width] duration-500"
              style={{
                width: `${Math.round(progress * 100)}%`,
                boxShadow: '6px 6px 0 0 rgba(197,160,89,0.45)',
              }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <m.div
            key={stage}
            initial={{opacity: 0, x: 40}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: -40}}
            transition={{duration: 0.55, ease: learnEase}}
          >
            {stage === 'read' ? (
              <article className="mx-auto w-full max-w-4xl overflow-visible pb-6 pt-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link to={`/learn/${course.slug}`}>
                      <Kicker>{course.title}</Kicker>
                    </Link>
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <Chip>
                        Lesson {String(lesson.order).padStart(2, '0')}
                        {completed ? ' · Done' : ''}
                      </Chip>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Marker>
                      {String(lesson.order).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </Marker>
                    <button
                      type="button"
                      onClick={() =>
                        setSaved(
                          toggleSavedLesson({
                            lessonId: lesson.id,
                            courseSlug: course.slug,
                            lessonSlug: lesson.slug,
                            title: lesson.title,
                          }),
                        )
                      }
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        saved ? 'bg-gold text-dark' : 'bg-dark/10 text-dark/50'
                      }`}
                      aria-pressed={saved}
                      aria-label={saved ? 'Saved for later' : 'Save this lesson'}
                    >
                      <Bookmark className="h-4 w-4" fill={saved ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                </div>

                <h1 className="mt-8 font-serif text-5xl font-medium leading-[1.08] tracking-tight md:text-6xl">{lesson.title}</h1>
                <GoldRule />

                {hasVideo ? (
                  <StampWell className="mt-10" ink>
                    {lesson.videoUrl && lesson.videoUrl !== 'placeholder' ? (
                      <YouTubePlayer url={lesson.videoUrl} />
                    ) : (
                      <VideoPlaceholder />
                    )}
                  </StampWell>
                ) : null}

                {Array.isArray(lesson.body) && lesson.body.length > 0 ? (
                  <div className="prose prose-base mt-10 max-w-none text-dark prose-p:leading-relaxed prose-headings:font-serif">
                    <PortableText value={lesson.body as never} />
                  </div>
                ) : null}

                {summary ? (
                  <StampWell className="mt-14">
                    <section className="px-7 py-8">
                      <Kicker>Summary</Kicker>
                      <p className="mt-4 font-serif text-2xl leading-snug md:text-3xl">{summary}</p>
                    </section>
                  </StampWell>
                ) : null}

                {lesson.diagram ? (
                  <div className="mt-14">
                    <LessonDiagram kind={lesson.diagram} />
                  </div>
                ) : null}

                {lesson.showEmail ? (
                  <div className="mt-14">
                    <EmailPlaceholder />
                  </div>
                ) : null}

                <p className="mt-12 font-serif text-lg italic text-dark/60">Now you can go to the question.</p>

                <NavBar
                  previousTo={previousLesson}
                  previousLabel={prev ? 'Previous' : 'All lessons'}
                  nextLabel="Next"
                  onNext={() => setParams({step: 'check'})}
                  nextReady
                />
              </article>
            ) : (
              <article className="mx-auto w-full max-w-4xl overflow-visible pb-6 pt-8">
                {lesson.activities[0] ? (
                  <ActivityRenderer
                    activity={lesson.activities[0]}
                    attempt={attempts[lesson.activities[0]._key]}
                    onSubmit={async (answers) => {
                      if (local) return gradeDummy(lesson.activities[0]._key, answers)
                      return learnSend<{score: number; passed: boolean; explainAfter: string | null}>(
                        `/api/learn/progress?${q}`,
                        {action: 'attempt', activityKey: lesson.activities[0]._key, answers},
                      )
                    }}
                    onFinished={() => {
                      void finishCheck()
                    }}
                  />
                ) : (
                  <h1 className="font-serif text-4xl">This lesson has no question yet</h1>
                )}
                <NavBar
                  onPrevious={() => setParams({})}
                  previousLabel="Previous"
                  nextLabel={next ? 'Next lesson' : 'Back to home'}
                  nextTo={next ? nextLesson : '/learn'}
                  nextReady={checkDone || !lesson.activities[0]}
                  glow={checkDone}
                />
                {error ? <p className="mt-4 text-sm text-red-text">{error}</p> : null}
              </article>
            )}
          </m.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {stage === 'check' && checkDone && !next ? (
          <m.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark/50 px-6"
          >
            <div className="w-full max-w-md bg-cream-warm px-8 py-10 text-center shadow-[8px_8px_0_0_#C5A059]">
              <Kicker>{course.title}</Kicker>
              <h2 className="mt-4 font-serif text-4xl font-medium">Congratulations</h2>
              <GoldRule />
              <p className="mt-6 text-sm leading-relaxed text-dark/70">You finished this course.</p>
              <Link
                to="/learn"
                className="mt-8 inline-flex min-h-[3rem] items-center bg-dark px-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-cream shadow-[6px_6px_0_0_#C5A059]"
              >
                Back to home
              </Link>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-10 lg:sticky lg:top-[4.75rem] lg:mt-0 lg:w-[20.5rem] lg:shrink-0 lg:self-start">
        <SybilInstructor
          courseTitle={course.title}
          lessonTitle={lesson.title}
          lessonPlain={lessonPlain}
          lessonId={lesson.id}
        />
      </div>
    </div>
  )
}

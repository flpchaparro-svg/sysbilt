import React, {useEffect, useMemo, useState} from 'react'
import {Link, useParams} from 'react-router-dom'
import {PortableText} from '@portabletext/react'
import {learnGet, learnSend, lessonQuery} from '../lib/api'
import {ActivityRenderer} from '../components/ActivityRenderer'
import {CommentThread} from '../components/CommentThread'
import {SybilInstructor} from '../components/SybilInstructor'
import {YouTubePlayer} from '../components/YouTubePlayer'
import CTAButton from '../../components/CTAButton'
import type {LessonPayload} from '../types'
import {gradePreview, previewLesson, useLearnPreview} from '../previewData'

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

export function LessonPage() {
  const {courseSlug, lessonSlug} = useParams()
  const preview = useLearnPreview()
  const [data, setData] = useState<LessonPayload | null>(null)
  const [error, setError] = useState('')
  const [completeBusy, setCompleteBusy] = useState(false)

  const q = courseSlug && lessonSlug ? lessonQuery(courseSlug, lessonSlug) : ''

  useEffect(() => {
    if (preview && lessonSlug) {
      const payload = previewLesson(lessonSlug)
      if (!payload) {
        setError('Lesson not found')
        return
      }
      setData(payload)
      return
    }
    if (!q) return
    setData(null)
    learnGet<LessonPayload>(`/api/learn/lesson?${q}`)
      .then(setData)
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load lesson'))
  }, [q, preview, lessonSlug])

  const lessonPlain = useMemo(() => (data ? portablePlain(data.lesson.body as unknown[]) : ''), [data])

  if (error && !data) return <p className="text-sm text-red">{error}</p>
  if (!data || !courseSlug || !lessonSlug) {
    return <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">Loading lesson</p>
  }

  const {course, lesson, completed, attempts, prev, next} = data

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div>
        <Link
          to={`/learn/${course.slug}`}
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50 hover:text-dark"
        >
          {course.title}
        </Link>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">
          Lesson {String(lesson.order).padStart(2, '0')}
          {completed ? ' · Done' : ''}
        </p>
        <h1 className="mt-2 font-serif text-4xl md:text-5xl">{lesson.title}</h1>

        {lesson.videoUrl ? (
          <div className="mt-8">
            <YouTubePlayer url={lesson.videoUrl} />
          </div>
        ) : null}

        {Array.isArray(lesson.body) && lesson.body.length > 0 ? (
          <div className="prose prose-sm mt-8 max-w-none text-dark prose-p:leading-relaxed prose-headings:font-serif">
            <PortableText value={lesson.body as never} />
          </div>
        ) : null}

        <div className="mt-10 space-y-6">
          {lesson.activities.map((activity) => (
            <ActivityRenderer
              key={activity._key}
              activity={activity}
              attempt={attempts[activity._key]}
              onSubmit={async (answers) => {
                if (preview) {
                  const result = gradePreview(activity._key, answers)
                  return result
                }
                const result = await learnSend<{
                  score: number
                  passed: boolean
                  explainAfter: string | null
                  lessonComplete?: boolean
                }>(`/api/learn/progress?${q}`, {
                  action: 'attempt',
                  activityKey: activity._key,
                  answers,
                })
                if (result.lessonComplete) {
                  setData((prevData) => (prevData ? {...prevData, completed: true} : prevData))
                }
                return result
              }}
            />
          ))}
        </div>

        {lesson.activities.length === 0 && !completed ? (
          <div className="mt-10">
            <CTAButton
              type="button"
              onClick={async () => {
                if (preview) {
                  setData((prevData) => (prevData ? {...prevData, completed: true} : prevData))
                  return
                }
                setCompleteBusy(true)
                try {
                  await learnSend(`/api/learn/progress?${q}`, {action: 'complete'})
                  setData((prevData) => (prevData ? {...prevData, completed: true} : prevData))
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Could not mark done')
                } finally {
                  setCompleteBusy(false)
                }
              }}
            >
              {completeBusy ? 'Saving' : 'Mark as done'}
            </CTAButton>
          </div>
        ) : null}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-dark/10 pt-6">
          {prev ? (
            <Link to={`/learn/${course.slug}/${prev.slug}`} className="text-sm text-dark/70 hover:text-dark">
              Previous: {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/learn/${course.slug}/${next.slug}`} className="text-sm text-dark hover:underline">
              Next: {next.title}
            </Link>
          ) : (
            <Link to={`/learn/${course.slug}`} className="text-sm text-dark hover:underline">
              Back to course
            </Link>
          )}
        </div>

        {course.commentsEnabled ? <CommentThread courseSlug={courseSlug} lessonSlug={lessonSlug} /> : null}
        {error ? <p className="mt-4 text-sm text-red">{error}</p> : null}
      </div>

      <SybilInstructor courseTitle={course.title} lessonTitle={lesson.title} lessonPlain={lessonPlain} />
    </div>
  )
}

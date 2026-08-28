import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {learnGet} from '../lib/api'
import type {CatalogueCourse} from '../types'
import {PREVIEW_COURSE, PREVIEW_LOCKED, useLearnPreview} from '../previewData'

export function CataloguePage() {
  const preview = useLearnPreview()
  const [courses, setCourses] = useState<CatalogueCourse[] | null>(preview ? [PREVIEW_COURSE, PREVIEW_LOCKED] : null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (preview) return
    learnGet<{courses: CatalogueCourse[]}>('/api/learn/catalogue')
      .then((data) => setCourses(data.courses))
      .catch((err) => setError(err instanceof Error ? err.message : 'Could not load courses'))
  }, [preview])

  if (error) {
    return <p className="text-sm text-red">{error}</p>
  }
  if (!courses) {
    return <p className="font-mono text-xs uppercase tracking-[0.2em] text-dark/50">Loading courses</p>
  }

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Catalogue</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Your courses</h1>
      {courses.length === 0 ? (
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-dark/70">
          Nothing here yet. When a course is released, it will land on this page.
        </p>
      ) : (
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <li key={course.id}>
              <Link
                to={`/learn/${course.slug}`}
                className="block border border-dark/10 bg-white p-6 transition-colors hover:border-dark/40"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">
                  {course.access === 'open' ? 'Open' : course.access === 'premium' ? 'Premium' : 'Company'}
                  {course.locked ? ' · Locked' : ''}
                </p>
                <h2 className="mt-3 font-serif text-2xl">{course.title}</h2>
                {course.dek ? <p className="mt-2 text-sm leading-relaxed text-dark/65">{course.dek}</p> : null}
                {!course.locked && course.completedLessons > 0 ? (
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">
                    {course.completedLessons} lesson{course.completedLessons === 1 ? '' : 's'} done
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

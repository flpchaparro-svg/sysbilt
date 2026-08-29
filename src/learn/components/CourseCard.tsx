import React from 'react'
import {Link} from 'react-router-dom'
import type {CatalogueCourse} from '../types'
import {CourseCover} from './CourseCover'
import {ProgressRing} from './ProgressRing'
import {Chip, GoldRule, Kicker, StampWell} from './learnChrome'

function accessLabel(course: CatalogueCourse, finished: boolean): string {
  if (course.locked) return 'Locked'
  if (finished) return 'Finished'
  if (course.popular) return 'Popular'
  if (course.featured) return 'Featured'
  if (course.access === 'open') return 'Open'
  if (course.access === 'premium') return 'Premium'
  return 'Company'
}

export function CourseCard({course}: {course: CatalogueCourse}) {
  const total = Math.max(course.lessonCount || 0, 0)
  const done = course.completedLessons || 0
  const pct = course.lessonCount ? done / course.lessonCount : 0
  const ticks = Math.min(total, 8)
  const finished = !course.locked && course.lessonCount > 0 && done >= course.lessonCount

  return (
    <StampWell className="h-full">
      <Link
        to={`/learn/${course.slug}`}
        className={`group flex h-full min-h-[11.25rem] overflow-hidden transition-[opacity,filter] duration-300 ease-luxury ${
          course.locked ? 'opacity-45 grayscale hover:opacity-95 hover:grayscale-0' : ''
        }`}
      >
        <div className="relative w-[6.75rem] shrink-0 overflow-hidden bg-cream sm:w-[8.5rem]">
          <div className="h-full min-h-[11.25rem] transition-transform duration-500 ease-luxury group-hover:scale-[1.04]">
            <CourseCover slug={course.slug} src={course.coverUrl} title={course.title} />
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Kicker>{accessLabel(course, finished)}</Kicker>
              <h2 className="mt-3 font-serif text-xl font-medium leading-tight text-dark sm:text-2xl">{course.title}</h2>
              <GoldRule className="mt-3" />
            </div>
            {course.locked ? null : <ProgressRing value={pct} done={finished} />}
          </div>
          <p className="mt-4 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-dark/60">{course.dek || ' '}</p>
          <div className="mt-auto flex items-end justify-between gap-3 pt-4">
            {ticks > 0 ? (
              <span className="flex gap-1" aria-hidden>
                {Array.from({length: ticks}).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 ${i < done && !course.locked ? 'bg-gold shadow-[2px_2px_0_0_#8B6914]' : 'bg-dark/12'}`}
                  />
                ))}
              </span>
            ) : (
              <span />
            )}
            <Chip>
              {course.locked ? 'Reserved' : finished ? 'Finished' : done > 0 ? `${done} done` : 'Not started'}
            </Chip>
          </div>
        </div>
      </Link>
    </StampWell>
  )
}

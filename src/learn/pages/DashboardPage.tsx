import React from 'react'
import {Link} from 'react-router-dom'
import {useLearnSession} from '../lib/LearnSession'
import type {CatalogueCourse} from '../types'

function CourseCard({course}: {course: CatalogueCourse}) {
  return (
    <Link
      to={course.locked ? `/learn/${course.slug}` : `/learn/${course.slug}`}
      className="block border border-dark/10 bg-white p-6 transition-colors hover:border-dark/40"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">
        {course.featured ? 'Featured' : course.access === 'open' ? 'Open' : course.access === 'premium' ? 'Premium' : 'Company'}
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
  )
}

export function DashboardPage() {
  const {profile, courses, source} = useLearnSession()
  const first = (profile.displayName.split(' ')[0] || '').trim()
  const open = courses.filter((c) => !c.locked)
  const featured = courses.filter((c) => c.featured || (!c.locked && c.access === 'open'))
  const continueCourse = open.find((c) => c.completedLessons > 0) || open[0]

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Dashboard</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">{first ? `Hello, ${first}` : 'Hello'}</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark/70">
        Start with the featured course, or pick up where you left off.
      </p>
      {source === 'local' ? (
        <p className="mt-3 max-w-xl text-xs leading-relaxed text-dark/45">
          Dummy course on this machine. Production will load Studio courses when the site is deployed.
        </p>
      ) : null}

      {continueCourse && !continueCourse.locked ? (
        <section className="mt-10 border border-dark/10 bg-white p-6 md:p-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/45">Continue</p>
          <h2 className="mt-3 font-serif text-3xl">{continueCourse.title}</h2>
          {continueCourse.dek ? <p className="mt-2 max-w-lg text-sm text-dark/65">{continueCourse.dek}</p> : null}
          <Link
            to={`/learn/${continueCourse.slug}`}
            className="mt-6 inline-flex min-h-[3rem] items-center border border-dark bg-dark px-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-cream"
          >
            {continueCourse.completedLessons > 0 ? 'Continue' : 'Start'}
          </Link>
        </section>
      ) : null}

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl">Featured</h2>
          <Link to="/learn/featured" className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50 hover:text-dark">
            See all
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {featured.slice(0, 2).map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="font-serif text-2xl">Courses</h2>
          <Link to="/learn/courses" className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/50 hover:text-dark">
            See all
          </Link>
        </div>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <li key={course.id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export function CoursesPage() {
  const {courses} = useLearnSession()
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Catalogue</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Courses</h1>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {courses.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function FeaturedPage() {
  const {courses} = useLearnSession()
  const featured = courses.filter((c) => c.featured || c.access === 'open')
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-cream">Priority</p>
      <h1 className="mt-3 font-serif text-4xl md:text-5xl">Featured</h1>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark/70">
        Start here first. The rest of the catalogue can wait until this one is done.
      </p>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {featured.map((course) => (
          <li key={course.id}>
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </div>
  )
}

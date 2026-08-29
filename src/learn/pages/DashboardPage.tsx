import React from 'react'
import {Link} from 'react-router-dom'
import {useLearnSession} from '../lib/LearnSession'
import {CourseCard} from '../components/CourseCard'
import {countLessonsSince, readLocalProgress, readSavedLessons} from '../lib/profileStore'
import {coursesForYou, popularCourses, splitCatalogue} from '../lib/learnPrefs'
import {
  GoldRule,
  Kicker,
  LearnPage,
  PageHead,
  SectionHead,
  StampWell,
  StatTile,
  learnBtn,
  learnLink,
} from '../components/learnChrome'

export function DashboardPage() {
  const {profile, courses} = useLearnSession()
  const first = (profile.displayName.split(' ')[0] || '').trim()
  const open = courses.filter((c) => !c.locked)
  const featured = coursesForYou(courses, profile.interest, 2)
  const popular = popularCourses(courses)
  const startHere = courses.find((c) => c.slug === 'start-here')
  const startHereFinished =
    Boolean(startHere) &&
    (startHere?.lessonCount || 0) > 0 &&
    (startHere?.completedLessons || 0) >= (startHere?.lessonCount || 0)
  const continueCourse = startHere || open.find((c) => c.completedLessons > 0) || open[0]
  const done = readLocalProgress().size
  const week = countLessonsSince(7 * 24 * 60 * 60 * 1000)
  const saved = readSavedLessons().length

  return (
    <LearnPage>
      <PageHead kicker="Home" title={first ? `Hello, ${first}` : 'Hello'}>
        {startHereFinished
          ? 'You finished Start here.'
          : 'Start here is first. Progress, weekly work, and saved lessons sit in Progress.'}
      </PageHead>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <StatTile label="Lessons done" value={String(done)} />
        <StatTile label="This week" value={String(week)} />
        <StatTile label="Saved" value={String(saved)} />
      </div>

      {continueCourse && !continueCourse.locked ? (
        <StampWell className="mt-12">
          <section className="px-6 py-8 md:px-8">
            <Kicker>{startHereFinished ? 'Finished' : 'Continue'}</Kicker>
            <h2 className="mt-4 font-serif text-3xl font-medium md:text-4xl">{continueCourse.title}</h2>
            <GoldRule />
            {startHereFinished ? (
              <p className="mt-5 max-w-lg text-sm text-dark/65">You finished this course.</p>
            ) : continueCourse.dek ? (
              <p className="mt-5 max-w-lg text-sm text-dark/65">{continueCourse.dek}</p>
            ) : null}
            <Link to={`/learn/${continueCourse.slug}`} className={`${learnBtn} mt-8`}>
              {startHereFinished ? 'View again' : continueCourse.completedLessons > 0 ? 'Continue' : 'Start'}
            </Link>
          </section>
        </StampWell>
      ) : null}

      <section className="mt-14">
        <SectionHead
          kicker="For you"
          title="Featured"
          action={
            <Link to="/learn/featured" className={learnLink}>
              See all
            </Link>
          }
        />
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {featured.map((course) => (
            <li key={course.id} className="h-full">
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
      </section>

      {popular.length ? (
        <section className="mt-14">
          <SectionHead kicker="Picked often" title="Popular" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {popular.map((course) => (
              <li key={course.id} className="h-full">
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-14">
        <SectionHead
          kicker="Catalogue"
          title="Courses"
          action={
            <Link to="/learn/courses" className={learnLink}>
              See all
            </Link>
          }
        />
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-dark/70">
          Start here is open. The seven service areas and private workshops sit in the catalogue. Locked cards stay grey until you have a seat.
        </p>
      </section>
    </LearnPage>
  )
}

export function CoursesPage() {
  const {courses} = useLearnSession()
  const {start, areas, workshops} = splitCatalogue(courses)
  return (
    <LearnPage>
      <PageHead kicker="Catalogue" title="Courses">
        Start here is first. Then the seven service areas. Private workshops stay locked until you have a seat.
      </PageHead>
      {start.length ? (
        <section className="mt-10">
          <SectionHead kicker="Begin" title="Start here" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {start.map((course) => (
              <li key={course.id} className="h-full">
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {areas.length ? (
        <section className="mt-14">
          <SectionHead kicker="Areas" title="Service areas" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {areas.map((course) => (
              <li key={course.id} className="h-full">
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
      {workshops.length ? (
        <section className="mt-14">
          <SectionHead kicker="With us" title="Private workshops" />
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {workshops.map((course) => (
              <li key={course.id} className="h-full">
                <CourseCard course={course} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </LearnPage>
  )
}

export function FeaturedPage() {
  const {profile, courses} = useLearnSession()
  const featured = coursesForYou(courses, profile.interest)
  const picked = profile.interest.filter((id) => id && id !== 'unsure')
  return (
    <LearnPage>
      <PageHead kicker="For you" title="Featured">
        {picked.length
          ? 'Courses that match what you picked sit first. Change that on your profile.'
          : 'These are the courses in front of you first. Finish Start here before you wander.'}
      </PageHead>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {featured.map((course) => (
          <li key={course.id} className="h-full">
            <CourseCard course={course} />
          </li>
        ))}
      </ul>
    </LearnPage>
  )
}

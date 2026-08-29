import React from 'react'
import {Link} from 'react-router-dom'
import {useLearnSession} from '../lib/LearnSession'
import {ProgressRing} from '../components/ProgressRing'
import {
  countLessonsSince,
  readLessonNote,
  readLocalProgress,
  readSavedLessons,
} from '../lib/profileStore'
import {Chip, LearnPage, PageHead, SectionHead, StampWell, StatTile} from '../components/learnChrome'

export function ProgressPage() {
  const {courses} = useLearnSession()
  const done = readLocalProgress()
  const week = countLessonsSince(7 * 24 * 60 * 60 * 1000)
  const saved = readSavedLessons()
  const open = courses.filter((c) => !c.locked)
  const finished = open.filter((c) => c.lessonCount > 0 && c.completedLessons >= c.lessonCount)

  return (
    <LearnPage>
      <PageHead kicker="Measure" title="Progress">
        This is the record we keep: lessons done, work this week, saved lessons, and course percent. Comments from
        lessons can wait. The instructor already holds questions. Feedback from you can land here later as a short
        note.
      </PageHead>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        <StatTile label="Lessons done" value={String(done.size)} />
        <StatTile label="This week" value={String(week)} />
        <StatTile label="Courses finished" value={String(finished.length)} />
      </div>

      <section className="mt-14">
        <SectionHead kicker="Catalogue" title="Courses" />
        <StampWell className="mt-8">
          <ul>
            {courses.map((course) => {
              const pct = course.lessonCount ? course.completedLessons / course.lessonCount : 0
              const doneCourse = !course.locked && pct >= 1
              return (
                <li key={course.id} className="border-t border-dark/10 first:border-t-0">
                  <Link
                    to={`/learn/${course.slug}`}
                    className={`flex items-center justify-between gap-4 px-5 py-5 transition-[opacity,filter] duration-300 ${
                      course.locked ? 'opacity-45 grayscale hover:opacity-95 hover:grayscale-0' : ''
                    }`}
                  >
                    <span>
                      <span className="block font-serif text-xl">{course.title}</span>
                      <span className="mt-2 block font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-dark/45">
                        {course.locked
                          ? 'Locked'
                          : `${course.completedLessons} of ${course.lessonCount || 0} lessons`}
                      </span>
                    </span>
                    {doneCourse ? <Chip>Finished</Chip> : <ProgressRing value={pct} done={false} />}
                  </Link>
                </li>
              )
            })}
          </ul>
        </StampWell>
      </section>

      <section className="mt-14">
        <SectionHead kicker="Later" title="Saved" />
        {saved.length === 0 ? (
          <p className="mt-5 text-sm text-dark/60">Bookmark a lesson when it matters. We will use that later to personalise Sybil.</p>
        ) : (
          <ul className="mt-8 grid gap-5">
            {saved.map((row) => (
              <li key={row.lessonId}>
                <StampWell>
                  <Link to={`/learn/${row.courseSlug}/${row.lessonSlug}`} className="block px-5 py-5">
                    <p className="font-serif text-xl">{row.title}</p>
                    <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-on-cream">
                      / {readLessonNote(row.lessonId) ? 'Has notes' : 'Saved'}
                    </p>
                  </Link>
                </StampWell>
              </li>
            ))}
          </ul>
        )}
      </section>
    </LearnPage>
  )
}

import type {CatalogueCourse} from '../types'

export const AREA_SLUGS = ['websites', 'crm', 'automation', 'ai', 'content', 'training', 'dashboards'] as const

const INTEREST_SLUGS: Record<string, string[]> = {
  websites: ['websites'],
  crm: ['crm'],
  automation: ['automation'],
  ai: ['ai'],
  content: ['content'],
  training: ['training'],
  dashboards: ['dashboards'],
}

export function preferredCourseSlugs(interest: string[]): Set<string> {
  return new Set(interest.flatMap((id) => INTEREST_SLUGS[id] || []))
}

export function coursesForYou(courses: CatalogueCourse[], interest: string[], limit?: number): CatalogueCourse[] {
  const preferred = preferredCourseSlugs(interest)
  const ranked = [...courses].sort((a, b) => scoreCourse(b, preferred) - scoreCourse(a, preferred))
  const visible = ranked.filter(
    (course) => course.featured || course.popular || course.access === 'open' || preferred.has(course.slug),
  )
  return typeof limit === 'number' ? visible.slice(0, limit) : visible
}

export function popularCourses(courses: CatalogueCourse[]): CatalogueCourse[] {
  return courses.filter((course) => course.popular)
}

export function splitCatalogue(courses: CatalogueCourse[]) {
  return {
    start: courses.filter((course) => course.slug === 'start-here'),
    areas: AREA_SLUGS.map((slug) => courses.find((course) => course.slug === slug)).filter(
      (course): course is CatalogueCourse => Boolean(course),
    ),
    workshops: courses.filter((course) => course.slug === 'private-workshops'),
  }
}

function scoreCourse(course: CatalogueCourse, preferred: Set<string>): number {
  let score = 0
  if (preferred.has(course.slug)) score += 4
  if (course.slug === 'start-here') score += 2
  if (course.popular) score += 2
  if (course.featured) score += 1
  return score
}

import {client} from '../../sanityClient'
import type {CatalogueCourse} from '../types'

type SanityCourseRow = {
  _id: string
  title: string
  slug: string
  dek: string | null
  access: CatalogueCourse['access']
  released: boolean
  commentsEnabled: boolean
  order: number
  coverUrl: string | null
}

export async function fetchSanityCatalogue(): Promise<CatalogueCourse[]> {
  const rows = await client.fetch<SanityCourseRow[]>(
    `*[_type == "learnCourse" && released == true] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      dek,
      access,
      released,
      commentsEnabled,
      order,
      "coverUrl": cover.asset->url
    }`,
  )
  return (rows || [])
    .filter((row) => row.slug)
    .map((row) => ({
      id: row._id,
      title: row.title,
      slug: row.slug,
      dek: row.dek,
      access: row.access === 'premium' || row.access === 'company' ? row.access : 'open',
      coverUrl: row.coverUrl,
      commentsEnabled: Boolean(row.commentsEnabled),
      locked: row.access === 'premium' || row.access === 'company',
      entitled: row.access === 'open',
      hasPrice: false,
      completedLessons: 0,
      continueLessonId: null,
      featured: row.order === 1 || row.access === 'open',
    }))
}

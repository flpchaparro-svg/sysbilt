import {useLocation} from 'react-router-dom'

const RESERVED = new Set(['welcome', 'courses', 'featured', 'comments', 'progress', 'profile'])

export function learnPathParts(pathname: string): string[] {
  const parts = pathname.replace(/\/+$/, '').split('/').filter(Boolean)
  return parts[0] === 'learn' ? parts.slice(1) : []
}

export function useLearnSlugs(): {courseSlug?: string; lessonSlug?: string} {
  const {pathname} = useLocation()
  const rest = learnPathParts(pathname)
  if (!rest[0] || RESERVED.has(rest[0])) return {}
  return {courseSlug: rest[0], lessonSlug: rest[1]}
}

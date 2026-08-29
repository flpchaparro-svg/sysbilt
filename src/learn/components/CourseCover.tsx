import React from 'react'

const MARKS: Record<string, {label: string; shapes: React.ReactNode}> = {
  'start-here': {
    label: 'Start',
    shapes: (
      <>
        <rect x="18" y="28" width="44" height="8" fill="#C5A059" />
        <rect x="18" y="46" width="64" height="8" fill="#1a1a1a" opacity="0.55" />
        <rect x="18" y="64" width="32" height="8" fill="#1a1a1a" opacity="0.28" />
      </>
    ),
  },
  websites: {
    label: 'Web',
    shapes: (
      <>
        <rect x="22" y="24" width="56" height="40" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.45" />
        <path d="M22 36h56" stroke="#C5A059" strokeWidth="2" />
        <rect x="30" y="70" width="40" height="8" fill="#1a1a1a" opacity="0.2" />
      </>
    ),
  },
  crm: {
    label: 'CRM',
    shapes: (
      <>
        <circle cx="34" cy="36" r="8" fill="none" stroke="#C5A059" strokeWidth="2" />
        <circle cx="66" cy="36" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.45" />
        <circle cx="50" cy="68" r="8" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.45" />
        <path d="M40 40 46 62M60 40 54 62" stroke="#1a1a1a" strokeWidth="1.4" opacity="0.35" />
      </>
    ),
  },
  automation: {
    label: 'Auto',
    shapes: (
      <>
        <rect x="22" y="30" width="22" height="16" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.5" />
        <rect x="56" y="54" width="22" height="16" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.5" />
        <path d="M44 38h12M50 38v16M56 62H44" stroke="#C5A059" strokeWidth="2" />
      </>
    ),
  },
  ai: {
    label: 'AI',
    shapes: (
      <>
        <circle cx="50" cy="50" r="10" fill="none" stroke="#C5A059" strokeWidth="2" />
        <circle cx="24" cy="28" r="5" fill="#1a1a1a" opacity="0.45" />
        <circle cx="76" cy="30" r="5" fill="#1a1a1a" opacity="0.45" />
        <circle cx="28" cy="72" r="5" fill="#1a1a1a" opacity="0.45" />
        <circle cx="74" cy="70" r="5" fill="#1a1a1a" opacity="0.45" />
        <path d="M32 32 42 44M68 34 58 44M34 68 44 58M66 66 56 56" stroke="#1a1a1a" strokeWidth="1.4" opacity="0.4" />
      </>
    ),
  },
  content: {
    label: 'Content',
    shapes: (
      <>
        <rect x="20" y="28" width="60" height="44" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.4" />
        <path d="M42 40v20l18-10z" fill="#C5A059" />
      </>
    ),
  },
  training: {
    label: 'Train',
    shapes: (
      <>
        <path d="M50 22 78 36 50 50 22 36Z" fill="none" stroke="#C5A059" strokeWidth="2" />
        <path d="M22 36v22l28 14 28-14V36" fill="none" stroke="#1a1a1a" strokeWidth="1.6" opacity="0.4" />
      </>
    ),
  },
  dashboards: {
    label: 'Data',
    shapes: (
      <>
        <rect x="22" y="52" width="12" height="24" fill="#1a1a1a" opacity="0.22" />
        <rect x="44" y="36" width="12" height="40" fill="#1a1a1a" opacity="0.4" />
        <rect x="66" y="24" width="12" height="52" fill="#C5A059" />
      </>
    ),
  },
  'private-workshops': {
    label: 'Lock',
    shapes: (
      <>
        <rect x="32" y="44" width="36" height="28" fill="#1a1a1a" opacity="0.12" />
        <path d="M40 44v-8a10 10 0 0 1 20 0v8" fill="none" stroke="#C5A059" strokeWidth="2" />
      </>
    ),
  },
}

const ALIAS: Record<string, string> = {
  video: 'content',
  'client-workshop': 'private-workshops',
}

export function CourseCover({slug, src, title}: {slug: string; src?: string | null; title: string}) {
  if (src) {
    return <img src={src} alt="" className="h-full w-full object-cover" />
  }
  const key = ALIAS[slug] || slug
  const mark = MARKS[key] || MARKS['start-here']
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" role="img" aria-label={`${title} cover`}>
      <rect width="100" height="100" fill="#FFF8F5" />
      <rect width="100" height="100" fill="#1a1a1a" opacity="0.04" />
      {mark.shapes}
    </svg>
  )
}

export function courseMark(slug: string): string {
  const key = ALIAS[slug] || slug
  return (MARKS[key] || MARKS['start-here']).label
}

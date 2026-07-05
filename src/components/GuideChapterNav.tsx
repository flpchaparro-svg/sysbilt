import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export type GuideChapterNavItem = {
  slug: string
  h1: string
}

type Props = {
  prev?: GuideChapterNavItem
  next?: GuideChapterNavItem
  chapterPath: (slug: string) => string
}

/** Small label-only control — reads clearly as a button without boxing the whole row. */
const labelClass =
  'inline-flex items-center gap-1.5 w-fit border border-dark/30 bg-cream px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-dark group-hover:bg-dark group-hover:text-cream group-hover:border-dark transition-colors'

export function GuideChapterNav({ prev, next, chapterPath }: Props) {
  if (!prev && !next) return null

  return (
    <nav
      className="mt-10 flex flex-col sm:flex-row gap-6 sm:gap-4 justify-between border-t border-dark/10 pt-8"
      aria-label="Chapter navigation"
    >
      {prev ? (
        <Link
          to={chapterPath(prev.slug)}
          className="group flex flex-col gap-2 max-w-[48%] font-sans text-sm"
        >
          <span className={labelClass}>
            <ArrowLeft className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Previous chapter
          </span>
          <span className="text-dark/55 leading-snug">{prev.h1}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={chapterPath(next.slug)}
          className="group flex flex-col gap-2 text-right sm:ml-auto max-w-[48%] font-sans text-sm"
        >
          <span className={`${labelClass} sm:ml-auto`}>
            Next chapter
            <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
          </span>
          <span className="text-dark/55 leading-snug">{next.h1}</span>
        </Link>
      ) : null}
    </nav>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export type PostEndCTAProps = {
  to?: string
  description?: string
  ctaLabel?: string
  className?: string
}

const DEFAULT_DESCRIPTION =
  "Book a free call and we'll walk you through how this applies to your business"

/** Brutalist inline CTA — shared by blog posts and toolkit detail pages. */
const BRUTAL_END_CTA_BTN =
  'font-mono text-xs font-bold uppercase transition-all duration-300 border-2 border-cream bg-cream text-dark type-eyebrow hover:bg-gold hover:border-gold hover:shadow-[4px_4px_0px_0px_#D4A84B] hover:-translate-y-0.5 px-8 py-4 inline-flex items-center gap-3'

const PostEndCTA: React.FC<PostEndCTAProps> = ({
  to = '/contact',
  description = DEFAULT_DESCRIPTION,
  ctaLabel = 'BOOK A CALL',
  className = '',
}) => {
  return (
    <section className={`mt-20 border-y-2 border-cream/20 py-12 md:py-14 ${className}`}>
      <div className="group mx-auto w-full max-w-2xl border-2 border-cream bg-dark p-8 md:p-10 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#FFF2EC]">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-cream/50 block mb-4">
          / READY?
        </span>

        <h2 className="font-sans font-black text-2xl md:text-3xl uppercase tracking-tight text-cream mb-5 max-w-lg mx-auto text-balance leading-snug">
          Want to <span className="text-gold-on-dark">talk</span> about this
        </h2>

        <p className="type-body text-cream/65 mb-8 max-w-sm mx-auto text-pretty">{description}</p>

        <Link to={to} className={BRUTAL_END_CTA_BTN}>
          {ctaLabel}
          <ArrowUpRight className="w-4 h-4" />
        </Link>

        <div className="mt-8 flex items-center justify-center gap-2.5 font-mono text-[10px] uppercase tracking-widest text-cream/45">
          <span className="w-2 h-2 shrink-0 bg-gold-on-dark" aria-hidden />
          NOW ACCEPTING PROJECTS
        </div>
      </div>
    </section>
  )
}

export default PostEndCTA

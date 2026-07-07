import { Link } from 'react-router-dom'
import { BTR_BOOK_PATH, BTR_HUB_PATH } from '../chapter-seo'
import { BTR_META } from '../types'

type Props = {
  variant?: 'inline' | 'card'
  className?: string
}

export function BtrPdfCta({ variant = 'card', className = '' }: Props) {
  if (variant === 'inline') {
    return (
      <p className={`font-sans text-[15px] leading-relaxed text-dark/70 ${className}`}>
        Prefer the full book layout?{' '}
        <Link
          to={BTR_BOOK_PATH}
          className="font-medium text-dark underline underline-offset-4 decoration-gold-on-cream/60 hover:decoration-gold-on-cream"
        >
          Download the polished PDF edition of {BTR_META.title}
        </Link>
        .
      </p>
    )
  }

  return (
    <aside
      className={`border-2 border-dark bg-cream-warm p-6 md:p-8 shadow-[6px_6px_0px_0px_#1a1a1a] ${className}`}
    >
      <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gold-on-cream mb-2">
        / Full edition
      </div>
      <h2 className="font-serif text-xl md:text-2xl font-medium text-dark mb-3 m-0">
        Download the polished PDF
      </h2>
      <p className="font-sans text-[15px] leading-relaxed text-dark/70 mb-5 m-0 max-w-prose">
        Read every chapter here on the web, or unlock the full A4 book layout — designed to print or save as PDF.
      </p>
      <Link
        to={BTR_BOOK_PATH}
        className="btw-guide-cta-btn inline-flex font-mono text-[11px] font-bold uppercase tracking-[0.18em] border-2 border-dark bg-dark text-cream px-5 py-3 hover:bg-gold-on-dark hover:text-dark hover:border-gold-on-dark transition-colors"
      >
        Get the PDF edition
      </Link>
    </aside>
  )
}

export { BTR_HUB_PATH }

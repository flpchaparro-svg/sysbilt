import type { HeadlineBlock } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import RatingDot from './RatingDot';
import { auditEase, auditEyebrow } from './auditCardStyles';

export interface SectionHeaderProps {
  /** Short label above the title, e.g. `What we found first` */
  eyebrow: string;
  preamble: string;
  headline?: HeadlineBlock;
  staticTitle?: string;
  id?: string;
  /** Centre the block (default left for long findings). */
  align?: 'left' | 'center';
}

export default function SectionHeader({
  eyebrow,
  preamble,
  headline,
  staticTitle,
  id,
  align = 'left',
}: SectionHeaderProps) {
  const findingEmpty = headline ? !headline.finding.trim() : true;
  const reduce = useReducedMotion();
  const centered = align === 'center';

  return (
    <header className={`relative pb-10 md:pb-12 ${centered ? 'mx-auto max-w-3xl text-center' : ''}`}>
      <m.div
        className={`mb-6 h-px w-16 bg-gradient-to-r from-gold-on-dark to-transparent ${centered ? 'mx-auto' : ''}`}
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: auditEase }}
        style={{ transformOrigin: centered ? 'center' : 'left' }}
        aria-hidden
      />

      <p className={`${auditEyebrow} text-gold-on-dark`}>{eyebrow}</p>

      {headline ? (
        <div
          className={`mt-5 flex items-start gap-3.5 md:mt-6 ${centered ? 'justify-center' : ''}`}
        >
          <RatingDot rating={headline.rating} className="mt-3 shrink-0" pulse />
          <h2
            id={id}
            className={`font-serif text-[1.85rem] leading-[1.15] tracking-tight md:text-4xl md:leading-[1.12] ${
              findingEmpty ? 'text-white/70' : 'text-cream'
            } ${centered ? 'text-balance' : 'text-pretty'}`}
          >
            {findingEmpty ? 'We could not derive a headline for this section.' : headline.finding}
          </h2>
        </div>
      ) : staticTitle ? (
        <h2
          id={id}
          className="mt-5 font-serif text-[1.85rem] tracking-tight text-cream md:mt-6 md:text-4xl"
        >
          {staticTitle}
        </h2>
      ) : null}

      <p
        className={`mt-5 font-sans text-base leading-relaxed text-white/60 md:mt-6 md:text-lg ${
          centered ? 'mx-auto max-w-xl' : 'max-w-2xl'
        }`}
      >
        {preamble}
      </p>
    </header>
  );
}

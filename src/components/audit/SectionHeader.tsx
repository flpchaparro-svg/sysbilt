import type { HeadlineBlock } from '@/types/deepAuditReport';
import RatingDot from './RatingDot';

export interface SectionHeaderProps {
  /** Short label above the title, e.g. `What we found first` */
  eyebrow: string;
  preamble: string;
  headline?: HeadlineBlock;
  staticTitle?: string;
  id?: string;
}

export default function SectionHeader({ eyebrow, preamble, headline, staticTitle, id }: SectionHeaderProps) {
  const findingEmpty = headline ? !headline.finding.trim() : true;

  return (
    <header className="border-b border-white/10 pb-10 md:pb-12">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-gold-on-dark md:text-[11px]">
        {eyebrow}
      </p>

      {headline ? (
        <div className="mt-5 flex items-start gap-3 md:mt-6">
          <RatingDot rating={headline.rating} className="mt-2.5 shrink-0" />
          <h2
            id={id}
            className={`font-serif text-3xl tracking-tight md:text-4xl ${findingEmpty ? 'text-white/75' : 'text-cream'}`}
          >
            {findingEmpty ? 'We could not derive a headline for this section.' : headline.finding}
          </h2>
        </div>
      ) : staticTitle ? (
        <h2 id={id} className="mt-5 font-serif text-3xl tracking-tight text-cream md:mt-6 md:text-4xl">
          {staticTitle}
        </h2>
      ) : null}

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:mt-6 md:text-lg">
        {preamble}
      </p>
    </header>
  );
}

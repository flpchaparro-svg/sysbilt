import type { HeadlineBlock } from '@/types/deepAuditReport';
import RatingDot from './RatingDot';

export interface SectionHeaderProps {
  /** Text after the slash, e.g. `DIAGNOSIS` renders as `/ DIAGNOSIS` */
  eyebrow: string;
  preamble: string;
  headline?: HeadlineBlock;
  staticTitle?: string;
  id?: string;
}

export default function SectionHeader({ eyebrow, preamble, headline, staticTitle, id }: SectionHeaderProps) {
  const findingEmpty = headline ? !headline.finding.trim() : true;

  return (
    <header className="border-b border-white/10 pb-10">
      <span className="type-eyebrow text-gold-on-dark">
        / {eyebrow}
      </span>

      {headline ? (
        <div className="mt-5 flex items-start gap-3">
          <RatingDot rating={headline.rating} className="mt-3 shrink-0" />
          <h2
            id={id}
            className={`type-h2 font-serif ${findingEmpty ? 'text-white/50' : 'text-white'}`}
          >
            {findingEmpty ? 'We could not derive a headline for this section.' : headline.finding}
          </h2>
        </div>
      ) : staticTitle ? (
        <h2 id={id} className="type-h2 mt-5 font-serif text-white">
          {staticTitle}
        </h2>
      ) : null}

      <p className="mt-6 max-w-3xl border-l-2 border-gold-on-dark pl-6 font-sans text-lg font-light leading-relaxed text-white/80">
        {preamble}
      </p>
    </header>
  );
}

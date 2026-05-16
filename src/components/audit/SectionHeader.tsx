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
    <header className="border-b border-white/10 pb-12 md:pb-16">
      <span className="type-eyebrow text-gold-on-dark">
        / {eyebrow}
      </span>

      {headline ? (
        <div className="mt-7 flex items-start gap-3 md:mt-9">
          <RatingDot rating={headline.rating} className="mt-3 shrink-0" />
          <h2
            id={id}
            className={`type-h2 font-serif ${findingEmpty ? 'text-white/75' : 'text-white'}`}
          >
            {findingEmpty ? 'We could not derive a headline for this section.' : headline.finding}
          </h2>
        </div>
      ) : staticTitle ? (
        <h2 id={id} className="type-h2 mt-7 font-serif text-white md:mt-9">
          {staticTitle}
        </h2>
      ) : null}

      <p className="mt-8 max-w-3xl border-l-2 border-gold-on-dark pl-6 font-sans text-lg font-light leading-[1.65] text-white/85 md:mt-10 md:pl-7 md:text-xl md:leading-[1.7]">
        {preamble}
      </p>
    </header>
  );
}

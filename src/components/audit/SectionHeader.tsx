import type { HeadlineBlock } from '@/types/deepAuditReport';
import RatingDot from './RatingDot';

export interface SectionHeaderProps {
  headline: HeadlineBlock;
  sectionLabel: string;
}

export default function SectionHeader({ headline, sectionLabel }: SectionHeaderProps) {
  const findingEmpty = !headline.finding.trim();
  return (
    <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-8 md:flex-row md:items-start md:justify-between md:gap-8">
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-on-dark/85">{sectionLabel}</p>
        <div className="mt-3 flex items-start gap-3">
          <RatingDot rating={headline.rating} className="mt-2" />
          <h2
            className={`font-serif text-2xl font-normal leading-tight tracking-tight md:text-3xl lg:text-[2.1rem] lg:leading-[1.15] ${
              findingEmpty ? 'text-zinc-500' : 'text-white'
            }`}
          >
            {findingEmpty ? 'We could not derive a headline for this section.' : headline.finding}
          </h2>
        </div>
      </div>
    </header>
  );
}

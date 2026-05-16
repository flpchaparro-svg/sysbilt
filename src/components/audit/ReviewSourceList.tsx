import type { ReviewSourceModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface ReviewSourceListProps {
  review_sources: ReviewSourceModel[];
}

export default function ReviewSourceList({ review_sources }: ReviewSourceListProps) {
  if (review_sources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-5 font-sans text-sm text-white/75">
        No review sources were attached. We could not list platforms for this pass.
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-black/30 font-sans">
      {review_sources.map((s, i) => {
        const countStr = s.count;
        const weak =
          isMissingSignal(s.platform) ||
          !s.platform.trim() ||
          isMissingSignal(countStr) ||
          !countStr.trim();
        return (
          <div
            key={`${s.platform}-${i}`}
            className={`grid gap-3 px-4 py-4 md:grid-cols-12 md:items-center md:px-5 ${weak ? 'bg-white/[0.02]' : ''}`}
          >
            <div className="md:col-span-3">
              <p className={`text-sm font-semibold ${weak ? 'text-white/75' : 'text-white'}`}>{s.platform.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="type-eyebrow text-white/70">/ RATING</span>
              <p className="mt-2 text-sm text-white/85">{s.rating.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-2">
              <span className="type-eyebrow text-white/70">/ COUNT</span>
              <p className="mt-2 text-sm text-white/85">{countStr.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-5">
              <span className="type-eyebrow text-white/70">/ RECENT THEME</span>
              <p className="mt-2 text-sm text-white/85">{s.recent_theme.trim() || 'Not found'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

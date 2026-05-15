import type { ReviewSourceModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';

export interface ReviewSourceListProps {
  review_sources: ReviewSourceModel[];
}

export default function ReviewSourceList({ review_sources }: ReviewSourceListProps) {
  if (review_sources.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-zinc-500">
        No review sources were attached. We could not list platforms for this pass.
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.07] bg-zinc-950/60">
      {review_sources.map((s, i) => {
        const countStr = s.count;
        const weak =
          isMissingSignal(s.platform) ||
          !s.platform.trim() ||
          isMissingSignal(countStr) ||
          !countStr.trim();
        return (
          <div key={`${s.platform}-${i}`} className={`grid gap-3 px-4 py-4 md:grid-cols-12 md:items-center md:px-5 ${weak ? 'bg-white/[0.02]' : ''}`}>
            <div className="md:col-span-3">
              <p className={`text-sm font-semibold ${weak ? 'text-zinc-500' : 'text-white'}`}>{s.platform.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Rating</p>
              <p className="text-sm text-zinc-300">{s.rating.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Count</p>
              <p className="text-sm text-zinc-300">{countStr.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-5">
              <p className="text-xs uppercase tracking-wider text-zinc-500">Recent theme</p>
              <p className="text-sm text-zinc-300">{s.recent_theme.trim() || 'Not found'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

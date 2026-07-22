import type { ReviewSourceModel } from '@/types/deepAuditReport';
import { isMissingSignal } from '@/types/deepAuditReport';
import { auditEmpty, auditEyebrow, auditGlass, auditRowHover } from './auditCardStyles';

export interface ReviewSourceListProps {
  review_sources: ReviewSourceModel[];
}

export default function ReviewSourceList({ review_sources }: ReviewSourceListProps) {
  if (review_sources.length === 0) {
    return (
      <div className={auditEmpty}>
        No review sources were attached. We could not list platforms for this pass.
      </div>
    );
  }

  return (
    <div className={`divide-y divide-white/10 overflow-hidden ${auditGlass}`}>
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
            className={`grid gap-3 px-5 py-5 md:grid-cols-12 md:items-center md:px-6 ${auditRowHover} ${
              weak ? 'bg-white/[0.015]' : ''
            }`}
          >
            <div className="md:col-span-3">
              <p className={`text-sm font-semibold ${weak ? 'text-white/65' : 'text-cream'}`}>
                {s.platform.trim() || 'Not found'}
              </p>
            </div>
            <div className="md:col-span-2">
              <span className={`${auditEyebrow} text-white/40`}>Rating</span>
              <p className="mt-2 text-sm text-white/80">{s.rating.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-2">
              <span className={`${auditEyebrow} text-white/40`}>Count</span>
              <p className="mt-2 text-sm text-white/80">{countStr.trim() || 'Not found'}</p>
            </div>
            <div className="md:col-span-5">
              <span className={`${auditEyebrow} text-white/40`}>Recent theme</span>
              <p className="mt-2 text-sm text-white/80">{s.recent_theme.trim() || 'Not found'}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

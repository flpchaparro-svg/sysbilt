import type { ToolDetectedRow, ToolQualityRating } from '@/types/deepAuditReport';
import { Check, AlertTriangle, X } from 'lucide-react';
import { auditEmpty, auditGlass, auditRowHover } from './auditCardStyles';

function StatusIcon({ status }: { status: ToolDetectedRow['status'] }) {
  if (status === 'found') {
    return <Check className="h-4 w-4 text-teal" strokeWidth={2} aria-hidden />;
  }
  if (status === 'broken') {
    return <AlertTriangle className="h-4 w-4 text-gold-on-dark" strokeWidth={2} aria-hidden />;
  }
  return <X className="h-4 w-4 text-red-on-dark" strokeWidth={2} aria-hidden />;
}

function RatingBadge({ rating }: { rating: ToolQualityRating }) {
  const styles: Record<ToolQualityRating, string> = {
    good: 'border-teal/40 text-teal',
    amber: 'border-gold-on-dark/40 text-gold-on-dark',
    bad: 'border-red-on-dark/40 text-red-on-dark',
  };
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${styles[rating]}`}
    >
      {rating}
    </span>
  );
}

export interface ToolDetectionListProps {
  tools_detected: ToolDetectedRow[];
}

export default function ToolDetectionList({ tools_detected }: ToolDetectionListProps) {
  if (tools_detected.length === 0) {
    return (
      <div className={auditEmpty}>
        No tool rows were returned. We could not show a stack map for this pass.
      </div>
    );
  }

  return (
    <div className={`divide-y divide-white/10 overflow-hidden ${auditGlass}`}>
      {tools_detected.map((t, i) => (
        <div key={`${t.name}-${i}`} className={`flex gap-4 px-5 py-5 md:px-6 ${auditRowHover}`}>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/35">
            <StatusIcon status={t.status} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-serif text-base font-semibold text-cream md:text-lg">
                {t.name.trim() || 'Not found'}
              </p>
              <RatingBadge rating={t.rating} />
            </div>
            <p className="mt-1.5 font-sans text-sm text-white/65">{t.plain_english.trim() || 'Not found'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

import type { ToolDetectedRow, ToolQualityRating } from '@/types/deepAuditReport';

function StatusIcon({ status }: { status: ToolDetectedRow['status'] }) {
  if (status === 'found') {
    return <span className="text-teal" aria-hidden>✓</span>;
  }
  if (status === 'broken') {
    return <span className="text-gold-on-dark" aria-hidden>⚠</span>;
  }
  return <span className="text-red-on-dark" aria-hidden>✗</span>;
}

function RatingBadge({ rating }: { rating: ToolQualityRating }) {
  const styles: Record<ToolQualityRating, string> = {
    good: 'border-teal/40 text-teal',
    amber: 'border-gold-on-dark/40 text-gold-on-dark',
    bad: 'border-red-on-dark/40 text-red-on-dark',
  };
  return (
    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${styles[rating]}`}>
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
      <div className="rounded-xl border border-dashed border-white/12 bg-white/[0.02] p-5 text-sm text-white/75">
        No tool rows were returned. We could not show a stack map for this pass.
      </div>
    );
  }

  return (
    <div className="divide-y divide-white/10 rounded-xl border border-white/10 bg-black/30">
      {tools_detected.map((t, i) => (
        <div key={`${t.name}-${i}`} className="flex gap-4 px-4 py-4 md:px-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black/30 text-base">
            <StatusIcon status={t.status} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-serif text-base font-semibold text-white md:text-lg">{t.name.trim() || 'Not found'}</p>
              <RatingBadge rating={t.rating} />
            </div>
            <p className="mt-1 font-sans text-sm text-white/80">{t.plain_english.trim() || 'Not found'}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

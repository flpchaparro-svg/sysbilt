import type { SwotModel } from '@/types/deepAuditReport';

function BulletList({ items, emptyHint }: { items: string[]; emptyHint: string }) {
  if (!items.length) {
    return <p className="text-sm text-zinc-500">{emptyHint}</p>;
  }
  return (
    <ul className="list-inside list-disc space-y-1.5 text-sm leading-snug text-zinc-300">
      {items.map((t, i) => (
        <li key={i} className="text-pretty">
          {t}
        </li>
      ))}
    </ul>
  );
}

export interface SwotPanelProps {
  swot: SwotModel;
}

export default function SwotPanel({ swot }: SwotPanelProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="rounded-xl border border-emerald-500/35 bg-emerald-500/[0.06] p-5 md:p-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300/90">Strengths</h3>
        <div className="mt-3">
          <BulletList items={swot.strengths} emptyHint="No strengths were listed." />
        </div>
      </div>
      <div className="rounded-xl border border-red-on-dark/35 bg-red-on-dark/[0.06] p-5 md:p-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-red-200/90">Weaknesses</h3>
        <div className="mt-3">
          <BulletList items={swot.weaknesses} emptyHint="No weaknesses were listed." />
        </div>
      </div>
      <div className="rounded-xl border border-sky-500/35 bg-sky-500/[0.06] p-5 md:p-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/90">Opportunities</h3>
        <div className="mt-3">
          <BulletList items={swot.opportunities} emptyHint="No opportunities were listed." />
        </div>
      </div>
      <div className="rounded-xl border border-amber-500/35 bg-amber-500/[0.06] p-5 md:p-6">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/90">Threats</h3>
        <div className="mt-3">
          <BulletList items={swot.threats} emptyHint="No threats were listed." />
        </div>
      </div>
    </div>
  );
}

import type { SwotModel } from '@/types/deepAuditReport';

function BulletList({ items, emptyHint }: { items: string[]; emptyHint: string }) {
  if (!items.length) {
    return <p className="font-sans text-sm text-white/55">{emptyHint}</p>;
  }
  return (
    <ul className="list-inside list-disc space-y-1.5 font-sans text-sm leading-snug text-white/80">
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
      <div className="rounded-xl border border-teal/35 bg-teal/10 p-5 md:p-6">
        <span className="type-eyebrow text-teal">/ STRENGTHS</span>
        <div className="mt-3">
          <BulletList items={swot.strengths} emptyHint="No strengths were listed." />
        </div>
      </div>
      <div className="rounded-xl border border-red-on-dark/40 bg-red-on-dark/10 p-5 md:p-6">
        <span className="type-eyebrow text-red-on-dark">/ WEAKNESSES</span>
        <div className="mt-3">
          <BulletList items={swot.weaknesses} emptyHint="No weaknesses were listed." />
        </div>
      </div>
      <div className="rounded-xl border border-sky-500/35 bg-sky-500/[0.08] p-5 md:p-6">
        <span className="type-eyebrow text-sky-200">/ OPPORTUNITIES</span>
        <div className="mt-3">
          <BulletList items={swot.opportunities} emptyHint="No opportunities were listed." />
        </div>
      </div>
      <div className="rounded-xl border border-gold-on-dark/35 bg-gold-on-dark/10 p-5 md:p-6">
        <span className="type-eyebrow text-gold-on-dark">/ THREATS</span>
        <div className="mt-3">
          <BulletList items={swot.threats} emptyHint="No threats were listed." />
        </div>
      </div>
    </div>
  );
}

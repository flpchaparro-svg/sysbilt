import { isMissingSignal } from '@/types/deepAuditReport';

export type DiagnosisVariant = 'critical' | 'secondary';

export interface DiagnosisCardProps {
  variant: DiagnosisVariant;
  title: string;
  evidence: string;
  consequence: string;
}

function MissingNote() {
  return (
    <p className="mt-2 text-xs leading-snug text-zinc-500">
      We could not read this signal. Treat the diagnosis as incomplete until we re-run the pass.
    </p>
  );
}

export default function DiagnosisCard({ variant, title, evidence, consequence }: DiagnosisCardProps) {
  const isCritical = variant === 'critical';
  const titleMissing = isMissingSignal(title) || title.trim() === '';
  const evidenceMissing = isMissingSignal(evidence) || evidence.trim() === '';
  const consequenceMissing = isMissingSignal(consequence) || consequence.trim() === '';

  const shell = isCritical
    ? 'rounded-2xl border border-red-on-dark/35 bg-gradient-to-br from-red-on-dark/10 via-zinc-950/80 to-zinc-950 p-6 md:p-8'
    : 'rounded-2xl border border-amber-500/25 bg-gradient-to-br from-amber-500/5 via-zinc-950/90 to-zinc-950 p-5 md:p-6';

  return (
    <article className={shell}>
      <h3
        className={`font-serif text-xl tracking-tight md:text-2xl ${
          titleMissing ? 'text-zinc-500' : 'text-white'
        }`}
      >
        {title.trim() || 'Not found'}
      </h3>
      <dl className="mt-5 space-y-4 text-sm">
        <div
          className={
            evidenceMissing
              ? 'rounded-lg border border-dashed border-white/12 bg-black/20 p-3 opacity-75'
              : ''
          }
        >
          <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">Evidence</dt>
          <dd className={`mt-1.5 leading-relaxed ${evidenceMissing ? 'text-zinc-500' : 'text-zinc-300'}`}>
            {evidence.trim() || 'Not found'}
          </dd>
          {evidenceMissing ? <MissingNote /> : null}
        </div>
        <div
          className={
            consequenceMissing
              ? 'rounded-lg border border-dashed border-white/12 bg-black/20 p-3 opacity-75'
              : ''
          }
        >
          <dt className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">Consequence</dt>
          <dd className={`mt-1.5 leading-relaxed ${consequenceMissing ? 'text-zinc-500' : 'text-zinc-300'}`}>
            {consequence.trim() || 'Not found'}
          </dd>
          {consequenceMissing ? <MissingNote /> : null}
        </div>
      </dl>
      {titleMissing ? <MissingNote /> : null}
    </article>
  );
}

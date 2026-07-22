import { isMissingSignal } from '@/types/deepAuditReport';
import { auditCardLift } from './auditCardStyles';

export type DiagnosisVariant = 'critical' | 'secondary';

export interface DiagnosisCardProps {
  variant: DiagnosisVariant;
  title: string;
  evidence: string;
  consequence: string;
}

function MissingNote() {
  return (
    <p className="mt-2 font-sans text-xs leading-snug text-white/65">
      We could not read this signal. Treat the finding as incomplete until we re-run the pass.
    </p>
  );
}

export default function DiagnosisCard({ variant, title, evidence, consequence }: DiagnosisCardProps) {
  const titleMissing = isMissingSignal(title) || title.trim() === '';
  const evidenceMissing = isMissingSignal(evidence) || evidence.trim() === '';
  const consequenceMissing = isMissingSignal(consequence) || consequence.trim() === '';

  const shell =
    variant === 'critical'
      ? 'rounded-2xl border border-red-on-dark/35 bg-gradient-to-br from-red-on-dark/[0.12] via-black/40 to-black/20 p-6 md:p-8'
      : 'rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6';
  const hoverShell =
    variant === 'critical'
      ? `${auditCardLift} hover:border-red-on-dark/70 hover:from-red-on-dark/[0.16]`
      : `${auditCardLift} hover:border-gold-on-dark/40 hover:bg-white/[0.05]`;

  return (
    <article className={`${shell} ${hoverShell}`}>
      {variant === 'critical' ? (
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-red-on-dark">
          Primary finding
        </p>
      ) : (
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">
          Also worth fixing
        </p>
      )}
      <h3
        className={`mt-3 font-serif text-2xl tracking-tight md:text-3xl ${titleMissing ? 'text-white/75' : 'text-cream'}`}
      >
        {title.trim() || 'Not found'}
      </h3>
      <dl className="mt-6 space-y-5 font-sans text-sm md:text-base">
        <div
          className={
            evidenceMissing ? 'rounded-lg border border-dashed border-white/15 bg-black/25 p-4' : ''
          }
        >
          <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
            What we saw
          </dt>
          <dd
            className={`mt-2 leading-relaxed ${evidenceMissing ? 'text-white/65' : 'text-white/85'}`}
          >
            {evidence.trim() || 'Not found'}
          </dd>
          {evidenceMissing ? <MissingNote /> : null}
        </div>
        <div
          className={
            consequenceMissing ? 'rounded-lg border border-dashed border-white/15 bg-black/25 p-4' : ''
          }
        >
          <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">
            Why it matters
          </dt>
          <dd className={`mt-2 leading-relaxed ${consequenceMissing ? 'text-white/65' : 'text-white/90'}`}>
            {consequence.trim() || 'Not found'}
          </dd>
          {consequenceMissing ? <MissingNote /> : null}
        </div>
      </dl>
      {titleMissing ? <MissingNote /> : null}
    </article>
  );
}

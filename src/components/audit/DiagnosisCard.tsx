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
    <p className="mt-2 font-sans text-xs leading-snug text-white/75">
      We could not read this signal. Treat the diagnosis as incomplete until we re-run the pass.
    </p>
  );
}

export default function DiagnosisCard({ variant, title, evidence, consequence }: DiagnosisCardProps) {
  const titleMissing = isMissingSignal(title) || title.trim() === '';
  const evidenceMissing = isMissingSignal(evidence) || evidence.trim() === '';
  const consequenceMissing = isMissingSignal(consequence) || consequence.trim() === '';

  const shell =
    variant === 'critical'
      ? 'rounded-2xl border border-red-on-dark/40 bg-red-on-dark/5 p-6 md:p-8'
      : 'rounded-2xl border border-gold-on-dark/40 bg-gold-on-dark/10 p-5 md:p-6';
  const hoverShell =
    variant === 'critical'
      ? `${auditCardLift} hover:border-red-on-dark/85 hover:bg-red-on-dark/[0.12] motion-safe:hover:shadow-[0_32px_72px_-26px_rgba(220,38,38,0.22)]`
      : `${auditCardLift} hover:border-gold-on-dark/80 hover:bg-gold-on-dark/[0.16] motion-safe:hover:shadow-[0_32px_72px_-26px_rgba(212,168,75,0.2)]`;

  return (
    <article className={`${shell} ${hoverShell}`}>
      <h3
        className={`type-h3 font-serif ${titleMissing ? 'text-white/75' : 'text-white'}`}
      >
        {title.trim() || 'Not found'}
      </h3>
      <dl className="mt-6 space-y-6 font-sans text-sm md:text-base">
        <div
          className={
            evidenceMissing ? 'rounded-lg border border-dashed border-white/15 bg-black/25 p-4' : ''
          }
        >
          <dt className="type-eyebrow text-white/70">/ EVIDENCE</dt>
          <dd
            className={`mt-2 leading-relaxed ${evidenceMissing ? 'text-white/75' : 'italic text-white/85'}`}
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
          <dt className="type-eyebrow text-white/70">/ CONSEQUENCE</dt>
          <dd className={`mt-2 leading-relaxed ${consequenceMissing ? 'text-white/75' : 'text-white/90'}`}>
            {consequence.trim() || 'Not found'}
          </dd>
          {consequenceMissing ? <MissingNote /> : null}
        </div>
      </dl>
      {titleMissing ? <MissingNote /> : null}
    </article>
  );
}

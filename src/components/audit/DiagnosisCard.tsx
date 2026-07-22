import { isMissingSignal } from '@/types/deepAuditReport';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditCream, auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

export type DiagnosisVariant = 'critical' | 'secondary';

export interface DiagnosisCardProps {
  variant: DiagnosisVariant;
  title: string;
  evidence: string;
  consequence: string;
}

function MissingNote({ onCream }: { onCream?: boolean }) {
  return (
    <p className={`mt-2 font-sans text-xs leading-snug ${onCream ? 'text-dark/50' : 'text-white/55'}`}>
      We could not read this signal. Treat the finding as incomplete until we re-run the pass.
    </p>
  );
}

export default function DiagnosisCard({ variant, title, evidence, consequence }: DiagnosisCardProps) {
  const titleMissing = isMissingSignal(title) || title.trim() === '';
  const evidenceMissing = isMissingSignal(evidence) || evidence.trim() === '';
  const consequenceMissing = isMissingSignal(consequence) || consequence.trim() === '';
  const reduce = useReducedMotion();
  const isCritical = variant === 'critical';

  if (isCritical) {
    return (
      <m.article
        className={`${auditGlass} ${auditCardLift} border-red-on-dark/40 bg-gradient-to-br from-red-on-dark/[0.16] via-black/40 to-black/20 p-7 md:p-10`}
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: auditEase }}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-red-on-dark/20 blur-3xl"
          aria-hidden
        />
        <p className={`${auditEyebrow} text-red-on-dark`}>Primary finding</p>
        <h3
          className={`mt-4 max-w-3xl font-serif text-3xl tracking-tight md:text-4xl ${
            titleMissing ? 'text-white/70' : 'text-cream'
          }`}
        >
          {title.trim() || 'Not found'}
        </h3>
        <dl className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          <div
            className={
              evidenceMissing
                ? 'rounded-xl border border-dashed border-white/15 bg-black/25 p-5'
                : 'rounded-xl border border-white/10 bg-black/30 p-5 md:p-6'
            }
          >
            <dt className={`${auditEyebrow} text-white/40`}>What we saw</dt>
            <dd
              className={`mt-3 font-sans text-sm leading-relaxed md:text-base ${
                evidenceMissing ? 'text-white/60' : 'text-white/85'
              }`}
            >
              {evidence.trim() || 'Not found'}
            </dd>
            {evidenceMissing ? <MissingNote /> : null}
          </div>
          <div
            className={
              consequenceMissing
                ? 'rounded-xl border border-dashed border-white/15 bg-black/25 p-5'
                : 'rounded-xl border border-gold-on-dark/25 bg-gold-on-dark/[0.08] p-5 md:p-6'
            }
          >
            <dt className={`${auditEyebrow} text-gold-on-dark`}>Why it matters</dt>
            <dd
              className={`mt-3 font-sans text-sm leading-relaxed md:text-base ${
                consequenceMissing ? 'text-white/60' : 'text-white/90'
              }`}
            >
              {consequence.trim() || 'Not found'}
            </dd>
            {consequenceMissing ? <MissingNote /> : null}
          </div>
        </dl>
        {titleMissing ? <MissingNote /> : null}
      </m.article>
    );
  }

  return (
    <m.article
      className={`${auditCream} ${auditCardLift} h-full p-6 md:p-7`}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: auditEase }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <p className={`${auditEyebrow} text-gold-on-cream`}>Also worth fixing</p>
      <h3
        className={`mt-3 font-serif text-2xl tracking-tight md:text-[1.65rem] ${
          titleMissing ? 'text-dark/55' : 'text-dark'
        }`}
      >
        {title.trim() || 'Not found'}
      </h3>
      <dl className="mt-6 space-y-5 font-sans text-sm md:text-[15px]">
        <div>
          <dt className={`${auditEyebrow} text-dark/40`}>What we saw</dt>
          <dd className={`mt-2 leading-relaxed ${evidenceMissing ? 'text-dark/50' : 'text-dark/75'}`}>
            {evidence.trim() || 'Not found'}
          </dd>
          {evidenceMissing ? <MissingNote onCream /> : null}
        </div>
        <div>
          <dt className={`${auditEyebrow} text-dark/40`}>Why it matters</dt>
          <dd className={`mt-2 leading-relaxed ${consequenceMissing ? 'text-dark/50' : 'text-dark/85'}`}>
            {consequence.trim() || 'Not found'}
          </dd>
          {consequenceMissing ? <MissingNote onCream /> : null}
        </div>
      </dl>
      {titleMissing ? <MissingNote onCream /> : null}
    </m.article>
  );
}

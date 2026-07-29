import { Eye } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { auditCardLift, auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

export interface AiSiteReadProps {
  text: string;
  companyName: string;
}

/**
 * The gift moment: what we actually saw when we opened the site.
 */
export default function AiSiteRead({ text, companyName }: AiSiteReadProps) {
  const reduce = useReducedMotion();
  const trimmed = text.trim();
  if (!trimmed) return null;

  return (
    <m.section
      className={`relative overflow-hidden rounded-3xl border border-gold-on-dark/40 bg-gradient-to-br from-gold-on-dark/[0.14] via-black/50 to-black/30 p-7 md:p-10 ${auditGlass} ${auditCardLift}`}
      aria-labelledby="ai-site-read-heading"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: auditEase }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gold-on-dark/20 blur-3xl"
        aria-hidden
      />
      <div className="relative flex flex-wrap items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-on-dark/45 bg-gold-on-dark/15 text-gold-on-dark">
          <Eye className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <p className={`${auditEyebrow} text-gold-on-dark`}>We opened the site</p>
          <h2 id="ai-site-read-heading" className="mt-1 font-serif text-2xl tracking-tight text-cream md:text-3xl">
            What a first visitor would notice
          </h2>
        </div>
      </div>
      <p className="relative mt-6 max-w-3xl font-sans text-base leading-relaxed text-cream/90 md:text-lg md:leading-[1.7]">
        {trimmed}
      </p>
      <p className="relative mt-5 font-sans text-sm text-white/45">
        This is a public pass on {companyName}. If the page was blocked or thin, that is part of the finding.
      </p>
    </m.section>
  );
}

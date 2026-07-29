import { ArrowRight } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import type { AuditProductOffer } from '@/lib/auditProductMap';
import { auditEase, auditEyebrow } from './auditCardStyles';

const CALL_HREF =
  'https://meetings-ap1.hubspot.com/felipe-chaparro?uuid=087901aa-c896-4adf-86b4-61f001d96900';

export interface CTABlockProps {
  findingLabel?: string;
  offer?: AuditProductOffer | null;
}

/** Closing CTA: one product from the audit, plus optional call. */
export default function CTABlock({ findingLabel, offer }: CTABlockProps) {
  const reduce = useReducedMotion();
  const title = (findingLabel || '').trim() || 'The one we would start with';
  const hasOffer = Boolean(offer?.name && offer?.href);

  return (
    <section className="border-t border-white/10 pt-16 md:pt-20" aria-label="Next steps">
      <m.div
        className="mx-auto mb-10 max-w-xl text-center"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: auditEase }}
      >
        <p className={`${auditEyebrow} text-gold-on-dark`}>Next</p>
        <h2 className="mt-4 font-serif text-3xl tracking-tight text-cream md:text-4xl">
          The one we would start with
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
          {title}
        </p>
        {hasOffer ? (
          <p className="mt-3 font-sans text-sm leading-relaxed text-white/75 md:text-base">
            {offer!.name}
            {offer!.blurb ? `: ${offer!.blurb}` : ''}
          </p>
        ) : null}
      </m.div>

      <div
        className={`grid grid-cols-1 gap-4 md:gap-5 ${hasOffer ? 'md:grid-cols-2' : 'mx-auto max-w-xl'}`}
      >
        {hasOffer ? (
          <a
            href={offer!.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex min-h-[3.75rem] items-center justify-center overflow-hidden rounded-2xl border border-gold-on-dark bg-gold-on-dark px-6 py-5 text-center font-sans text-base font-medium leading-snug text-dark transition-all duration-[250ms] active:scale-[0.98] md:min-h-[4.25rem] md:px-8"
          >
            <div className="absolute inset-0 bg-gold-on-dark transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full" />
            <div className="absolute inset-0 translate-y-full bg-cream transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0" />
            <span className="relative z-10 inline-flex max-w-full items-center justify-center gap-3">
              <span className="text-balance">{offer!.name}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </a>
        ) : null}
        <a
          href={CALL_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className={`group relative flex min-h-[3.75rem] items-center justify-center overflow-hidden rounded-2xl px-6 py-5 text-center font-sans text-base font-medium leading-snug transition-all duration-[250ms] active:scale-[0.98] md:min-h-[4.25rem] md:px-8 ${
            hasOffer
              ? 'border border-gold-on-dark/70 bg-transparent text-gold-on-dark hover:border-cream hover:bg-white/[0.05] hover:text-cream'
              : 'border border-gold-on-dark bg-gold-on-dark text-dark'
          }`}
        >
          {!hasOffer ? (
            <>
              <div className="absolute inset-0 bg-gold-on-dark transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full" />
              <div className="absolute inset-0 translate-y-full bg-cream transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0" />
            </>
          ) : null}
          <span className="relative z-10 inline-flex max-w-full items-center justify-center gap-3">
            <span className="text-balance">Book a 15-minute call</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </a>
      </div>
      <p className="mx-auto mt-6 max-w-xl text-center font-sans text-sm text-white/45">
        Or book a 15-minute call to walk through the whole audit.
      </p>
    </section>
  );
}

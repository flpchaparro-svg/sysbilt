import { ArrowRight } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { auditEase, auditEyebrow } from './auditCardStyles';

const PRIMARY_HREF =
  'https://meetings-ap1.hubspot.com/felipe-chaparro?uuid=087901aa-c896-4adf-86b4-61f001d96900';
const SECONDARY_HREF = 'https://sysbilt.com/guides';

/** Same hover physics as CTAButton dark solid / light outline, as external links. */
export default function CTABlock() {
  const reduce = useReducedMotion();

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
          Want to walk through this
        </h2>
        <p className="mt-4 font-sans text-sm leading-relaxed text-white/60 md:text-base">
          Book a short call, or read how we build these systems.
        </p>
      </m.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <a
          href={PRIMARY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[3.75rem] items-center justify-center overflow-hidden rounded-2xl border border-gold-on-dark bg-gold-on-dark px-6 py-5 text-center font-sans text-base font-medium leading-snug text-dark transition-all duration-[250ms] active:scale-[0.98] md:min-h-[4.25rem] md:px-8"
        >
          <div className="absolute inset-0 bg-gold-on-dark transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full" />
          <div className="absolute inset-0 translate-y-full bg-cream transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0" />
          <span className="relative z-10 inline-flex max-w-full items-center justify-center gap-3">
            <span className="text-balance">Book a 15-minute call</span>
            <ArrowRight
              className="h-4 w-4 shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </a>
        <a
          href={SECONDARY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[3.75rem] items-center justify-center overflow-hidden rounded-2xl border border-gold-on-dark/70 bg-transparent px-6 py-5 text-center font-sans text-base font-medium leading-snug text-gold-on-dark transition-all duration-[250ms] hover:border-cream hover:bg-white/[0.05] hover:text-cream active:scale-[0.98] md:min-h-[4.25rem] md:px-8"
        >
          <span className="relative z-10 max-w-full text-balance">Read our guides</span>
        </a>
      </div>
    </section>
  );
}

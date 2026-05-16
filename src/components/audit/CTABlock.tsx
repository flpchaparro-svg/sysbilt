import { ArrowRight } from 'lucide-react';

const PRIMARY_HREF =
  'https://meetings-ap1.hubspot.com/felipe-chaparro?uuid=087901aa-c896-4adf-86b4-61f001d96900';
const SECONDARY_HREF = 'https://sysbilt.com/guides';

/** Same hover physics as `CTAButton` dark solid / light outline, as external links. */
export default function CTABlock() {
  return (
    <section className="border-t border-white/10 pt-12 md:pt-16" aria-label="Next steps">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <a
          href={PRIMARY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[3.5rem] items-center justify-center overflow-hidden border border-gold-on-dark bg-gold-on-dark px-6 py-4 text-center font-sans text-base font-medium leading-snug text-dark transition-all duration-[250ms] active:scale-[0.97] md:min-h-[3.75rem] md:px-8 md:py-5"
        >
          <div className="absolute inset-0 bg-gold-on-dark transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-full" />
          <div className="absolute inset-0 translate-y-full bg-cream transition-transform duration-[250ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-0" />
          <span className="relative z-10 inline-flex max-w-full items-center justify-center gap-3 transition-colors duration-[250ms]">
            <span className="text-balance">Want to walk through this together? Book a 15-minute call.</span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-[250ms] group-hover:translate-x-0.5" aria-hidden />
          </span>
        </a>
        <a
          href={SECONDARY_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex min-h-[3.5rem] items-center justify-center overflow-hidden border border-gold-on-dark bg-transparent px-6 py-4 text-center font-sans text-base font-medium leading-snug text-gold-on-dark transition-all duration-[250ms] active:scale-[0.97] hover:border-cream hover:bg-white/[0.06] hover:text-cream md:min-h-[3.75rem] md:px-8 md:py-5"
        >
          <span className="relative z-10 max-w-full text-balance transition-colors duration-[250ms] group-hover:text-cream">
            Curious how we build these systems? Read our guides.
          </span>
        </a>
      </div>
    </section>
  );
}

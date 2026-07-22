import { SysbiltLogo } from '@/components/SysbiltLogo';

export interface AuditHeroHeaderProps {
  company_name: string;
  contact_email: string;
}

/**
 * Report cover: brand first, company as the display title, clear prepared-for line.
 */
export default function AuditHeroHeader({ company_name, contact_email }: AuditHeroHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_15%_-10%,rgba(212,168,75,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_20%,rgba(255,107,107,0.06),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-14 lg:px-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SysbiltLogo isDarkBg className="w-[120px] md:w-[148px] max-w-[70vw]" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/45 md:text-[11px]">
            Confidential
          </p>
        </div>

        <p className="mt-12 font-mono text-[10px] font-bold uppercase tracking-[0.28em] text-gold-on-dark md:mt-14 md:text-[11px]">
          Deep Audit
        </p>

        <h1 className="mt-3 max-w-4xl font-serif text-4xl font-normal tracking-tight text-cream md:text-5xl lg:text-6xl lg:leading-[1.05]">
          {company_name}
        </h1>

        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
          An outside read of how your front-of-house systems show up online: search, Google&apos;s business
          card, your website, and reviews.
        </p>

        <div className="mt-10 flex flex-col gap-1 border-t border-white/10 pt-6 sm:flex-row sm:items-baseline sm:gap-4">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
            Prepared for
          </span>
          <p className="font-sans text-sm text-white/90 md:text-base">{contact_email}</p>
        </div>
      </div>
    </header>
  );
}

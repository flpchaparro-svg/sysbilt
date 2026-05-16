import { SysbiltLogo } from '@/components/SysbiltLogo';

export interface AuditHeroHeaderProps {
  company_name: string;
  contact_email: string;
}

/**
 * Report hero: mirrors homepage hero patterns (max width, eyebrow row, Lora display, gold lead border)
 * without changing any data source, only presentation.
 */
export default function AuditHeroHeader({ company_name, contact_email }: AuditHeroHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_70%_at_50%_-30%,rgba(212,168,75,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold-on-dark/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-24 h-56 w-56 rounded-full bg-red-on-dark/[0.05] blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-16 pt-10 md:px-12 md:pb-24 md:pt-14 lg:px-20">
        <SysbiltLogo isDarkBg className="w-[130px] md:w-[160px] max-w-[70vw]" />

        <div className="mt-10 flex flex-wrap items-center gap-2 md:mt-12">
          <span className="hidden font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/35 md:inline" aria-hidden>
            /
          </span>
          <span className="type-eyebrow text-gold-on-dark">CLIENT DEEP AUDIT</span>
        </div>

        <h1 className="mt-4 max-w-4xl font-serif text-5xl font-normal tracking-tighter text-gold-on-dark md:text-6xl lg:text-7xl lg:leading-[0.95]">
          {company_name}
        </h1>

        <div className="mt-8 max-w-2xl border-l-2 border-gold-on-dark pl-6 md:mt-10">
          <span className="type-eyebrow text-white/70">/ PREPARED FOR</span>
          <p className="mt-2 font-sans text-lg text-white/90 md:text-xl">{contact_email}</p>
        </div>

        <p className="type-eyebrow mt-8 text-white/75 md:mt-10">/ SYSBILT DEEP AUDIT</p>

        <div
          className="pointer-events-none absolute bottom-0 left-1/2 hidden h-12 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-on-dark/35 to-transparent md:block"
          aria-hidden
        />
      </div>
    </header>
  );
}

import { Lock, Mail } from 'lucide-react';
import { m, useReducedMotion } from 'framer-motion';
import { SysbiltLogo } from '@/components/SysbiltLogo';
import { auditEase, auditEyebrow, auditGlass } from './auditCardStyles';

export interface AuditHeroHeaderProps {
  company_name: string;
  contact_email: string;
}

/**
 * Report cover: brand first, company as the display title, clear prepared-for line.
 */
export default function AuditHeroHeader({ company_name, contact_email }: AuditHeroHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-white/10 bg-dark">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_-20%,rgba(212,168,75,0.22),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_100%_10%,rgba(255,107,107,0.08),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black, transparent)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-[1120px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14 lg:px-12">
        <m.div
          className="flex flex-wrap items-center justify-between gap-6"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: auditEase }}
        >
          <SysbiltLogo isDarkBg className="w-[128px] md:w-[156px] max-w-[70vw]" />

          <m.div
            className="inline-flex items-center gap-2.5 rounded-full border border-gold-on-dark/40 bg-gold-on-dark/10 px-3.5 py-2 text-gold-on-dark shadow-[0_0_24px_rgba(212,168,75,0.15)]"
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.12 }}
          >
            <m.span
              className="relative flex h-7 w-7 items-center justify-center rounded-full border border-gold-on-dark/50 bg-dark/60"
              animate={
                reduce
                  ? undefined
                  : {
                      boxShadow: [
                        '0 0 0 0 rgba(212,168,75,0)',
                        '0 0 0 6px rgba(212,168,75,0.18)',
                        '0 0 0 0 rgba(212,168,75,0)',
                      ],
                    }
              }
              transition={reduce ? undefined : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Lock className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
            </m.span>
            <span className={`${auditEyebrow}`}>Confidential</span>
          </m.div>
        </m.div>

        <m.p
          className={`${auditEyebrow} mt-14 text-gold-on-dark md:mt-20`}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: auditEase }}
        >
          Deep Audit
        </m.p>

        <m.h1
          className="mt-4 max-w-4xl font-serif text-[2.75rem] font-normal leading-[1.05] tracking-tight text-cream md:text-6xl lg:text-7xl"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: auditEase }}
        >
          {company_name}
        </m.h1>

        <m.p
          className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-white/65 md:text-lg md:leading-relaxed"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: auditEase }}
        >
          An outside read of how your front-of-house systems show up online: search, Google&apos;s business
          card, your website, and reviews.
        </m.p>

        <m.div
          className={`mt-12 flex max-w-xl items-center gap-4 border border-white/10 p-4 md:p-5 ${auditGlass}`}
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: auditEase }}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] text-gold-on-dark">
            <Mail className="h-4.5 w-4.5" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="min-w-0">
            <p className={`${auditEyebrow} text-white/40`}>Prepared for</p>
            <p className="mt-1 truncate font-sans text-sm text-cream md:text-base">{contact_email}</p>
          </div>
        </m.div>
      </div>
    </header>
  );
}

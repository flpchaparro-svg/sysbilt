import React from 'react';
import { Target, TrendingUp, BarChart3, Layers, Building2, Newspaper, Instagram, Facebook, Linkedin } from 'lucide-react';
import CTAButton from './CTAButton';
import { SysbiltLogo } from './SysbiltLogo';
import ShareButton from './ShareButton';
import { OPEN_BANNER_EVENT } from '../utils/consent';

interface GlobalFooterProps {
  onNavigate: (view: string, sectionId?: string) => void;
}

type FooterLinkGroup = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  links: { label: string; action: () => void }[];
};

const socialIconLinkClass =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/35';

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks: FooterLinkGroup[] = [
    {
      title: 'COMPANY',
      icon: Building2,
      color: 'text-white/80',
      links: [
        { label: 'About', action: () => onNavigate('architect') },
        { label: 'Process', action: () => onNavigate('process') },
        { label: 'Proof', action: () => onNavigate('proof') },
      ],
    },
    {
      title: 'GET CLIENTS',
      icon: Target,
      color: 'text-red-on-dark',
      links: [
        { label: 'Websites', action: () => onNavigate('pillar1') },
        { label: 'CRM', action: () => onNavigate('pillar2') },
        { label: 'Automation', action: () => onNavigate('pillar3') },
      ],
    },
    {
      title: 'SCALE FASTER',
      icon: TrendingUp,
      color: 'text-gold-on-dark',
      links: [
        { label: 'AI Assistants', action: () => onNavigate('pillar4') },
        { label: 'Content', action: () => onNavigate('pillar5') },
        { label: 'Training', action: () => onNavigate('pillar6') },
      ],
    },
    {
      title: 'SEE CLEARLY',
      icon: BarChart3,
      color: 'text-white',
      links: [{ label: 'Dashboards', action: () => onNavigate('pillar7') }],
    },
    {
      title: 'INSIGHTS',
      icon: Newspaper,
      color: 'text-white/80',
      links: [
        { label: 'Blog', action: () => onNavigate('blog') },
        { label: 'Toolkit', action: () => onNavigate('toolkit') },
        { label: 'Guides', action: () => onNavigate('guides') },
        { label: 'News', action: () => onNavigate('news') },
      ],
    },
  ];

  const capabilitiesList = [
    'Business Systems Sydney',
    'CRM Setup and Integration',
    'Custom Website Development',
    'AI Assistants and Voice Agents',
    'Business Automation',
    'Dashboards and Reporting',
  ];

  return (
    <footer className="bg-dark text-white pt-16 pb-10 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        {/* Top: brand (left) + all nav columns in one dense row (right on xl) */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-6 xl:gap-10 mb-10 lg:mb-8">
          <div className="shrink-0 max-w-[20rem] lg:max-w-[min(100%,17rem)] xl:max-w-[18.5rem]">
            <div className="mb-3 w-[7.5rem]">
              <SysbiltLogo isDarkBg={true} />
            </div>
            <h2 className="font-serif text-xl sm:text-2xl lg:text-[1.4rem] xl:text-[1.5rem] leading-[1.2] tracking-tight mb-4 text-white">
              We build the{' '}
              <span className="text-gold-on-dark italic">systems that run your business</span>
              {' '}
              without you
            </h2>
            <CTAButton theme="dark" onClick={() => onNavigate('contact')} className="text-sm py-2.5 px-5">
              BOOK A CALL
            </CTAButton>
          </div>

          <div className="min-w-0 lg:flex-1 lg:flex lg:justify-end">
            <div
              className="
                grid w-full min-w-0
                grid-cols-2 gap-x-5 gap-y-6
                sm:grid-cols-3 sm:gap-x-4
                lg:grid-cols-5 lg:gap-x-3 lg:gap-y-0 lg:justify-items-stretch
              "
            >
              {footerLinks.map((group) => (
                <div key={group.title} className="min-w-0">
                  <div className={`flex items-center gap-1.5 mb-2 ${group.color}`}>
                    <group.icon className="w-3 h-3 shrink-0" aria-hidden />
                    <span className="font-mono text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.08em] leading-tight">
                      {group.title}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <button
                          onClick={link.action}
                          className="font-sans text-[11px] sm:text-xs text-white/70 hover:text-white transition-colors text-left leading-snug"
                        >
                          {link.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* WHAT WE DO: one band, capabilities in a single multi-column row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-start gap-4 md:gap-8 lg:gap-10 mb-14">
          <div className="flex items-center gap-2 shrink-0 text-white/80 md:pt-0.5">
            <Layers className="w-3.5 h-3.5 shrink-0 text-gold-on-dark" aria-hidden />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] whitespace-nowrap">
              WHAT WE DO
            </span>
          </div>
          <div
            className="
              grid flex-1 min-w-0
              grid-cols-2 gap-x-5 gap-y-1.5
              sm:grid-cols-3
              lg:grid-cols-6 lg:gap-x-4
            "
            aria-label="Capabilities and services"
          >
            {capabilitiesList.map((item) => (
              <span key={item} className="font-sans text-[11px] sm:text-xs text-white/65 leading-snug">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:flex-wrap justify-between items-center gap-5">
          <p className="font-mono text-[9px] text-white/70 uppercase tracking-widest">
            © {currentYear} SYSBILT. Sydney, Australia.
          </p>

          <nav
            aria-label="Share and social links"
            className="flex flex-wrap items-center justify-center gap-1 sm:gap-2"
          >
            <ShareButton
              url={typeof window !== 'undefined' ? window.location.href : 'https://sysbilt.com'}
              title={typeof document !== 'undefined' ? document.title : 'SYSBILT'}
              mode="card"
              variant="dark"
              cardAnchor="tr"
              cardCollapsedStyle="minimal"
              themeClass={{ textMain: 'text-white/70', textHover: 'hover:text-white' }}
            />
            <a
              href="https://www.instagram.com/sysbilt/"
              target="_blank"
              rel="noreferrer"
              aria-label="SYSBILT on Instagram"
              className={socialIconLinkClass}
            >
              <Instagram className="h-[18px] w-[18px] shrink-0" aria-hidden />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61577590740296"
              target="_blank"
              rel="noreferrer"
              aria-label="SYSBILT on Facebook"
              className={socialIconLinkClass}
            >
              <Facebook className="h-[18px] w-[18px] shrink-0" aria-hidden />
            </a>
            <a
              href="https://www.linkedin.com/company/112107023"
              target="_blank"
              rel="noreferrer"
              aria-label="SYSBILT on LinkedIn"
              className={socialIconLinkClass}
            >
              <Linkedin className="h-[18px] w-[18px] shrink-0" aria-hidden />
            </a>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-end">
            <button
              type="button"
              onClick={() => onNavigate('privacy')}
              className="font-mono text-[9px] text-white/70 hover:text-white uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_BANNER_EVENT))}
              className="font-mono text-[9px] text-white/70 hover:text-white uppercase tracking-widest transition-colors"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;

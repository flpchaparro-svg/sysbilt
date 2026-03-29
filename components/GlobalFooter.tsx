import React from 'react';
import { Target, TrendingUp, BarChart3, ArrowUpRight } from 'lucide-react';
import CTAButton from './CTAButton';
import { SysbiltLogo } from './SysbiltLogo';

interface GlobalFooterProps {
  onNavigate: (view: string, sectionId?: string) => void;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'ABOUT',
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
      color: 'text-white/80',
      links: [
        { label: 'Blog', action: () => onNavigate('blog') },
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
    <footer className="bg-dark text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
          <div className="max-w-lg">
            <div className="mb-6">
              <SysbiltLogo isDarkBg={true} />
            </div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-white/50 mb-4">
              SYSBILT
            </p>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-8 text-white">
              We build the systems that run your business without you
            </h2>
            <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
              BOOK A CALL
            </CTAButton>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-12 lg:gap-10 w-full xl:w-auto xl:flex-1 xl:max-w-5xl">
            {footerLinks.map((group) => (
              <div key={group.title}>
                <div className={`flex items-center gap-2 mb-6 ${group.color}`}>
                  {group.icon && <group.icon className="w-4 h-4" />}
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                    {group.title}
                  </span>
                </div>
                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={link.action}
                        className="font-sans text-sm text-white/70 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <div className="flex items-center gap-2 mb-6 text-white/80">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                  / WHAT WE DO
                </span>
              </div>
              <ul className="space-y-4" aria-label="Capabilities and services">
                {capabilitiesList.map((item) => (
                  <li key={item}>
                    <span className="font-sans text-sm text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-mono text-[10px] text-white/70 uppercase tracking-widest">
            © {currentYear} SYSBILT. Sydney, Australia.
          </p>

          <div className="flex items-center gap-8">
            <button
              onClick={() => onNavigate('privacy')}
              className="font-mono text-[10px] text-white/70 hover:text-white uppercase tracking-widest transition-colors"
            >
              Privacy Policy
            </button>
            <a
              href="https://www.linkedin.com/in/felipe-chaparro-97a390176/"
              target="_blank"
              rel="noreferrer"
              aria-label="SYSBILT on LinkedIn"
              className="font-mono text-[10px] text-white/70 hover:text-gold-on-cream uppercase tracking-widest transition-colors flex items-center gap-2"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;

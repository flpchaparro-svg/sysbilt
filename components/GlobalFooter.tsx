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
      title: 'THE ARCHITECT',
      color: 'text-white/80',
      links: [
        { label: 'Philosophy', action: () => onNavigate('architect') },
        { label: 'The Process', action: () => onNavigate('process') },
        { label: 'Case Studies', action: () => onNavigate('proof') },
        { label: 'System Logs', action: () => onNavigate('blog') },
        { label: 'Industry News', action: () => onNavigate('news') }, // Hidden development link
      ]
    },
    {
      title: 'GET CLIENTS',
      icon: Target,
      color: 'text-red-on-dark',
      links: [
        { label: 'Websites', action: () => onNavigate('pillar1') },
        { label: 'CRM Systems', action: () => onNavigate('pillar2') },
        { label: 'Automation', action: () => onNavigate('pillar3') },
      ]
    },
    {
      title: 'SCALE FASTER',
      icon: TrendingUp,
      color: 'text-gold-on-dark',
      links: [
        { label: 'AI Agents', action: () => onNavigate('pillar4') },
        { label: 'Content Systems', action: () => onNavigate('pillar5') },
        { label: 'Team Training', action: () => onNavigate('pillar6') },
      ]
    },
    {
      title: 'SEE CLEARLY',
      icon: BarChart3,
      color: 'text-white', 
      links: [
        { label: 'Dashboards', action: () => onNavigate('pillar7') },
      ]
    }
  ];

  const capabilitiesList = [
    'Sydney Business Automation',
    'HubSpot CRM Implementation',
    'Next.js Web Development',
    'AI Voice Receptionists',
    'Lead Generation Systems',
    'Revenue Operations (RevOps)',
  ];

  return (
    <footer className="bg-dark text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* TOP SECTION: CTA & BRAND */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-24 gap-16">
           <div className="max-w-lg">
              
              <div className="mb-8">
                 <SysbiltLogo isDarkBg={true} />
              </div>
              
              <h2 className="font-serif text-4xl md:text-5xl leading-[0.95] tracking-tight mb-8">
                Stop guessing. <br />
                Start <span className="italic text-gold-on-dark">building</span>
              </h2>
              <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                BOOK A CALL
              </CTAButton>
           </div>

           {/* LINKS GRID + CAPABILITIES (non-clickable for SEO) */}
           <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-16">
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
              {/* CAPABILITIES: keyword list for SEO; non-clickable text */}
              <div>
                <div className="flex items-center gap-2 mb-6 text-white/80">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em]">
                    / CAPABILITIES
                  </span>
                </div>
                <ul className="space-y-4" aria-label="Capabilities and services">
                  {capabilitiesList.map((item) => (
                    <li key={item}>
                      <span className="font-sans text-sm text-white/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>

        {/* BOTTOM SECTION: LEGAL */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="font-mono text-[10px] text-white/70 uppercase tracking-widest">
             © {currentYear} Felipe Chaparro. Sydney, Australia.
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
                aria-label="Visit Felipe Chaparro's LinkedIn Profile"
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
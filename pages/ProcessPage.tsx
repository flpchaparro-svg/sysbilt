import React from 'react';
import { m } from 'framer-motion';

// COMPONENTS
import ProtocolVisual_Geodesic from '../components/Process/ProtocolVisual_Geodesic';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

// HOOKS & DATA
import { usePageTitle } from '../hooks/usePageTitle';
import { PRINCIPLES, STEPS } from '../constants/processData'; 

interface ProcessPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// Reusable Animation Wrapper
const Section: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <m.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </m.div>
);

const ProcessPage: React.FC<ProcessPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('The Process');

  return (
    <m.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream text-dark pt-0 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col selection:bg-gold/30"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HERO SECTION */}
        <div className="mb-20 lg:mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          <Section className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-center lg:justify-start">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">/</span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">
                THE PROCESS
              </span>
            </div>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark mb-8 md:mb-12">
              How I <span className="italic font-serif text-gold-on-cream">Work.</span>
            </h1>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-gold pl-8 py-2 text-left lg:mx-0">
              Clear path. No mystery. No jargon. Just results.
            </p>
          </Section>

          <Section delay={0.2} className="h-full min-h-[300px] lg:min-h-[500px] flex items-center justify-center lg:justify-end relative">
            <div className="w-full max-w-[320px] lg:max-w-none">
               <ProtocolVisual_Geodesic />
            </div>
          </Section>
        </div>

        {/* SECTION: PHILOSOPHY CARDS */}
        <div className="mb-24 md:mb-40">
          <Section className="mb-16 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text mb-6 block">
              / HOW I THINK
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-6">
              Two <span className="italic font-serif text-gold-on-cream">Rules.</span>
            </h2>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {PRINCIPLES.map((principle, idx) => (
               <Section key={principle.id} delay={idx * 0.1} className="group bg-white p-8 md:p-12 border border-dark/5 hover:border-dark/20 shadow-sm hover:shadow-xl transition-all duration-flow rounded-sm relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-flow origin-left will-change-transform" />
                 <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] font-bold text-dark/80 group-hover:text-dark transition-colors">
                      {principle.label}
                    </span>
                    <principle.icon className="w-6 h-6 text-dark/20 group-hover:text-gold-on-cream transition-colors" />
                 </div>
                 <h3 className="font-serif text-2xl md:text-3xl text-dark mb-4 leading-tight tracking-tighter group-hover:translate-x-2 transition-transform duration-snap">
                   {principle.title}
                 </h3>
                 <p className="font-sans text-lg font-light text-dark/70 leading-relaxed">
                   {principle.body}
                 </p>
               </Section>
             ))}
          </div>
        </div>

        {/* SECTION: THE EXECUTION PATH */}
        <div className="mb-20 md:mb-24">
          <Section className="mb-16 text-center lg:text-left">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-6 block">
              / THE 4 PHASES
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-6">
              How Every Project <span className="italic font-serif text-gold-on-cream">Works.</span>
            </h2>
          </Section>

          <div className="relative px-4 md:px-0">
             {/* Center Line on Desktop */}
             <div className="absolute left-[19px] md:left-[50%] top-0 bottom-0 w-px bg-gradient-to-b from-red-solid via-gold to-dark hidden md:block" />
             {/* Left Line on Mobile */}
             <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-red-solid via-gold to-dark md:hidden" />

             {STEPS.map((step, idx) => (
               <Section key={step.id} delay={idx * 0.1} className={`relative flex flex-col md:flex-row gap-4 md:gap-24 py-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Icon Node */}
                  <div className="absolute left-0 md:left-[50%] top-12 -translate-x-1/2 md:-translate-x-1/2 z-10 bg-cream p-2">
                     <div className={`w-10 h-10 rounded-full border-2 bg-white flex items-center justify-center shadow-md transition-transform duration-snap ${step.borderColor}`}>
                        <step.icon className={`w-4 h-4 ${step.color}`} />
                     </div>
                  </div>
                  
                  {/* Text Content */}
                  <div className={`flex-1 md:text-right ${idx % 2 !== 0 ? 'md:text-left' : ''} pl-12 md:pl-0`}>
                     <span className={`font-mono text-[10px] uppercase tracking-[0.2em] font-bold mb-2 block ${step.color}`}>
                       {step.phase}
                     </span>
                     <h3 className="font-serif text-2xl md:text-4xl text-dark mb-4 leading-tight tracking-tighter">
                       {step.title}
                     </h3>
                  </div>
                  
                  <div className={`flex-1 pl-12 md:pl-0 ${idx % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                     <p className="font-sans text-base md:text-lg font-light text-dark/70 leading-relaxed max-w-md mx-auto md:mx-0">
                       {step.text}
                     </p>
                  </div>
               </Section>
             ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <Section className="mb-24">
          <div className="bg-dark text-white p-12 md:p-24 text-center relative overflow-hidden rounded-sm group cursor-default">
             <div className="relative z-10 flex flex-col items-center">
                <span className="font-mono text-xs font-bold text-gold-muted uppercase tracking-[0.2em] mb-6 block">
                  / READY?
                </span>
                <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter text-white mb-12">
                  Let's <span className="italic font-serif text-gold-on-dark">Talk.</span>
                </h2>
                
                <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                  BOOK A CALL
                </CTAButton>
                
                <div className="flex items-center gap-2 opacity-50 mt-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                  <p className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
                    NOW ACCEPTING PROJECTS
                  </p>
                </div>
             </div>
          </div>
        </Section>
      </div>
    </m.div>
  );
};

export default ProcessPage;
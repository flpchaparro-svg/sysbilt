import React, { useState, useEffect } from 'react';
import { m } from 'framer-motion';
import { 
  ShieldCheck, ArrowRight, Clock, LayoutTemplate, 
  AlertTriangle, CheckCircle2, TrendingUp 
} from 'lucide-react';

// COMPONENTS
import EvidenceVisual_Compare from '../components/EvidenceVisual_Compare';
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 
import TerminalLog from '../components/Proof/TerminalLog';
import CountUp from '../components/Proof/CountUp';

// HOOKS & DATA
import { usePageTitle } from '../hooks/usePageTitle';
import { getCaseStudies } from '../src/sanityClient';
import { SanityCaseStudy } from '../types';

interface ProofPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const Section: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className = "", delay = 0 }) => (
  <m.div 
    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </m.div>
);

const ProofPage: React.FC<ProofPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('Proof');
  
  // SANITY STATE
  const [caseStudy, setCaseStudy] = useState<SanityCaseStudy | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // FETCH ON MOUNT
  useEffect(() => {
    const fetchProof = async () => {
      try {
        const data = await getCaseStudies();
        if (data && data.length > 0) {
          setCaseStudy(data[0]); // Grabs the newest case study
        }
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProof();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <span className="font-mono text-sm uppercase tracking-widest text-dark/50 animate-pulse">Loading Evidence...</span>
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <span className="font-mono text-sm uppercase tracking-widest text-dark/50">No Evidence Found.</span>
        <BackButton onClick={onBack} label="Return to Home" />
      </div>
    );
  }

  return (
    <m.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-cream text-dark pt-0 relative z-[150] overflow-x-hidden flex flex-col selection:bg-gold/30"
    >
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(var(--ink) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow pb-24 relative z-10">
        
        {/* NAVIGATION */}
        <div className="flex justify-between items-center mb-12 md:mb-20 pt-24 relative z-20">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HERO SECTION */}
        <Section className="mb-16 md:mb-24 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -z-10" />
          <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">/</span>
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">CASE STUDY</span>
          </div>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark mb-8 md:mb-12 max-w-5xl">
            Results You Can <br/>
            <span className="italic font-serif text-gold-on-cream">Verify</span>
          </h1>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-gold pl-8 py-2">
            No testimonials. Just data. Here's what happened when we rebuilt {caseStudy.clientName}'s system.
          </p>
        </Section>

        {/* THE BRIEF */}
        <Section className="mb-16 md:mb-24">
          <div className="bg-white border border-dark/5 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] p-0 overflow-hidden">
            <div className="bg-dark text-white px-8 py-4 flex flex-wrap justify-between items-center gap-4">
              <span className="font-mono text-xs text-gold-on-dark uppercase tracking-[0.2em] font-bold">
                CLIENT: {caseStudy.clientName}
              </span>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-solid" title="High Friction (Before)" />
                 <ArrowRight className="w-3 h-3 text-white/70" />
                 <div className="w-2 h-2 rounded-full bg-gold" title="High Performance (After)" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-dark/5">
              <div className="lg:col-span-4 bg-gray-100 p-8 border-b lg:border-b-0 lg:border-r border-dark/5 space-y-8">
                <div>
                  <span className="font-mono text-xs font-bold text-dark/80 uppercase tracking-[0.2em] block mb-2">INDUSTRY</span>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gold-on-cream" />
                    <span className="font-sans font-medium">{caseStudy.clientIndustry}</span>
                  </div>
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-dark/80 uppercase tracking-[0.2em] block mb-2">SCOPE</span>
                  <div className="flex items-center gap-2">
                    <LayoutTemplate className="w-4 h-4 text-gold-on-cream" />
                    <span className="font-sans font-medium">{caseStudy.pillarFocus}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 p-8 md:p-12">
                <h2 className="font-serif text-3xl mb-6">The Brief</h2>
                <p className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed max-w-3xl">
                  They were losing deals to competitors not because they were worse at their job, but because their digital presence and tracking were broken. The goal was to stop the friction and rebuild the foundation.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* THE PROBLEM */}
        {caseStudy.problemItems && caseStudy.problemItems.length > 0 && (
          <Section className="mb-16 md:mb-24">
            <div className="mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text mb-6 block">/ THE PROBLEM</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-8">
                The Old <span className="italic font-serif text-red-text">System</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {caseStudy.problemItems.map((item, i) => (
                <div key={i} className="group p-8 bg-white border border-red-solid/10 hover:border-red-solid hover:shadow-lg transition-all duration-snap relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-red-solid transform -translate-x-full group-hover:translate-x-0 transition-transform duration-snap" />
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-red-solid/5 rounded-sm">
                      <AlertTriangle className="w-6 h-6 text-red-solid" />
                    </div>
                    <span className="font-mono text-xs font-bold text-red-text/60 uppercase tracking-[0.2em] border border-red-solid/20 px-2 py-1 rounded-sm">
                      CRITICAL ERROR
                    </span>
                  </div>
                  <div className="mb-6">
                    <div className="font-mono text-xs font-bold text-dark/80 uppercase tracking-[0.2em] mb-1">{item.label}</div>
                    <div className="text-4xl font-serif text-red-text mb-4">{item.metric}</div>
                    <p className="font-sans text-base text-dark/70 leading-relaxed mb-4">{item.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-red-solid/10 flex items-center gap-2">
                    <span className="text-red-text text-xs font-bold uppercase tracking-wide">Impact:</span>
                    <span className="text-sm font-medium text-dark">{item.impact}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* THE SOLUTION */}
        {caseStudy.solutionItems && caseStudy.solutionItems.length > 0 && (
          <Section className="mb-16 md:mb-24">
            <div className="mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-6 block">/ THE SOLUTION</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-8">
                The New <span className="italic font-serif text-gold-on-cream">Standard</span>
              </h2>
            </div>

            <div className="relative border-l border-gold/20 ml-4 md:ml-8 space-y-12 pb-12">
              {caseStudy.solutionItems.map((item, i) => (
                <div key={i} className="relative pl-8 md:pl-16 group">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-white border-2 border-gold z-10 group-hover:scale-125 transition-transform duration-snap" />
                  <div className="bg-white p-8 border border-black/5 hover:border-gold/50 shadow-sm hover:shadow-xl transition-all duration-snap rounded-sm">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-6">
                      <div className="w-12 h-12 bg-gold/10 flex items-center justify-center rounded-sm">
                        <CheckCircle2 className="w-6 h-6 text-gold-on-cream" />
                      </div>
                      <div>
                        <h3 className="font-serif text-2xl text-dark">{item.title}</h3>
                        <p className="font-sans text-base text-dark/80 mt-1">{item.what}</p>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-5 border-l-2 border-gold">
                      <span className="font-mono text-xs text-gold-muted uppercase tracking-[0.2em] font-bold block mb-2">THE LOGIC</span>
                      <p className="font-sans text-base md:text-lg text-dark/80 leading-relaxed">{item.why}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* THE EVIDENCE */}
        {caseStudy.evidenceMetrics && caseStudy.evidenceMetrics.length > 0 && (
          <Section className="mb-16 md:mb-24">
            <div className="mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-6 block">/ THE RESULTS</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-8">
                The <span className="italic font-serif text-gold-on-cream">Evidence</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudy.evidenceMetrics.map((m, i) => (
                <div key={i} className="bg-white p-8 border border-dark/5 hover:border-gold transition-all duration-snap group shadow-sm flex flex-col justify-between min-h-[280px] h-auto">
                  <div className="flex justify-between items-start">
                    <div className="p-3 bg-zinc-50 rounded-full group-hover:bg-gold/10 transition-colors">
                      <TrendingUp className="w-5 h-5 text-dark group-hover:text-gold-on-cream transition-colors" />
                    </div>
                    <ArrowRight className="w-4 h-4 text-dark/20 group-hover:-rotate-45 transition-transform duration-snap" />
                  </div>
                  <div className="mt-auto">
                    <div className="font-mono text-xs font-bold text-dark/80 uppercase tracking-[0.2em] mb-3">{m.label}</div>
                    <div className="flex items-baseline gap-1 mb-2">
                      <span className="text-5xl md:text-6xl font-serif text-dark tracking-tighter">
                        <CountUp value={m.val} prefix={m.prefix || ""} />
                      </span>
                      <span className="text-xl font-serif text-gold-on-cream">{m.suffix}</span>
                    </div>
                    <div className="flex items-center gap-2 border-t border-dark/5 pt-4 mt-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                      <span className="font-sans text-sm text-dark/80">{m.note}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* BUILD LOG */}
        {caseStudy.terminalLines && caseStudy.terminalLines.length > 0 && (
          <Section className="mb-16 md:mb-24">
            <TerminalLog lines={caseStudy.terminalLines} />
          </Section>
        )}

        {/* DYNAMIC VISUAL EVIDENCE SECTION */}
        {(caseStudy.beforeImage && caseStudy.afterImage) || (caseStudy.gallery && caseStudy.gallery.length > 0) ? (
          <Section className="mb-16 md:mb-24">
             <div className="mb-12">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-6 block">/ VISUAL EVIDENCE</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-8">
                The <span className="italic font-serif text-gold-on-cream">Proof</span>
              </h2>
            </div>
            
            {/* 1. Show Slider ONLY if both Before and After images exist */}
            {caseStudy.beforeImage && caseStudy.afterImage && (
              <div className="bg-white p-4 border border-dark/10 shadow-2xl rounded-sm mb-12">
                 <EvidenceVisual_Compare 
                   beforeLabel="LEGACY SITE" 
                   afterLabel="NEW STANDARD"
                   beforeImage={caseStudy.beforeImage} 
                   afterImage={caseStudy.afterImage}
                 />
              </div>
            )}

            {/* 2. Show Photo Grid ONLY if gallery images exist */}
            {caseStudy.gallery && caseStudy.gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {caseStudy.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="bg-white p-2 border border-dark/10 shadow-md rounded-sm overflow-hidden aspect-video">
                    <img 
                      src={imgUrl} 
                      alt={`Evidence ${idx + 1}`} 
                      className="w-full h-full object-cover rounded-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </Section>
        ) : null}

        {/* BOTTOM CTA */}
        <Section className="mb-16">
          <div className="bg-dark text-white p-12 md:p-24 text-center relative overflow-hidden rounded-sm group cursor-default">
            <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center">
              <span className="font-mono text-xs font-bold text-gold-on-dark uppercase tracking-[0.2em] mb-6 block">/ YOUR TURN</span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tighter mb-8 text-white">
                Want Results Like <span className="italic font-serif text-gold-on-dark">This?</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
                {caseStudy.clientName} went from invisible to indexed. From slow to instant. If your system is holding you back, let's fix it.
              </p>
              
              <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                BOOK A CALL
              </CTAButton>
            </div>
          </div>
        </Section>

      </div>
    </m.div>
  );
};

export default ProofPage;
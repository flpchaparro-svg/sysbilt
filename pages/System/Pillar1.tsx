import React, { useState } from 'react';
import { 
  m, 
  AnimatePresence, 
  useAnimationFrame,
  useMotionValue,
  useTransform
} from 'framer-motion';
import { 
  CheckCircle, ChevronDown, ChevronRight, HelpCircle
} from 'lucide-react';
import PillarVisual_Catchment from '../../components/Pillar1/PillarVisual_Catchment';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import { colors } from '../../constants/theme';
import CTAButton from '../../components/CTAButton'; 
import BackButton from '../../components/BackButton'; 
import TierVisual from '../../components/Pillar1/TierVisual';
import { TIERS } from '../../constants/pillar1Data';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const Pillar1: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {
  // STATE
  const firstTierKey = Object.keys(TIERS)[0] as keyof typeof TIERS;
  const [activeTier, setActiveTier] = useState<keyof typeof TIERS>(firstTierKey);
  const [activePersonaIndex, setActivePersonaIndex] = useState(0);
  const [expandedTier, setExpandedTier] = useState<keyof typeof TIERS | null>(firstTierKey);
  const [expandedPersona, setExpandedPersona] = useState<string | null>(null);

  // DATA HELPERS
  const pillarFAQs = getPillarFAQs('pillar1');
  const currentTier = TIERS[activeTier];
  const currentPersona = currentTier.personas[activePersonaIndex];

  // SCROLL ANIMATION
  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);

  useAnimationFrame((time, delta) => {
    const currentY = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    let newY = currentY + (speed * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);
  });

  const handleScrollTo = (id: string) => {
    setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    }, 300); 
  };

  const handleTierChange = (key: keyof typeof TIERS) => {
    setActiveTier(key);
    setActivePersonaIndex(0); // Resets the pane so the animation fires cleanly
  };

  return (
    <m.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-cream text-dark px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
               <div className="flex items-center gap-2 md:gap-4 mb-6 md:mb-10 overflow-hidden justify-start">
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">/</span>
                 <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark">
                   THE SYSTEM / GET CLIENTS
                 </span>
               </div>
               <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark mb-6 md:mb-10">
                 Pick Your <span className="italic font-serif text-red-text drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">Situation.</span>
               </h1>
               <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-red-solid pl-6 mb-8">
                 Different businesses need different websites. Find yours below. See exactly what you get.
               </p>
            </div>
            <div className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end -mt-8 md:mt-0">
               <div className="relative w-full max-w-[450px] h-[300px] lg:h-[450px] opacity-90 flex items-center justify-center">
                 <PillarVisual_Catchment />
               </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-dark/10 overflow-hidden z-30" aria-hidden="true">
          <m.div 
            style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }}
            className="absolute inset-0 bg-dark/40 w-full h-full" 
          />
        </div>
      </section>

      {/* 2. CONFIGURATOR SECTION */}
      <section className="w-full px-6 md:px-12 lg:px-20 pt-24 pb-32 max-w-[1400px] mx-auto border-t border-dark/10">
        <div className="mb-16">
           <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text mb-4 block">
              / SYSTEM CONFIGURATION
           </span>
           <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl text-dark leading-[0.95] tracking-tighter mb-6">
             Select your <span className="italic text-red-text font-serif">Situation.</span>
           </h2>
        </div>

        {/* --- DESKTOP VIEW --- */}
        <div className="hidden md:block border border-black/10 bg-gradient-to-br from-white to-cream-warm shadow-sm mb-32 rounded-sm overflow-hidden">
           {/* TABS */}
           <div className="grid grid-cols-4 border-b border-black/10 bg-off-white">
              {Object.entries(TIERS).map(([key, tier]) => (
                <button 
                  key={key}
                  onClick={() => handleTierChange(key as keyof typeof TIERS)}
                  className={`py-6 px-4 text-center transition-all duration-snap relative group overflow-hidden flex flex-col justify-center min-h-[100px] ${
                    activeTier === key ? 'bg-white' : 'hover:bg-white/50 text-black/60'
                  }`}
                >
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-2 ${activeTier === key ? 'text-red-text' : 'text-inherit'}`}>
                    {tier.label}
                  </span>
                  <span className={`font-serif text-lg leading-tight ${activeTier === key ? 'text-black' : 'text-inherit opacity-60'}`}>
                    "{tier.hook}"
                  </span>
                  {activeTier === key && <m.div layoutId="tab-highlight" className="absolute top-0 left-0 w-full h-1 bg-red-solid" />}
                </button>
              ))}
           </div>
           
           {/* CONTENT PANES */}
           <div className="flex min-h-[600px]">
              {/* LEFT SIDEBAR */}
              <div className="w-1/3 border-r border-black/10 bg-off-white p-8 flex flex-col">
                 <div className="mb-8 p-4 bg-white border border-black/5 rounded-sm">
                    <div className="flex gap-2 items-center mb-2">
                       <HelpCircle className="w-4 h-4 text-red-solid" />
                       <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-black/60">Is this you?</span>
                    </div>
                    <p className="font-sans text-sm text-black/70 leading-relaxed">
                       {currentTier.summary}
                    </p>
                 </div>

                 <span className="font-mono text-[10px] text-black/60 uppercase tracking-widest font-bold mb-4 block pl-1">Select Profile</span>
                 <div className="space-y-3 flex-grow">
                    {currentTier.personas.map((p, idx) => (
                      <button
                        key={p.id}
                        onClick={() => setActivePersonaIndex(idx)}
                        className={`w-full text-left p-4 border rounded-sm transition-all duration-snap flex items-center gap-4 group ${
                           activePersonaIndex === idx ? 'bg-white border-red-solid shadow-md' : 'bg-transparent border-transparent hover:bg-white hover:border-black/5'
                        }`}
                      >
                         <div className={`p-2 rounded-full ${activePersonaIndex === idx ? 'bg-red-solid/10 text-red-text' : 'bg-black/5 text-black/60'}`}>
                           <p.icon className="w-4 h-4" />
                         </div>
                         <div>
                           <h3 className={`font-serif text-lg leading-tight ${activePersonaIndex === idx ? 'text-black' : 'text-black/60'}`}>{p.title}</h3>
                         </div>
                         {activePersonaIndex === idx && <ChevronRight className="w-4 h-4 ml-auto text-red-solid" />}
                      </button>
                    ))}
                 </div>

                 <div className="mt-8 pt-8 border-t border-black/5">
                    <span className="font-mono text-[10px] text-black/60 uppercase tracking-widest font-bold mb-4 block">Included Specs</span>
                    <ul className="space-y-2">
                      {currentTier.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                          <CheckCircle className="w-3 h-3 text-red-solid" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                 </div>
              </div>

              {/* RIGHT CONTENT */}
              <div className="w-2/3 p-12 relative flex flex-col">
                  <AnimatePresence mode="wait">
                    <m.div 
                       key={`${activeTier}-${activePersonaIndex}`}
                       initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                       className="flex-grow flex flex-col"
                    >
                       <div className="mb-10">
                          <span className="text-red-text font-mono text-[10px] uppercase tracking-widest font-bold mb-3 block">The Problem</span>
                          <h2 className="font-serif text-3xl md:text-4xl mb-6 text-dark leading-tight">{currentPersona.painTitle}</h2>
                          <p className="font-sans text-xl text-dark/70 leading-relaxed border-l-2 border-red-solid pl-6 italic">"{currentPersona.painText}"</p>
                       </div>

                       <div className="mt-auto bg-dark p-8 text-white rounded-sm relative overflow-hidden shadow-2xl">
                          <div className="absolute top-0 right-0 w-48 h-48 bg-red-solid/10 rounded-full blur-3xl" />
                          <div className="relative z-10 flex gap-8">
                             <div className="flex-grow">
                                <span className="font-mono text-[10px] text-red-text uppercase tracking-widest block mb-4 font-bold">The Fix</span>
                                <p className="font-sans text-lg leading-relaxed mb-8">{currentPersona.solution}</p>
                                
                                <div className="w-fit">
                                  <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                                    BOOK A CALL
                                  </CTAButton>
                                </div>
                             </div>
                             {/* THE FIX: Replaced 'hidden lg:block' with 'hidden md:flex' so animations don't vanish on resized windows */}
                             <div className="w-24 md:w-32 hidden md:flex flex-shrink-0 items-center justify-center">
                                <TierVisual tierKey={activeTier} />
                             </div>
                          </div>
                       </div>
                    </m.div>
                  </AnimatePresence>
              </div>
           </div>
        </div>

        {/* --- MOBILE VIEW --- */}
        <div className="md:hidden space-y-4 mb-32">
          {Object.entries(TIERS).map(([key, tier]) => {
            const isTierExpanded = expandedTier === key;
            return (
              <div 
                key={key} 
                id={`tier-mobile-${key}`} 
                className={`border rounded-sm overflow-hidden transition-all duration-snap ${isTierExpanded ? 'border-dark bg-white shadow-xl scale-[1.02] z-10' : 'border-black/10 bg-white'}`}
              >
                <button 
                  onClick={() => {
                    const willExpand = !isTierExpanded;
                    setExpandedTier(willExpand ? key as keyof typeof TIERS : null);
                    setExpandedPersona(null); 
                    if (willExpand) handleScrollTo(`tier-mobile-${key}`);
                  }}
                  className={`w-full flex items-center justify-between p-6 text-left transition-colors duration-snap ${isTierExpanded ? 'bg-dark text-white' : 'bg-white text-black'}`}
                >
                  <div>
                    <span className={`font-mono text-[10px] uppercase tracking-widest font-bold block mb-1 ${isTierExpanded ? 'text-red-text' : 'text-black/60'}`}>
                      {tier.label}
                    </span>
                    <span className={`font-serif text-lg leading-tight ${isTierExpanded ? 'text-white' : 'text-black'}`}>"{tier.hook}"</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-snap ${isTierExpanded ? 'rotate-180 text-red-solid' : 'text-black/60'}`} />
                </button>

                <AnimatePresence>
                  {isTierExpanded && (
                    <m.div 
                      initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      className="overflow-hidden bg-off-white"
                    >
                      <div className="p-4 space-y-2">
                         <div className="mb-6 p-4 bg-white border border-black/5 rounded-sm">
                            <p className="font-sans text-sm text-black/70 leading-relaxed">
                               <strong className="text-red-text block mb-1 font-bold uppercase text-[10px] tracking-widest">Is this you?</strong>
                               {tier.summary}
                            </p>
                         </div>
                         
                         <span className="font-mono text-[10px] text-black/60 uppercase tracking-widest font-bold block mb-2 px-2">Select Profile:</span>
                         
                         {tier.personas.map((p) => {
                           const isPersonaExpanded = expandedPersona === p.id;
                           return (
                             <div 
                                key={p.id} 
                                id={`persona-mobile-${p.id}`} 
                                className={`border rounded-sm overflow-hidden transition-all duration-snap ${isPersonaExpanded ? 'border-red-solid bg-white shadow-md' : 'border-black/5 bg-white'}`}
                             >
                               <button 
                                 onClick={() => {
                                    const willExpand = !isPersonaExpanded;
                                    setExpandedPersona(willExpand ? p.id : null);
                                    if (willExpand) handleScrollTo(`persona-mobile-${p.id}`); 
                                 }}
                                 className="w-full flex items-center gap-4 p-4 text-left hover:bg-black/5 transition-colors"
                               >
                                  <div className={`p-2 rounded-full ${isPersonaExpanded ? 'bg-red-solid text-dark' : 'bg-black/5 text-black/60'}`}>
                                     <p.icon className="w-4 h-4" />
                                  </div>
                                  <div className="flex-grow">
                                     <h3 className={`font-serif text-lg leading-tight ${isPersonaExpanded ? 'text-red-text' : 'text-black/70'}`}>{p.title}</h3>
                                     <span className="text-[10px] text-black/60 block mt-1 line-clamp-1">{p.examples}</span>
                                  </div>
                                  <ChevronDown className={`w-4 h-4 transition-transform ${isPersonaExpanded ? 'rotate-180 text-red-solid' : 'text-black/20'}`} />
                               </button>

                               <AnimatePresence>
                                 {isPersonaExpanded && (
                                   <m.div
                                     initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                     className="border-t border-red-solid/20 bg-white"
                                   >
                                      <div className="p-6">
                                         <div className="mb-6">
                                            <span className="text-red-text font-mono text-[10px] uppercase tracking-widest font-bold mb-2 block">The Problem</span>
                                            <h5 className="font-serif text-2xl mb-2 text-dark">{p.painTitle}</h5>
                                            <p className="font-sans text-base text-dark/70 leading-relaxed italic border-l-2 border-red-solid pl-4">"{p.painText}"</p>
                                         </div>

                                         <div className="bg-dark p-6 text-white rounded-sm mb-6 relative overflow-hidden">
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-red-solid/20 rounded-full blur-2xl" />
                                            <span className="font-mono text-[10px] text-red-text uppercase tracking-widest block mb-3 font-bold relative z-10">The Fix</span>
                                            <p className="font-sans text-base leading-relaxed mb-6 relative z-10">{p.solution}</p>
                                            
                                            <div className="w-full flex justify-center py-4 bg-transparent relative z-10">
                                               <div className="w-24 h-24 flex items-center justify-center">
                                                 <TierVisual tierKey={key} />
                                               </div>
                                            </div>
                                         </div>

                                         <div className="w-full">
                                            <CTAButton theme="dark" onClick={() => onNavigate('contact')} className="w-full">
                                                BOOK A CALL
                                            </CTAButton>
                                         </div>

                                         <div className="mt-8 pt-6 border-t border-black/10">
                                            <span className="font-mono text-[10px] text-black/60 uppercase tracking-widest font-bold mb-3 block">Included Specs</span>
                                            <ul className="space-y-2">
                                              {tier.specs.map((spec, i) => (
                                                <li key={i} className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wide text-black/60">
                                                  <CheckCircle className="w-3 h-3 text-red-solid" />
                                                  {spec}
                                                </li>
                                              ))}
                                            </ul>
                                         </div>
                                      </div>
                                   </m.div>
                                 )}
                               </AnimatePresence>
                             </div>
                           )
                         })}
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <FAQSection
        faqs={pillarFAQs}
        accentColor={colors.goldOnCream} 
        title="Questions about websites?"
        subtitle="Common questions about websites and e-commerce."
        onNavigate={onNavigate}
      />
    </m.div>
  );
};

export default Pillar1;
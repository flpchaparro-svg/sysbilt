import React, { useState, useRef } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Terminal, Fingerprint } from 'lucide-react';

// COMPONENTS
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton';
import VideoHUD from '../components/Architect/VideoHUD';

// HOOKS & DATA
import { usePageTitle } from '../hooks/usePageTitle'; 
import { ARCHITECT_CONTENT } from '../constants/architectData'; 

interface ArchitectPageProps {
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

const ArchitectPage: React.FC<ArchitectPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('About');
  const [mode, setMode] = useState<'architect' | 'human'>('architect');
  const current = ARCHITECT_CONTENT[mode];

  const videoRef = useRef<HTMLVideoElement>(null);
  const CUT_OFF_TIME = mode === 'human' ? 0.8 : 0.7;

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      if (video.currentTime >= video.duration - CUT_OFF_TIME) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-cream text-dark relative z-[150] flex flex-col selection:bg-gold/30">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-10">
        
        <div className="flex justify-between items-center mb-12 md:mb-20 pt-24 relative z-[200]">
          <BackButton onClick={onBack} label="Return to Home" />
        </div>

        {/* HEADER & SWITCH */}
        <Section className="mb-16 md:mb-24 relative text-center lg:text-left">
           <div className="flex items-center gap-0 mb-12 border border-dark/10 bg-white p-1 rounded-sm w-fit shadow-lg mx-auto lg:mx-0">
              <button 
                onClick={() => setMode('architect')}
                className={`px-5 md:px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-snap rounded-sm flex items-center gap-2 ${
                  mode === 'architect' ? 'text-cream bg-dark shadow-md' : 'text-dark/60'
                }`}
              >
                {mode === 'architect' && <Terminal className="w-3 h-3" />} THE TEAM
              </button>
              <button 
                onClick={() => setMode('human')}
                className={`px-5 md:px-8 py-3.5 text-xs font-mono uppercase tracking-[0.2em] font-bold transition-all duration-snap rounded-sm flex items-center gap-2 ${
                  mode === 'human' ? 'text-dark bg-gold shadow-md' : 'text-dark/60'
                }`}
              >
                {mode === 'human' && <Fingerprint className="w-3 h-3" />} THE FOUNDER
              </button>
           </div>

           <AnimatePresence mode="wait">
             <m.h1
               key={mode}
               initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
               className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark max-w-5xl mb-6 md:mb-10 mx-auto lg:mx-0"
             >
               {current.headline}
             </m.h1>
           </AnimatePresence>
        </Section>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-20 md:mb-24">
           <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="sticky top-32">
                <AnimatePresence mode="wait">
                  <m.div key={mode} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full max-w-[400px] mx-auto lg:max-w-none">
                    <div className={`aspect-[9/16] relative overflow-hidden transition-all duration-flow shadow-2xl ${
                        mode === 'architect' ? 'rounded-sm border-2 border-dark' : 'rounded-t-full border-4 border-gold/20'
                    }`}>
                      
                      {/* MAIN VIDEO PLAYER - seamless loop via CUT_OFF_TIME + onEnded only (no native loop to avoid conflict) */}
                      {/* scale-[1.15] zooms in slightly to crop out the VEO watermark */}
                      {/* aria-hidden & role="presentation" for decorative video with no speech */}
                      <video
                        ref={videoRef}
                        key={mode}
                        className="w-full h-full object-cover contrast-110 scale-[1.15]"
                        autoPlay
                        muted
                        playsInline
                        preload="metadata"
                        poster={mode === 'architect' ? "/images/sysbilt-strategy.webp" : "/images/felipe-chaparro-business-consultant-profile.webp"}
                        onTimeUpdate={handleTimeUpdate}
                        onEnded={handleEnded}
                        aria-hidden="true"
                        role="presentation"
                      >
                        <source 
                          src={mode === 'architect' ? "/videos/the_architect_strategy.webm" : "/videos/the_architect_human.webm"} 
                          type="video/webm" 
                        />
                      </video>

                      {/* Dark overlay for better contrast */}
                      <div className="absolute inset-0 bg-black/10" />
                      
                      {/* VideoHUD is just a transparent overlay with scanlines & LIVE FEED indicator */}
                      {mode === 'architect' && <VideoHUD />}

                    </div>
                  </m.div>
                </AnimatePresence>
              </div>
           </div>

           <div className="lg:col-span-7 order-1 lg:order-2">
              <AnimatePresence mode="wait">
                <m.div key={mode} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-16">
                  <Section>
                    <p className={`font-sans text-lg md:text-xl font-light leading-relaxed border-l-2 pl-6 mb-8 ${mode === 'architect' ? 'border-red-solid' : 'border-gold'}`}>
                      {current.subhead}
                    </p>
                  </Section>

                  <div className="relative ml-3 md:ml-6 space-y-0">
                    <div className="absolute left-0 top-4 bottom-4 w-px bg-dark/10" />
                    {current.timeline.map((step, idx) => (
                      <Section key={step.id} delay={idx * 0.1} className="relative pl-12 md:pl-16 pb-16 group last:pb-0">
                         <div className={`absolute -left-3 md:-left-4 top-0 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center border-4 border-cream z-10 ${mode === 'architect' ? 'bg-dark text-white' : 'bg-gold text-white'}`}>
                            <step.icon className="w-3 h-3 md:w-4 md:h-4" />
                         </div>
                         <h2 className="font-serif text-2xl md:text-3xl mb-4">{step.title}</h2>
                         <p className="font-sans text-base text-dark/70 leading-relaxed max-w-lg">{step.text}</p>
                      </Section>
                    ))}
                  </div>
                </m.div>
              </AnimatePresence>
           </div>
        </div>
        
        {/* FOOTER CTA */}
        <Section className="border-t border-black/10 py-20 md:py-24 flex flex-col items-center text-center">
           <h2 className="font-serif text-4xl md:text-7xl tracking-tighter mb-12">
             Ready to build your <span className="italic font-serif text-gold-on-cream">system?</span>
           </h2>
           <CTAButton theme={mode === 'architect' ? 'light' : 'dark'} onClick={() => onNavigate('contact')}>
             BOOK A CALL
           </CTAButton>
        </Section>
      </div>
    </m.div>
  );
};

export default ArchitectPage;

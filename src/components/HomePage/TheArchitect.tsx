import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const TheArchitect: React.FC = () => {
  const [mode, setMode] = useState<'architect' | 'human'>('human');

  return (
    <section id="origins" className="w-full bg-cream py-20 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/5">
      <div className="max-w-[1600px] mx-auto relative">
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-12 lg:gap-24 relative items-start">
      
          {/* LEFT: LIVING PORTRAIT CONTAINER */}
          <m.div 
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-1 md:row-start-1 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-3 relative group lg:sticky lg:top-1/2 lg:-translate-y-1/2 lg:self-start"
          >
            <div className="aspect-[9/16] md:max-h-[70vh] lg:max-h-[85vh] bg-dark relative overflow-visible shadow-2xl">
              {/* Structural Frame - Inside the video container so it scales together */}
              <div className={`absolute -inset-4 border border-dark/10 transition-all duration-1000 pointer-events-none ${mode === 'architect' ? 'opacity-100' : 'opacity-30'}`} />
              <div className={`absolute -inset-1 border border-dark transition-all duration-1000 pointer-events-none ${mode === 'architect' ? 'border-dark' : 'border-gold'}`} />
              
              {/* Video container with overflow-hidden to clip video content */}
              <div className="w-full h-full relative overflow-hidden">
                {/* Video in 9:16 ratio */}
                <m.div
                  className="w-full h-full relative"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    poster="/images/felipe-chaparro-sysbilt-sydney.webp"
                    aria-label="AI-generated video clone of Felipe Chaparro, demonstrating the SYSBILT system."
                  >
                    <source src="/videos/sysbilt-system-About-video.webm" type="video/webm" />
                    <img
                      src="/images/felipe-chaparro-sysbilt-sydney.webp"
                      alt="Felipe Chaparro - SYSBILT architect in Sydney - AI avatar video clone"
                      style={{ display: 'none' }}
                      loading="eager"
                      decoding="async"
                    />
                    Your browser does not support the video tag.
                    <track kind="captions" srcLang="en" label="English" src="" default />
                  </video>
                  {/* Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
                </m.div>
              </div>
           
              {/* Technical Overlay */}
              <div className="absolute top-6 left-6 z-20">
                {/* Type B: Card Tag */}
                <div className={`type-eyebrow flex items-center gap-3 transition-colors duration-flow ${mode === 'architect' ? 'text-white/80' : 'text-gold-on-cream'}`}>
                   <span className="w-1.5 h-1.5 rounded-full bg-red-solid animate-pulse" />
                   FELIPE CHAPARRO / SYDNEY
                </div>
              </div>

              {/* Bottom Badge */}
              <div className="absolute bottom-0 right-0 p-6 z-20">
                 <ShieldCheck className={`w-10 h-10 transition-colors duration-700 ${mode === 'architect' ? 'text-white/20' : 'text-gold-on-cream'}`} />
              </div>
            </div>
          </m.div>

          {/* Intro: eyebrow + H2 + sub (mobile: after video; tablet: top-right; desktop: col 6–12 row 1) */}
          <div className="relative md:col-span-2 md:row-start-1 lg:col-span-7 lg:col-start-6 lg:row-start-1">
            <span className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/80 mb-6 md:mb-10">
              / WHO WE ARE
            </span>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8 md:mb-10 text-dark tracking-tight">
              <span className="sr-only">About Felipe Chaparro, Revenue Systems Architect</span>
              <span aria-hidden="true">
                Built by people who have{' '}
                <span className="italic text-gold-on-cream">actually run businesses</span>
              </span>
            </h2>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 border-l-2 border-dark/10 pl-8 max-w-xl">
              We don&apos;t just write code. We build systems based on what actually works on the floor.
            </p>
          </div>

          {/* Modes + team/founder copy: stacked; tablet = full width under row 1; lg = right col rows 2–3 */}
          <div className="flex flex-col gap-8 md:gap-10 lg:gap-12 md:col-span-3 md:row-start-2 lg:col-span-7 lg:col-start-6 lg:row-start-2 lg:row-span-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 border-b border-black/5 pb-8 w-full">
              <div className="flex bg-dark/5 p-1.5 rounded-sm w-fit">
                <button 
                  onClick={() => setMode('architect')}
                  className={`relative px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all duration-snap rounded-sm ${
                    mode === 'architect' 
                      ? 'bg-dark text-cream shadow-lg' 
                      : 'text-dark/70 hover:text-dark hover:bg-black/5'
                  }`}
                >
                  THE TEAM
                </button>
            
                <button 
                  onClick={() => setMode('human')}
                  className={`relative px-8 py-3 font-mono text-xs uppercase tracking-[0.25em] font-bold transition-all duration-snap rounded-sm ${
                    mode === 'human' 
                      ? 'bg-gold text-white shadow-lg' 
                      : 'text-dark/70 hover:text-dark hover:bg-black/5'
                  }`}
                >
                  THE FOUNDER
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <m.div
                key={mode}
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-dark mb-6 md:mb-8 leading-tight tracking-tight">
                  {mode === 'architect'
                    ? 'We run our business on the same systems we build for you'
                    : 'Felipe Chaparro'}
                </h3>
                <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-xl md:max-w-none lg:max-w-xl">
                  {mode === 'architect'
                    ? "Small team, real experience. We've worked inside businesses like yours and we know what operations actually look like. We take on a few clients at a time so every build gets proper attention."
                    : "Before SYSBILT, Felipe ran companies, managed franchises, and worked the floor. He knows what it's like to chase invoices on a Sunday and train staff who won't read the manual. He built SYSBILT to create the exact systems he wished he had back then."}
                </p>
              </m.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TheArchitect;

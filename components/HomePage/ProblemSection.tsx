import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { XCircle } from 'lucide-react';
import { m } from 'framer-motion';
// FIX 1: Import Type only (saves bundle size)
import type { GraphState } from './GrowthGraph';
import CTAButton from '../CTAButton';

// FIX 2: Lazy load the heavy component to stop "Forced Reflow" on load
const GrowthGraph = lazy(() => import('./GrowthGraph'));

const ProblemSection: React.FC = () => {
  const [graphState, setGraphState] = useState<GraphState>('idle');
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autoRotateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMobileRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile Auto-Rotation Logic
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout | null = null;
    
    const startRotation = () => {
      if (!isMobileRef.current) return;
      
      const scannerStates: GraphState[] = ['bottleneck', 'tax', 'grind', 'cost'];
      let currentIndex = 0;

      autoRotateIntervalRef.current = setInterval(() => {
        setGraphState(scannerStates[currentIndex]);
        currentIndex = (currentIndex + 1) % scannerStates.length;
      }, 2500);
    };

    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      isMobileRef.current = mobile;
      setIsMobile(mobile);
      
      if (autoRotateIntervalRef.current) {
        clearInterval(autoRotateIntervalRef.current);
        autoRotateIntervalRef.current = null;
      }
      
      if (mobile) {
        setTimeout(startRotation, 3000); 
      }
    };
    
    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(checkMobile, 150);
    };
    
    checkMobile();
    window.addEventListener('resize', handleResize);
    return () => {
      if (autoRotateIntervalRef.current) clearInterval(autoRotateIntervalRef.current);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGraphHover = (state: GraphState) => {
    if (isMobileRef.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setGraphState(state);
  };
  
  const handleGraphLeave = () => {
    if (isMobileRef.current) return;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => setGraphState('idle'), 50);
  };

  return (
    <m.section 
      id="problem" 
      aria-label="Problem Section" 
      initial={{ opacity: 0 }} 
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, margin: "-100px" }} 
      className="w-full bg-cream py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-16 md:h-32 w-[1px] bg-dark/10" />
      <div className="max-w-[1600px] mx-auto border-t border-l border-dark/10">
        {/*
          Row1: problem | graph. Row2: symptoms | (03 THE COST stacked above 04 THE FIX — one column).
          md: 6-col (3+3 on row2). lg: 3-col (1+2 on row2).
        */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-3">
            
          {/* THE PROBLEM */}
          <div className="col-span-1 md:col-span-4 lg:col-span-2 p-8 md:p-12 lg:p-16 border-r border-b border-dark/10 flex flex-col justify-center min-h-[300px] md:min-h-[400px] transition-colors duration-snap hover:bg-dark/5 group">
            <span className="type-eyebrow text-red-text mb-6 md:mb-10 block">/ WHAT WE SEE EVERY DAY</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] text-dark tracking-tighter">
              You didn't build a business to do paperwork
            </h2>
          </div>

          {/* GRAPH CONTAINER */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 border-r border-b border-dark/10 bg-transparent flex items-center justify-center p-8">
            {/* FIX 3: Suspense Wrapper - Keeps layout intact but loads graph later */}
            <Suspense fallback={<div className="w-full h-full min-h-[300px] flex items-center justify-center font-mono text-xs text-red-text/30 tracking-widest">LOADING DATA...</div>}>
               <GrowthGraph currentState={graphState} />
            </Suspense>
          </div>

          {/* SYMPTOMS */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1 p-8 md:p-12 border-r border-b border-dark/10 min-h-[300px] md:min-h-[400px] flex flex-col">
            <span className="type-eyebrow text-red-text mb-6 md:mb-8 block">02 / SYMPTOMS</span>
            <ul className="space-y-6">
              <li onMouseEnter={() => handleGraphHover('bottleneck')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-dark/5 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-red-solid shrink-0 mt-1 pointer-events-none" />
                <div className="pointer-events-none leading-relaxed min-w-0">
                  <h3 className="font-serif text-xl md:text-2xl text-dark tracking-tight block mb-1">The Bottleneck Boss</h3>
                  <span className="font-sans text-base md:text-lg leading-relaxed text-dark/70">Your team waits for you to answer every question instead of just doing the work.</span>
                </div>
              </li>
              <li onMouseEnter={() => handleGraphHover('tax')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-dark/5 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-red-solid shrink-0 mt-1 pointer-events-none" />
                <div className="pointer-events-none leading-relaxed min-w-0">
                  <h3 className="font-serif text-xl md:text-2xl text-dark tracking-tight block mb-1">The Double-Entry Tax</h3>
                  <span className="font-sans text-base md:text-lg leading-relaxed text-dark/70">The same client details get typed into three apps by three people, every single day.</span>
                </div>
              </li>
              <li onMouseEnter={() => handleGraphHover('grind')} onMouseLeave={handleGraphLeave} className="flex items-start gap-4 p-3 -ml-3 rounded-lg hover:bg-dark/5 transition-colors duration-200">
                <XCircle className="w-5 h-5 text-red-solid shrink-0 mt-1 pointer-events-none" />
                <div className="pointer-events-none leading-relaxed min-w-0">
                  <h3 className="font-serif text-xl md:text-2xl text-dark tracking-tight block mb-1">The Sunday Dread</h3>
                  <span className="font-sans text-base md:text-lg leading-relaxed text-dark/70">Your weekend disappears into invoicing and admin while your family waits.</span>
                </div>
              </li>
            </ul>
          </div>

          {/* 03 + 04 — stacked: cost on top, fix underneath (single column) */}
          <div className="col-span-1 md:col-span-3 lg:col-span-2 flex flex-col border-r border-b border-dark/10 min-h-0">
            <div
              onMouseEnter={() => handleGraphHover('cost')}
              onMouseLeave={handleGraphLeave}
              className="p-8 md:p-12 bg-red-solid/5 hover:bg-red-solid/10 transition-colors duration-snap relative overflow-hidden group flex flex-col justify-between flex-1 min-h-[220px] md:min-h-0 border-b border-dark/10"
            >
              <div className="absolute inset-0 bg-red-solid/0 group-hover:bg-red-solid/10 transition-colors duration-flow" />
              <span className="type-eyebrow text-red-text mb-6 block relative z-10">03 / THE COST</span>
              <div className="space-y-4 relative z-10 flex-1 flex flex-col min-w-0">
                <h2 className="font-mono text-2xl md:text-3xl font-bold text-red-text tracking-tighter leading-tight">
                  Your best people are bored
                </h2>
                <p className="font-mono text-sm md:text-base text-red-text/80 leading-relaxed tracking-[0.12em] font-medium max-w-md">
                  You're paying skilled staff to do unskilled work. They get bored, they leave, and you hire again.
                </p>
                <div className="pt-4 mt-auto">
                  <CTAButton
                    variant="bracket"
                    theme="light"
                    onClick={() => document.getElementById('seven-pillars')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    SEE THE SYSTEM
                  </CTAButton>
                </div>
              </div>
            </div>

            <div
              onMouseEnter={() => handleGraphHover('fix')}
              onMouseLeave={handleGraphLeave}
              className="p-8 md:p-12 bg-dark text-white flex flex-col justify-between flex-1 min-h-[220px] md:min-h-[280px] border-l-2 border-l-gold"
            >
              <span className="type-eyebrow text-gold-on-dark block mb-4 md:mb-0">04 / THE FIX</span>
              <p className="font-serif text-3xl md:text-4xl leading-tight mb-6 md:mb-8 hover:text-gold-on-dark transition-colors duration-snap">
                Your team gets their time back. You get your business back. The boring work runs itself.
              </p>
              <CTAButton
                variant="bracket"
                theme="dark"
                onClick={() => document.getElementById('seven-pillars')?.scrollIntoView({ behavior: 'smooth' })}
              >
                SEE THE SYSTEM
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </m.section>
  );
};

export default ProblemSection;

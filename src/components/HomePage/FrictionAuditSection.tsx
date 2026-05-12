import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import CTAButton from '../CTAButton';

// --- DATA ---
export const AUDIT_DATA = [
  {
    id: '01',
    title: 'Leads go cold',
    metric: 'HOURS, NOT MINUTES',
    label: 'REVENUE LEAK',
    description:
      "Someone fills out your contact form and you see it the next day. By then they've called your competitor. Speed wins jobs and right now you're too slow.",
    type: 'data'
  },
  {
    id: '02',
    title: 'The copy-paste loop',
    metric: 'SAME DATA, THREE TIMES',
    label: 'TIME LEAK',
    description:
      "Sales types it, ops types it again, and finance types it a third time. You're paying three people to do one job and the errors multiply with every handoff.",
    type: 'data'
  },
  {
    id: '03',
    title: 'You are the bottleneck',
    metric: 'EVERYTHING WAITS FOR YOU',
    label: 'GROWTH BLOCKER',
    description:
      "Your phone buzzes all day with questions only you can answer. Deep work is impossible because you're everyone's helpdesk. The business can't move faster than you can reply.",
    type: 'data'
  },
  {
    id: '04',
    title: 'Flying without instruments',
    metric: 'NO REAL-TIME NUMBERS',
    label: 'BLIND SPOT',
    description:
      "You know your revenue but not your real margin. You wait for the accountant to tell you if last month was good or bad, and by then it's too late to fix anything.",
    type: 'data'
  },
  {
    id: '05',
    title: "You've seen the leak",
    metric: '',
    description: "",
    type: 'cta'
  }
];

// --- DESKTOP COMPONENTS ---
interface AuditCubeVisualProps {
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}

const AuditCubeVisual: React.FC<AuditCubeVisualProps> = ({ scrollYProgress }) => {
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 720]);
  return (
    <div className="relative w-24 h-24 md:w-32 md:h-32 mb-10 border-2 border-dark bg-transparent">
      <m.div 
        className="absolute inset-0 border-2 border-dark bg-transparent"
        style={{ rotate, willChange: "transform" }}
      >
         <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-dark -translate-x-1/2 -translate-y-1/2" />
      </m.div>
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
        <div className="border-r border-b border-dark/10"></div>
        <div className="border-b border-dark/10"></div>
        <div className="border-r border-dark/10"></div>
        <div className=""></div>
      </div>
    </div>
  );
};

interface CardProps {
  data: typeof AUDIT_DATA[0];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  onNavigate?: (v: string) => void;
}

const Card: React.FC<CardProps> = ({ data, index, total, scrollYProgress, onNavigate }) => {
  const step = 0.25; 
  const peak = index * step;
  const range = [peak - step, peak, peak + step];

  const rotateX = useTransform(scrollYProgress, range, [-90, 0, 90]);
  const opacity = useTransform(scrollYProgress, [peak - 0.25, peak - 0.15, peak, peak + 0.15, peak + 0.25], [0, 1, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, range, [0.8, 1, 0.8]);
  const y = useTransform(scrollYProgress, range, ["50%", "0%", "-50%"]);
  const zIndex = useTransform(scrollYProgress, [peak - 0.01, peak + 0.01], [0, 10]); 
  const pointerEvents = useTransform(opacity, v => v > 0.5 ? 'auto' : 'none');

  return (
    <m.div
      style={{ opacity, rotateX, scale, y, zIndex, pointerEvents, transformStyle: "preserve-3d", backfaceVisibility: "hidden", willChange: "transform, opacity" }}
      className="absolute inset-0 w-full h-full flex flex-col justify-center bg-cream origin-center"
    >
      <div className="w-full h-full p-6 md:p-12 lg:p-20 flex flex-col justify-center max-w-[1600px] mx-auto">
        {data.type === 'cta' ? (
           <div className="flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto">
              {/* FIXED: Reduced to text-7xl max to be smaller than Hero (8xl) */}
              <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-dark leading-tight tracking-tighter mb-10">
                You've seen the <span className="text-red-text">leak</span>
              </h2>
              <CTAButton theme="light" onClick={() => document.getElementById('seven-pillars')?.scrollIntoView({ behavior: 'smooth' })}>
                SEE THE FIX
              </CTAButton>
           </div>
        ) : (
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
              <div className="flex flex-col space-y-8 md:space-y-10">
                 <div className="flex items-center gap-4">
                    {/* Pain point number: text-4xl → text-6xl */}
                    <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark/10 italic font-bold" aria-hidden="true">
                      {data.id}
                    </span>
                    <div className="h-px flex-1 bg-dark/20"></div>
                    {/* Type B: Card Tag - font-mono, font-bold, text-[10px], tracking-[0.2em] */}
                    <span className="type-eyebrow text-red-text border border-red-solid/20 px-2 py-1">{data.label}</span>
                 </div>
                 <div>
                    {/* Pain point title: H3 under section H2 */}
                    <h3 className="font-serif text-3xl md:text-4xl text-dark leading-[1.1] tracking-tight mb-8">
                      {data.title}
                    </h3>
                    <div className="inline-block bg-red-solid/10 px-6 py-3">
                       {/* Stat callouts: text-base → text-lg (labels like "NO VISIBILITY" should be smaller) */}
                       <span className="font-mono text-xs md:text-sm text-red-text font-bold tracking-[0.2em] uppercase">{data.metric}</span>
                    </div>
                 </div>
                 {/* Pain point body: text-base → text-lg */}
                 <p className="font-sans text-base md:text-lg leading-relaxed text-dark/70 border-l-2 border-red-solid/20 pl-8 max-w-xl">{data.description}</p>
              </div>
              <div className="hidden lg:flex items-center justify-center h-full min-h-[400px]">
                 <AuditCubeVisual scrollYProgress={scrollYProgress} />
              </div>
           </div>
        )}
      </div>
    </m.div>
  );
};

// --- MAIN SECTION ---
interface FrictionAuditSectionProps {
  onNavigate: (v: string) => void;
}

const FrictionAuditSection: React.FC<FrictionAuditSectionProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative bg-cream z-30">
       
      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex relative h-[500vh]">
         <div className="absolute inset-0 flex flex-col pointer-events-none z-0">
            {[...Array(5)].map((_, i) => (
               <div key={i} className="h-screen w-full snap-start" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'normal' }} />
            ))}
         </div>

         <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-row z-10 border-t border-dark/10">
           {/* Desktop Left Panel */}
           <div className="w-[450px] xl:w-[500px] h-full border-r border-dark/10 bg-cream p-12 xl:p-16 flex flex-col justify-between shrink-0 z-50">
              <div>
                 <div className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text flex items-center gap-2">
                    / THE FRICTION AUDIT
                 </div>
                 <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] text-dark tracking-tighter mb-10">
                    <span className="sr-only">Business Process Audit: Identifying Revenue &amp; Time Leaks</span>
                    <span aria-hidden="true">
                      Where your <span className="text-red-text">week</span>{' '}
                      <span className="italic text-red-text">disappears</span>
                    </span>
                 </h2>
                 <div className="w-16 h-1 bg-dark mb-10"></div>
                 <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-sm">
                    Your business isn't broken, but it is leaking. These are the four places where time and money vanish before you notice.
                 </p>
              </div>
              
              <div>
                 {/* Type B: Card Tag - text-[10px], font-bold, tracking-[0.2em] */}
                 <div className="font-mono text-[10px] font-bold text-dark/70 uppercase tracking-[0.2em] mb-4">AUDIT PROGRESS</div>
                 <div className="w-full h-1 bg-dark/10 relative overflow-hidden">
                    <m.div 
                       className="h-full bg-red-solid" 
                       style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
                    />
                 </div>
                 <div className="mt-3 text-right font-mono text-xs font-bold text-dark">
                    <m.span>
                       {useTransform(scrollYProgress, v => `${Math.min(100, Math.round(v * 100))}%`)}
                    </m.span>
                 </div>
              </div>
           </div>

           {/* Desktop Right Panel */}
           <div className="flex-1 relative h-full bg-cream overflow-hidden" style={{ perspective: "1000px" }}>
              {AUDIT_DATA.map((data, index) => (
                <Card 
                  key={data.id}
                  data={data}
                  index={index}
                  total={AUDIT_DATA.length}
                  scrollYProgress={scrollYProgress}
                  onNavigate={onNavigate}
                />
              ))}
              <div className="absolute inset-0 pointer-events-none opacity-5 z-0" 
                style={{ backgroundImage: 'radial-gradient(var(--dark) 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
              />
           </div>
         </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden relative border-t border-dark/10">
         
         {/* HEADER */}
         <div className="sticky top-0 h-[45vh] w-full bg-cream border-b border-dark/10 p-6 flex flex-col justify-center z-10">
            <div className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text flex items-center gap-2">
               / THE FRICTION AUDIT
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-6">
               <span className="sr-only">Business Process Audit: Identifying Revenue &amp; Time Leaks</span>
               <span aria-hidden="true">
                 Where your <span className="text-red-text">week</span>{' '}
                 <span className="italic text-red-text">disappears</span>
               </span>
            </h2>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-sm">
               Your business isn't broken, but it is leaking. These are the four places where time and money vanish before you notice.
            </p>
         </div>

         {/* CARDS */}
         <div className="relative z-20">
            {AUDIT_DATA.map((data, index) => (
               <div 
                  key={data.id}
                  className="sticky top-[45vh] h-[55vh] w-full bg-cream border-b border-dark/10 flex flex-col shadow-[-10px_0_20px_rgba(0,0,0,0.05)]"
                  style={{ zIndex: 20 + index }}
               >
                  {data.type === 'cta' ? (
                     <div className="flex flex-col items-center justify-center text-center h-full px-6 bg-cream">
                        <h2 className="font-serif text-3xl text-dark leading-tight tracking-tighter mb-8">
                           You've seen the <span className="text-red-text">leak</span>
                        </h2>
                        <CTAButton theme="light" onClick={() => document.getElementById('seven-pillars')?.scrollIntoView({ behavior: 'smooth' })} className="w-full">
                           SEE THE FIX
                        </CTAButton>
                     </div>
                  ) : (
                     <div className="flex flex-col h-full px-6 pt-8 pb-6 bg-cream">
                        <div className="flex items-center gap-3 mb-6 opacity-80">
                           {/* Mobile: Pain point number should scale too */}
                           <span className="font-serif text-4xl md:text-5xl italic font-bold text-red-text">{data.id}</span>
                           <div className="w-8 h-px bg-red-solid/30"></div>
                           {/* Type B: Card Tag (inside mobile card) */}
                           <span className="type-eyebrow text-red-text">
                              {data.label}
                           </span>
                        </div>
                        {/* Pain point title: H3 under section H2 */}
                        <h3 className="font-serif text-3xl md:text-4xl text-dark leading-[1.1] tracking-tight mb-4">
                          {data.title}
                        </h3>
                        <div className="mb-6">
                           {/* Mobile: Stat callouts: text-base → text-lg (labels like "NO VISIBILITY" should be smaller) */}
                           <span className="font-mono text-xs md:text-sm text-red-text font-bold tracking-[0.2em] uppercase bg-red-solid/5 px-3 py-1">
                              {data.metric}
                           </span>
                        </div>
                        {/* Mobile: Pain point body: text-base → text-lg */}
                        <p className="font-sans text-base md:text-lg leading-relaxed text-dark/70 border-l-2 border-red-solid/20 pl-8 max-w-xl">
                           {data.description}
                        </p>
                     </div>
                  )}
               </div>
            ))}
         </div>

      </div>
    </section>
  );
};

export default FrictionAuditSection;

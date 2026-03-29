import React, { useRef, lazy, Suspense } from 'react';
import { 
  m, 
  useScroll, 
  useMotionValueEvent, 
  useAnimationFrame, 
  useMotionValue, 
  useTransform 
} from 'framer-motion';
import GlobalFooter from '../../components/GlobalFooter';
import HeroVisual_Suspension from '../../components/System/HeroVisual_Suspension';
import FAQSection from '../../components/FAQSection';
import { getSystemPageFAQs } from '../../constants/faqData';
import { colors } from '../../constants/theme';
import BackButton from '../../components/BackButton';
import SystemGrid from '../../components/System/SystemGrid';
import { usePageTitle } from '../../hooks/usePageTitle';

// Lazy load the scroll-heavy section
const SystemArchitecture = lazy(() => import('../../components/System/SystemArchitecture').then(module => ({ default: module.SystemArchitecture })));

interface SystemPageProps {
  onBack: () => void;
  onNavigate: (path: string) => void;
}

const SystemPage: React.FC<SystemPageProps> = ({ onBack, onNavigate }) => {
  usePageTitle('Services');
  const systemFAQs = getSystemPageFAQs();

  // --- OPTIMIZED HERO SCROLL LOGIC ---
  // (This logic only affects the Hero now, which is correct)
  const { scrollY } = useScroll();
  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);
  const scrollVelocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(Date.now());
  const decayTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useAnimationFrame((time, delta) => {
    let newY = scrollLineY.get() + (scrollLineSpeed.get() * delta);
    if (newY >= 100) newY = -100;
    scrollLineY.set(newY);
  });
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    const now = Date.now();
    const timeDelta = now - lastTimeRef.current;
    if (timeDelta > 0) {
      const scrollDelta = Math.abs(latest - lastScrollYRef.current);
      if (scrollDelta > 0) {
        const velocity = scrollDelta / timeDelta;
        scrollVelocityRef.current = velocity;
        const newSpeed = Math.min(0.067 + (velocity * 0.0001), 0.5);
        scrollLineSpeed.set(newSpeed);
        if (decayTimeoutRef.current) clearTimeout(decayTimeoutRef.current);
        decayTimeoutRef.current = setTimeout(() => {
          if (scrollLineSpeed.get() > 0.067) scrollLineSpeed.set(0.067);
        }, 100);
      }
    }
    lastScrollYRef.current = latest;
    lastTimeRef.current = now;
  });

  const heroContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
  const heroItem = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 40, damping: 20 } } };

  return (
    <div className="min-h-screen bg-cream text-dark pt-0 pb-0 px-0 relative z-[150] flex flex-col font-sans">
      
      {/* 1. HERO SECTION (Static Props, Self-Contained Animation) */}
      <section className="relative h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-4 pt-24 relative z-20">
            <BackButton onClick={onBack} label="Return to Home" />
          </div>
          
          <m.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={heroContainer} 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center"
          >
            <div className="flex flex-col justify-center">
              <m.h1 variants={heroItem} className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark mb-6 md:mb-10 break-words">
                You built the business, now the business <span className="italic font-serif text-gold-on-cream">runs you</span>
              </m.h1>
              <m.p variants={heroItem} className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-gold pl-6 mb-8">
                Every decision waits on you. Leads slip through because nobody followed up. Your team asks you the same questions every day. We build a 7-part system that fixes the plumbing so you can focus on the work that actually grows revenue.
              </m.p>
            </div>
            <m.div variants={heroItem} className="w-full h-auto lg:h-full flex items-center justify-center lg:justify-end -mt-8 md:-mt-4 lg:mt-0 pb-16 md:pb-12 lg:pb-0">
              <div className="w-full max-w-full flex items-center justify-center">
                <HeroVisual_Suspension />
              </div>
            </m.div>
          </m.div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-dark/10 overflow-hidden z-30" aria-hidden="true">
          <m.div style={{ y: useTransform(scrollLineY, (v) => `${v}%`) }} className="absolute inset-0 bg-dark/40 w-full h-full" />
        </div>
      </section>

      {/* 2. SCROLLYTELLING INTRO */}
      <section className="w-full bg-cream py-16 md:py-20 px-6 md:px-12 lg:px-20 border-t border-dark/10">
        <div className="max-w-[1400px] mx-auto text-center">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-muted mb-6 block">
            / THE 3 STAGES
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark mb-6">
            Where are you <span className="italic font-serif text-gold-on-cream">right now</span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl mx-auto">
            Most businesses fit into one of three stages. Find yours.
          </p>
        </div>
      </section>

      {/* 3. SCROLLYTELLING (Lazy Loaded) */}
      <Suspense fallback={<div className="h-[50vh] bg-cream" />}>
        <section className="relative z-0 mb-16 md:mb-20">
           <SystemArchitecture />
        </section>
      </Suspense>

      {/* 3. GRID BLUEPRINT (Isolated State) */}
      <section className="w-full bg-cream pb-20 md:pb-24 relative z-10">
        <SystemGrid onNavigate={onNavigate} />
      </section>

      {/* 4. STATIC FOOTER CONTENT */}
      <FAQSection faqs={systemFAQs} accentColor={colors.goldOnCream} title={<>Questions about <span className="italic text-gold-on-cream">how this works</span></>} subtitle="The most common things people ask before they book a call" onNavigate={onNavigate} />
      <GlobalFooter onNavigate={onNavigate} />
    </div>
  );
};

export default SystemPage;

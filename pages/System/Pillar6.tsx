import React, { useState, useRef } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useScroll } from 'framer-motion';
import CTAButton from '../../components/CTAButton';
import BackButton from '../../components/BackButton';
import PillarVisual_Helix from '../../components/Pillar6/PillarVisual_Helix';
import { pillar6Copy } from '../../constants/pillar6Copy';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import { colors } from '../../constants/theme';
import SolutionCardPillar from '../../components/System/SolutionCardPillar';

interface Pillar6Props {
  onNavigate: (view: string, sectionId?: string) => void;
}

const AnimatedCardLeft = ({ data }: { data: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardX = useTransform(scrollYProgress, [0, 1], ["15vw", "-15vw"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["-35vw", "35vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative w-full flex justify-center items-center py-12 md:min-h-[25vh] md:py-8 overflow-hidden">
      <motion.div style={{ x: lineX, opacity }} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[2px] bg-gold w-[60vw] md:w-[800px] z-0 pointer-events-none" />
      <motion.div style={{ x: cardX, opacity }} className="relative z-10 w-[85vw] md:w-[550px] shrink-0 bg-cream/80 backdrop-blur-md border border-dark p-8 md:p-12">
        <div className="font-mono text-xs font-bold text-gold-on-cream mb-8 border-b border-dark/10 pb-4 flex justify-end items-center">
          <span className="bg-gold/10 text-gold-on-cream px-2 py-1">{data.tag || '[SYS_BLEED]'}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl leading-tight text-dark mb-6">{data.title}</h3>
        <p className="font-sans text-lg text-dark/70 leading-relaxed">{data.desc}</p>
      </motion.div>
    </div>
  );
};

const AnimatedCardRight = ({ data }: { data: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const cardX = useTransform(scrollYProgress, [0, 1], ["-15vw", "15vw"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["35vw", "-35vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative w-full flex justify-center items-center py-12 md:min-h-[25vh] md:py-8 overflow-hidden">
      <motion.div style={{ x: lineX, opacity }} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[2px] bg-gold w-[60vw] md:w-[800px] z-0 pointer-events-none" />
      <motion.div style={{ x: cardX, opacity }} className="relative z-10 w-[85vw] md:w-[550px] shrink-0 bg-cream/80 backdrop-blur-md border border-dark p-8 md:p-12">
        <div className="font-mono text-xs font-bold text-gold-on-cream mb-8 border-b border-dark/10 pb-4 flex justify-end items-center">
          <span className="bg-gold/10 text-gold-on-cream px-2 py-1">{data.tag || '[CRITICAL_FAIL]'}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl leading-tight text-dark mb-6">{data.title}</h3>
        <p className="font-sans text-lg text-dark/70 leading-relaxed">{data.desc}</p>
      </motion.div>
    </div>
  );
};

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.3 } } };

const Pillar6: React.FC<Pillar6Props> = ({ onNavigate }) => {
  const pillarFAQs = getPillarFAQs('pillar6');
  const { hero, gap, solution, engine } = pillar6Copy;

  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);
  useAnimationFrame((_t, delta) => {
    let next = scrollLineY.get() + scrollLineSpeed.get() * delta;
    if (next >= 100) next = -100;
    scrollLineY.set(next);
  });
  const scrollLineYPercent = useTransform(scrollLineY, (v) => `${v}%`);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-cream text-dark px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans">

      {/* HERO */}
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-8 md:mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
              <h1 className="font-serif text-[2.75rem] md:text-[3.5rem] lg:text-[4.75rem] xl:text-[5.5rem] leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark mb-8 md:mb-10">
                A system is only as good as the <span className="italic font-serif text-gold-on-cream drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">team using it</span>
              </h1>
              <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-gold pl-6 mb-10 md:mb-8">{hero.sub}</p>
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-8 items-start mt-2">
                <CTAButton theme="light" onClick={() => onNavigate('contact')}>{hero.ctaPrimary}</CTAButton>
              </div>
            </div>
            <div className="hidden lg:flex w-full h-full items-center justify-end">
              <div className="relative w-full max-w-[450px] h-[450px] opacity-90 flex items-center justify-center">
                <PillarVisual_Helix />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-dark/10 overflow-hidden z-30" aria-hidden="true">
          <motion.div style={{ y: scrollLineYPercent }} className="absolute inset-0 bg-dark/40 w-full h-full" />
        </div>
      </section>

      {/* THE GAP */}
      <section className="relative bg-cream w-full py-16 md:py-24 overflow-hidden border-t border-dark/10">
        <div className="relative w-full px-6 md:px-12 lg:px-20 z-20 mb-12 md:mb-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream">{gap.eyebrow}</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark leading-[0.95] tracking-tighter mb-6 max-w-4xl drop-shadow-sm">
              The problem was never <span className="italic font-serif text-gold-on-cream drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">the software</span>
            </h2>
            <p className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed max-w-2xl border-l-2 border-gold pl-6">{gap.sub}</p>
          </div>
        </div>
        <div className="flex flex-col gap-16 md:gap-0 relative w-full max-w-[1400px] mx-auto px-0">
          <AnimatedCardLeft data={gap.points[0]} />
          <AnimatedCardRight data={gap.points[1]} />
        </div>
      </section>

      {/* SOLUTION — 4 points → 2x2 grid */}
      <motion.section className="w-full px-6 md:px-12 lg:px-20 pt-20 pb-24 max-w-[1400px] mx-auto border-t border-dark/10 overflow-hidden" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
        <motion.div className="mb-16 max-w-3xl" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream mb-4 block">{solution.eyebrow}</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark leading-[0.95] tracking-tighter mb-6">
            Training your team will <span className="italic font-serif text-gold-on-cream drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">actually use</span>
          </h2>
          <div className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed max-w-3xl space-y-4">
            <p>{solution.sub}</p>
          </div>
        </motion.div>
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1500px]" variants={containerVariants}>
          {solution.points.map((point, index) => (
            <SolutionCardPillar key={index} point={point} index={index} phase="scale-faster" />
          ))}
        </motion.div>
      </motion.section>

      {/* ENGINE */}
      <section id="engine" className="w-full px-6 md:px-12 lg:px-20 pb-24 max-w-[1400px] mx-auto border-t border-dark/10">
        <div className="pt-16 border-t border-dark/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream mb-6 md:mb-4 block">{engine.eyebrow}</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark leading-[0.95] tracking-tighter mb-8 md:mb-6">
              Adoption wired into the way your business <span className="italic font-serif text-gold-on-cream drop-shadow-[0_0_20px_rgba(197,160,89,0.3)]">already runs</span>
            </h2>
            <div className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed space-y-4 mt-2">
              <p>{engine.sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              {engine.points.map((step) => (
                <div key={step.title} className="mb-8 last:mb-0">
                  <h3 className="font-serif text-3xl md:text-4xl text-dark leading-tight mb-2">{step.title}</h3>
                  <p className="font-sans text-xl text-dark/70 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* 3D ORBITAL — P6 Training center, P3 Automation + P4 AI orbiting */}
            <div className="relative aspect-square max-w-[320px] sm:max-w-md mx-auto w-full flex items-center justify-center bg-transparent scale-[0.85] sm:scale-100 origin-center -mt-4 sm:mt-8 lg:mt-0 -mb-8 sm:mb-0" style={{ perspective: "1200px" }}>
              <div className="relative w-full h-full flex items-center justify-center" style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}>
                <div className="absolute w-48 h-48 rounded-full bg-gold text-dark flex flex-col items-center justify-center shadow-[0_0_40px_rgba(197,160,89,0.4)]" style={{ transform: "rotateX(-70deg)", transformStyle: "preserve-3d" }}>
                  <span className="font-mono text-[10px] tracking-widest opacity-80 mb-1 uppercase">Pillar 6</span>
                  <span className="font-serif font-bold text-xl text-center leading-tight uppercase">Training</span>
                </div>

                <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
                  {/* P3 Automation */}
                  <div className="absolute" style={{ transform: "translateY(-180px)", transformStyle: "preserve-3d" }}>
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformStyle: "preserve-3d" }}>
                      <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center backdrop-blur-md" style={{ transform: "rotateX(-70deg)", background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.8)" }}>
                        <span className="font-mono text-[10px] tracking-widest text-dark/60 mb-1 uppercase">Pillar 3</span>
                        <span className="font-serif font-bold text-sm text-dark text-center leading-tight uppercase">Auto-<br/>mation</span>
                      </div>
                    </motion.div>
                  </div>
                  {/* P4 AI Assistants */}
                  <div className="absolute" style={{ transform: "translateY(180px)", transformStyle: "preserve-3d" }}>
                    <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ transformStyle: "preserve-3d" }}>
                      <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center backdrop-blur-md" style={{ transform: "rotateX(-70deg)", background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)", border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.8)" }}>
                        <span className="font-mono text-[10px] tracking-widest text-dark/60 mb-1 uppercase">Pillar 4</span>
                        <span className="font-serif font-bold text-base text-dark uppercase">AI</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* FINAL CTA */}
          <div className="mt-20 md:mt-24 w-full bg-dark rounded-sm p-12 md:p-24 flex flex-col items-center justify-center text-center">
            <p className="font-mono text-[#D4A84B]/80 uppercase tracking-[0.2em] text-sm mb-6">/ READY?</p>
            <h2 className="font-serif text-6xl md:text-8xl text-white mb-12">Let's <span className="italic text-[#D4A84B]">Talk</span></h2>
            <div className="mb-16">
              <CTAButton theme="dark" onClick={() => onNavigate('contact')}>BOOK A CALL</CTAButton>
            </div>
            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D4A84B] animate-pulse"></div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">NOW ACCEPTING PROJECTS</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={pillarFAQs} accentColor={colors.goldOnCream} title={<>Questions about <span className="italic text-gold-on-cream">training</span></>} subtitle="Common questions about how we get your team to actually use new tools" onNavigate={onNavigate} />
    </motion.div>
  );
};

export default Pillar6;

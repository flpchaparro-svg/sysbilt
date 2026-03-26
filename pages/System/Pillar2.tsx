import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useTransform, useScroll } from 'framer-motion';
import CTAButton from '../../components/CTAButton';
import BackButton from '../../components/BackButton';
import PillarVisual_Magnet from '../../components/Pillar2/PillarVisual_Magnet';
import { pillar2Copy } from '../../constants/pillar2Copy';
import FAQSection from '../../components/FAQSection';
import { getPillarFAQs } from '../../constants/faqData';
import { colors } from '../../constants/theme';

interface Pillar2Props {
  onNavigate: (view: string, sectionId?: string) => void;
}

const AnimatedCardLeft = ({ data }: { data: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const cardX = useTransform(scrollYProgress, [0, 1], ["15vw", "-15vw"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["-35vw", "35vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative w-full flex justify-center items-center py-12 md:min-h-[25vh] md:py-8 overflow-hidden">
      <motion.div
        style={{ x: lineX, opacity }}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[2px] bg-red-solid w-[60vw] md:w-[800px] z-0 pointer-events-none"
      />
      <motion.div
        style={{ x: cardX, opacity }}
        className="relative z-10 w-[85vw] md:w-[550px] shrink-0 bg-cream/80 backdrop-blur-md border border-dark p-8 md:p-12"
      >
        <div className="font-mono text-xs font-bold text-red-text mb-8 border-b border-dark/10 pb-4 flex justify-end items-center">
          <span className="bg-red-solid/10 text-red-text px-2 py-1">{data.tag || '[SYS_BLEED]'}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl leading-tight text-dark mb-6">
          {data.title}
        </h3>
        <p className="font-sans text-lg text-dark/70 leading-relaxed">
          {data.desc}
        </p>
      </motion.div>
    </div>
  );
};

const AnimatedCardRight = ({ data }: { data: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const cardX = useTransform(scrollYProgress, [0, 1], ["-15vw", "15vw"]);
  const lineX = useTransform(scrollYProgress, [0, 1], ["35vw", "-35vw"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="relative w-full flex justify-center items-center py-12 md:min-h-[25vh] md:py-8 overflow-hidden">
      <motion.div
        style={{ x: lineX, opacity }}
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[2px] bg-red-solid w-[60vw] md:w-[800px] z-0 pointer-events-none"
      />
      <motion.div
        style={{ x: cardX, opacity }}
        className="relative z-10 w-[85vw] md:w-[550px] shrink-0 bg-cream/80 backdrop-blur-md border border-dark p-8 md:p-12"
      >
        <div className="font-mono text-xs font-bold text-red-text mb-8 border-b border-dark/10 pb-4 flex justify-end items-center">
          <span className="bg-red-solid/10 text-red-text px-2 py-1">{data.tag || '[CRITICAL_FAIL]'}</span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl leading-tight text-dark mb-6">
          {data.title}
        </h3>
        <p className="font-sans text-lg text-dark/70 leading-relaxed">
          {data.desc}
        </p>
      </motion.div>
    </div>
  );
};

interface SolutionCardProps {
  point: any;
  index: number;
}

const SolutionCard: React.FC<SolutionCardProps> = ({ point, index }) => {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.5 1"]
  });

  const mobileX = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -100 : 100, 0]);
  const mobileOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const desktopVariants = {
    hidden: { rotateY: 90, opacity: 0 },
    visible: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: index * 0.15
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={isMobile ? undefined : desktopVariants}
      initial={isMobile ? undefined : "hidden"}
      whileInView={isMobile ? undefined : "visible"}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        transformStyle: "preserve-3d",
        ...(isMobile ? { x: mobileX, opacity: mobileOpacity } : {})
      }}
      className="relative w-full h-auto min-h-[380px] md:min-h-[400px] group cursor-pointer"
    >
      <div
        className={`relative w-full h-full transition-all duration-300 bg-white ${
          isMobile
            ? "shadow-[8px_8px_0px_0px_#9A1730] -translate-y-2 -translate-x-2"
            : "group-hover:shadow-[8px_8px_0px_0px_#9A1730] group-hover:-translate-y-2 group-hover:-translate-x-2"
        }`}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="relative bg-white border border-black/10 p-8 md:p-10 flex flex-col justify-start h-full min-h-[380px] md:min-h-[400px]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="mb-6 pb-4 border-b border-dark/10">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-text font-bold">
              0{index + 1}
            </span>
          </div>

          <div className="relative z-10">
            <h3 className="font-serif text-2xl md:text-3xl text-dark mb-4 leading-tight">
              {point.title}
            </h3>
            <p className="font-sans text-base md:text-lg text-dark/70 leading-relaxed text-left">
              {point.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const Pillar2: React.FC<Pillar2Props> = ({ onNavigate }) => {
  const pillarFAQs = getPillarFAQs('pillar2');
  const { hero, gap, solution, engine } = pillar2Copy;

  const scrollLineY = useMotionValue(-100);
  const scrollLineSpeed = useMotionValue(0.067);

  useAnimationFrame((_t, delta) => {
    const y = scrollLineY.get();
    const speed = scrollLineSpeed.get();
    let next = y + speed * delta;
    if (next >= 100) next = -100;
    scrollLineY.set(next);
  });

  const scrollLineYPercent = useTransform(scrollLineY, (v) => `${v}%`);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream text-dark px-0 relative z-[150] overflow-x-hidden flex flex-col font-sans"
    >
      {/* HERO */}
      <section className="relative min-h-[700px] h-[100dvh] w-full flex flex-col overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full h-full flex flex-col relative z-10">
          <div className="flex justify-between items-center mb-8 md:mb-4 pt-24 relative z-20">
            <BackButton onClick={() => onNavigate('system')} label="Return to The System" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 flex-1 content-center items-center">
            <div className="flex flex-col items-start max-w-3xl">
              <h1 className="font-serif text-[2.75rem] md:text-[3.5rem] lg:text-[4.75rem] xl:text-[5.5rem] leading-[1.1] lg:leading-[0.9] tracking-tighter text-dark mb-8 md:mb-10">
                Never lose track of a <span className="italic font-serif text-red-text drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">lead again</span>
              </h1>

              <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl border-l-2 border-red-solid pl-6 mb-10 md:mb-8">
                {hero.sub}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:gap-8 items-start mt-2">
                <CTAButton theme="light" onClick={() => onNavigate('contact')}>
                  {hero.ctaPrimary}
                </CTAButton>
              </div>
            </div>

            <div className="hidden lg:flex w-full h-full items-center justify-end">
              <div className="relative w-full max-w-[450px] h-[450px] opacity-90 flex items-center justify-center">
                <PillarVisual_Magnet />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-10 md:h-12 w-[1px] bg-dark/10 overflow-hidden z-30"
          aria-hidden="true"
        >
          <motion.div style={{ y: scrollLineYPercent }} className="absolute inset-0 bg-dark/40 w-full h-full" />
        </div>
      </section>

      {/* THE GAP */}
      <section className="relative bg-cream w-full py-16 md:py-24 overflow-hidden border-t border-dark/10">
        <div className="relative w-full px-6 md:px-12 lg:px-20 z-20 mb-12 md:mb-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text">
                {gap.eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark leading-[0.95] tracking-tighter mb-6 max-w-4xl drop-shadow-sm">
              You are not short on leads, you are short on <span className="italic font-serif text-red-text drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">follow-up</span>
            </h2>
            <p className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed max-w-2xl border-l-2 border-red-solid pl-6">
              {gap.sub}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-0 relative w-full max-w-[1400px] mx-auto px-0">
          <AnimatedCardLeft data={gap.points[0]} />
          <AnimatedCardRight data={gap.points[1]} />
          <AnimatedCardLeft data={gap.points[2]} />
        </div>
      </section>

      {/* SOLUTION */}
      <motion.section
        className="w-full px-6 md:px-12 lg:px-20 pt-20 pb-24 max-w-[1400px] mx-auto border-t border-dark/10 overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="mb-16 max-w-3xl" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text mb-4 block">
            {solution.eyebrow}
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark leading-[0.95] tracking-tighter mb-6">
            One place for every lead, every deal, every <span className="italic font-serif text-red-text drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">follow-up</span>
          </h2>
          <div className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed max-w-3xl space-y-4">
            <p>{solution.sub}</p>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1500px]"
          variants={containerVariants}
        >
          {solution.points.map((point, index) => (
            <SolutionCard key={index} point={point} index={index} />
          ))}
        </motion.div>
      </motion.section>

      {/* ENGINE */}
      <section id="engine" className="w-full px-6 md:px-12 lg:px-20 pb-24 max-w-[1400px] mx-auto border-t border-dark/10">
        <div className="pt-16 border-t border-dark/10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-text mb-6 md:mb-4 block">
              {engine.eyebrow}
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-dark leading-[0.95] tracking-tighter mb-8 md:mb-6">
              The memory your business has been <span className="italic font-serif text-red-text drop-shadow-[0_0_20px_rgba(226,30,63,0.2)]">missing</span>
            </h2>
            <div className="font-sans text-lg md:text-xl text-dark/70 leading-relaxed space-y-4 mt-2">
              <p>{engine.sub}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="space-y-8">
              {engine.points.map((step) => (
                <div key={step.title} className="mb-8 last:mb-0">
                  <h3 className="font-serif text-3xl md:text-4xl text-dark leading-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="font-sans text-xl text-dark/70 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            {/* 3D ORBITAL WHEEL */}
            <div
              className="relative aspect-square max-w-[320px] sm:max-w-md mx-auto w-full flex items-center justify-center bg-transparent scale-[0.85] sm:scale-100 origin-center -mt-4 sm:mt-8 lg:mt-0 -mb-8 sm:mb-0"
              style={{ perspective: "1200px" }}
            >
              <div
                className="relative w-full h-full flex items-center justify-center"
                style={{ transform: "rotateX(70deg)", transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute w-48 h-48 rounded-full bg-red-solid text-cream flex flex-col items-center justify-center shadow-[0_0_40px_rgba(226,30,63,0.4)]"
                  style={{ transform: "rotateX(-70deg)", transformStyle: "preserve-3d" }}
                >
                  <span className="font-mono text-[10px] tracking-widest opacity-80 mb-1 uppercase">Pillar 2</span>
                  <span className="font-serif font-bold text-2xl text-center leading-tight uppercase">CRM</span>
                </div>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="absolute" style={{ transform: "translateY(-180px)", transformStyle: "preserve-3d" }}>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="w-32 h-32 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                        style={{
                          transform: "rotateX(-70deg)",
                          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
                          border: "1px solid rgba(255,255,255,0.6)",
                          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.8)"
                        }}
                      >
                        <span className="font-mono text-[10px] tracking-widest text-dark/60 mb-1 uppercase">Pillar 1</span>
                        <span className="font-serif font-bold text-base text-dark uppercase">Websites</span>
                      </div>
                    </motion.div>
                  </div>

                  <div className="absolute" style={{ transform: "translateY(180px)", transformStyle: "preserve-3d" }}>
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                      className="flex items-center justify-center"
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <div
                        className="w-32 h-32 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                        style={{
                          transform: "rotateX(-70deg)",
                          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)",
                          border: "1px solid rgba(255,255,255,0.6)",
                          boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.8)"
                        }}
                      >
                        <span className="font-mono text-[10px] tracking-widest text-dark/60 mb-1 uppercase">Pillar 3</span>
                        <span className="font-serif font-bold text-base text-dark text-center leading-tight uppercase">Auto-<br/>mation</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* FINAL CTA MODULE */}
          <div className="mt-20 md:mt-24 w-full bg-dark rounded-sm p-12 md:p-24 flex flex-col items-center justify-center text-center">
            <p className="font-mono text-[#D4A84B]/80 uppercase tracking-[0.2em] text-sm mb-6">
              / READY?
            </p>

            <h2 className="font-serif text-6xl md:text-8xl text-white mb-12">
              Let's <span className="italic text-[#D4A84B]">Talk</span>
            </h2>

            <div className="mb-16">
              <CTAButton theme="dark" onClick={() => onNavigate('contact')}>
                BOOK A CALL
              </CTAButton>
            </div>

            <div className="flex items-center justify-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D4A84B] animate-pulse"></div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">
                NOW ACCEPTING PROJECTS
              </p>
            </div>
          </div>
        </div>
      </section>
      <FAQSection
        faqs={pillarFAQs}
        accentColor={colors.goldOnCream}
        title={<>Questions about <span className="italic text-gold-on-cream">CRM</span></>}
        subtitle="Common questions about lead tracking, pipelines, and how we set it up"
        onNavigate={onNavigate}
      />
    </motion.div>
  );
};

export default Pillar2;

import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export type PillarSolutionPhase = 'get-clients' | 'scale-faster' | 'see-clearly';

const PHASE_CONFIG: Record<
  PillarSolutionPhase,
  {
    label: string;
    labelBorder: string;
    labelText: string;
    titleClass: string;
    /** Offset shadow on small screens (always on) */
    shadowMobile: string;
    /** md+: no shadow until card group hover */
    shadowDesktopHover: string;
  }
> = {
  'get-clients': {
    label: 'GET CLIENTS',
    labelBorder: 'border-red-solid',
    labelText: 'text-red-text',
    titleClass: 'text-red-text',
    shadowMobile: 'shadow-[8px_8px_0px_0px_#9A1730]',
    shadowDesktopHover: 'md:shadow-none md:group-hover:shadow-[8px_8px_0px_0px_#9A1730]',
  },
  'scale-faster': {
    label: 'SCALE FASTER',
    labelBorder: 'border-gold',
    labelText: 'text-gold-on-cream',
    titleClass: 'text-gold-on-cream',
    shadowMobile: 'shadow-[8px_8px_0px_0px_#C5A059]',
    shadowDesktopHover: 'md:shadow-none md:group-hover:shadow-[8px_8px_0px_0px_#C5A059]',
  },
  'see-clearly': {
    label: 'SEE CLEARLY',
    labelBorder: 'border-dark',
    labelText: 'text-dark',
    titleClass: 'text-dark',
    shadowMobile: 'shadow-[8px_8px_0px_0px_#1a1a1a]',
    shadowDesktopHover: 'md:shadow-none md:group-hover:shadow-[8px_8px_0px_0px_#1a1a1a]',
  },
};

interface SolutionCardPillarProps {
  point: { title: string; desc: string };
  index: number;
  phase: PillarSolutionPhase;
}

export const SolutionCardPillar: React.FC<SolutionCardPillarProps> = ({ point, index, phase }) => {
  const cfg = PHASE_CONFIG[phase];
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '0.5 1'],
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
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: index * 0.15,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={isMobile ? undefined : desktopVariants}
      initial={isMobile ? undefined : 'hidden'}
      whileInView={isMobile ? undefined : 'visible'}
      viewport={{ once: true, margin: '-100px' }}
      style={{
        transformStyle: 'preserve-3d',
        ...(isMobile ? { x: mobileX, opacity: mobileOpacity } : {}),
      }}
      className="relative w-full h-auto min-h-[380px] md:min-h-[400px] group cursor-pointer"
    >
      <div
        className={`relative w-full h-full transition-all duration-300 bg-white ${
          isMobile
            ? `-translate-y-2 -translate-x-2 ${cfg.shadowMobile}`
            : `group-hover:-translate-y-2 group-hover:-translate-x-2 ${cfg.shadowDesktopHover}`
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="relative bg-white border border-black/10 p-8 md:p-10 flex flex-col justify-start h-full min-h-[380px] md:min-h-[400px]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="mb-6 pb-4 border-b border-dark/10 flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex items-center px-2.5 py-1.5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-bold border ${cfg.labelBorder} ${cfg.labelText}`}
            >
              {cfg.label}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-dark/70 font-bold">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <div className="relative z-10">
            <h3 className={`font-serif text-2xl md:text-3xl mb-4 leading-tight uppercase tracking-tight ${cfg.titleClass}`}>
              {point.title}
            </h3>
            <p className="font-sans text-base md:text-lg text-dark/70 leading-relaxed text-left">{point.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SolutionCardPillar;

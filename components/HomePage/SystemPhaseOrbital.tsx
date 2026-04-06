import React from 'react';
import { m } from 'framer-motion';

export type OrbitalVariant = 'red' | 'gold' | 'dark';

/** Matches Pillar4 / Pillar7 three-node orbit */
const DURATION_3 = 18;
const RADIUS_3 = 170;

/** Matches Pillar1 two-node orbit */
const DURATION_2 = 15;
const RADIUS_2 = 180;

const GLASS_PILL_STYLE: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 100%)',
  border: '1px solid rgba(255,255,255,0.6)',
  boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2), inset 0 0 20px rgba(255,255,255,0.8)',
};

export interface SatelliteItem {
  tag: string;
  title: React.ReactNode;
}

interface SystemPhaseOrbitalProps {
  variant: OrbitalVariant;
  phaseNum: string;
  centerTitle: string;
  satellites: SatelliteItem[];
  className?: string;
}

function centerDiscClasses(variant: OrbitalVariant): string {
  switch (variant) {
    case 'red':
      return 'bg-red-solid text-cream shadow-[0_0_40px_rgba(226,30,63,0.4)]';
    case 'gold':
      return 'bg-gold text-dark shadow-[0_0_40px_rgba(197,160,89,0.4)]';
    case 'dark':
      return 'bg-dark text-cream shadow-[0_0_40px_rgba(26,26,26,0.4)]';
    default:
      return '';
  }
}

const SystemPhaseOrbital: React.FC<SystemPhaseOrbitalProps> = ({
  variant,
  phaseNum,
  centerTitle,
  satellites,
  className = '',
}) => {
  const n = Math.min(satellites.length, 3);

  return (
    <div
      className={`relative aspect-square max-w-[320px] sm:max-w-md mx-auto w-full flex items-center justify-center bg-transparent scale-[0.85] sm:scale-100 origin-center -mt-4 sm:mt-8 lg:mt-0 -mb-8 sm:mb-0 ${className}`}
      style={{ perspective: '1200px' }}
    >
      <div
        className="relative w-full h-full flex items-center justify-center"
        style={{ transform: 'rotateX(70deg)', transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute w-40 h-40 rounded-full flex flex-col items-center justify-center ${centerDiscClasses(variant)}`}
          style={{ transform: 'rotateX(-70deg)', transformStyle: 'preserve-3d' }}
        >
          <span className="font-mono text-[10px] tracking-widest opacity-80 mb-1 uppercase">Phase {phaseNum}</span>
          <span className="font-serif font-bold text-lg text-center leading-tight uppercase px-2">{centerTitle}</span>
        </div>

        {/* One satellite — Pillar4 top node (0°) */}
        {n === 1 && (
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: DURATION_3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute" style={{ transform: `translateY(-${RADIUS_3}px)`, transformStyle: 'preserve-3d' }}>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: DURATION_3, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                  style={{ transform: 'rotateX(-70deg)', ...GLASS_PILL_STYLE }}
                >
                  <span className="font-mono text-[9px] tracking-widest text-dark/70 mb-1 uppercase">{satellites[0].tag}</span>
                  <span className="font-serif font-bold text-sm text-dark text-center leading-tight uppercase">{satellites[0].title}</span>
                </div>
              </m.div>
            </div>
          </m.div>
        )}

        {/* Two satellites — Pillar1 vertical pair */}
        {n === 2 && (
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: DURATION_2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute" style={{ transform: `translateY(-${RADIUS_2}px)`, transformStyle: 'preserve-3d' }}>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: DURATION_2, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-32 h-32 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                  style={{ transform: 'rotateX(-70deg)', ...GLASS_PILL_STYLE }}
                >
                  <span className="font-mono text-[10px] tracking-widest text-dark/70 mb-1 uppercase">{satellites[0].tag}</span>
                  <span className="font-serif font-bold text-base text-dark text-center leading-tight uppercase">{satellites[0].title}</span>
                </div>
              </m.div>
            </div>
            <div className="absolute" style={{ transform: `translateY(${RADIUS_2}px)`, transformStyle: 'preserve-3d' }}>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: DURATION_2, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-32 h-32 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                  style={{ transform: 'rotateX(-70deg)', ...GLASS_PILL_STYLE }}
                >
                  <span className="font-mono text-[10px] tracking-widest text-dark/70 mb-1 uppercase">{satellites[1].tag}</span>
                  <span className="font-serif font-bold text-base text-dark text-center leading-tight uppercase">{satellites[1].title}</span>
                </div>
              </m.div>
            </div>
          </m.div>
        )}

        {/* Three satellites — Pillar4 arms at 0° / 240° / 120° */}
        {n >= 3 && (
          <m.div
            animate={{ rotate: 360 }}
            transition={{ duration: DURATION_3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute" style={{ transform: `translateY(-${RADIUS_3}px)`, transformStyle: 'preserve-3d' }}>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: DURATION_3, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                  style={{ transform: 'rotateX(-70deg)', ...GLASS_PILL_STYLE }}
                >
                  <span className="font-mono text-[9px] tracking-widest text-dark/70 mb-1 uppercase">{satellites[0].tag}</span>
                  <span className="font-serif font-bold text-sm text-dark text-center leading-tight uppercase">{satellites[0].title}</span>
                </div>
              </m.div>
            </div>

            <div className="absolute" style={{ transform: `rotate(240deg) translateY(-${RADIUS_3}px)`, transformStyle: 'preserve-3d' }}>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: DURATION_3, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                  style={{ transform: 'rotate(-240deg) rotateX(-70deg)', ...GLASS_PILL_STYLE }}
                >
                  <span className="font-mono text-[9px] tracking-widest text-dark/70 mb-1 uppercase">{satellites[1].tag}</span>
                  <span className="font-serif font-bold text-sm text-dark text-center leading-tight uppercase">{satellites[1].title}</span>
                </div>
              </m.div>
            </div>

            <div className="absolute" style={{ transform: `rotate(120deg) translateY(-${RADIUS_3}px)`, transformStyle: 'preserve-3d' }}>
              <m.div
                animate={{ rotate: -360 }}
                transition={{ duration: DURATION_3, repeat: Infinity, ease: 'linear' }}
                className="flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div
                  className="w-28 h-28 rounded-full flex flex-col items-center justify-center backdrop-blur-md"
                  style={{ transform: 'rotate(-120deg) rotateX(-70deg)', ...GLASS_PILL_STYLE }}
                >
                  <span className="font-mono text-[9px] tracking-widest text-dark/70 mb-1 uppercase">{satellites[2].tag}</span>
                  <span className="font-serif font-bold text-xs text-dark text-center leading-tight uppercase">{satellites[2].title}</span>
                </div>
              </m.div>
            </div>
          </m.div>
        )}
      </div>
    </div>
  );
};

export default SystemPhaseOrbital;

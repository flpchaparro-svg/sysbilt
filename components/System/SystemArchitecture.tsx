import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';
import { colors } from '../../constants/theme';
import VisualGetClientsEngine from './Visual_GetClients_Engine';
import VisualScaleFasterEngine from './Visual_ScaleFaster_Engine';
import VisualSeeClearlyEngine from './Visual_SeeClearly_Engine';

// --- Internal Fallback Component ---
const PlaceholderVisual: React.FC<{ color: string; label: string }> = ({ color, label }) => (
  <div className="w-full h-full bg-cream border border-dark/10 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 opacity-10" style={{ backgroundColor: color }}></div>
    <div className="text-center p-6">
      <div className="text-4xl mb-2 opacity-20">construction</div>
      <div className="font-mono text-sm uppercase tracking-widest text-dark/80">
        {label}
      </div>
    </div>
  </div>
);

// --- Narrative Section Component ---
interface NarrativeSectionProps {
  phase: string;
  title: string;
  subtitle: string;
  body: string;
  color: string;
  align: 'left' | 'right';
  visual?: React.ReactNode; 
}

const NarrativeSection: React.FC<NarrativeSectionProps> = ({ 
  phase, title, subtitle, body, color, align, visual 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const isRight = align === 'right';

  return (
    <div ref={containerRef} className="relative flex items-center justify-center py-16 md:py-20 border-b border-dark/10 last:border-0">
      <div className="max-w-[1400px] w-full mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
        
        {/* Text Column */}
        <div className={`flex flex-col ${isRight ? 'md:col-start-2 md:order-2' : 'md:col-start-1 md:order-1'}`}>
          <span className="type-eyebrow mb-6 block" style={{ color: color }}>{phase}</span>
          <h2 className="font-serif text-5xl md:text-6xl text-dark mb-8 leading-[1.1]">
            {title} <span className="italic font-serif" style={{ color: color }}>{subtitle}</span>
          </h2>
          <p className="font-sans text-lg text-dark/70 leading-relaxed max-w-md">
            {body}
          </p>
        </div>

        {/* Visual Column */}
        <div className={`${isRight ? 'md:col-start-1 md:order-1 justify-end' : 'md:col-start-2 md:order-2 justify-start'} flex`}>
          <m.div 
            style={{ y }}
            className="w-full aspect-video max-w-[600px] shadow-2xl relative z-10 bg-cream"
          >
             {visual ? (
                <div className="w-full h-full">
                  {visual}
                </div>
             ) : (
                <PlaceholderVisual color={color} label={`Visual for ${title}`} />
             )}
          </m.div>
        </div>

      </div>
    </div>
  );
};

// --- Main Export ---
export const SystemArchitecture: React.FC = () => {
  return (
    <div className="relative w-full bg-cream z-10">
      
      {/* PHASE 1: THE CAPTURE LOOP */}
      <NarrativeSection 
        phase="PHASE 01 / GET CLIENTS"
        title="The Capture"
        subtitle="Loop"
        body="Right now your leads land in an inbox and sit there. You reply when you can and sometimes that's too late. Here's how it should work. Someone fills out your form and they land in your CRM instantly. The system replies within seconds and you get a reminder to call. Your website catches, your CRM holds, and automation chases. No more lost leads."
        color={colors.redText}
        align="left"
        visual={<VisualGetClientsEngine />} 
      />

      {/* PHASE 2: THE MULTIPLIER */}
      <NarrativeSection 
        phase="PHASE 02 / SCALE FASTER"
        title="The"
        subtitle="Multiplier"
        body="Your marketing works and more calls come in, but you can't answer them all. Here's how it should work. Content brings people to you without posting every day. AI picks up, qualifies, and books the good ones. Training keeps your team using the tools properly. You grow without burning out."
        color={colors.goldOnCream}
        align="right"
        visual={<VisualScaleFasterEngine />} 
      />

      {/* PHASE 3: THE CONTROL ROOM */}
      <NarrativeSection 
        phase="PHASE 03 / SEE CLEARLY"
        title="The Control"
        subtitle="Room"
        body="Right now you find out about problems after the damage is done. Here's how it should work. Every part of your system feeds into one dashboard. Where did your leads come from? Which ones converted? What did it cost? All on one screen, updated live. You see what's working and fix what's broken before it costs you money."
        color={colors.dark}
        align="left"
        visual={<VisualSeeClearlyEngine />} 
      />

    </div>
  );
};

export default SystemArchitecture;
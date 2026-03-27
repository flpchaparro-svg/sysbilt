import React from 'react';
import { motion } from 'framer-motion';
import { Filter, Magnet, Cog, Brain, LayoutGrid, Dna, BarChart3, Activity } from 'lucide-react';
import CTAButton from '../CTAButton';
import { colors } from '../../constants/theme';

interface SystemPhasesProps {
  onNavigate?: (view: string, id?: string) => void;
}

export default function SystemPhases({ onNavigate }: SystemPhasesProps) {
  const transition = { duration: 9, repeat: Infinity, ease: "easeInOut" };
  const times3Icon = [0, 0.3, 0.36, 0.63, 0.69, 0.94, 1];
  const times2Icon = [0, 0.44, 0.5, 0.94, 1];

  return (
    <section id="architecture" className="py-24 lg:py-32 bg-[#FFF2EC] border-t border-[#1A1A1A]/10 relative overflow-hidden font-sans">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="mb-16 md:mb-24 text-center max-w-4xl mx-auto">
          <span className="type-eyebrow text-gold-on-cream mb-4 block md:text-xs tracking-[0.3em]">
            / HOW WE FIX IT
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter mb-6 text-dark">
            Three phases that connect your{' '}
            <span className="italic font-serif text-gold-on-cream drop-shadow-[0_0_20px_rgba(197,160,89,0.25)]">
              entire business
            </span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto text-dark/80">
            Every business sits in one of three stages. We build the system that moves you through all of them.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-10 lg:gap-14 justify-items-center">
          
          {/* PHASE 01: GET CLIENTS */}
          <div className="flex flex-col items-center w-full max-w-[320px] gap-10">
            <div className="relative w-[320px] h-[320px] bg-cream rounded-[40px] shadow-neu flex-shrink-0 flex items-center justify-center">
              {/* Neumorphic Inner Well */}
              <div className="relative w-48 h-48 bg-cream rounded-full shadow-neu-inner flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.redSolid }}
                  animate={{ opacity: [1, 1, 0, 0, 0, 0, 1], scale: [1, 1.1, 0.8, 0.8, 0.8, 0.8, 1] }}
                  transition={{ ...transition, times: times3Icon }}
                >
                  <Filter size={80} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.redSolid }}
                  animate={{ opacity: [0, 0, 1, 1, 0, 0, 0], scale: [0.8, 0.8, 1, 1.1, 0.8, 0.8, 0.8] }}
                  transition={{ ...transition, times: times3Icon }}
                >
                  <Magnet size={80} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.redSolid }}
                  animate={{ opacity: [0, 0, 0, 0, 1, 1, 0], scale: [0.8, 0.8, 0.8, 0.8, 1, 1.1, 0.8] }}
                  transition={{ ...transition, times: times3Icon }}
                >
                  <Cog size={80} strokeWidth={2} />
                </motion.div>
              </div>
            </div>
            <div className="w-[320px] flex flex-col text-left">
              <div className="flex items-center gap-4">
                <div className="border px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase" style={{ borderColor: colors.redText, color: colors.redText }}>
                  Phase 01
                </div>
              </div>
              <hr className="border-t border-slate-300 my-5" />
              <h2 className="font-serif text-3xl uppercase leading-tight mb-4" style={{ color: colors.redText }}>Get Clients</h2>
              <p className="font-sans text-base leading-relaxed" style={{ color: `${colors.dark}CC` }}>
                Your website catches leads, your CRM holds them, and automation chases them. Nothing slips through.
              </p>
            </div>
          </div>

          {/* PHASE 02: SCALE FASTER */}
          <div className="flex flex-col items-center w-full max-w-[320px] gap-10">
            <div className="relative w-[320px] h-[320px] bg-cream rounded-[40px] shadow-neu flex-shrink-0 flex items-center justify-center">
              {/* Neumorphic Inner Well */}
              <div className="relative w-48 h-48 bg-cream rounded-full shadow-neu-inner flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.gold }}
                  animate={{ opacity: [1, 1, 0, 0, 0, 0, 1], scale: [1, 1.1, 0.8, 0.8, 0.8, 0.8, 1] }}
                  transition={{ ...transition, times: times3Icon }}
                >
                  <Brain size={80} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.gold }}
                  animate={{ opacity: [0, 0, 1, 1, 0, 0, 0], scale: [0.8, 0.8, 1, 1.1, 0.8, 0.8, 0.8] }}
                  transition={{ ...transition, times: times3Icon }}
                >
                  <LayoutGrid size={80} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.gold }}
                  animate={{ opacity: [0, 0, 0, 0, 1, 1, 0], scale: [0.8, 0.8, 0.8, 0.8, 1, 1.1, 0.8] }}
                  transition={{ ...transition, times: times3Icon }}
                >
                  <Dna size={80} strokeWidth={2} />
                </motion.div>
              </div>
            </div>
            <div className="w-[320px] flex flex-col text-left">
              <div className="flex items-center gap-4">
                <div className="border px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase" style={{ borderColor: '#8B6914', color: '#8B6914' }}>
                  Phase 02
                </div>
              </div>
              <hr className="border-t border-slate-300 my-5" />
              <h2 className="font-serif text-3xl uppercase leading-tight mb-4" style={{ color: '#8B6914' }}>Scale Faster</h2>
              <p className="font-sans text-base leading-relaxed" style={{ color: `${colors.dark}CC` }}>
                Content brings people to you, AI handles the questions and bookings, and training keeps your team sharp. You grow without burning out.
              </p>
            </div>
          </div>

          {/* PHASE 03: SEE CLEARLY */}
          <div className="flex flex-col items-center w-full max-w-[320px] gap-10">
            <div className="relative w-[320px] h-[320px] bg-cream rounded-[40px] shadow-neu flex-shrink-0 flex items-center justify-center">
              {/* Neumorphic Inner Well */}
              <div className="relative w-48 h-48 bg-cream rounded-full shadow-neu-inner flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.dark }}
                  animate={{ opacity: [1, 1, 0, 0, 1], scale: [1, 1.1, 0.8, 0.8, 1] }}
                  transition={{ ...transition, times: times2Icon }}
                >
                  <BarChart3 size={80} strokeWidth={2} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center drop-shadow-neu"
                  style={{ color: colors.dark }}
                  animate={{ opacity: [0, 0, 1, 1, 0], scale: [0.8, 0.8, 1, 1.1, 0.8] }}
                  transition={{ ...transition, times: times2Icon }}
                >
                  <Activity size={80} strokeWidth={2} />
                </motion.div>
              </div>
            </div>
            <div className="w-[320px] flex flex-col text-left">
              <div className="flex items-center gap-4">
                <div className="border px-3 py-1.5 text-[11px] font-bold tracking-[0.2em] uppercase" style={{ borderColor: colors.dark, color: colors.dark }}>
                  Phase 03
                </div>
              </div>
              <hr className="border-t border-slate-300 my-5" />
              <h2 className="font-serif text-3xl uppercase leading-tight mb-4" style={{ color: colors.dark }}>See Clearly</h2>
              <p className="font-sans text-base leading-relaxed" style={{ color: `${colors.dark}CC` }}>
                One dashboard with live data. You see what's working and fix what's broken before it costs you money.
              </p>
            </div>
          </div>

        </div>

        {/* CTA BUTTON */}
        <motion.div
          className="mt-20 md:mt-32 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CTAButton theme="light" onClick={() => onNavigate?.('system')}>
            SEE HOW IT WORKS
          </CTAButton>
        </motion.div>

      </div>
    </section>
  );
}

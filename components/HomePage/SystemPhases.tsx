import React from 'react';
import { motion } from 'framer-motion';
import CTAButton from '~/components/CTAButton';
import SystemPhaseOrbital from '~/components/HomePage/SystemPhaseOrbital';

interface SystemPhasesProps {
  onNavigate?: (view: string, id?: string) => void;
}

type PhaseConfig = {
  id: string;
  phaseNum: string;
  name: string;
  orbitalVariant: 'red' | 'gold' | 'dark';
  centerTitle: string;
  satellites: { tag: string; title: React.ReactNode }[];
  body: string;
};

const PHASES: PhaseConfig[] = [
  {
    id: 'phase-01',
    phaseNum: '01',
    name: 'GET CLIENTS',
    orbitalVariant: 'red',
    centerTitle: 'GET CLIENTS',
    satellites: [
      { tag: 'Pillar 1', title: 'Websites' },
      { tag: 'Pillar 2', title: 'CRM' },
      { tag: 'Pillar 3', title: (
        <>
          Auto-<br />
          mation
        </>
      ) },
    ],
    body:
      'Your website catches leads, your CRM holds them, and automation chases them. Nothing slips through.',
  },
  {
    id: 'phase-02',
    phaseNum: '02',
    name: 'SCALE FASTER',
    orbitalVariant: 'gold',
    centerTitle: 'SCALE FASTER',
    satellites: [
      { tag: 'Pillar 1', title: 'Assistant' },
      { tag: 'Pillar 2', title: (
        <>
          Content<br />
          creation
        </>
      ) },
      { tag: 'Pillar 3', title: 'Training' },
    ],
    body:
      'Content brings people to you, AI handles the questions and bookings, and training keeps your team sharp. You grow without burning out.',
  },
  {
    id: 'phase-03',
    phaseNum: '03',
    name: 'SEE CLEARLY',
    orbitalVariant: 'dark',
    centerTitle: 'SEE CLEARLY',
    satellites: [{ tag: 'Pillar 7', title: 'Dashboard' }],
    body:
      "One dashboard with live data. You see what's working and fix what's broken before it costs you money.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const SystemPhases: React.FC<SystemPhasesProps> = ({ onNavigate }) => {
  return (
    <section id="architecture" className="py-24 lg:py-32 bg-cream border-t border-dark/10 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="absolute left-[12%] top-0 bottom-0 w-px bg-black" />
        <div className="absolute right-[12%] top-0 bottom-0 w-px bg-black" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto">
          <span className="font-mono text-[10px] md:text-xs text-dark tracking-[0.3em] mb-4 block uppercase font-bold">
            <span className="text-gold-muted">/</span> HOW WE FIX IT
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-dark leading-[0.95] tracking-tighter mb-6">
            Three phases that connect your{' '}
            <span className="italic text-gold-on-cream">entire business</span>
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-2xl mx-auto">
            Every business sits in one of three stages. We build the system that moves you through all of them.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-14 lg:gap-10 xl:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {PHASES.map((phase) => (
            <motion.article
              key={phase.id}
              variants={cardVariants}
              className="flex flex-col items-center px-2 sm:px-4"
            >
              <h3 className="sr-only">
                Phase {phase.phaseNum} — {phase.name}
              </h3>

              <div className="w-full flex justify-center mb-10 md:mb-12">
                <SystemPhaseOrbital
                  variant={phase.orbitalVariant}
                  phaseNum={phase.phaseNum}
                  centerTitle={phase.centerTitle}
                  satellites={phase.satellites}
                />
              </div>

              <p className="font-sans text-base md:text-lg text-dark/70 leading-relaxed max-w-md text-center">
                {phase.body}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 md:mt-20 flex justify-center"
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
};

export default SystemPhases;

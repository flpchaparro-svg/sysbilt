import React from 'react';
import { m } from 'framer-motion';
import CTAButton from '../CTAButton';

/** Shared: section padding. Eyebrows = same classes as `/ THE FRICTION AUDIT` (FrictionAuditSection). */
const cellPad = 'p-8 md:p-12 lg:p-16';
const eyebrow =
  'mb-6 md:mb-8 block font-mono text-xs font-bold uppercase tracking-[0.2em]';

const ProblemSection: React.FC = () => {
  return (
    <m.section 
      id="problem" 
      aria-label="Problem Section" 
      initial={false}
      whileInView={{ opacity: 1 }} 
      viewport={{ once: true, margin: "-100px" }} 
      className="w-full bg-cream py-16 md:py-24 lg:py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto border-t border-l border-dark/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
            
          {/* THE PROBLEM */}
          <div className={`col-span-1 md:col-span-2 ${cellPad} border-r border-b border-dark/10 flex flex-col justify-center transition-colors duration-snap hover:bg-dark/5 group`}>
            <span className={`${eyebrow} text-red-text`}>/ WHAT WE SEE EVERY DAY</span>
            <h2 className="type-h2 text-dark">
              <span className="sr-only">Inbound Lead &amp; Workflow Management Solutions</span>
              <span aria-hidden="true">
                You didn&apos;t build a business to do paperwork
              </span>
            </h2>
          </div>

          {/* SYMPTOMS */}
          <div className={`col-span-1 ${cellPad} border-r border-b border-dark/10 flex flex-col`}>
            <span className={`${eyebrow} text-red-text`}>/ SYMPTOMS</span>
            <ul className="space-y-6 md:space-y-8 list-none p-0 m-0">
              <li className="rounded-lg p-2 -ml-2 hover:bg-dark/5 transition-colors duration-200">
                <h3 className="type-h4 text-dark mb-2">The Bottleneck Boss</h3>
                <p className="type-body text-dark/70">Your team waits for you to answer every question instead of just doing the work.</p>
              </li>
              <li className="rounded-lg p-2 -ml-2 hover:bg-dark/5 transition-colors duration-200">
                <h3 className="type-h4 text-dark mb-2">The Double-Entry Tax</h3>
                <p className="type-body text-dark/70">The same client details get typed into three apps by three people, every single day.</p>
              </li>
              <li className="rounded-lg p-2 -ml-2 hover:bg-dark/5 transition-colors duration-200">
                <h3 className="type-h4 text-dark mb-2">The Sunday Dread</h3>
                <p className="type-body text-dark/70">Your weekend disappears into invoicing and admin while your family waits.</p>
              </li>
            </ul>
          </div>

          {/* THE COST + THE FIX */}
          <div className="col-span-1 flex min-h-0 flex-col border-r border-b border-dark/10">
            <div className={`${cellPad} bg-red-solid/5 flex flex-1 flex-col border-b border-dark/10 transition-colors duration-snap hover:bg-red-solid/10 group relative overflow-hidden`}>
              <div className="absolute inset-0 bg-red-solid/0 transition-colors duration-flow group-hover:bg-red-solid/10" />
              <span className={`relative z-10 ${eyebrow} text-red-text`}>/ THE COST</span>
              <div className="relative z-10 space-y-4 min-w-0">
                <h2 className="type-h3 text-red-text">
                  Your best people are bored
                </h2>
                <p className="type-body font-medium text-red-text/85">
                  You're paying skilled staff to do unskilled work. They get bored, they leave, and you hire again.
                </p>
              </div>
            </div>

            <div className={`${cellPad} bg-dark flex flex-1 flex-col justify-between border-l-2 border-l-gold`}>
              <div>
                <span className={`${eyebrow} text-gold-on-dark`}>/ THE FIX</span>
                <p className="type-body-lg font-light leading-relaxed !text-gold-on-dark uppercase">
                  Your team gets their time back. You get your business back. The boring work runs itself.
                </p>
              </div>
              <div className="pt-8 md:pt-10">
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
      </div>
    </m.section>
  );
};

export default ProblemSection;

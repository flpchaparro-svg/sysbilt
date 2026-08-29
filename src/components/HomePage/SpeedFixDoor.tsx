import React from 'react';
import { Clock, Gauge } from 'lucide-react';
import CTAButton from '../CTAButton';

/**
 * Public buy path for Website Speed Fix. Sits after the Group 7 speed proof.
 * Does not replace the 15-minute HubSpot call for custom work.
 */
const SpeedFixDoor: React.FC = () => {
  return (
    <section
      aria-label="Website Speed Fix"
      className="w-full bg-cream text-dark py-20 md:py-24 px-6 md:px-12 lg:px-20 border-t border-black/10 relative z-30"
    >
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        <div className="w-full md:w-1/2">
          <span className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream mb-4 md:mb-6">
            / WEBSITE SPEED FIX
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8 tracking-tight text-dark max-w-lg">
            Three days to a faster site
          </h2>
          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/80 border-l-2 border-dark/10 pl-6 max-w-lg">
            You just saw what a faster site looks like. If yours is the slow one,
            Website Speed Fix is $1,200, three days, measured before and after with
            Google PageSpeed.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/70">
            <span className="flex items-center gap-2">
              <Clock className="w-3 h-3 text-gold-on-cream" /> Three business days
            </span>
            <span className="flex items-center gap-2">
              <Gauge className="w-3 h-3 text-gold-on-cream" /> Google PageSpeed proof
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md bg-dark p-8 border border-black/10 shadow-2xl relative">
            <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-0 text-cream">
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">
                Fixed price
              </span>
              <span className="font-mono text-xl">$1,200</span>
            </div>
            <div className="w-full">
              <CTAButton theme="dark" to="/go/speed-fix" className="w-full">
                Fix my website, $1,200
              </CTAButton>
            </div>
            <p className="text-center mt-4 font-mono text-xs font-bold text-white/70 uppercase tracking-[0.2em]">
              Custom work still starts with a 15-minute call
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpeedFixDoor;

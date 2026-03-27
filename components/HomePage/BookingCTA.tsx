import React from 'react';
import { Clock, CheckCircle2 } from 'lucide-react';
import CTAButton from '../CTAButton';

const BookingCTA: React.FC = () => {
  return (
    <section className="w-full bg-cream text-dark py-24 px-6 md:px-12 lg:px-20 border-t border-black/10 relative overflow-hidden z-30">
      
      <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* LEFT: TEXT */}
        <div className="w-full md:w-1/2">
          <span className="block font-mono text-xs font-bold uppercase tracking-[0.2em] text-gold-on-cream mb-4 md:mb-6">
            / NOW ACCEPTING PROJECTS
          </span>
          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.9] mb-8 tracking-tight text-dark max-w-lg">
            Ready to get your time back
          </h2>

          <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/80 border-l-2 border-dark/10 pl-6 max-w-lg">
            You've seen how it works and you know what the chaos is costing you. We take limited spots each quarter so every build gets our full attention.
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-8 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark/70">
             <span className="flex items-center gap-2"><Clock className="w-3 h-3 text-gold-on-cream" /> Timeline: 3 to 4 weeks</span>
             <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-gold-on-cream" /> Focus: Results only</span>
          </div>
        </div>

        {/* RIGHT: DARK ACTION BOX */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <div className="w-full max-w-md bg-dark p-8 border border-black/10 shadow-2xl relative">
             
             <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-2 md:gap-0 text-cream">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-white/70 block">Availability</span>
                <div className="flex items-center gap-2">
                    {/* Gold Pulse Status */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                    </span>
                    <span className="font-mono text-xl">TAKING PROJECTS</span>
                </div>
             </div>
             
             {/* STANDARDIZED BUTTON (Dark Theme) */}
             <div className="w-full">
                <CTAButton 
                  theme="dark" 
                  onClick={() => window.open("https://meetings-ap1.hubspot.com/felipe", "_blank")}
                  className="w-full"
                >
                  BOOK A 15-MIN CALL
                </CTAButton>
             </div>
             
             <p className="text-center mt-4 font-mono text-xs font-bold text-white/70 uppercase tracking-[0.2em]">
                No sales pitch, just a conversation about your system
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BookingCTA;
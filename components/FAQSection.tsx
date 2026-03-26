import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Plus, Minus } from 'lucide-react';
import { FAQ } from '../constants/faqData';
import { colors } from '../constants/theme';
import CTAButton from './CTAButton';

// --- HELPER: Parse **bold** segments for SEO / readability (no copy change) ---
const parseBold = (str: string): React.ReactNode => {
  const parts = str.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*(.*)\*\*$/);
        return m ? (
          <strong key={i} className="font-bold text-cream opacity-100">
            {m[1]}
          </strong>
        ) : (
          part
        );
      })}
    </>
  );
};

// --- HELPER: Format Answers ---
const formatFAQAnswer = (answer: string, accentColor: string) => {
  const lines = answer.split('\n').filter(line => line.trim() !== '');
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let currentList: string[] = [];
  let isNumberedList = false;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} className="mb-4 last:mb-0">
          {parseBold(currentParagraph.join(' '))}
        </p>
      );
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList.length > 0) {
      if (isNumberedList) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal space-y-2 mb-4 last:mb-0 pl-6" style={{ listStyleColor: accentColor }}>
            {currentList.map((item, idx) => (
              <li key={idx} className="pl-2">
                <span>{parseBold(item.replace(/^\d+\.\s*/, '').trim())}</span>
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-none space-y-2 mb-4 last:mb-0 pl-0">
            {currentList.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-lg leading-none mt-1 shrink-0" style={{ color: accentColor }}>•</span>
                <span className="flex-1">{parseBold(item.replace(/^[•\-]\s*/, '').trim())}</span>
              </li>
            ))}
          </ul>
        );
      }
      currentList = [];
      isNumberedList = false;
    }
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed.match(/^\d+\.\s/)) {
      if (currentList.length > 0 && !isNumberedList) flushList();
      isNumberedList = true;
      flushParagraph();
      currentList.push(trimmed);
    } else if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
      if (currentList.length > 0 && isNumberedList) flushList();
      isNumberedList = false;
      flushParagraph();
      currentList.push(trimmed);
    } else {
      flushList();
      currentParagraph.push(trimmed);
    }
  });

  flushParagraph();
  flushList();

  return elements.length > 0 ? elements : <p>{answer}</p>;
};

interface FAQSectionProps {
  faqs: FAQ[];
  accentColor?: string;
  title?: React.ReactNode;
  subtitle?: string;
  showBookingCTA?: boolean;
  onNavigate?: (view: string, sectionId?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  accentColor = colors.goldOnCream,
  title = 'Questions?',
  subtitle = 'Everything you need to know before we start.',
  showBookingCTA = true,
  onNavigate
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 px-6 md:px-12 lg:px-20 bg-cream">
      <div className="max-w-[1600px] mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-black/10 pb-8">
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] mb-4 block" style={{ color: accentColor }}>
            / FAQ
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-7xl leading-[0.95] tracking-tighter text-dark">
            {title}
          </h2>
          {subtitle && (
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/70 max-w-xl mt-4">
              {subtitle}
            </p>
          )}
        </div>

        {/* LAYOUT CONTAINER */}
        <div className="w-full border-t border-black/10 mb-16">
          <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-[600px]">
            
            {/* LEFT: QUESTIONS LIST */}
            <div className="lg:col-span-5 border-black/10 flex flex-col lg:border-r lg:border-b">
              {faqs.map((faq, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={faq.id} className="w-full border-b border-black/10 lg:border-black/5">
                    <button
                      onClick={() => handleToggle(index)}
                      className="relative w-full px-4 py-4 md:px-8 text-left group overflow-hidden flex items-start justify-between gap-4"
                    >
                      {/* Hover Wipe Effect */}
                      <div 
                        className={`hidden lg:block absolute inset-0 transition-transform duration-flow origin-left ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                        style={{ backgroundColor: accentColor }}
                      />

                      {/* Content Wrapper */}
                      <div className="relative z-10 flex items-baseline gap-2 flex-1">
                        {/* FIX: Added 'lg:group-hover:!text-dark'
                           This forces the text to Black on hover, overriding the inline Gold color 
                           so it doesn't disappear against the Gold background.
                        */}
                        <span 
                          className={`font-mono text-xs font-bold uppercase tracking-[0.2em] mt-1 shrink-0 transition-colors duration-snap ${isActive ? 'text-dark' : 'text-dark/60 lg:group-hover:!text-dark'}`}
                          style={!isActive ? { color: accentColor } : {}}
                        >
                          {String(index + 1).padStart(2, '0')}.
                        </span>
                        
                        <span 
                          className={`font-serif italic text-lg md:text-xl leading-tight tracking-tight transition-colors duration-snap ${isActive ? 'text-dark' : 'text-dark/80 lg:group-hover:text-dark'}`}
                        >
                          {faq.question}
                        </span>
                      </div>
                      
                      {/* Icon */}
                      <div className="relative z-10 text-dark pt-1">
                         <div className="hidden lg:block">
                           <ArrowRight className={`w-5 h-5 transition-transform duration-snap ${isActive ? 'translate-x-0' : '-translate-x-2 group-hover:translate-x-0'}`} />
                         </div>
                         <div className="lg:hidden">
                            {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4 opacity-50" />}
                         </div>
                      </div>
                    </button>

                    {/* MOBILE EXPANDING ANSWER */}
                    <div className="lg:hidden">
                      <AnimatePresence>
                        {isActive && (
                          <m.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-dark"
                          >
                             <div className="p-8 text-cream">
                                <div className="font-sans text-base leading-relaxed opacity-80 border-l-2 pl-4" style={{ borderColor: accentColor }}>
                                  {formatFAQAnswer(faq.answer, accentColor)}
                                </div>
                             </div>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* RIGHT: DESKTOP ANSWER DISPLAY (Sticky/Fixed Area) */}
            <div className="hidden lg:flex lg:col-span-7 bg-dark text-cream p-16 flex-col justify-center relative border-b border-black/10">
              <AnimatePresence mode="wait">
                {activeIndex !== null ? (
                  <m.div
                    key={activeIndex}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-8 opacity-60">
                      <Cpu className="w-4 h-4" style={{ color: accentColor }} />
                      <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accentColor }}>
                        QUERY_RESOLVED // {faqs[activeIndex].id.toUpperCase()}
                      </span>
                    </div>
                    
                    <h3 className="font-serif italic text-3xl md:text-4xl leading-tight tracking-tight text-cream mb-8">
                      {faqs[activeIndex].question}
                    </h3>
                    
                    <div className="w-16 h-1 mb-8" style={{ backgroundColor: accentColor }} />
                    
                    <div className="font-sans text-lg md:text-xl font-light leading-relaxed text-cream/70 border-l pl-6 space-y-4" style={{ borderColor: accentColor }}>
                      {formatFAQAnswer(faqs[activeIndex].answer, accentColor)}
                    </div>
                  </m.div>
                ) : (
                   <div className="flex items-center justify-center h-full opacity-30 font-mono text-xs font-bold uppercase tracking-[0.2em]">
                      [ SELECT A QUESTION ]
                   </div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* FOOTER CTA */}
        {showBookingCTA && (
          <div className="py-24 flex flex-col items-center text-center">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tighter mb-8 text-dark">
              Still have questions?
            </h2>
            <CTAButton theme="light" onClick={() => onNavigate?.('contact')}>
              BOOK A 15-MIN CALL
            </CTAButton>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQSection;
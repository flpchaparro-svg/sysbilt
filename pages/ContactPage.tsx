import React from 'react';
import { m } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

// COMPONENTS
import CTAButton from '../components/CTAButton'; 
import BackButton from '../components/BackButton'; 

// HOOKS & DATA
import { PageMeta } from '../components/PageMeta';
import { SEO_META } from '../constants/seoMeta';
import { useContactForm } from '../hooks/useContactForm';
import { DIAGNOSIS_OPTIONS } from '../constants/contactData';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const { formState, updateField, status, handleSubmit } = useContactForm();
  
  const inputBaseStyle = "w-full bg-white/5 border border-white/10 px-4 py-4 font-sans text-xl text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors duration-200 ease-out placeholder:text-white/70 rounded-sm mt-2";

  return (
    // Main background dark so overscrolling on mobile doesn't show cream under the form (design spec: dark #1a1a1a)
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-dark lg:overflow-hidden">
      <PageMeta
        title={SEO_META.contact.title}
        description={SEO_META.contact.description}
        canonical={SEO_META.contact.canonical}
      />

      {/* LEFT COLUMN: THE HUMAN ANCHOR */}
      <div className="w-full lg:w-5/12 h-auto lg:h-screen bg-cream text-dark flex flex-col p-8 md:p-12 lg:px-16 lg:pb-12 lg:pt-20 border-r border-dark/10 justify-between order-first relative z-10">
        <div className="flex-none mb-12 lg:mb-0 pt-2 lg:pt-0">
          <BackButton onClick={onBack} label="Back" />
        </div>

        <div className="flex-1 flex flex-col justify-center py-8 lg:py-0">
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-dark mb-6 md:mb-8 block">
            / THE PROMISE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] lg:leading-[0.9] tracking-tighter text-dark mb-8 md:mb-10">
            This is not a <br />
            <span className="italic font-serif text-gold-on-cream">Sales Call</span>
          </h1>
          <div className="space-y-6 max-w-lg">
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark">
              No salespeople here. When you fill this out, you're starting a conversation directly with me.
            </p>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/80">
              I'll personally review your situation and tell you honestly if I can help.
            </p>
          </div>
        </div>

        <div className="hidden lg:block flex-none opacity-40">
           <div className="w-12 h-[1px] bg-gold mb-4" />
           <p className="type-eyebrow text-dark">
             DIRECT LINE OPEN
           </p>
        </div>
      </div>

      {/* RIGHT COLUMN: THE SYSTEM FORM */}
      <div className="w-full lg:w-7/12 min-h-screen lg:h-screen bg-dark text-cream p-6 md:p-12 lg:px-16 lg:py-12 flex flex-col justify-center relative lg:overflow-y-auto">
        
        {status !== 'success' ? (
          <m.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease: "easeOut" }} className="max-w-xl w-full mx-auto lg:mx-0">
            
            <div className="mb-8 lg:mb-6 border-b border-white/10 pb-6 mt-8 lg:mt-0">
              <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-on-dark mb-4 block">
                / YOUR DETAILS
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter text-white mb-4">
                Tell Me About Your <span className="italic font-serif text-gold-on-dark">Business</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                Fill this out. I'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-5">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-5">
                <div className="group relative">
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-dark font-bold">YOUR NAME</label>
                  <input 
                    name="firstname" /* ADDED FOR HUBSPOT */
                    id="name" 
                    type="text" 
                    required 
                    className={inputBaseStyle} 
                    placeholder="Your name" 
                    value={formState.name} 
                    onChange={e => updateField('name', e.target.value)} 
                  />
                </div>
                <div className="group relative">
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-dark font-bold">EMAIL</label>
                  <input 
                    name="email" /* ADDED FOR HUBSPOT */
                    id="email" 
                    type="email" 
                    required 
                    className={inputBaseStyle} 
                    placeholder="Your email" 
                    value={formState.email} 
                    onChange={e => updateField('email', e.target.value)} 
                  />
                </div>
              </div>

              {/* Row 2: Entity */}
              <div className="group relative">
                <label htmlFor="company" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-dark font-bold">BUSINESS</label>
                <input 
                  name="company" /* ADDED FOR HUBSPOT */
                  id="company" 
                  type="text" 
                  className={inputBaseStyle} 
                  placeholder="Company name or website" 
                  value={formState.company} 
                  onChange={e => updateField('company', e.target.value)} 
                />
              </div>

              {/* Row 3: Dropdown */}
              <div className="group relative">
                <label htmlFor="frictionPoint" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-dark font-bold">WHAT DO YOU NEED HELP WITH?</label>
                <div className="relative">
                  <select 
                    name="friction_point" /* ADDED FOR HUBSPOT - MATCHES INTERNAL NAME */
                    id="frictionPoint" 
                    className={`${inputBaseStyle} appearance-none cursor-pointer pr-10`} 
                    value={formState.frictionPoint} 
                    onChange={e => updateField('frictionPoint', e.target.value)}
                  >
                    {DIAGNOSIS_OPTIONS.map(s => <option key={s} value={s} className="bg-dark text-white">{s}</option>)}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none mt-1">
                     <ChevronDown className="w-5 h-5 text-gold-on-dark" />
                  </div>
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="group relative">
                <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-gold-on-dark font-bold">ANYTHING ELSE?</label>
                <textarea 
                  name="message" /* ADDED FOR HUBSPOT */
                  id="message" 
                  rows={3} 
                  className={`${inputBaseStyle} resize-none`} 
                  placeholder="Tell me a bit about your situation." 
                  value={formState.message} 
                  onChange={e => updateField('message', e.target.value)} 
                />
              </div>

              <div className="pt-6 pb-8 lg:pt-4 lg:pb-0">
                <CTAButton theme="dark" type="submit" className={`w-full ${status === 'submitting' ? 'opacity-50 cursor-wait' : ''}`}>
                  {status === 'submitting' ? 'SENDING...' : 'SEND'}
                </CTAButton>
              </div>
            </form>
          </m.div>
        ) : (
          <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mt-10 md:mt-20">
             <div className="w-24 h-24 bg-gold-on-dark rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-gold-on-dark/30">
               <Check className="w-12 h-12 text-dark" />
             </div>
             <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
               Got <span className="italic font-serif text-gold-on-dark">It</span>
             </h2>
             <p className="font-sans text-lg md:text-xl font-light text-white/80 mb-12 leading-relaxed">
               Thanks for reaching out. I'll review your details and get back to you within 24 hours.
             </p>
             
             <div className="w-fit">
                <CTAButton theme="dark" onClick={onBack}>
                   BACK TO HOME
                </CTAButton>
             </div>
          </m.div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;

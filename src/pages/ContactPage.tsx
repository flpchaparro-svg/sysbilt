import React, { useState } from 'react';
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
  const { formState, updateField, status, errorMessage, handleSubmit } = useContactForm();
  
  // Validation State
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateField = (field: string, value: string) => {
    let errorMsg = '';
    
    if (field === 'name') {
      if (!value.trim()) errorMsg = 'Name is required';
      else if (!/^[A-Za-z\s\-\']+$/.test(value)) errorMsg = 'Letters, spaces, and hyphens only';
    }
    if (field === 'email') {
      if (!value.trim()) errorMsg = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMsg = 'Please enter a valid email address';
    }
    if (field === 'company') {
      if (!value.trim()) errorMsg = 'Business name is required';
    }
    if (field === 'phone') {
      const cleanPhone = value.replace(/\s+/g, '');
      if (!cleanPhone) errorMsg = 'Phone number is required';
      else if (!/^(0[23478])\d{8}$/.test(cleanPhone)) errorMsg = 'Must be a 10-digit Aus number (e.g., 0412 345 678)';
    }
    if (field === 'frictionPoint') {
      if (!value) errorMsg = 'Please select an option';
    }
    if (field === 'message') {
      if (!value.trim()) errorMsg = 'Please provide some details';
    }

    setErrors(prev => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const handleBlur = (field: keyof typeof formState) => {
    // We only validate standard text fields, not the checkbox
    if (field !== 'marketingConsent') {
      setTouched(prev => ({ ...prev, [field]: true }));
      validateField(field as string, formState[field] as string);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields before sending
    const isNameValid = validateField('name', formState.name);
    const isEmailValid = validateField('email', formState.email);
    const isCompanyValid = validateField('company', formState.company);
    const isPhoneValid = validateField('phone', formState.phone);
    const isFrictionValid = validateField('frictionPoint', formState.frictionPoint);
    const isMessageValid = validateField('message', formState.message);

    // Mark all as touched so errors display
    setTouched({
      name: true, email: true, company: true, phone: true, frictionPoint: true, message: true
    });

    if (isNameValid && isEmailValid && isCompanyValid && isPhoneValid && isFrictionValid && isMessageValid) {
      handleSubmit(e);
    }
  };
  
  const inputBaseStyle = "w-full bg-white/5 border px-4 py-4 font-sans text-xl text-white focus:outline-none transition-colors duration-200 ease-out placeholder:text-white/40 rounded-sm mt-2";
  const getBorderStyle = (field: string) => 
    touched[field] && errors[field] ? "border-red-solid focus:border-red-solid focus:bg-red-solid/5" : "border-white/10 focus:border-gold focus:bg-white/10";

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-dark lg:overflow-hidden">
      <PageMeta title={SEO_META.contact.title} description={SEO_META.contact.description} canonical={SEO_META.contact.canonical} />

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
              No salespeople here. When you fill this out, you're starting a conversation directly with us.
            </p>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/80">
              We'll personally review your situation and tell you honestly if we can help.
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
                Tell Us About Your <span className="italic font-serif text-gold-on-dark">Business</span>
              </h2>
              <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                Fill this out. We'll get back to you within 24 hours.
              </p>
            </div>

            <form onSubmit={onFormSubmit} noValidate className="space-y-6 lg:space-y-5">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-5">
                <div className="group relative">
                  <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                    YOUR NAME<span className="text-gold-on-dark ml-1">*</span>
                  </label>
                  <input 
                    name="firstname"
                    id="name" 
                    type="text" 
                    className={`${inputBaseStyle} ${getBorderStyle('name')}`} 
                    placeholder="Your name" 
                    value={formState.name} 
                    onChange={e => {
                      updateField('name', e.target.value);
                      if (touched.name) validateField('name', e.target.value);
                    }}
                    onBlur={() => handleBlur('name')}
                  />
                  {touched.name && errors.name && <p className="text-red-solid text-xs mt-2 font-sans">{errors.name}</p>}
                </div>
                
                <div className="group relative">
                  <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                    EMAIL<span className="text-gold-on-dark ml-1">*</span>
                  </label>
                  <input 
                    name="email"
                    id="email" 
                    type="email" 
                    className={`${inputBaseStyle} ${getBorderStyle('email')}`} 
                    placeholder="Your email" 
                    value={formState.email} 
                    onChange={e => {
                      updateField('email', e.target.value);
                      if (touched.email) validateField('email', e.target.value);
                    }}
                    onBlur={() => handleBlur('email')}
                  />
                  {touched.email && errors.email && <p className="text-red-solid text-xs mt-2 font-sans">{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Entity */}
              <div className="group relative">
                <label htmlFor="company" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                  BUSINESS<span className="text-gold-on-dark ml-1">*</span>
                </label>
                <input 
                  name="company"
                  id="company" 
                  type="text" 
                  className={`${inputBaseStyle} ${getBorderStyle('company')}`} 
                  placeholder="Company name or website" 
                  value={formState.company} 
                  onChange={e => {
                    updateField('company', e.target.value);
                    if (touched.company) validateField('company', e.target.value);
                  }}
                  onBlur={() => handleBlur('company')}
                />
                {touched.company && errors.company && <p className="text-red-solid text-xs mt-2 font-sans">{errors.company}</p>}
              </div>

              {/* Row 3: Phone & Dropdown (Side-by-side) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-5">
                <div className="group relative">
                  <label htmlFor="phone" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                    PHONE NUMBER<span className="text-gold-on-dark ml-1">*</span>
                  </label>
                  <input 
                    name="phone"
                    id="phone" 
                    type="tel" 
                    className={`${inputBaseStyle} ${getBorderStyle('phone')}`} 
                    placeholder="Your best number" 
                    value={formState.phone} 
                    onChange={e => {
                      updateField('phone', e.target.value);
                      if (touched.phone) validateField('phone', e.target.value);
                    }}
                    onBlur={() => handleBlur('phone')}
                  />
                  {touched.phone && errors.phone && <p className="text-red-solid text-xs mt-2 font-sans">{errors.phone}</p>}
                </div>
                
                <div className="group relative">
                  <label htmlFor="frictionPoint" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                    WHAT DO YOU NEED HELP WITH?<span className="text-gold-on-dark ml-1">*</span>
                  </label>
                  <div className="relative">
                    <select 
                      name="friction_point"
                      id="frictionPoint" 
                      className={`${inputBaseStyle} ${getBorderStyle('frictionPoint')} appearance-none cursor-pointer pr-10 ${!formState.frictionPoint ? '!text-white/40' : ''}`} 
                      value={formState.frictionPoint} 
                      onChange={e => {
                        updateField('frictionPoint', e.target.value);
                        if (touched.frictionPoint) validateField('frictionPoint', e.target.value);
                      }}
                      onBlur={() => handleBlur('frictionPoint')}
                    >
                      <option value="" disabled className="bg-dark text-white/40">Pick the closest match</option>
                      {DIAGNOSIS_OPTIONS.map(s => <option key={s} value={s} className="bg-dark text-white">{s}</option>)}
                    </select>
                    <div className="absolute right-4 top-[1.4rem] pointer-events-none">
                       <ChevronDown className="w-5 h-5 text-gold-on-dark" />
                    </div>
                  </div>
                  {touched.frictionPoint && errors.frictionPoint && <p className="text-red-solid text-xs mt-2 font-sans">{errors.frictionPoint}</p>}
                </div>
              </div>

              {/* Row 4: Message */}
              <div className="group relative">
                <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                  ANYTHING ELSE?<span className="text-gold-on-dark ml-1">*</span>
                </label>
                <textarea 
                  name="message"
                  id="message" 
                  rows={3} 
                  className={`${inputBaseStyle} ${getBorderStyle('message')} resize-none`} 
                  placeholder="Tell me a bit about your situation." 
                  value={formState.message} 
                  onChange={e => {
                    updateField('message', e.target.value);
                    if (touched.message) validateField('message', e.target.value);
                  }}
                  onBlur={() => handleBlur('message')}
                />
                {touched.message && errors.message && <p className="text-red-solid text-xs mt-2 font-sans">{errors.message}</p>}
              </div>

              {/* Row 5: Consent Checkbox */}
              <div className="group relative flex items-start gap-4 mt-2">
                <div className="flex items-center h-6 mt-[2px]">
                  <input
                    id="marketingConsent"
                    name="marketingConsent"
                    type="checkbox"
                    className="w-5 h-5 appearance-none bg-white/5 border border-white/10 rounded-sm checked:bg-gold-on-dark checked:border-gold-on-dark focus:outline-none focus:ring-1 focus:ring-gold-on-dark transition-colors cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[6px] after:top-[2px] after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-dark after:rotate-45"
                    checked={formState.marketingConsent}
                    onChange={(e) => updateField('marketingConsent', e.target.checked)}
                  />
                </div>
                <label htmlFor="marketingConsent" className="font-sans text-sm text-white/70 leading-relaxed cursor-pointer select-none">
                  I agree to receive the SYSBILT Updates weekly email. I understand I can unsubscribe at any time.
                </label>
              </div>

              {/* DYNAMIC ERROR STATE BLOCK */}
              {status === 'error' && errorMessage && (
                <div className="p-4 border border-red-solid bg-red-solid/10 text-red-solid font-sans text-sm rounded-sm break-words">
                  {errorMessage}
                </div>
              )}

              <div className="pt-6 pb-8 lg:pt-4 lg:pb-0">
                <CTAButton 
                  theme="dark" 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className={`w-full ${status === 'submitting' ? 'opacity-50 cursor-wait' : ''}`}
                >
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
             <p className="font-sans text-lg md:text-xl font-light text-white/80 mb-8 leading-relaxed">
               Thanks for reaching out. I'll review your details and get back to you within 24 hours.
             </p>
             
             {/* DIRECT BOOKING BLOCK */}
             <div className="bg-white/5 border border-white/10 p-6 mb-12 rounded-sm">
                <p className="font-sans text-sm text-white/90 mb-4">
                  <strong className="text-white font-bold">Want to skip the wait?</strong> Book a 15-minute discovery call directly in my calendar.
                </p>
                <a
                  href="https://meetings-ap1.hubspot.com/felipe-chaparro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gold-on-dark text-dark px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  Book Discovery Call
                </a>
             </div>
             
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
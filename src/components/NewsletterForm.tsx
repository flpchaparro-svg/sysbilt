import React, { useState } from 'react';

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [persona, setPersona] = useState('');
  const [marketingConsent, setMarketingConsent] = useState(false);
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const portalId = "442914926";
  const formId = "3903904e-f536-47e7-bdde-02d05e8b38dd";

  const getHubSpotCookie = () => {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
    return match ? match[1] : undefined;
  };

  const validateField = (field: string, value: string | boolean) => {
    let errorMsg = '';
    if (field === 'firstName') {
      if (!(value as string).trim()) errorMsg = 'First name is required';
      else if (!/^[A-Za-z\s\-\']+$/.test(value as string)) errorMsg = 'Letters only';
    }
    if (field === 'email') {
      if (!(value as string).trim()) errorMsg = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string)) errorMsg = 'Invalid email address';
    }
    if (field === 'persona') {
      if (!value) errorMsg = 'Please select a stage';
    }
    if (field === 'marketingConsent') {
      if (value !== true) errorMsg = 'You must agree to join the list to continue';
    }
    
    setErrors(prev => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const handleBlur = (field: string, value: string | boolean) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const isNameValid = validateField('firstName', firstName);
    const isEmailValid = validateField('email', email);
    const isPersonaValid = validateField('persona', persona);
    const isConsentValid = validateField('marketingConsent', marketingConsent);
    
    setTouched({ firstName: true, email: true, persona: true, marketingConsent: true });

    if (!isNameValid || !isEmailValid || !isPersonaValid || !isConsentValid) return;
    
    setStatus('loading');

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
    
    const payload = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'email', value: email },
        { name: 'sysbilt_persona', value: persona },
        { name: 'lifecyclestage', value: 'subscriber' }
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        hutk: getHubSpotCookie()
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: "I agree to allow SYSBILT to store and process my personal data.",
          communications: [
            {
              value: marketingConsent,
              subscriptionTypeId: 2628685226,
              text: "I agree to receive the SYSBILT Updates weekly email."
            }
          ]
        }
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus('success');
        setFirstName('');
        setEmail('');
        setPersona('');
        setMarketingConsent(false);
        setTouched({});
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("HubSpot Submission Error:", error);
      setStatus('error');
    }
  };

  const inputBaseStyle = "border-2 bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none transition-all";
  const getBorderStyle = (field: string) => 
    touched[field] && errors[field] ? "border-red-solid focus:border-red-solid bg-red-50" : "border-dark focus:border-gold placeholder:text-dark/40";

  return (
    <div className="w-full">
      <div className="bg-dark text-white border-2 border-dark shadow-[12px_12px_0px_0px_#1a1a1a] relative overflow-hidden flex flex-col lg:flex-row gap-12 lg:gap-16 items-center p-8 md:p-12 lg:p-16 group">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-red-solid scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />
        
        <div className="flex-1 w-full relative z-10">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-red-solid mb-4">/ THE EMAIL LIST</p>
          <h2 className="font-sans font-black text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-4 text-white leading-[1.05] break-words text-balance">
            Systems advice, <span className="text-gold">not spam</span>
          </h2>
          <p className="font-sans text-sm md:text-base text-white/70 border-l-2 border-gold pl-4 leading-relaxed max-w-md">
            Tell us where you're stuck. We'll send you the articles and case studies that actually apply to your situation
          </p>
        </div>
        
        <div className="w-full lg:w-[480px] bg-cream border-2 border-dark p-6 md:p-8 shadow-[8px_8px_0px_0px_#1a1a1a] text-dark shrink-0 relative z-10">
          {status === 'success' ? (
             <div className="font-sans text-gold-on-cream font-semibold text-sm md:text-base border-2 border-gold/50 p-6 bg-gold/10 text-center leading-relaxed">
                You're on the list, check your inbox
             </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              
              <div className="flex flex-col">
                <label htmlFor="firstName" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  First Name<span className="text-red-solid ml-1">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (touched.firstName) validateField('firstName', e.target.value);
                  }}
                  onBlur={() => handleBlur('firstName', firstName)}
                  disabled={status === 'loading'}
                  placeholder="Your name"
                  className={`${inputBaseStyle} ${getBorderStyle('firstName')}`}
                />
                {touched.firstName && errors.firstName && <p className="font-sans text-xs text-red-solid mt-1">{errors.firstName}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  Work email<span className="text-red-solid ml-1">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (touched.email) validateField('email', e.target.value);
                  }}
                  onBlur={() => handleBlur('email', email)}
                  disabled={status === 'loading'}
                  placeholder="Enter your email address"
                  className={`${inputBaseStyle} ${getBorderStyle('email')}`}
                />
                {touched.email && errors.email && <p className="font-sans text-xs text-red-solid mt-1">{errors.email}</p>}
              </div>

              <div className="flex flex-col">
                <label htmlFor="persona" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  Where are you right now<span className="text-red-solid ml-1">*</span>
                </label>
                <select
                  id="persona"
                  value={persona}
                  onChange={(e) => {
                    setPersona(e.target.value);
                    if (touched.persona) validateField('persona', e.target.value);
                  }}
                  onBlur={() => handleBlur('persona', persona)}
                  disabled={status === 'loading'}
                  className={`${inputBaseStyle} ${getBorderStyle('persona')} appearance-none cursor-pointer ${!persona ? 'text-dark/40' : ''}`}
                >
                  <option value="" disabled>Select your stage</option>
                  <option value="the_builder">Getting clients (I need more leads)</option>
                  <option value="the_scaler">Scaling up (I'm doing too much myself)</option>
                  <option value="the_controller">Seeing clearly (I don't know my real numbers)</option>
                  <option value="the_visionary">Complete system (I need everything connected)</option>
                </select>
                {touched.persona && errors.persona && <p className="font-sans text-xs text-red-solid mt-1">{errors.persona}</p>}
              </div>

              <div className="flex flex-col mt-2 mb-1">
                <div className="flex items-start gap-3">
                  <div className="flex items-center h-5 mt-0.5 shrink-0">
                    <input
                      id="marketingConsent"
                      type="checkbox"
                      checked={marketingConsent}
                      onChange={(e) => {
                        setMarketingConsent(e.target.checked);
                        if (touched.marketingConsent) validateField('marketingConsent', e.target.checked);
                      }}
                      className={`w-4 h-4 appearance-none bg-white border-2 rounded-sm checked:bg-red-solid checked:border-red-solid focus:outline-none transition-colors cursor-pointer relative after:content-[''] after:absolute after:hidden checked:after:block after:left-[4px] after:top-[1px] after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 ${touched.marketingConsent && errors.marketingConsent ? 'border-red-solid bg-red-50' : 'border-dark'}`}
                    />
                  </div>
                  <label htmlFor="marketingConsent" className="font-sans text-xs text-dark/70 leading-relaxed cursor-pointer select-none">
                    I agree to receive the SYSBILT Updates weekly email. I understand I can unsubscribe at any time.<span className="text-red-solid ml-1">*</span>
                  </label>
                </div>
                {touched.marketingConsent && errors.marketingConsent && (
                  <p className="font-sans text-xs text-red-solid mt-2">{errors.marketingConsent}</p>
                )}
              </div>

              {status === 'error' && (
                <p className="font-sans text-xs text-red-solid mt-1 border border-red-solid p-2 bg-red-50">Something went wrong, please try again</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-mono text-xs md:text-sm font-bold uppercase border-2 border-dark bg-dark text-cream px-6 py-3 md:py-4 hover:bg-gold hover:text-dark hover:border-dark hover:translate-x-1 hover:-translate-y-1 hover:shadow-[-4px_4px_0px_0px_#1a1a1a] transition-all duration-200 mt-2 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? 'Processing...' : 'Send me the good stuff'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
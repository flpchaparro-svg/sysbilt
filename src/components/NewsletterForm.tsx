import React, { useState } from 'react';

export default function NewsletterForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [persona, setPersona] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const portalId = "442914926";
  const formId = "3903904e-f536-47e7-bdde-02d05e8b38dd";

  const getHubSpotCookie = () => {
    if (typeof document === 'undefined') return undefined;
    const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
    return match ? match[1] : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !persona) return;
    
    setStatus('loading');

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
    
    const payload = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'email', value: email },
        { name: 'sysbilt_persona', value: persona } 
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        hutk: getHubSpotCookie()
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
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("HubSpot Submission Error:", error);
      setStatus('error');
    }
  };

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              <div className="flex flex-col">
                <label htmlFor="firstName" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  First Name (Optional)
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="Your name"
                  className="border-2 border-dark bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-dark/40 transition-all"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="Enter your email address"
                  className="border-2 border-dark bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none focus:border-gold placeholder:text-dark/40 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="persona" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  Where are you right now
                </label>
                <select
                  id="persona"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  disabled={status === 'loading'}
                  className="border-2 border-dark bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select your stage</option>
                  <option value="the_builder">Getting clients (I need more leads)</option>
                  <option value="the_scaler">Scaling up (I'm doing too much myself)</option>
                  <option value="the_controller">Seeing clearly (I don't know my real numbers)</option>
                  <option value="the_visionary">Complete system (I need everything connected)</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="font-sans text-xs text-red-solid mt-1">Something went wrong, check your details and try again</p>
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
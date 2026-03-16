import React, { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [persona, setPersona] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Hardcoded IDs from HubSpot embed script
  const portalId = "442914926";
  const formId = "914f78a4-171e-457c-b560-421539eb6143";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !persona) return;
    
    setStatus('loading');

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;
    
    const payload = {
      fields: [
        { name: 'email', value: email },
        { name: 'sysbilt_persona', value: persona } 
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title
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
          <h2 className="font-sans font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tighter mb-4 text-white leading-[0.9] break-words text-balance">
            Join the <span className="text-gold">Private List.</span>
          </h2>
          <p className="font-mono text-xs md:text-sm tracking-widest text-white/70 border-l-2 border-gold pl-4 leading-relaxed max-w-md">
            Identify your operational phase. We route the exact blueprints required to scale your specific bottlenecks. No generic advice.
          </p>
        </div>
        
        <div className="w-full lg:w-[480px] bg-cream border-2 border-dark p-6 md:p-8 shadow-[8px_8px_0px_0px_#1a1a1a] text-dark shrink-0 relative z-10">
          {status === 'success' ? (
             <div className="font-mono text-gold-on-cream font-bold text-sm md:text-base uppercase tracking-widest border-2 border-gold/50 p-6 bg-gold/10 text-center">
                Access Granted. Transmission initiated.
             </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col">
                <label htmlFor="email" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  Corporate Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={status === 'loading'}
                  placeholder="Enter your address..."
                  className="border-2 border-dark bg-white text-dark px-4 py-3 md:py-4 font-mono text-sm focus:outline-none focus:border-gold placeholder:text-dark/30 transition-all"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="persona" className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-dark/70 mb-2">
                  Current Phase
                </label>
                <select
                  id="persona"
                  value={persona}
                  onChange={(e) => setPersona(e.target.value)}
                  disabled={status === 'loading'}
                  className="border-2 border-dark bg-white text-dark px-4 py-3 md:py-4 font-mono text-sm focus:outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                  required
                >
                  <option value="" disabled>Select your phase...</option>
                  <option value="the_builder">The Builder (Getting Clients)</option>
                  <option value="the_scaler">The Scaler (Scaling Operations)</option>
                  <option value="the_controller">The Controller (Maximising Margin)</option>
                </select>
              </div>

              {status === 'error' && (
                <p className="font-mono text-[10px] text-red-solid uppercase tracking-widest mt-1">Transmission failed. Please verify your details.</p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="font-mono text-xs md:text-sm font-bold uppercase border-2 border-dark bg-dark text-cream px-6 py-3 md:py-4 hover:bg-gold hover:text-dark hover:border-dark hover:translate-x-1 hover:-translate-y-1 hover:shadow-[-4px_4px_0px_0px_#1a1a1a] transition-all duration-200 mt-2 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? 'Processing...' : 'Request Access'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';

interface GuideGateFormProps {
  guideSlug: string;
  guideName: string;
  pdfUrl?: string;
  onSuccess?: () => void;
}

const HUBSPOT_PORTAL_ID = '442914926';
const HUBSPOT_GUIDE_FORM_ID = '6702ab07-e01e-42c7-97b5-3cc68822b566';
const SYSBILT_UPDATES_SUBSCRIPTION_ID = 2628685226;

/** Slug → HubSpot guide_downloaded option value. Must match HubSpot property options. */
const GUIDE_SLUG_TO_HUBSPOT: Record<string, string> = {
  'ai-assistants': 'ai_assistants',
  'content-systems': 'content_systems',
  'team-training': 'team_training',
  websites: 'websites',
  'revenue-engine': 'revenue_engine',
  'lead-tracking': 'lead_tracking',
  automation: 'automation',
  dashboards: 'dashboards',
  'built-to-work': 'built_to_work',
  'built-to-sell': 'built_to_sell',
  'built-to-close': 'built_to_close',
  'how-to-build-connected-construction-ecosystem': 'how_to_build_connected_construction_ecosystem',
  'how-to-build-a-branded-carousel-system': 'how_to_build_a_branded_carousel_system',
};

export function guideSlugToHubspotValue(guideSlug: string): string {
  return GUIDE_SLUG_TO_HUBSPOT[guideSlug] ?? guideSlug.replace(/-/g, '_');
}

const getHubSpotCookie = () => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? match[1] : undefined;
};

export const GuideGateForm: React.FC<GuideGateFormProps> = ({
  guideSlug,
  guideName,
  pdfUrl,
  onSuccess,
}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [persona, setPersona] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.log('Honeypot triggered, silently dropping bot submission');
      setStatus('success');
      if (onSuccess) setTimeout(onSuccess, 1000);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const hubspotValue = guideSlugToHubspotValue(guideSlug);
    const pageUri = typeof window !== 'undefined' ? window.location.href : '';

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_GUIDE_FORM_ID}`;

    const hubspotData = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'email', value: email },
        { name: 'sysbilt_persona', value: persona },
        { name: 'guide_downloaded', value: hubspotValue },
        { name: 'lifecyclestage', value: 'subscriber' },
        { name: 'lead_source_detail', value: pageUri },
      ],
      context: {
        pageUri,
        pageName: typeof document !== 'undefined' ? document.title : guideName,
        hutk: getHubSpotCookie(),
      },
      legalConsentOptions: {
        consent: {
          consentToProcess: true,
          text: `I agree to receive ${guideName} and weekly SYSBILT updates.`,
          communications: [
            {
              value: true,
              subscriptionTypeId: SYSBILT_UPDATES_SUBSCRIPTION_ID,
              text: 'I agree to receive the SYSBILT Updates weekly email.',
            },
          ],
        },
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hubspotData),
      });

      if (response.ok) {
        setStatus('success');
        localStorage.setItem('sysbilt_known_user', 'true');
        if (onSuccess) {
          setTimeout(() => onSuccess(), 1500);
        }
      } else {
        const errText = await response.text();
        console.error('HubSpot API Error:', errText);
        setErrorMessage('Submission failed. Please try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error:', error);
      setErrorMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-dark text-white p-8 md:p-12 border-2 border-dark shadow-[8px_8px_0px_0px_#1a1a1a] text-center">
        <div className="w-16 h-16 bg-gold/10 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-3xl mb-4">Access Granted</h3>
        <p className="font-sans text-white/80 mb-6">
          {onSuccess
            ? 'Unlocking your guide now...'
            : 'Click below to open your guide. We have also sent a copy to your inbox.'}
        </p>
        {!onSuccess && pdfUrl && (
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-mono text-xs font-bold uppercase tracking-widest bg-gold-on-dark text-dark px-8 py-4 hover:opacity-90 transition-opacity"
          >
            Download {guideName}
          </a>
        )}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-dark text-white p-8 md:p-12 border-2 border-dark shadow-[12px_12px_0px_0px_#1a1a1a] relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-red-solid scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out" />

      <h3 className="font-serif text-3xl md:text-4xl mb-4">Get the full guide</h3>
      <p className="font-sans text-white/70 mb-8 border-l-2 border-gold pl-4 max-w-md">
        First name and email, that is all we need. We'll unlock the guide instantly and send a backup copy to your inbox.
      </p>

      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      <div className="space-y-4">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="w-full bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none border-2 border-dark focus:border-gold placeholder:text-dark/40"
        />
        <input
          type="email"
          placeholder="Your work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none border-2 border-dark focus:border-gold placeholder:text-dark/40"
        />
        <select
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          required
          className={`w-full bg-white text-dark px-4 py-3 md:py-4 font-sans text-sm focus:outline-none border-2 border-dark focus:border-gold appearance-none cursor-pointer ${!persona ? 'text-dark/40' : ''}`}
        >
          <option value="" disabled>
            Where are you right now?
          </option>
          <option value="the_builder">Getting clients (I need more leads)</option>
          <option value="the_scaler">Scaling up (I am doing too much myself)</option>
          <option value="the_controller">Seeing clearly (I do not know my real numbers)</option>
          <option value="the_visionary">Complete system (I need everything connected)</option>
        </select>

        {status === 'error' && (
          <p className="font-sans text-xs text-red-solid border border-red-solid p-2 bg-red-50">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full font-mono text-xs md:text-sm font-bold uppercase border-2 border-dark bg-gold-on-dark text-dark px-6 py-4 hover:opacity-90 transition-opacity mt-4"
        >
          {status === 'submitting' ? 'Unlocking...' : `Read ${guideName}`}
        </button>
      </div>
    </form>
  );
};

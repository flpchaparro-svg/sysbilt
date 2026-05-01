import React, { useState } from 'react';

interface GuideGateFormProps {
  guideSlug: string;
  guideName: string;
  pdfUrl: string;
}

const HUBSPOT_PORTAL_ID = '442914926';
const HUBSPOT_GUIDE_FORM_ID = '6702ab07-e01e-42c7-97b5-3cc68822b566';
const SYSBILT_UPDATES_SUBSCRIPTION_ID = 2628685226;

const guideSlugToHubSpotValue: Record<string, string> = {
  'generic-revenue-engine': 'generic_revenue_engine',
  'custom-builders-playbook': 'custom_builders_playbook',
  'legal-firm-playbook': 'legal_firm_playbook',
  'medical-aesthetics-playbook': 'medical_aesthetics_playbook',
  'dental-practice-playbook': 'dental_practice_playbook',
  'migration-agent-playbook': 'migration_agent_playbook',
  'property-management-playbook': 'property_management_playbook',
  'dashboards-guide': 'dashboards_guide',
};

const getHubSpotCookie = () => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? match[1] : undefined;
};

export const GuideGateForm: React.FC<GuideGateFormProps> = ({
  guideSlug,
  guideName,
  pdfUrl,
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
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const hubspotValue = guideSlugToHubSpotValue[guideSlug];
    if (!hubspotValue) {
      console.error('Unknown guide slug:', guideSlug);
      setErrorMessage('Configuration error. Please contact support.');
      setStatus('error');
      return;
    }

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_GUIDE_FORM_ID}`;

    const hubspotData = {
      fields: [
        { name: 'firstname', value: firstName },
        { name: 'email', value: email },
        { name: 'sysbilt_persona', value: persona },
        { name: 'guide_downloaded', value: hubspotValue },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        hutk: getHubSpotCookie()
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
      <div className="bg-dark text-white p-8 border border-gold-on-dark/30 rounded-sm">
        <h3 className="font-serif text-2xl mb-4">Your guide is ready</h3>
        <p className="font-sans text-sm text-white/80 mb-6 leading-relaxed">
          Click below to open it. We have also sent a copy to your inbox as a backup.
        </p>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-mono text-xs font-bold uppercase tracking-widest bg-gold-on-dark text-dark px-6 py-3 hover:opacity-90 transition-opacity"
        >
          Download {guideName}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-dark text-white p-8 space-y-4">
      <h3 className="font-serif text-2xl mb-2">Get the guide</h3>
      <p className="font-sans text-sm text-white/70 mb-6">
        First name and email, that is all we need. Unsubscribe any time.
      </p>

      {/* HONEYPOT SPAM PROTECTION */}
      <input
        type="text"
        name="website"
        value={honeypot}
        onChange={e => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
      />

      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        required
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold"
      />
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold"
      />
      <select
        value={persona}
        onChange={e => setPersona(e.target.value)}
        required
        className={`w-full bg-white/5 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-gold appearance-none cursor-pointer ${!persona ? 'text-white/40' : ''}`}
      >
        <option value="" disabled className="text-dark bg-white">Where are you right now?</option>
        <option value="the_builder" className="text-dark bg-white">Getting clients (I need more leads)</option>
        <option value="the_scaler" className="text-dark bg-white">Scaling up (I am doing too much myself)</option>
        <option value="the_controller" className="text-dark bg-white">Seeing clearly (I do not know my real numbers)</option>
        <option value="the_visionary" className="text-dark bg-white">Complete system (I need everything connected)</option>
      </select>

      {status === 'error' && (
        <p className="text-red-solid text-sm">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-gold-on-dark text-dark py-3 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {status === 'submitting' ? 'Sending...' : `Get ${guideName}`}
      </button>
    </form>
  );
};
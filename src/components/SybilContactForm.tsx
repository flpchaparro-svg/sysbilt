// SybilContactForm.tsx
// Inline contact form rendered inside the Sybil chat widget.
// Submits to the same HubSpot form as ContactPage so existing automations fire.

import React, { useState } from 'react';

const HUBSPOT_PORTAL_ID = '442914926';
const HUBSPOT_FORM_ID = 'b73fe2b1-95e1-4d06-b275-349f3ac37386';

const FRICTION_OPTIONS = [
  'Website & Leads — I need more enquiries',
  "CRM & Sales — I'm losing track of leads",
  'Automation — Too much manual work',
  'AI — I want bots to handle things',
  "Content — I can't keep up with posting",
  "Training — My team won't use the tools",
  "Dashboards — I can't see my numbers",
  "Not sure — I just know something's broken",
];

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

interface SybilContactFormProps {
  transcript: ChatMessage[];
  initialFrictionFromContext?: string;
  onSuccess: () => void;
  onClose: () => void;
  isSubmitted: boolean;
}

function getHubSpotCookie(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? match[1] : undefined;
}

function getConsentState(): string {
  if (typeof window === 'undefined') return 'declined';
  try {
    const raw = localStorage.getItem('sysbilt_consent_v1');
    if (!raw) return 'declined';
    const consent = JSON.parse(raw);
    if (consent.analytics && consent.marketing) return 'all_accepted';
    if (consent.analytics && !consent.marketing) return 'analytics_only';
    return 'declined';
  } catch {
    return 'declined';
  }
}

function formatFrictionPoint(val: string): string {
  if (!val) return '';
  const v = val.toLowerCase();
  if (v.includes('website') || v.includes('lead')) return 'website_and_leads';
  if (v.includes('crm') || v.includes('sales')) return 'crm_and_sales';
  if (v.includes('automation')) return 'automation';
  if (v.includes(' ai ') || v.startsWith('ai ') || v.includes('ai —')) return 'ai_assistants';
  if (v.includes('content')) return 'content';
  if (v.includes('training')) return 'training';
  if (v.includes('dashboard')) return 'dashboards';
  return 'not_sure';
}

function buildTranscriptText(transcript: ChatMessage[], extraNote: string): string {
  const formatted = transcript
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Sybil'}: ${m.text.replace('[SHOW_FORM]', '').trim()}`)
    .filter((line) => line.length > 8)
    .join('\n\n');
  const note = extraNote.trim() ? `Note from visitor:\n${extraNote.trim()}\n\n` : '';
  return `[Submitted via Sybil chat widget]\n\n${note}Conversation transcript:\n\n${formatted}`;
}

export function SybilContactForm({
  transcript,
  initialFrictionFromContext = '',
  onSuccess,
  onClose,
  isSubmitted,
}: SybilContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [frictionPoint, setFrictionPoint] = useState(initialFrictionFromContext);
  const [extraNote, setExtraNote] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (isSubmitted) {
    return (
      <div className="mx-4 my-3 border-2 border-dark bg-cream p-4">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-cream">/ DETAILS SENT</p>
        <p className="font-sans text-sm leading-relaxed text-dark">
          Got it. The team will be in touch within 24 hours, often the same day. Anything else I can help with while you wait?
        </p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      onSuccess();
      return;
    }

    if (!name.trim() || !email.trim() || !frictionPoint) {
      setErrorMessage('Name, email, and what you need help with are required.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const payload = {
      fields: [
        { name: 'firstname', value: name.trim() },
        { name: 'email', value: email.trim() },
        { name: 'phone', value: phone.trim() },
        { name: 'message', value: buildTranscriptText(transcript, extraNote) },
        { name: 'friction_point', value: formatFrictionPoint(frictionPoint) },
        { name: 'lead_source_detail', value: `${window.location.href} (Sybil chat)` },
        { name: 'consent_state', value: getConsentState() },
        { name: 'lifecyclestage', value: 'lead' },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        hutk: getHubSpotCookie(),
      },
    };

    try {
      const res = await fetch(
        `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        try {
          localStorage.setItem('sysbilt_known_user', 'true');
        } catch {
          /* ignore */
        }
        onSuccess();
      } else {
        const errText = await res.text();
        console.error('[sybil-form] HubSpot error', res.status, errText);
        setErrorMessage('Something went wrong sending your details. Try again, or email hello@sysbilt.com.');
        setStatus('error');
      }
    } catch (err) {
      console.error('[sybil-form] Network error', err);
      setErrorMessage('Network hiccup. Try again, or email hello@sysbilt.com.');
      setStatus('error');
    }
  };

  const inputCls =
    'w-full border border-cream/30 bg-cream/5 px-3 py-2 font-sans text-sm text-cream placeholder:text-cream/40 transition-colors focus:border-gold focus:outline-none';

  return (
    <form onSubmit={handleSubmit} className="mx-4 my-3 space-y-3 border-2 border-dark bg-dark p-4 text-cream">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">/ SEND YOUR DETAILS</p>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[10px] uppercase tracking-[0.15em] text-cream/50 transition-colors hover:text-cream"
        >
          CANCEL
        </button>
      </div>

      <input
        type="text"
        name="website_url"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
      />

      <div>
        <label htmlFor="sybil-name" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
          Your name
        </label>
        <input
          id="sybil-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputCls}
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="sybil-email" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
          Email
        </label>
        <input
          id="sybil-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputCls}
          placeholder="you@business.com.au"
        />
      </div>

      <div>
        <label htmlFor="sybil-phone" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
          Phone (optional)
        </label>
        <input
          id="sybil-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={inputCls}
          placeholder="Best contact number"
        />
      </div>

      <div>
        <label htmlFor="sybil-friction" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
          What do you need help with?
        </label>
        <select
          id="sybil-friction"
          required
          value={frictionPoint}
          onChange={(e) => setFrictionPoint(e.target.value)}
          className={`${inputCls} cursor-pointer`}
        >
          <option value="" disabled>
            Pick the closest match
          </option>
          {FRICTION_OPTIONS.map((o) => (
            <option key={o} value={o} className="bg-dark text-cream">
              {o}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="sybil-note" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
          Anything to add? (optional)
        </label>
        <textarea
          id="sybil-note"
          rows={2}
          value={extraNote}
          onChange={(e) => setExtraNote(e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder="Anything else the team should know."
        />
        <p className="mt-1 font-sans text-[10px] text-cream/50">Our chat goes through with your details so the team has the full picture.</p>
      </div>

      {status === 'error' && errorMessage && (
        <div className="border border-red-solid bg-red-solid/10 p-2 font-sans text-xs text-red-solid">{errorMessage}</div>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full border-2 border-gold bg-gold px-4 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-cream hover:bg-cream disabled:cursor-wait disabled:opacity-50"
      >
        {status === 'submitting' ? 'SENDING...' : '[ SEND ]'}
      </button>

      <p className="font-sans text-[10px] leading-relaxed text-cream/50">
        By sending, you agree to our{' '}
        <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">
          privacy policy
        </a>
        . The team replies within 24 hours.
      </p>
    </form>
  );
}

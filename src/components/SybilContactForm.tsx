// SybilContactForm.tsx
// Inline contact form rendered inside the Sybil chat widget.
// Submits to the same HubSpot form as ContactPage so existing automations fire.

import React, { useEffect, useState } from 'react';
import { DIAGNOSIS_OPTIONS } from '../constants/contactData';

const HUBSPOT_PORTAL_ID = '442914926';
const HUBSPOT_FORM_ID = 'b73fe2b1-95e1-4d06-b275-349f3ac37386';

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

/** Matches `useContactForm` / ContactPage mapping for HubSpot `friction_point`. */
function formatFrictionPoint(val: string): string {
  if (!val) return '';
  const lowercased = val.toLowerCase();

  if (lowercased.includes('website') || lowercased.includes('lead')) return 'website_and_leads';
  if (lowercased.includes('crm') || lowercased.includes('sales')) return 'crm_and_sales';
  if (lowercased.includes('automation')) return 'automation';
  if (lowercased.includes('ai')) return 'ai_assistants';
  if (lowercased.includes('content')) return 'content';
  if (lowercased.includes('training')) return 'training';
  if (lowercased.includes('dashboard')) return 'dashboards';
  if (lowercased.includes('not sure') || lowercased.includes('unsure')) return 'not_sure';

  console.warn('[sybil-form] Unmapped friction point value:', val);
  return '';
}

function formatTranscriptLines(transcript: ChatMessage[]): string {
  return transcript
    .map((m) => `${m.role === 'user' ? 'Visitor' : 'Sybil'}: ${m.text.replace('[SHOW_FORM]', '').trim()}`)
    .filter((line) => line.length > 8)
    .join('\n\n');
}

/** Visitor message (required, like ContactPage) plus transcript for ops context. */
function buildHubSpotMessage(transcript: ChatMessage[], userMessage: string): string {
  const body = userMessage.trim();
  const lines = formatTranscriptLines(transcript);
  return `[Submitted via Sybil chat widget]\n\n${body}\n\n---\n\nConversation transcript:\n\n${lines || '(no messages in thread)'}`;
}

/** Same rules as ContactPage `validateField`. */
function validateField(field: string, value: string): string {
  if (field === 'name') {
    if (!value.trim()) return 'Name is required';
    if (!/^[A-Za-z\s\-']+$/.test(value)) return 'Letters, spaces, and hyphens only';
  }
  if (field === 'email') {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
  }
  if (field === 'company') {
    if (!value.trim()) return 'Business name is required';
  }
  if (field === 'phone') {
    const cleanPhone = value.replace(/\s+/g, '');
    if (!cleanPhone) return 'Phone number is required';
    if (!/^(0[23478])\d{8}$/.test(cleanPhone)) return 'Must be a 10-digit Aus number (e.g., 0412 345 678)';
  }
  if (field === 'frictionPoint') {
    if (!value) return 'Please select an option';
  }
  if (field === 'message') {
    if (!value.trim()) return 'Please provide some details';
  }
  return '';
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
  const [company, setCompany] = useState('');
  const [frictionPoint, setFrictionPoint] = useState(initialFrictionFromContext);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopPropagation();
      onClose();
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [onClose]);

  const runValidate = (field: string, value: string): boolean => {
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
    return !errorMsg;
  };

  const handleBlur = (field: 'name' | 'email' | 'company' | 'phone' | 'frictionPoint' | 'message') => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const values = { name, email, company, phone, frictionPoint, message };
    runValidate(field, values[field]);
  };

  if (isSubmitted) {
    return (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-dark p-6 text-center text-cream">
        <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">/ DETAILS SENT</p>
        <p className="mb-6 max-w-xs font-sans text-sm leading-relaxed text-cream/90">
          Got it. The team will be in touch within 24 hours, often the same day. Anything else I can help with while you wait?
        </p>
        <button
          type="button"
          onClick={onClose}
          className="border-2 border-gold bg-gold px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-dark transition-colors hover:border-cream hover:bg-cream"
        >
          [ BACK TO CHAT ]
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      onSuccess();
      return;
    }

    const isNameValid = runValidate('name', name);
    const isEmailValid = runValidate('email', email);
    const isCompanyValid = runValidate('company', company);
    const isPhoneValid = runValidate('phone', phone);
    const isFrictionValid = runValidate('frictionPoint', frictionPoint);
    const isMessageValid = runValidate('message', message);

    setTouched({
      name: true,
      email: true,
      company: true,
      phone: true,
      frictionPoint: true,
      message: true,
    });

    if (!isNameValid || !isEmailValid || !isCompanyValid || !isPhoneValid || !isFrictionValid || !isMessageValid) {
      setErrorMessage('');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const hubspotData = {
      fields: [
        { name: 'firstname', value: name.trim() },
        { name: 'email', value: email.trim() },
        { name: 'message', value: buildHubSpotMessage(transcript, message) },
        { name: 'friction_point', value: formatFrictionPoint(frictionPoint) },
        { name: 'lead_source_detail', value: `${window.location.href} (Sybil chat)` },
        { name: 'company', value: company.trim() },
        { name: 'phone', value: phone.replace(/\s+/g, '') },
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
          body: JSON.stringify(hubspotData),
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

        let detail = '';
        try {
          const errJson = JSON.parse(errText);
          if (errJson.errors && errJson.errors.length > 0) {
            detail = `: ${errJson.errors[0].message}`;
            if (errJson.errors[0].name) detail += ` (field: ${errJson.errors[0].name})`;
          } else if (errJson.message) {
            detail = `: ${errJson.message}`;
          }
        } catch {
          // not JSON
        }

        setErrorMessage(
          `Something went wrong sending your details${detail}. Try again, or email hello@sysbilt.com.`
        );
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
  const fieldErr = (field: string) => touched[field] && errors[field];

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="absolute inset-0 z-20 flex flex-col bg-dark overflow-y-auto p-5 text-cream"
    >
      <div className="flex shrink-0 items-start justify-between gap-3 border-b border-cream/15 pb-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gold-on-dark">/ SEND YOUR DETAILS</p>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 border border-cream/40 bg-cream/10 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-cream transition-colors hover:border-gold hover:bg-gold/20 hover:text-cream"
        >
          Cancel
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col space-y-5 pt-5">
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sybil-name" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
              Your name<span className="text-gold-on-dark ml-0.5">*</span>
            </label>
            <input
              id="sybil-name"
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (touched.name) runValidate('name', e.target.value);
              }}
              onBlur={() => handleBlur('name')}
              className={`${inputCls} ${fieldErr('name') ? 'border-red-solid' : ''}`}
              placeholder="Your name"
            />
            {fieldErr('name') && <p className="mt-1 font-sans text-xs text-red-solid">{errors.name}</p>}
          </div>

          <div>
            <label htmlFor="sybil-email" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
              Email<span className="text-gold-on-dark ml-0.5">*</span>
            </label>
            <input
              id="sybil-email"
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (touched.email) runValidate('email', e.target.value);
              }}
              onBlur={() => handleBlur('email')}
              className={`${inputCls} ${fieldErr('email') ? 'border-red-solid' : ''}`}
              placeholder="Your email"
            />
            {fieldErr('email') && <p className="mt-1 font-sans text-xs text-red-solid">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="sybil-company" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
            Business<span className="text-gold-on-dark ml-0.5">*</span>
          </label>
          <input
            id="sybil-company"
            type="text"
            required
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              if (touched.company) runValidate('company', e.target.value);
            }}
            onBlur={() => handleBlur('company')}
            className={`${inputCls} ${fieldErr('company') ? 'border-red-solid' : ''}`}
            placeholder="Company name or website"
          />
          {fieldErr('company') && <p className="mt-1 font-sans text-xs text-red-solid">{errors.company}</p>}
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="sybil-phone" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
              Phone number<span className="text-gold-on-dark ml-0.5">*</span>
            </label>
            <input
              id="sybil-phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (touched.phone) runValidate('phone', e.target.value);
              }}
              onBlur={() => handleBlur('phone')}
              className={`${inputCls} ${fieldErr('phone') ? 'border-red-solid' : ''}`}
              placeholder="Your best number"
            />
            {fieldErr('phone') && <p className="mt-1 font-sans text-xs text-red-solid">{errors.phone}</p>}
          </div>

          <div>
            <label htmlFor="sybil-friction" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
              What do you need help with?<span className="text-gold-on-dark ml-0.5">*</span>
            </label>
            <select
              id="sybil-friction"
              required
              value={frictionPoint}
              onChange={(e) => {
                setFrictionPoint(e.target.value);
                if (touched.frictionPoint) runValidate('frictionPoint', e.target.value);
              }}
              onBlur={() => handleBlur('frictionPoint')}
              className={`${inputCls} cursor-pointer ${fieldErr('frictionPoint') ? 'border-red-solid' : ''}`}
            >
              <option value="" disabled>
                Pick the closest match
              </option>
              {DIAGNOSIS_OPTIONS.map((o) => (
                <option key={o} value={o} className="bg-dark text-cream">
                  {o}
                </option>
              ))}
            </select>
            {fieldErr('frictionPoint') && <p className="mt-1 font-sans text-xs text-red-solid">{errors.frictionPoint}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="sybil-message" className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-gold-on-dark">
            Anything else?<span className="text-gold-on-dark ml-0.5">*</span>
          </label>
          <textarea
            id="sybil-message"
            rows={3}
            required
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              if (touched.message) runValidate('message', e.target.value);
            }}
            onBlur={() => handleBlur('message')}
            className={`${inputCls} resize-none ${fieldErr('message') ? 'border-red-solid' : ''}`}
            placeholder="Tell us a bit about your situation."
          />
          <p className="mt-1 font-sans text-[10px] text-cream/50">
            Same fields as the contact page. Your chat transcript is appended when you send.
          </p>
          {fieldErr('message') && <p className="mt-1 font-sans text-xs text-red-solid">{errors.message}</p>}
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

        <p className="font-sans text-[10px] text-cream/50 leading-relaxed">
          By sending, you agree to our{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-gold">
            privacy policy
          </a>
          . The team replies within 24 hours.
        </p>
      </div>
    </form>
  );
}

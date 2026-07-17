import { useState, FormEvent } from 'react';

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  frictionPoint: string;
  message: string;
  honeypot: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  company: '',
  phone: '',
  frictionPoint: '',
  message: '',
  honeypot: '',
};

const getHubSpotCookie = () => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? match[1] : undefined;
};

const getConsentState = (): string => {
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
};

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();

    if (formState.honeypot) {
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.company,
          phone: formState.phone,
          frictionPoint: formState.frictionPoint,
          message: formState.message,
          honeypot: formState.honeypot,
          pageUri: typeof window !== 'undefined' ? window.location.href : '',
          pageName: typeof document !== 'undefined' ? document.title : 'Contact',
          consentState: getConsentState(),
          hutk: getHubSpotCookie(),
        }),
      });

      const data = (await response.json().catch(() => ({}))) as { error?: string };

      if (response.ok) {
        setStatus('success');
        localStorage.setItem('sysbilt_known_user', 'true');
        setFormState(INITIAL_STATE);
      } else {
        setErrorMessage(data.error || 'Something went wrong. Try again or email hello@sysbilt.com.');
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      setErrorMessage('Network error. Try again or email hello@sysbilt.com.');
      setStatus('error');
    }
  };

  return { formState, updateField, status, errorMessage, handleSubmit, setStatus };
};

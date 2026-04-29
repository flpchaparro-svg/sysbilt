import { useState, FormEvent } from 'react';

const HUBSPOT_PORTAL_ID = '442914926';
// WARNING: Verify this ID matches your live HubSpot Contact Form URL
const HUBSPOT_FORM_ID = 'b73fe2b1-95e1-4d06-b275-349f3ac37386';

interface FormState {
  name: string;
  email: string;
  company: string;
  phone: string;
  frictionPoint: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  company: '',
  phone: '',
  frictionPoint: '',
  message: '',
};

const getHubSpotCookie = () => {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]*)/);
  return match ? match[1] : undefined;
};

// UPDATED: Correctly parses the sysbilt_consent_v1 JSON object
const getConsentState = (): string => {
  if (typeof window === 'undefined') return 'declined';
  try {
    const raw = localStorage.getItem('sysbilt_consent_v1');
    if (!raw) return 'declined';
    const consent = JSON.parse(raw);
    
    // Map the consent object to one of the three HubSpot dropdown values
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

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const hubspotData = {
      fields: [
        { name: 'firstname', value: formState.name },
        { name: 'email', value: formState.email },
        { name: 'company', value: formState.company },
        { name: 'phone', value: formState.phone },
        { name: 'friction_point', value: formState.frictionPoint },
        { name: 'message', value: formState.message },
        { name: 'consent_state', value: getConsentState() },
        { name: 'lead_source_detail', value: window.location.href }
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
        hutk: getHubSpotCookie(),
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
        setFormState(INITIAL_STATE);
      } else {
        console.error('HubSpot submission error:', await response.text());
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      setStatus('error');
    }
  };

  return { formState, updateField, status, handleSubmit };
};
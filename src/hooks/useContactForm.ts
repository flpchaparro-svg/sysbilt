import { useState, FormEvent } from 'react';

const HUBSPOT_PORTAL_ID = '442914926';
const HUBSPOT_FORM_ID = 'b73fe2b1-95e1-4d06-b275-349f3ac37386';

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

const formatFrictionPoint = (val: string): string => {
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
  
  console.warn('Unmapped friction point value:', val);
  return '';
};

export const useContactForm = () => {
  const [formState, setFormState] = useState<FormState>(INITIAL_STATE);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const updateField = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (formState.honeypot) {
      console.log('Honeypot triggered, silently dropping bot submission');
      setStatus('success');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    const hubspotData = {
      fields: [
        { name: 'firstname', value: formState.name },
        { name: 'email', value: formState.email },
        { objectTypeId: '0-2', name: 'name', value: formState.company },
        { name: 'phone', value: formState.phone },
        { name: 'friction_point', value: formatFrictionPoint(formState.frictionPoint) },
        { name: 'message', value: formState.message },
        { name: 'consent_state', value: getConsentState() },
        { name: 'lead_source_detail', value: window.location.href },
        { name: 'lifecyclestage', value: 'lead' }
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
        localStorage.setItem('sysbilt_known_user', 'true');
        setFormState(INITIAL_STATE);
      } else {
        const errText = await response.text();
        console.error('HubSpot API Error:', errText);
        
        try {
          const errJson = JSON.parse(errText);
          if (errJson.errors && errJson.errors.length > 0) {
            const apiErr = errJson.errors[0];
            setErrorMessage(`HubSpot API: ${apiErr.message} (Field: ${apiErr.name})`);
          } else {
            setErrorMessage('HubSpot API rejected the submission.');
          }
        } catch {
          setErrorMessage('HubSpot API rejected the submission. Check console.');
        }
        
        setStatus('error');
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      setErrorMessage('Network error during submission.');
      setStatus('error');
    }
  };

  return { formState, updateField, status, errorMessage, handleSubmit };
};
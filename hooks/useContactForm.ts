import { useState, FormEvent } from 'react';

const HUBSPOT_PORTAL_ID = '442493227';
const HUBSPOT_FORM_ID = 'YOUR_FORM_ID';

interface FormState {
  name: string;
  email: string;
  company: string;
  frictionPoint: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  email: '',
  company: '',
  frictionPoint: '',
  message: '',
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
        { name: 'friction_point', value: formState.frictionPoint },
        { name: 'message', value: formState.message },
      ],
      context: {
        pageUri: window.location.href,
        pageName: document.title,
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

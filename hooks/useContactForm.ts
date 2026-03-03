import { useState } from 'react';

// You will replace these with your actual HubSpot IDs in Step 2
const HUBSPOT_PORTAL_ID = 'YOUR_PORTAL_ID';
const HUBSPOT_FORM_ID = 'YOUR_FORM_ID'; 

export const useContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const submitForm = async (data: Record<string, string>) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // HubSpot Forms API Endpoint
    const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`;

    // Map your React state data to HubSpot's expected format
    const hubspotData = {
      fields: Object.keys(data).map((key) => ({
        name: key,
        value: data[key],
      })),
      context: {
        pageUri: window.location.href,
        pageName: document.title,
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hubspotData),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        console.error('HubSpot submission error:', await response.text());
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Network error during form submission:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submitForm, isSubmitting, submitStatus };
};
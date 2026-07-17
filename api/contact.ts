import type { VercelRequest, VercelResponse } from '@vercel/node';
import { addContactNote, upsertContactByEmail } from './_lib/hubspot.js';

const HUBSPOT_PORTAL_ID = '442914926';
const HUBSPOT_FORM_ID = 'b73fe2b1-95e1-4d06-b275-349f3ac37386';

type Body = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  phone?: unknown;
  frictionPoint?: unknown;
  message?: unknown;
  honeypot?: unknown;
  pageUri?: unknown;
  pageName?: unknown;
  consentState?: unknown;
  hutk?: unknown;
};

function str(v: unknown, max = 2000): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function formatFrictionPoint(val: string): string {
  const lowercased = val.toLowerCase();
  if (lowercased.includes('website') || lowercased.includes('lead')) return 'website_and_leads';
  if (lowercased.includes('crm') || lowercased.includes('sales')) return 'crm_and_sales';
  if (lowercased.includes('automation')) return 'automation';
  if (lowercased.includes('ai')) return 'ai_assistants';
  if (lowercased.includes('content')) return 'content';
  if (lowercased.includes('training')) return 'training';
  if (lowercased.includes('dashboard')) return 'dashboards';
  if (lowercased.includes('not sure') || lowercased.includes('unsure')) return 'not_sure';
  return '';
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function isValidPhone(value: string): boolean {
  const clean = value.replace(/\s+/g, '');
  return /^(0[23478])\d{8}$/.test(clean);
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = (req.body ?? {}) as Body;

  // Silent bot drop
  if (str(body.honeypot, 100)) {
    res.status(200).json({ ok: true, dropped: true });
    return;
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200).toLowerCase();
  const company = str(body.company, 200);
  const phone = str(body.phone, 40);
  const frictionPoint = str(body.frictionPoint, 200);
  const message = str(body.message, 4000);
  const pageUri = str(body.pageUri, 500) || 'https://sysbilt.com/contact';
  const pageName = str(body.pageName, 200) || 'Contact';
  const consentState = str(body.consentState, 40) || 'declined';
  const hutk = str(body.hutk, 120);

  if (!name || name.length < 2 || !/[A-Za-z]/.test(name)) {
    res.status(400).json({ error: 'Please enter your name.' });
    return;
  }
  if (!isValidEmail(email)) {
    res.status(400).json({ error: 'Please enter a valid email.' });
    return;
  }
  if (company.trim().length < 2) {
    res.status(400).json({ error: 'Please enter your business name.' });
    return;
  }
  if (!isValidPhone(phone)) {
    res.status(400).json({ error: 'Please enter a valid Australian phone number.' });
    return;
  }
  if (!frictionPoint) {
    res.status(400).json({ error: 'Please choose what you need help with.' });
    return;
  }
  if (!message.trim()) {
    res.status(400).json({ error: 'Please add a short note about your situation.' });
    return;
  }

  const frictionMapped = formatFrictionPoint(frictionPoint);
  const noteBody = [
    'Website contact form',
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${company}`,
    `Phone: ${phone}`,
    `Help with: ${frictionPoint}`,
    `Message:\n${message}`,
    `Page: ${pageUri}`,
    `Submitted: ${new Date().toISOString()}`,
  ].join('\n');

  let hubspotContactId: string | null = null;
  let hubspotFormOk = false;
  let hubspotError: string | null = null;

  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    try {
      const { id } = await upsertContactByEmail({
        email,
        firstname: name,
        company,
        phone,
      });
      hubspotContactId = id;
      await addContactNote(id, noteBody);
    } catch (err) {
      hubspotError = err instanceof Error ? err.message : 'HubSpot failed';
      console.error('[contact] HubSpot CRM', hubspotError);
    }
  }

  // Keep feeding the existing HubSpot form so current form workflows stay intact.
  try {
    const hsRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [
            { name: 'firstname', value: name },
            { name: 'email', value: email },
            { name: 'message', value: message },
            { name: 'friction_point', value: frictionMapped },
            { name: 'lead_source_detail', value: pageUri },
            { name: 'company', value: company },
            { name: 'phone', value: phone },
            { name: 'consent_state', value: consentState },
            { name: 'lifecyclestage', value: 'lead' },
          ],
          context: {
            pageUri,
            pageName,
            ...(hutk ? { hutk } : {}),
          },
        }),
      },
    );
    hubspotFormOk = hsRes.ok;
    if (!hsRes.ok) {
      console.error('[contact] HubSpot form', hsRes.status, await hsRes.text());
    }
  } catch (err) {
    console.error('[contact] HubSpot form', err);
  }

  const slackUrl =
    process.env.SLACK_CONTACT_WEBHOOK_URL?.trim() ||
    process.env.SLACK_ACCESS_WEBHOOK_URL?.trim();
  let slackOk = false;
  if (slackUrl) {
    try {
      const contactLink = hubspotContactId
        ? `https://app-ap1.hubspot.com/contacts/${HUBSPOT_PORTAL_ID}/record/0-1/${hubspotContactId}`
        : null;
      const lines = [
        '*New contact enquiry*',
        `*${name}* · ${company}`,
        email,
        phone,
        `Help with: ${frictionPoint}`,
        message.slice(0, 400),
        contactLink ? `<${contactLink}|Open contact>` : null,
      ].filter(Boolean);

      const slackRes = await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lines.join('\n') }),
      });
      slackOk = slackRes.ok;
      if (!slackRes.ok) {
        console.error('[contact] slack', slackRes.status, await slackRes.text());
      }
    } catch (err) {
      console.error('[contact] slack', err);
    }
  }

  if (!hubspotContactId && !hubspotFormOk) {
    res.status(502).json({
      error:
        hubspotError ||
        'Could not send your message. Email hello@sysbilt.com and a human will answer.',
    });
    return;
  }

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    hubspotContactId,
    hubspotFormOk,
    slackOk,
  });
}

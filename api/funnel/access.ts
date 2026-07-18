import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  addContactNote,
  createFunnelAccessDeal,
  upsertContactByEmail,
} from '../_lib/hubspot.js';

const PRODUCT_CODES = new Set(['speed-fix', 'missed-call', 'google-profile', 'search-fix']);
const PRODUCT_LABELS: Record<string, string> = {
  'speed-fix': 'Website Speed Fix',
  'missed-call': 'Missed-Call Text-Back',
  'google-profile': 'Google Profile Fix',
  'search-fix': 'Search Visibility Fix',
};
const PRODUCT_AMOUNTS: Record<string, string> = {
  'speed-fix': '1200',
  'missed-call': '750',
  'google-profile': '600',
  'search-fix': '1400',
};
const MISSED_CALL_SETUPS = new Set(['mobile', 'landline', 'voip', 'mixed', 'unsure']);
const MISSED_CALL_ACCESS = new Set(['forward', 'provider', 'crm', 'call']);
const GOOGLE_PROFILE_STATUS = new Set([
  'unclaimed',
  'claimed-me',
  'claimed-other',
  'suspended',
  'unsure',
]);
const GOOGLE_PROFILE_ACCESS = new Set(['invite', 'call']);
const PLATFORMS = new Set([
  'wordpress',
  'wordpress-com',
  'shopify',
  'squarespace',
  'wix',
  'webflow',
  'framer',
  'bigcommerce',
  'magento',
  'joomla',
  'drupal',
  'custom',
  'other',
]);

const SAME = new Set(['yes', 'no', 'unsure']);
const ACCESS = new Set(['wp-admin', 'hosting', 'agency', 'call']);

type Body = {
  product?: unknown;
  name?: unknown;
  email?: unknown;
  business?: unknown;
  website?: unknown;
  platform?: unknown;
  sameProvider?: unknown;
  domainProvider?: unknown;
  hostingProvider?: unknown;
  accessPath?: unknown;
  accessDetail?: unknown;
  notes?: unknown;
  phone?: unknown;
  phoneSetup?: unknown;
  profileUrl?: unknown;
  profileStatus?: unknown;
};

function str(v: unknown, max = 500): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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
  const product = str(body.product, 40);
  const name = str(body.name, 120);
  const email = str(body.email, 200).toLowerCase();
  const business = str(body.business, 200);
  const website = str(body.website, 400);
  const platform = str(body.platform, 40);
  const sameProvider = str(body.sameProvider, 20);
  const domainProvider = str(body.domainProvider, 200);
  const hostingProvider = str(body.hostingProvider, 200);
  const accessPath = str(body.accessPath, 40);
  const accessDetail = str(body.accessDetail, 4000);
  const notes = str(body.notes, 4000);
  const phone = str(body.phone, 40);
  const phoneSetup = str(body.phoneSetup, 40);
  const profileUrl = str(body.profileUrl, 500);
  const profileStatus = str(body.profileStatus, 40);

  if (!PRODUCT_CODES.has(product)) {
    res.status(400).json({ error: 'Invalid product' });
    return;
  }
  if (!name || !email.includes('@') || !business) {
    res.status(400).json({ error: 'Missing name, email, or business' });
    return;
  }

  const isMissedCall = product === 'missed-call';
  const isGoogleProfile = product === 'google-profile';

  if (isMissedCall) {
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^(0[23478])\d{8}$/.test(cleanPhone)) {
      res.status(400).json({ error: 'Please enter a valid Australian business number.' });
      return;
    }
    if (!MISSED_CALL_SETUPS.has(phoneSetup) || !MISSED_CALL_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid phone setup or access path' });
      return;
    }
  } else if (isGoogleProfile) {
    if (profileUrl.length < 3) {
      res.status(400).json({ error: 'Please enter your Google profile link or exact listing name.' });
      return;
    }
    if (!GOOGLE_PROFILE_STATUS.has(profileStatus) || !GOOGLE_PROFILE_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid profile status or access path' });
      return;
    }
  } else {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
  }

  const noteBody = isMissedCall
    ? [
        `Funnel access form — ${product}`,
        `Business: ${business}`,
        `Phone: ${phone}`,
        `Phone setup: ${phoneSetup}`,
        `Access path: ${accessPath}`,
        accessDetail ? `Access notes:\n${accessDetail}` : null,
        notes ? `Other notes:\n${notes}` : null,
        `Submitted: ${new Date().toISOString()}`,
      ]
        .filter(Boolean)
        .join('\n')
    : isGoogleProfile
      ? [
          `Funnel access form — ${product}`,
          `Business: ${business}`,
          `Profile: ${profileUrl}`,
          `Profile status: ${profileStatus}`,
          `Access path: ${accessPath}`,
          accessDetail ? `Access notes:\n${accessDetail}` : null,
          notes ? `Other notes:\n${notes}` : null,
          `Submitted: ${new Date().toISOString()}`,
        ]
          .filter(Boolean)
          .join('\n')
      : [
          `Funnel access form — ${product}`,
          `Business: ${business}`,
          `Website: ${website}`,
          `Platform: ${platform}`,
          `Domain + hosting same provider: ${sameProvider}`,
          domainProvider ? `Domain provider: ${domainProvider}` : null,
          hostingProvider ? `Hosting provider: ${hostingProvider}` : null,
          `Access path: ${accessPath}`,
          accessDetail ? `Access notes:\n${accessDetail}` : null,
          notes ? `Other notes:\n${notes}` : null,
          `Submitted: ${new Date().toISOString()}`,
        ]
          .filter(Boolean)
          .join('\n');

  const payload = {
    product,
    name,
    email,
    business,
    website,
    platform,
    sameProvider,
    domainProvider,
    hostingProvider,
    accessPath,
    accessDetail,
    notes,
    phone,
    phoneSetup,
    profileUrl,
    profileStatus,
    submittedAt: new Date().toISOString(),
  };

  let hubspotContactId: string | null = null;
  let hubspotDealId: string | null = null;
  let hubspotError: string | null = null;

  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    try {
      const { id } = await upsertContactByEmail({
        email,
        firstname: name,
        company: business,
        website: website || undefined,
        phone: phone || undefined,
        // Paid /go product — Customer column, not Subscriber (newsletter default).
        lifecyclestage: 'customer',
        leadSourceDetail: `go/${product}`,
      });
      hubspotContactId = id;
      await addContactNote(id, noteBody);

      try {
        const productLabel = PRODUCT_LABELS[product] || product;
        const { id: dealId } = await createFunnelAccessDeal({
          contactId: id,
          dealname: `${productLabel} — ${business}`,
          amount: PRODUCT_AMOUNTS[product],
          productCode: product,
          noteBody,
        });
        hubspotDealId = dealId;
      } catch (dealErr) {
        console.error(
          '[funnel/access] HubSpot deal',
          dealErr instanceof Error ? dealErr.message : dealErr,
        );
      }
    } catch (err) {
      hubspotError = err instanceof Error ? err.message : 'HubSpot failed';
      console.error('[funnel/access] HubSpot', hubspotError);
    }
  }

  const webhookUrl = process.env.FUNNEL_ACCESS_WEBHOOK_URL?.trim();
  let webhookOk = false;
  if (webhookUrl) {
    try {
      const wh = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, hubspotContactId, hubspotDealId }),
      });
      webhookOk = wh.ok;
      if (!wh.ok) {
        console.error('[funnel/access] webhook', wh.status, await wh.text());
      }
    } catch (err) {
      console.error('[funnel/access] webhook', err);
    }
  }

  // Slack Incoming Webhook (optional). Never blocks a successful HubSpot save.
  const slackUrl = process.env.SLACK_ACCESS_WEBHOOK_URL?.trim();
  let slackOk = false;
  if (slackUrl && hubspotContactId) {
    try {
      const contactLink = `https://app-ap1.hubspot.com/contacts/442914926/record/0-1/${hubspotContactId}`;
      const dealLink = hubspotDealId
        ? `https://app-ap1.hubspot.com/contacts/442914926/record/0-3/${hubspotDealId}`
        : null;
      const lines = [
        `*New access form* · ${product}`,
        `*${name}* · ${business}`,
        email,
        isMissedCall
          ? `Phone: ${phone} · Setup: ${phoneSetup}`
          : isGoogleProfile
            ? `Profile: ${profileUrl.slice(0, 80)} · Status: ${profileStatus}`
            : website,
        isMissedCall
          ? `Access: ${accessPath}`
          : isGoogleProfile
            ? `Access: ${accessPath}`
            : `Platform: ${platform} · Access: ${accessPath}`,
        !isMissedCall && !isGoogleProfile && sameProvider !== 'yes'
          ? `Domain/hosting same: ${sameProvider}${domainProvider ? ` · Domain: ${domainProvider}` : ''}${hostingProvider ? ` · Host: ${hostingProvider}` : ''}`
          : null,
        accessDetail ? `Access notes: ${accessDetail.slice(0, 280)}` : null,
        dealLink ? `<${dealLink}|Open deal>` : null,
        `<${contactLink}|Open contact>`,
      ].filter(Boolean);

      const slackRes = await fetch(slackUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: lines.join('\n') }),
      });
      slackOk = slackRes.ok;
      if (!slackRes.ok) {
        console.error('[funnel/access] slack', slackRes.status, await slackRes.text());
      }
    } catch (err) {
      console.error('[funnel/access] slack', err);
    }
  }

  if (!hubspotContactId && !webhookOk && !webhookUrl && !process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    res.status(503).json({
      error: 'Access intake is not configured (need HubSpot token or FUNNEL_ACCESS_WEBHOOK_URL).',
    });
    return;
  }

  if (!hubspotContactId && !webhookOk) {
    res.status(502).json({
      error: hubspotError || 'Could not save your answers. Reply to your payment email instead.',
    });
    return;
  }

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: true,
    hubspotContactId,
    hubspotDealId,
    webhookOk,
    slackOk,
  });
}

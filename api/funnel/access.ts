import type { VercelRequest, VercelResponse } from '@vercel/node';
import {
  addContactNote,
  createFunnelAccessDeal,
  upsertContactByEmail,
} from '../_lib/hubspot.js';

const PRODUCT_CODES = new Set([
  'speed-fix',
  'missed-call',
  'google-profile',
  'search-fix',
  'landing-page',
  'crm-rescue',
  'team-ai',
  'change-pack',
  'content-system',
]);
const PRODUCT_LABELS: Record<string, string> = {
  'speed-fix': 'Website Speed Fix',
  'missed-call': 'Missed-Call Text-Back',
  'google-profile': 'Google Profile Fix',
  'search-fix': 'Search Visibility Fix',
  'landing-page': 'Campaign Landing Page',
  'crm-rescue': 'CRM Rescue',
  'team-ai': 'Team AI',
  'change-pack': 'Change Pack',
  'content-system': 'Content System',
};
const PRODUCT_AMOUNTS: Record<string, string> = {
  'speed-fix': '1200',
  'missed-call': '750',
  'google-profile': '600',
  'search-fix': '1400',
  'landing-page': '1800',
  'crm-rescue': '2800',
  'team-ai': '1950',
  'team-ai-onsite': '2400',
  'change-pack': '6000',
  'content-system': '3400',
};
const CRM_SYSTEMS = new Set([
  'hubspot',
  'pipedrive',
  'salesforce',
  'zoho',
  'monday',
  'sheets',
  'inbox',
  'other',
  'none',
]);
const CRM_LEAD_SOURCES = new Set([
  'form',
  'phone',
  'ads',
  'social',
  'walk-in',
  'mixed',
  'unsure',
]);
const CRM_GOALS = new Set([
  'speed',
  'alerts',
  'follow-up',
  'quotes',
  'missed-call',
  'full',
]);
const CRM_ACCESS = new Set(['invite', 'admin', 'form-provider', 'call']);
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
  crmSystem?: unknown;
  leadSource?: unknown;
  crmGoal?: unknown;
  websiteUrl?: unknown;
  teamSize?: unknown;
  teamTools?: unknown;
  timeEaters?: unknown;
  sensitiveData?: unknown;
  dateWindow?: unknown;
  sessionFormat?: unknown;
  rolloutType?: unknown;
  peopleAffected?: unknown;
  goLiveWindow?: unknown;
  changeAreas?: unknown;
  trainingPlan?: unknown;
  riskSignal?: unknown;
  contentChannels?: unknown;
  lastPostWhen?: unknown;
  hourReady?: unknown;
  contentGoal?: unknown;
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
  const crmSystem = str(body.crmSystem, 40);
  const leadSource = str(body.leadSource, 40);
  const crmGoal = str(body.crmGoal, 40);
  const websiteUrl = str(body.websiteUrl, 400);
  const teamSize = str(body.teamSize, 40);
  const teamTools = str(body.teamTools, 2000);
  const timeEaters = str(body.timeEaters, 2000);
  const sensitiveData = str(body.sensitiveData, 2000);
  const dateWindow = str(body.dateWindow, 500);
  const sessionFormatRaw = str(body.sessionFormat, 20).toLowerCase();
  const sessionFormat =
    sessionFormatRaw === 'onsite' || sessionFormatRaw === 'remote'
      ? sessionFormatRaw
      : '';
  const rolloutType = str(body.rolloutType, 80);
  const peopleAffected = str(body.peopleAffected, 80);
  const goLiveWindow = str(body.goLiveWindow, 80);
  const changeAreas = str(body.changeAreas, 2000);
  const trainingPlan = str(body.trainingPlan, 120);
  const riskSignal = str(body.riskSignal, 200);
  const contentChannels = str(body.contentChannels, 2000);
  const lastPostWhen = str(body.lastPostWhen, 120);
  const hourReady = str(body.hourReady, 120);
  const contentGoal = str(body.contentGoal, 200);

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
  const isCrmRescue = product === 'crm-rescue';
  const isTeamAi = product === 'team-ai';
  const isChangePack = product === 'change-pack';
  const isContentSystem = product === 'content-system';

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
  } else if (isCrmRescue) {
    if (!CRM_SYSTEMS.has(crmSystem) || !CRM_LEAD_SOURCES.has(leadSource) || !CRM_GOALS.has(crmGoal)) {
      res.status(400).json({ error: 'Invalid CRM system, lead source, or goal' });
      return;
    }
    if (!CRM_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid access path' });
      return;
    }
  } else if (isTeamAi) {
    if (!teamSize || !teamTools || !timeEaters || !sensitiveData || !dateWindow) {
      res.status(400).json({ error: 'Missing team prep details or date window' });
      return;
    }
    if (sessionFormat !== 'remote' && sessionFormat !== 'onsite') {
      res.status(400).json({ error: 'Missing session format (remote or onsite)' });
      return;
    }
    if (accessPath !== 'call') {
      res.status(400).json({ error: 'Invalid access path' });
      return;
    }
  } else if (isChangePack) {
    if (
      !rolloutType ||
      !peopleAffected ||
      !goLiveWindow ||
      !changeAreas ||
      !trainingPlan ||
      !riskSignal
    ) {
      res.status(400).json({ error: 'Missing Change Pack scoping details' });
      return;
    }
    if (accessPath !== 'call') {
      res.status(400).json({ error: 'Invalid access path' });
      return;
    }
  } else if (isContentSystem) {
    if (!contentChannels || !lastPostWhen || !hourReady || !contentGoal) {
      res.status(400).json({ error: 'Missing Content System scoping details' });
      return;
    }
    if (accessPath !== 'call') {
      res.status(400).json({ error: 'Invalid access path' });
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
      : isCrmRescue
        ? [
            `Funnel access form — ${product}`,
            `Business: ${business}`,
            websiteUrl ? `Website: ${websiteUrl}` : null,
            `CRM / system: ${crmSystem}`,
            `How leads arrive: ${leadSource}`,
            `Primary goal: ${crmGoal}`,
            `Access path: ${accessPath}`,
            accessDetail ? `Access notes:\n${accessDetail}` : null,
            notes ? `Other notes:\n${notes}` : null,
            `Submitted: ${new Date().toISOString()}`,
          ]
            .filter(Boolean)
            .join('\n')
        : isTeamAi
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Format: ${sessionFormat === 'onsite' ? 'Face-to-face · Sydney' : 'Remote'}`,
              `Team size: ${teamSize}`,
              `Tools / AI today:\n${teamTools}`,
              `Time-eaters:\n${timeEaters}`,
              `Sensitive data rules:\n${sensitiveData}`,
              `Date window (2+ weeks):\n${dateWindow}`,
              notes ? `Other notes:\n${notes}` : null,
              `Submitted: ${new Date().toISOString()}`,
            ]
              .filter(Boolean)
              .join('\n')
          : isChangePack
            ? [
                `Funnel scoping form — ${product}`,
                `Business: ${business}`,
                `Rollout type: ${rolloutType}`,
                `People affected: ${peopleAffected}`,
                `Go-live window: ${goLiveWindow}`,
                `What is changing:\n${changeAreas}`,
                `Training today: ${trainingPlan}`,
                `Biggest adoption risk: ${riskSignal}`,
                notes ? `Other notes:\n${notes}` : null,
                `Submitted: ${new Date().toISOString()}`,
              ]
                .filter(Boolean)
                .join('\n')
            : isContentSystem
              ? [
                  `Funnel scoping form — ${product}`,
                  `Business: ${business}`,
                  `Channels:\n${contentChannels}`,
                  `Last posted: ${lastPostWhen}`,
                  `Hour ready: ${hourReady}`,
                  `Content goal: ${contentGoal}`,
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
    website: isCrmRescue ? websiteUrl : website,
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
    crmSystem,
    leadSource,
    crmGoal,
    websiteUrl,
    teamSize,
    teamTools,
    timeEaters,
    sensitiveData,
    dateWindow,
    sessionFormat: sessionFormat || undefined,
    rolloutType: rolloutType || undefined,
    peopleAffected: peopleAffected || undefined,
    goLiveWindow: goLiveWindow || undefined,
    changeAreas: changeAreas || undefined,
    trainingPlan: trainingPlan || undefined,
    riskSignal: riskSignal || undefined,
    contentChannels: contentChannels || undefined,
    lastPostWhen: lastPostWhen || undefined,
    hourReady: hourReady || undefined,
    contentGoal: contentGoal || undefined,
    submittedAt: new Date().toISOString(),
  };

  const dealAmount =
    isTeamAi && sessionFormat === 'onsite'
      ? PRODUCT_AMOUNTS['team-ai-onsite']
      : PRODUCT_AMOUNTS[product];
  const dealLabel =
    isTeamAi && sessionFormat === 'onsite'
      ? 'Team AI · Face-to-face'
      : isChangePack
        ? 'Change Pack scoping'
        : isContentSystem
          ? 'Content System scoping'
          : PRODUCT_LABELS[product] || product;

  let hubspotContactId: string | null = null;
  let hubspotDealId: string | null = null;
  let hubspotError: string | null = null;

  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    try {
      const { id } = await upsertContactByEmail({
        email,
        firstname: name,
        company: business,
        website: (isCrmRescue ? websiteUrl : website) || undefined,
        phone: phone || undefined,
        lifecyclestage: isChangePack || isContentSystem ? 'lead' : 'customer',
        leadSourceDetail: `go/${product}`,
      });
      hubspotContactId = id;
      await addContactNote(id, noteBody);

      try {
        const { id: dealId } = await createFunnelAccessDeal({
          contactId: id,
          dealname: `${dealLabel} — ${business}`,
          amount: dealAmount,
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
            : isCrmRescue
              ? `CRM: ${crmSystem} · Leads: ${leadSource} · Goal: ${crmGoal}`
              : website,
        isMissedCall || isGoogleProfile || isCrmRescue
          ? `Access: ${accessPath}`
          : `Platform: ${platform} · Access: ${accessPath}`,
        !isMissedCall && !isGoogleProfile && !isCrmRescue && sameProvider !== 'yes'
          ? `Domain/hosting same: ${sameProvider}${domainProvider ? ` · Domain: ${domainProvider}` : ''}${hostingProvider ? ` · Host: ${hostingProvider}` : ''}`
          : null,
        isCrmRescue && websiteUrl ? `Website: ${websiteUrl}` : null,
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

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
  'profile-posting',
  'enquiry-reply',
  'reviews',
  'local-pack',
  'search-fix',
  'booking',
  'landing-page',
  'ai-phone',
  'crm-rescue',
  'team-ai',
  'change-pack',
  'content-system',
  'conversion-pass',
  'onpage-search',
  'schema-faq',
  'tracking-forms',
  'site-chat',
  'media-clean',
  'a11y-pass',
  'whatsapp-setup',
  'dm-reply',
  'quote-followup',
  'noshow-rescue',
  'intake-forms',
  'inbox-triage',
  'sop-playbook',
  'dashboard-lite',
  'bundle-clinic',
  'bundle-speed-next',
  'bundle-front-door',
  'geo',
  'client-finder',
]);
const PRODUCT_LABELS: Record<string, string> = {
  'speed-fix': 'Website Speed Fix',
  'missed-call': 'Missed-Call Text-Back',
  'google-profile': 'Google Profile Fix',
  'profile-posting': 'Profile Posting System',
  'enquiry-reply': 'Enquiry Auto-Reply',
  reviews: 'Review Engine',
  'local-pack': 'Local Pack',
  'search-fix': 'Search Visibility Fix',
  booking: 'Booking System',
  'landing-page': 'Campaign Landing Page',
  'ai-phone': 'AI Phone Setup',
  'crm-rescue': 'CRM Rescue',
  'team-ai': 'Team AI',
  'change-pack': 'Change Pack',
  'content-system': 'Content System',
  'conversion-pass': 'Conversion Pass',
  'onpage-search': 'On-Page Search Pack',
  'schema-faq': 'Schema and FAQ Pack',
  'tracking-forms': 'Tracking and Forms Pack',
  'site-chat': 'Site AI Chat',
  'media-clean': 'Image and Media Clean',
  'a11y-pass': 'Accessibility Quick Pass',
  'whatsapp-setup': 'WhatsApp Business Setup',
  'dm-reply': 'DM Reply System',
  'quote-followup': 'Quote Follow-Up Autopilot',
  'noshow-rescue': 'No-Show Rescue',
  'intake-forms': 'Intake Form Pack',
  'inbox-triage': 'Inbox Triage Assistant',
  'sop-playbook': 'SOP to AI Playbook',
  'dashboard-lite': 'Dashboard Lite',
  'bundle-clinic': 'Clinic Capture Bundle',
  'bundle-speed-next': 'Speed Next Bundle',
  'bundle-front-door': 'Front Door Bundle',
  'geo': 'AI Search Visibility',
  'client-finder': 'Client Finder Sprint',
};
const PRODUCT_AMOUNTS: Record<string, string> = {
  'speed-fix': '1200',
  'missed-call': '750',
  'google-profile': '600',
  'profile-posting': '1100',
  'enquiry-reply': '350',
  reviews: '1100',
  'local-pack': '2400',
  'search-fix': '1400',
  booking: '1500',
  'landing-page': '1800',
  'ai-phone': '1950',
  'crm-rescue': '2800',
  'team-ai': '1950',
  'team-ai-onsite': '2400',
  'change-pack': '6000',
  'content-system': '3400',
  'conversion-pass': '1400',
  'onpage-search': '1900',
  'schema-faq': '1200',
  'tracking-forms': '950',
  'site-chat': '950',
  'media-clean': '650',
  'a11y-pass': '1100',
  'whatsapp-setup': '950',
  'dm-reply': '1100',
  'quote-followup': '1450',
  'noshow-rescue': '750',
  'intake-forms': '1200',
  'inbox-triage': '2200',
  'sop-playbook': '2400',
  'dashboard-lite': '2600',
  'bundle-clinic': '2200',
  'bundle-speed-next': '2400',
  'bundle-front-door': '3400',
  'geo': '2200',
  'client-finder': '2800',
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
const BOOKING_TOOLS = new Set(['hubspot', 'calendly', 'setmore', 'fresha', 'other', 'none']);
const BOOKING_WHAT = new Set(['appointments', 'calls', 'consults', 'mixed', 'other']);
const BOOKING_WHERE = new Set(['site', 'google', 'both', 'unsure']);
const BOOKING_ACCESS = new Set(['invite', 'wp-admin', 'admin', 'call']);
const LANDING_GOALS = new Set(['leads', 'calls', 'book', 'buy', 'other']);
const LANDING_ADS = new Set(['meta', 'google', 'both', 'not-live', 'other']);
const LANDING_TRACKING = new Set(['meta', 'google', 'both', 'none', 'unsure']);
const LANDING_ACCESS = new Set(['ad-account', 'wp-admin', 'hosting', 'agency', 'call']);
const CONVERSION_ASK = new Set(['call', 'form', 'book']);
const MISSED_CALL_SETUPS = new Set(['mobile', 'landline', 'voip', 'mixed', 'unsure']);
const MISSED_CALL_ACCESS = new Set(['forward', 'provider', 'crm', 'call', 'invite']);
const WHATSAPP_STATUS = new Set(['personal', 'business-app', 'meta', 'unsure']);
const WHATSAPP_ACCESS = new Set(['invite', 'admin', 'provider', 'call']);
const DM_PLATFORM = new Set(['instagram', 'facebook', 'both', 'unsure']);
const DM_ACCESS = new Set(['invite', 'admin', 'provider', 'call']);
const QUOTE_TOOL = new Set(['hubspot', 'pipedrive', 'sheets', 'email', 'other', 'unsure']);
const QUOTE_ACCESS = new Set(['invite', 'crm', 'provider', 'call']);
const INTAKE_DEST = new Set(['crm', 'email', 'sheets', 'other', 'unsure']);
const INTAKE_ACCESS = new Set(['invite', 'crm', 'provider', 'form-provider', 'call']);
const GOOGLE_PROFILE_STATUS = new Set([
  'unclaimed',
  'claimed-me',
  'claimed-other',
  'suspended',
  'unsure',
]);
const GOOGLE_PROFILE_ACCESS = new Set(['invite', 'call', 'claim', 'recover']);
const WHO_PUBLISHES = new Set(['owner', 'staff', 'care-later', 'unsure']);
const PROFILE_POSTING_ACCESS = new Set(['invite', 'call', 'claim', 'recover']);
const ENQUIRY_CHANNELS = new Set(['form', 'email', 'both', 'both-plus', 'unsure']);
const ENQUIRY_ROUTES = new Set(['inbox', 'sms', 'crm', 'unsure']);
const ENQUIRY_REPLY_ACCESS = new Set(['form-provider', 'call', 'crm', 'provider']);
const REVIEW_JOBS = new Set(['sms', 'email', 'software', 'manual', 'unsure']);
const REVIEWS_ACCESS = new Set(['invite', 'call', 'claim', 'recover', 'provider', 'crm']);
const LOCAL_PACK_ACCESS = new Set(['invite', 'call', 'claim', 'recover', 'provider', 'crm']);
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
const ACCESS = new Set(['wp-admin', 'hosting', 'agency', 'call', 'search-console']);

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
  whoPublishes?: unknown;
  enquiryChannels?: unknown;
  enquiryRoute?: unknown;
  reviewJob?: unknown;
  crmSystem?: unknown;
  leadSource?: unknown;
  crmGoal?: unknown;
  bookingTool?: unknown;
  bookingWhat?: unknown;
  bookingWhere?: unknown;
  landingGoal?: unknown;
  landingAds?: unknown;
  landingOffer?: unknown;
  landingTracking?: unknown;
  conversionServiceA?: unknown;
  conversionServiceB?: unknown;
  conversionAsk?: unknown;
  conversionOffer?: unknown;
  onpageUrls?: unknown;
  onpageQueries?: unknown;
  schemaServices?: unknown;
  schemaQuestions?: unknown;
  trackingStatus?: unknown;
  trackingActions?: unknown;
  trackingDestinations?: unknown;
  chatTopics?: unknown;
  chatHandoff?: unknown;
  mediaTargets?: unknown;
  a11yPages?: unknown;
  whatsappStatus?: unknown;
  whatsappGoals?: unknown;
  dmPlatform?: unknown;
  dmChannels?: unknown;
  quoteTool?: unknown;
  quoteTools?: unknown;
  noshowTools?: unknown;
  intakePurpose?: unknown;
  inboxTools?: unknown;
  sopJobs?: unknown;
  dashMetrics?: unknown;
  bundleNotes?: unknown;
  geoTopics?: unknown;
  finderIcp?: unknown;
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
  contentChannelLinks?: unknown;
  lastPostWhen?: unknown;
  hourReady?: unknown;
  contentGoal?: unknown;
};

function str(v: unknown, max = 500): string {
  if (typeof v !== 'string') return '';
  return v.trim().slice(0, max);
}

function onpageUrlLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function schemaServiceLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function cors(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function stripeSecret(): string | undefined {
  return (
    process.env.Stripe_Secret_key ||
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_SECRET
  );
}

const WEBSITE_TIERS = new Set(['brochure', 'practice', 'full']);
const WEBSITE_TIER_LABELS: Record<string, string> = {
  brochure: 'Brochure',
  practice: 'Practice',
  full: 'Full site',
};
const WEBSITE_TIER_AMOUNTS: Record<string, string> = {
  brochure: '120',
  practice: '160',
  full: '190',
};

function asPlainAnswer(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'boolean') return value ? 'yes' : 'no';
  if (typeof value === 'string') return value.trim();
  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === 'string') return item.trim();
        if (item && typeof item === 'object' && 'name' in item) {
          return String((item as { name?: string }).name || '');
        }
        return '';
      })
      .filter(Boolean)
      .join(', ');
  }
  return String(value);
}

/** Prefill agreement from Stripe Checkout Session. GET ?session_id=cs_… */
async function handleWebsiteSession(req: VercelRequest, res: VercelResponse): Promise<void> {
  const raw = req.query.session_id;
  const sessionId = Array.isArray(raw) ? raw[0] : raw;
  if (!sessionId || typeof sessionId !== 'string' || !sessionId.startsWith('cs_')) {
    res.status(400).json({ error: 'Missing or invalid session_id' });
    return;
  }

  const secret = stripeSecret();
  if (!secret) {
    res.status(500).json({ error: 'Stripe is not configured' });
    return;
  }

  try {
    const url = new URL(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`);
    url.searchParams.set('expand[]', 'customer');
    const stripeRes = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const session = (await stripeRes.json()) as {
      error?: { message?: string };
      id?: string;
      payment_status?: string;
      status?: string;
      customer_details?: {
        name?: string | null;
        email?: string | null;
        phone?: string | null;
        address?: {
          line1?: string | null;
          city?: string | null;
          state?: string | null;
          postal_code?: string | null;
        } | null;
        tax_ids?: Array<{ type?: string; value?: string }> | null;
      } | null;
      customer?:
        | string
        | {
            name?: string | null;
            email?: string | null;
            phone?: string | null;
            metadata?: Record<string, string>;
          }
        | null;
      customer_email?: string | null;
      metadata?: Record<string, string>;
      amount_total?: number | null;
    };

    if (!stripeRes.ok) {
      res.status(stripeRes.status).json({
        error: session.error?.message || 'Could not load checkout session',
      });
      return;
    }

    if (session.payment_status !== 'paid' && session.status !== 'complete') {
      res.status(402).json({ error: 'Payment is not complete yet' });
      return;
    }

    const details = session.customer_details;
    const customerObj =
      session.customer && typeof session.customer === 'object' ? session.customer : null;
    const taxId =
      details?.tax_ids?.find((t) => t.value)?.value || details?.tax_ids?.[0]?.value || null;
    const addressParts = [
      details?.address?.line1,
      details?.address?.city,
      details?.address?.state,
      details?.address?.postal_code,
    ].filter(Boolean);

    res.setHeader('Cache-Control', 'no-store');
    res.status(200).json({
      sessionId: session.id,
      email: details?.email || customerObj?.email || session.customer_email || '',
      name: details?.name || customerObj?.name || '',
      phone: details?.phone || customerObj?.phone || '',
      business: customerObj?.metadata?.business || details?.name || '',
      abn: taxId,
      address: addressParts.join(', '),
      tier: session.metadata?.tier || null,
      amountAud:
        typeof session.amount_total === 'number'
          ? Math.round(session.amount_total / 100)
          : null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('[funnel/access] website-session', err);
    res.status(500).json({ error: message });
  }
}

/** Hosted Website Plan wizard → HubSpot. POST { product:'website', tier, … } */
async function handleWebsiteAccess(req: VercelRequest, res: VercelResponse): Promise<void> {
  const body = (req.body ?? {}) as Record<string, unknown>;
  const tier = str(body.tier, 40).toLowerCase();
  const name = str(body.name, 120);
  const email = str(body.email, 200).toLowerCase();
  const business = str(body.business, 200);
  const phone = str(body.phone, 40);
  const answers =
    body.answers && typeof body.answers === 'object' && !Array.isArray(body.answers)
      ? (body.answers as Record<string, unknown>)
      : {};

  if (!WEBSITE_TIERS.has(tier)) {
    res.status(400).json({ error: 'Missing or invalid plan tier' });
    return;
  }
  if (name.length < 2 || !email.includes('@') || business.length < 2) {
    res.status(400).json({ error: 'Name, email and business are required' });
    return;
  }

  const tierLabel = WEBSITE_TIER_LABELS[tier];
  const amount = WEBSITE_TIER_AMOUNTS[tier];
  const answerLines = Object.entries(answers)
    .filter(([key]) => !['logo', 'photos'].includes(key))
    .map(([key, value]) => {
      const plain = asPlainAnswer(value);
      return plain ? `${key}: ${plain}` : null;
    })
    .filter(Boolean) as string[];

  const logoNote =
    Array.isArray(answers.logo) && answers.logo.length
      ? `logo: ${answers.logo.length} file(s) chosen in browser (not uploaded to HubSpot yet)`
      : null;
  const photosNote =
    Array.isArray(answers.photos) && answers.photos.length
      ? `photos: ${answers.photos.length} file(s) chosen in browser (not uploaded to HubSpot yet)`
      : null;

  const noteBody = [
    `Hosted Website Plan intake · ${tierLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Business: ${business}`,
    phone ? `Phone: ${phone}` : null,
    `Amount (enrolment / monthly): $${amount}`,
    '',
    'Answers:',
    ...answerLines,
    logoNote,
    photosNote,
  ]
    .filter(Boolean)
    .join('\n');

  let hubspotContactId: string | null = null;
  let hubspotDealId: string | null = null;
  let hubspotError: string | null = null;

  if (process.env.HUBSPOT_PRIVATE_APP_TOKEN) {
    try {
      const { id } = await upsertContactByEmail({
        email,
        firstname: name,
        company: business,
        phone: phone || undefined,
        website:
          str(answers.preferredDomain || answers.currentUrl || answers.domainName, 400) ||
          undefined,
        lifecyclestage: 'customer',
        leadSourceDetail: `go/website/${tier}`,
      });
      hubspotContactId = id;
      await addContactNote(id, noteBody);

      try {
        const { id: dealId } = await createFunnelAccessDeal({
          contactId: id,
          dealname: `Hosted Website Plan · ${tierLabel} — ${business}`,
          amount,
          productCode: 'website',
          noteBody,
        });
        hubspotDealId = dealId;
      } catch (dealErr) {
        console.error(
          '[funnel/access] website deal',
          dealErr instanceof Error ? dealErr.message : dealErr,
        );
      }
    } catch (err) {
      hubspotError = err instanceof Error ? err.message : 'HubSpot failed';
      console.error('[funnel/access] website HubSpot', hubspotError);
    }
  } else {
    hubspotError = 'HubSpot is not configured';
  }

  if (!hubspotContactId) {
    res.status(502).json({ error: hubspotError || 'Could not save to HubSpot' });
    return;
  }

  res.status(200).json({
    ok: true,
    hubspotContactId,
    hubspotDealId,
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  cors(res);
  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Hobby plan: keep website Stripe prefill + intake inside this one function.
  if (req.method === 'GET') {
    await handleWebsiteSession(req, res);
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = (req.body ?? {}) as Body & { tier?: unknown; answers?: unknown };
  const product = str(body.product, 40);
  if (product === 'website') {
    await handleWebsiteAccess(req, res);
    return;
  }

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
  const whoPublishes = str(body.whoPublishes, 40);
  const enquiryChannels = str(body.enquiryChannels, 40);
  const enquiryRoute = str(body.enquiryRoute, 40);
  const reviewJob = str(body.reviewJob, 40);
  const crmSystem = str(body.crmSystem, 40);
  const leadSource = str(body.leadSource, 40);
  const crmGoal = str(body.crmGoal, 40);
  const bookingTool = str(body.bookingTool, 40);
  const bookingWhat = str(body.bookingWhat, 40);
  const bookingWhere = str(body.bookingWhere, 40);
  const landingGoal = str(body.landingGoal, 40);
  const landingAds = str(body.landingAds, 40);
  const landingOffer = str(body.landingOffer, 4000);
  const landingTracking = str(body.landingTracking, 40);
  const conversionServiceA = str(body.conversionServiceA, 200);
  const conversionServiceB = str(body.conversionServiceB, 200);
  const conversionAsk = str(body.conversionAsk, 40);
  const conversionOffer = str(body.conversionOffer, 4000);
  const onpageUrls = str(body.onpageUrls, 2000);
  const onpageQueries = str(body.onpageQueries, 2000);
  const schemaServices = str(body.schemaServices, 800);
  const schemaQuestions = str(body.schemaQuestions, 4000);
  const trackingStatus = str(body.trackingStatus, 40);
  const trackingActions = str(body.trackingActions, 2000);
  const trackingDestinations = str(body.trackingDestinations, 2000);
  const chatTopics = str(body.chatTopics, 4000);
  const chatHandoff = str(body.chatHandoff, 2000);
  const mediaTargets = str(body.mediaTargets, 4000);
  const a11yPages = str(body.a11yPages, 4000);
  const whatsappStatus = str(body.whatsappStatus, 40);
  const whatsappGoals = str(body.whatsappGoals, 4000);
  const dmPlatform = str(body.dmPlatform, 40);
  const dmChannels = str(body.dmChannels, 4000);
  const quoteTool = str(body.quoteTool, 40);
  const quoteTools = str(body.quoteTools, 4000);
  const noshowTools = str(body.noshowTools, 4000);
  const intakePurpose = str(body.intakePurpose, 4000);
  const inboxTools = str(body.inboxTools, 4000);
  const sopJobs = str(body.sopJobs, 4000);
  const dashMetrics = str(body.dashMetrics, 4000);
  const bundleNotes = str(body.bundleNotes, 4000);
  const geoTopics = str(body.geoTopics, 4000);
  const finderIcp = str(body.finderIcp, 4000);
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
  const contentChannelLinks = str(body.contentChannelLinks, 4000);
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

  const isMissedCall = product === 'missed-call' || product === 'ai-phone';
  const isGoogleProfile = product === 'google-profile';
  const isProfilePosting = product === 'profile-posting';
  const isEnquiryReply = product === 'enquiry-reply';
  const isReviews = product === 'reviews';
  const isLocalPack = product === 'local-pack';
  const isCrmRescue = product === 'crm-rescue';
  const isBooking = product === 'booking';
  const isLandingPage = product === 'landing-page';
  const isConversionPass = product === 'conversion-pass';
  const isOnpageSearch = product === 'onpage-search';
  const isSchemaFaq = product === 'schema-faq';
  const isTrackingForms = product === 'tracking-forms';
  const isSiteChat = product === 'site-chat';
  const isMediaClean = product === 'media-clean';
  const isA11yPass = product === 'a11y-pass';
  const isWhatsappSetup = product === 'whatsapp-setup';
  const isDmReply = product === 'dm-reply';
  const isQuoteFollowup = product === 'quote-followup';
  const isNoshowRescue = product === 'noshow-rescue';
  const isIntakeForms = product === 'intake-forms';
  const isInboxTriage = product === 'inbox-triage';
  const isSopPlaybook = product === 'sop-playbook';
  const isDashboardLite = product === 'dashboard-lite';
  const isBundleClinic = product === 'bundle-clinic';
  const isBundleSpeedNext = product === 'bundle-speed-next';
  const isBundleFrontDoor = product === 'bundle-front-door';
  const isGeo = product === 'geo';
  const isClientFinder = product === 'client-finder';
  const isBatchScoped =
    isA11yPass ||
    isNoshowRescue ||
    isInboxTriage ||
    isSopPlaybook ||
    isDashboardLite ||
    isBundleClinic ||
    isBundleSpeedNext ||
    isBundleFrontDoor ||
    isGeo ||
    isClientFinder;
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
  } else if (isProfilePosting) {
    if (profileUrl.length < 3) {
      res.status(400).json({ error: 'Please enter your Google profile link or exact listing name.' });
      return;
    }
    if (!GOOGLE_PROFILE_STATUS.has(profileStatus) || !PROFILE_POSTING_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid profile status or access path' });
      return;
    }
    if (!WHO_PUBLISHES.has(whoPublishes)) {
      res.status(400).json({ error: 'Invalid who-publishes answer' });
      return;
    }
  } else if (isEnquiryReply) {
    if (!ENQUIRY_CHANNELS.has(enquiryChannels) || !ENQUIRY_ROUTES.has(enquiryRoute)) {
      res.status(400).json({ error: 'Invalid enquiry channels or route' });
      return;
    }
    if (!ENQUIRY_REPLY_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid access path' });
      return;
    }
  } else if (isReviews) {
    if (profileUrl.length < 3) {
      res.status(400).json({ error: 'Please enter your Google profile link or exact listing name.' });
      return;
    }
    if (!GOOGLE_PROFILE_STATUS.has(profileStatus) || !REVIEWS_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid profile status or access path' });
      return;
    }
    if (profileStatus === 'claimed-me' && !REVIEW_JOBS.has(reviewJob)) {
      res.status(400).json({ error: 'Invalid job-complete path' });
      return;
    }
  } else if (isLocalPack) {
    if (profileUrl.length < 3) {
      res.status(400).json({ error: 'Please enter your Google profile link or exact listing name.' });
      return;
    }
    if (!GOOGLE_PROFILE_STATUS.has(profileStatus) || !LOCAL_PACK_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid profile status or access path' });
      return;
    }
    if (!WHO_PUBLISHES.has(whoPublishes)) {
      res.status(400).json({ error: 'Invalid who-publishes answer' });
      return;
    }
    if (profileStatus === 'claimed-me' && !REVIEW_JOBS.has(reviewJob)) {
      res.status(400).json({ error: 'Invalid job-complete path' });
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
  } else if (isBooking) {
    if (!BOOKING_TOOLS.has(bookingTool) || !BOOKING_WHAT.has(bookingWhat) || !BOOKING_WHERE.has(bookingWhere)) {
      res.status(400).json({ error: 'Invalid booking tool, booking type, or Book now surfaces' });
      return;
    }
    if (!BOOKING_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid access path' });
      return;
    }
  } else if (isLandingPage) {
    if (
      !LANDING_GOALS.has(landingGoal) ||
      !LANDING_ADS.has(landingAds) ||
      landingOffer.length < 8 ||
      !LANDING_TRACKING.has(landingTracking)
    ) {
      res.status(400).json({ error: 'Invalid campaign goal, ads channel, offer, or tracking' });
      return;
    }
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !LANDING_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
  } else if (isConversionPass) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    if (conversionServiceA.length < 2 || conversionServiceB.length < 2) {
      res.status(400).json({ error: 'Missing the two service pages' });
      return;
    }
    if (!CONVERSION_ASK.has(conversionAsk)) {
      res.status(400).json({ error: 'Invalid main action' });
      return;
    }
    if (conversionOffer.length < 8) {
      res.status(400).json({ error: 'Missing the one-line offer' });
      return;
    }
  } else if (isOnpageSearch) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    const urlLines = onpageUrlLines(onpageUrls);
    if (urlLines.length < 2 || urlLines.length > 8) {
      res.status(400).json({ error: 'List two to eight priority URLs' });
      return;
    }
    if (onpageQueries.length < 8) {
      res.status(400).json({ error: 'Missing what these pages should be findable for' });
      return;
    }
  } else if (isSchemaFaq) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    const serviceLines = schemaServiceLines(schemaServices);
    if (serviceLines.length < 1 || serviceLines.length > 3) {
      res.status(400).json({ error: 'List one to three services' });
      return;
    }
    if (schemaQuestions.length < 8) {
      res.status(400).json({ error: 'Missing the common questions you hear' });
      return;
    }
  } else if (isTrackingForms) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    if (!['ga4', 'gtm', 'none', 'unsure'].includes(trackingStatus)) {
      res.status(400).json({ error: 'Invalid tracking status' });
      return;
    }
    if (trackingActions.length < 8) {
      res.status(400).json({ error: 'Missing the actions that matter' });
      return;
    }
    if (trackingDestinations.length < 8) {
      res.status(400).json({ error: 'Missing where leads should land' });
      return;
    }
  } else if (isSiteChat) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    if (chatTopics.length < 8) {
      res.status(400).json({ error: 'Missing the questions people ask' });
      return;
    }
    if (chatHandoff.length < 8) {
      res.status(400).json({ error: 'Missing handoff destination' });
      return;
    }
  } else if (isMediaClean) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    if (mediaTargets.length < 8) {
      res.status(400).json({ error: 'Missing pages or folders to clean' });
      return;
    }
  } else if (isWhatsappSetup) {
    const cleanPhone = phone.replace(/\s+/g, '');
    if (!/^(0[23478])\d{8}$/.test(cleanPhone)) {
      res.status(400).json({ error: 'Please enter a valid Australian WhatsApp number.' });
      return;
    }
    if (!WHATSAPP_STATUS.has(whatsappStatus) || !WHATSAPP_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid WhatsApp status or access path' });
      return;
    }
    if (whatsappGoals.length < 8) {
      res.status(400).json({ error: 'Missing what WhatsApp should handle' });
      return;
    }
  } else if (isDmReply) {
    if (!DM_PLATFORM.has(dmPlatform) || !DM_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid DM platform or access path' });
      return;
    }
    if (dmChannels.length < 8) {
      res.status(400).json({ error: 'Missing what DMs should answer' });
      return;
    }
  } else if (isQuoteFollowup) {
    if (!QUOTE_TOOL.has(quoteTool) || !QUOTE_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid quote tool or access path' });
      return;
    }
    if (quoteTools.length < 8) {
      res.status(400).json({ error: 'Missing how follow-up works now' });
      return;
    }
  } else if (isIntakeForms) {
    if (!INTAKE_DEST.has(intakeDest) || !INTAKE_ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid intake destination or access path' });
      return;
    }
    if (intakePurpose.length < 8) {
      res.status(400).json({ error: 'Missing what intake should capture' });
      return;
    }
  } else if (isBatchScoped) {
    if (website.length < 4) {
      res.status(400).json({ error: 'Missing website' });
      return;
    }
    if (!PLATFORMS.has(platform) || !SAME.has(sameProvider) || !ACCESS.has(accessPath)) {
      res.status(400).json({ error: 'Invalid platform, provider, or access path' });
      return;
    }
    const scopeVal =
      (isA11yPass && a11yPages) ||
      (isNoshowRescue && noshowTools) ||
      (isInboxTriage && inboxTools) ||
      (isSopPlaybook && sopJobs) ||
      (isDashboardLite && dashMetrics) ||
      ((isBundleClinic || isBundleSpeedNext || isBundleFrontDoor) && bundleNotes) ||
      (isGeo && geoTopics) ||
      (isClientFinder && finderIcp) ||
      '';
    if (String(scopeVal).length < 8) {
      res.status(400).json({ error: 'Missing scope details' });
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
      : isProfilePosting
        ? [
            `Funnel access form — ${product}`,
            `Business: ${business}`,
            `Profile: ${profileUrl}`,
            `Profile status: ${profileStatus}`,
            `Who publishes: ${whoPublishes}`,
            `Access path: ${accessPath}`,
            accessDetail ? `Access notes:\n${accessDetail}` : null,
            notes ? `Other notes:\n${notes}` : null,
            `Submitted: ${new Date().toISOString()}`,
          ]
            .filter(Boolean)
            .join('\n')
      : isEnquiryReply
        ? [
            `Funnel access form — ${product}`,
            `Business: ${business}`,
            websiteUrl ? `Website: ${websiteUrl}` : null,
            `Channels: ${enquiryChannels}`,
            `Route: ${enquiryRoute}`,
            `Access path: ${accessPath}`,
            accessDetail ? `Access notes:\n${accessDetail}` : null,
            notes ? `Other notes:\n${notes}` : null,
            `Submitted: ${new Date().toISOString()}`,
          ]
            .filter(Boolean)
            .join('\n')
      : isReviews
        ? [
            `Funnel access form — ${product}`,
            `Business: ${business}`,
            `Profile: ${profileUrl}`,
            `Profile status: ${profileStatus}`,
            reviewJob ? `Job complete path: ${reviewJob}` : null,
            `Access path: ${accessPath}`,
            accessDetail ? `Access notes:\n${accessDetail}` : null,
            notes ? `Other notes:\n${notes}` : null,
            `Submitted: ${new Date().toISOString()}`,
          ]
            .filter(Boolean)
            .join('\n')
      : isLocalPack
        ? [
            `Funnel access form — ${product}`,
            `Business: ${business}`,
            `Profile: ${profileUrl}`,
            `Profile status: ${profileStatus}`,
            reviewJob ? `Job complete path: ${reviewJob}` : null,
            `Who publishes: ${whoPublishes}`,
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
        : isBooking
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              websiteUrl ? `Website: ${websiteUrl}` : null,
              `Booking tool: ${bookingTool}`,
              `What gets booked: ${bookingWhat}`,
              `Book now surfaces: ${bookingWhere}`,
              `Access path: ${accessPath}`,
              accessDetail ? `Access notes:\n${accessDetail}` : null,
              notes ? `Other notes:\n${notes}` : null,
              `Submitted: ${new Date().toISOString()}`,
            ]
              .filter(Boolean)
              .join('\n')
        : isLandingPage
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Page goal: ${landingGoal}`,
              `Ads channel: ${landingAds}`,
              `Offer / ad promise:\n${landingOffer}`,
              `Tracking today: ${landingTracking}`,
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
              .join('\n')
        : isConversionPass
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Service page 1: ${conversionServiceA}`,
              `Service page 2: ${conversionServiceB}`,
              `Main action: ${conversionAsk}`,
              `One-line offer:\n${conversionOffer}`,
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
              .join('\n')
        : isOnpageSearch
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Priority URLs:\n${onpageUrlLines(onpageUrls)
                .map((line) => `- ${line}`)
                .join('\n')}`,
              `Findable for:\n${onpageQueries}`,
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
              .join('\n')
        : isSchemaFaq
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Services for FAQs:\n${schemaServiceLines(schemaServices)
                .map((line) => `- ${line}`)
                .join('\n')}`,
              `Common questions:\n${schemaQuestions}`,
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
              .join('\n')
        : isTrackingForms
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Tracking status: ${trackingStatus}`,
              `Actions that matter:\n${trackingActions}`,
              `Lead destinations:\n${trackingDestinations}`,
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
              .join('\n')
        : isSiteChat
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Chat topics:\n${chatTopics}`,
              `Handoff:\n${chatHandoff}`,
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
              .join('\n')
        : isMediaClean
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Pages / folders:\n${mediaTargets}`,
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
              .join('\n')
        : isWhatsappSetup
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `WhatsApp number: ${phone}`,
              `WhatsApp status: ${whatsappStatus}`,
              `Goals:\n${whatsappGoals}`,
              `Access path: ${accessPath}`,
              accessDetail ? `Access notes:\n${accessDetail}` : null,
              notes ? `Other notes:\n${notes}` : null,
              `Submitted: ${new Date().toISOString()}`,
            ]
              .filter(Boolean)
              .join('\n')
        : isDmReply
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `DM platforms: ${dmPlatform}`,
              `What to answer:\n${dmChannels}`,
              `Access path: ${accessPath}`,
              accessDetail ? `Access notes:\n${accessDetail}` : null,
              notes ? `Other notes:\n${notes}` : null,
              `Submitted: ${new Date().toISOString()}`,
            ]
              .filter(Boolean)
              .join('\n')
        : isQuoteFollowup
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Quote tool: ${quoteTool}`,
              `Follow-up today:\n${quoteTools}`,
              `Access path: ${accessPath}`,
              accessDetail ? `Access notes:\n${accessDetail}` : null,
              notes ? `Other notes:\n${notes}` : null,
              `Submitted: ${new Date().toISOString()}`,
            ]
              .filter(Boolean)
              .join('\n')
        : isIntakeForms
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Intake destination: ${intakeDest}`,
              `What to capture:\n${intakePurpose}`,
              `Access path: ${accessPath}`,
              accessDetail ? `Access notes:\n${accessDetail}` : null,
              notes ? `Other notes:\n${notes}` : null,
              `Submitted: ${new Date().toISOString()}`,
            ]
              .filter(Boolean)
              .join('\n')
        : isBatchScoped
          ? [
              `Funnel access form — ${product}`,
              `Business: ${business}`,
              `Website: ${website}`,
              `Scope:\n${
                a11yPages ||
                noshowTools ||
                inboxTools ||
                sopJobs ||
                dashMetrics ||
                bundleNotes ||
                geoTopics ||
                finderIcp ||
                ''
              }`,
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
                  contentChannelLinks ? `Channel links:\n${contentChannelLinks}` : null,
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
    website: isCrmRescue || isBooking ? websiteUrl : website,
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
    whoPublishes,
    enquiryChannels,
    enquiryRoute,
    reviewJob,
    crmSystem,
    leadSource,
    crmGoal,
    bookingTool,
    bookingWhat,
    bookingWhere,
    landingGoal,
    landingAds,
    landingOffer,
    landingTracking,
    conversionServiceA,
    conversionServiceB,
    conversionAsk,
    conversionOffer,
    onpageUrls: onpageUrls || undefined,
    onpageQueries: onpageQueries || undefined,
    schemaServices: schemaServices || undefined,
    schemaQuestions: schemaQuestions || undefined,
    trackingStatus: trackingStatus || undefined,
    trackingActions: trackingActions || undefined,
    trackingDestinations: trackingDestinations || undefined,
    chatTopics: chatTopics || undefined,
    chatHandoff: chatHandoff || undefined,
    mediaTargets: mediaTargets || undefined,
    a11yPages: a11yPages || undefined,
    whatsappStatus: whatsappStatus || undefined,
    whatsappGoals: whatsappGoals || undefined,
    dmPlatform: dmPlatform || undefined,
    dmChannels: dmChannels || undefined,
    quoteTool: quoteTool || undefined,
    quoteTools: quoteTools || undefined,
    noshowTools: noshowTools || undefined,
    intakePurpose: intakePurpose || undefined,
    inboxTools: inboxTools || undefined,
    sopJobs: sopJobs || undefined,
    dashMetrics: dashMetrics || undefined,
    bundleNotes: bundleNotes || undefined,
    geoTopics: geoTopics || undefined,
    finderIcp: finderIcp || undefined,
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
    contentChannelLinks: contentChannelLinks || undefined,
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
        website: (isCrmRescue || isBooking ? websiteUrl : website) || undefined,
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
            : isProfilePosting
              ? `Profile: ${profileUrl.slice(0, 80)} · Status: ${profileStatus} · Publishes: ${whoPublishes}`
              : isEnquiryReply
                ? `Channels: ${enquiryChannels} · Route: ${enquiryRoute}${websiteUrl ? ` · ${websiteUrl.slice(0, 60)}` : ''}`
              : isReviews
                ? `Profile: ${profileUrl.slice(0, 80)} · Status: ${profileStatus}${reviewJob ? ` · Job: ${reviewJob}` : ''}`
                : isLocalPack
                  ? `Profile: ${profileUrl.slice(0, 80)} · Status: ${profileStatus} · Publishes: ${whoPublishes}${reviewJob ? ` · Job: ${reviewJob}` : ''}`
                  : isCrmRescue
                    ? `CRM: ${crmSystem} · Leads: ${leadSource} · Goal: ${crmGoal}`
                    : isBooking
                      ? `Tool: ${bookingTool} · Books: ${bookingWhat} · Surfaces: ${bookingWhere}`
                      : isConversionPass
                        ? `${website} · Pages: ${conversionServiceA}, ${conversionServiceB} · Ask: ${conversionAsk}`
                        : isOnpageSearch
                          ? `${website} · URLs: ${onpageUrlLines(onpageUrls).length} · Findable for: ${onpageQueries.slice(0, 80)}`
                          : isSchemaFaq
                            ? `${website} · Services: ${schemaServiceLines(schemaServices).join(', ').slice(0, 80)} · Questions: ${schemaQuestions.slice(0, 80)}`
                            : isTrackingForms
                              ? `${website} · Status: ${trackingStatus} · Actions: ${trackingActions.slice(0, 60)}`
                            : isSiteChat
                              ? `${website} · Topics: ${chatTopics.slice(0, 60)} · Handoff: ${chatHandoff.slice(0, 40)}`
                            : isMediaClean
                              ? `${website} · Scope: ${mediaTargets.slice(0, 80)}`
                            : isWhatsappSetup
                              ? `WA: ${phone} · Status: ${whatsappStatus} · Goals: ${whatsappGoals.slice(0, 60)}`
                            : isDmReply
                              ? `DM: ${dmPlatform} · ${dmChannels.slice(0, 60)}`
                            : isQuoteFollowup
                              ? `Quotes: ${quoteTool} · ${quoteTools.slice(0, 60)}`
                            : isIntakeForms
                              ? `Intake: ${intakeDest} · ${intakePurpose.slice(0, 60)}`
                            : isBatchScoped
                              ? `${website} · Scope: ${(
                                  a11yPages ||
                                  noshowTools ||
                                  inboxTools ||
                                  sopJobs ||
                                  dashMetrics ||
                                  bundleNotes ||
                                  geoTopics ||
                                  finderIcp ||
                                  ''
                                ).slice(0, 80)}`
                            : website,
        isMissedCall ||
        isGoogleProfile ||
        isProfilePosting ||
        isEnquiryReply ||
        isReviews ||
        isLocalPack ||
        isCrmRescue ||
        isBooking
          ? `Access: ${accessPath}`
          : `Platform: ${platform} · Access: ${accessPath}`,
        !isMissedCall &&
        !isGoogleProfile &&
        !isProfilePosting &&
        !isEnquiryReply &&
        !isReviews &&
        !isLocalPack &&
        !isCrmRescue &&
        !isBooking &&
        sameProvider !== 'yes'
          ? `Domain/hosting same: ${sameProvider}${domainProvider ? ` · Domain: ${domainProvider}` : ''}${hostingProvider ? ` · Host: ${hostingProvider}` : ''}`
          : null,
        (isCrmRescue || isBooking || isEnquiryReply) && websiteUrl ? `Website: ${websiteUrl}` : null,
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

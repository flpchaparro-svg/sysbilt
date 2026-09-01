import {
  FUNNEL_PRODUCT_CATALOGUE,
  type FunnelProductCard,
  type FunnelProductCode,
} from '../../constants/funnel'

/** One related door per SKU. Sibling product they do not already have. Never a pack that includes this SKU. */
const RELATED: Partial<Record<FunnelProductCode, {code: FunnelProductCode; why: string}>> = {
  'google-profile': {
    code: 'reviews',
    why: 'A clean listing still needs someone to ask after the job. Review Engine is that ask. The listing works without it.',
  },
  booking: {
    code: 'missed-call',
    why: 'Book now is for the people who will tap. Missed-Call Text-Back catches the ones who still ring and get voicemail.',
  },
  'missed-call': {
    code: 'booking',
    why: 'A text-back catches the miss. Booking System lets the ones who will tap a slot finish without ringing.',
  },
  reviews: {
    code: 'google-profile',
    why: 'Reviews land harder on a listing that is already clean. Google Profile Fix is that listing job.',
  },
  'profile-posting': {
    code: 'reviews',
    why: 'Posts keep the listing alive. Review Engine is the ask after the job, which posting does not do.',
  },
  'noshow-rescue': {
    code: 'booking',
    why: 'Reminders help once there is a real diary. Booking System is that Book now door.',
  },
  'search-fix': {
    code: 'schema-faq',
    why: 'Pages can be indexed and still lose the click if search cannot read your FAQs. Schema and FAQ is that markup job.',
  },
  'schema-faq': {
    code: 'search-fix',
    why: 'Markup helps once Google can actually find the pages. Search Fix is the index block.',
  },
  'onpage-search': {
    code: 'schema-faq',
    why: 'Titles and headings sit next to FAQ markup. Schema and FAQ is that extra, not a pack that already includes this job.',
  },
  'conversion-pass': {
    code: 'tracking-forms',
    why: 'Rewritten pages still fail if forms and taps are not tracked. Tracking and Forms Pack wires the events while the site is open.',
  },
  'tracking-forms': {
    code: 'conversion-pass',
    why: 'Tracking without pages that ask is a report on a leak. Conversion Pass is the rewrite.',
  },
  'quote-capture': {
    code: 'quote-followup',
    why: 'A quote that sits quiet still needs a chase. Quote Follow-Up is that chase, not a pack that already includes Capture.',
  },
  'quote-followup': {
    code: 'quote-capture',
    why: 'Chase works when the quote was captured cleanly. Quote Capture is that first job.',
  },
  'speed-fix': {
    code: 'conversion-pass',
    why: 'A fast page still loses the enquiry if the copy never asks. Conversion Pass rewrites the pages that should convert.',
  },
  'landing-page': {
    code: 'tracking-forms',
    why: 'A campaign page needs proof the click became a lead. Tracking and Forms Pack wires the events while the page is live.',
  },
  'ai-phone': {
    code: 'booking',
    why: 'A voice agent that answers still needs a real calendar to book into. Booking System is that diary.',
  },
  'crm-rescue': {
    code: 'enquiry-reply',
    why: 'A rescued CRM still needs the first reply to fire the moment a form lands. Enquiry Auto-Reply is that first text.',
  },
  'feedback-review': {
    code: 'reviews',
    why: 'A suggested Google review sits next to an automatic ask after every job. Review Engine is that ask.',
  },
  'enquiry-reply': {
    code: 'missed-call',
    why: 'Forms get an instant reply. Calls that ring out still go quiet unless Missed-Call Text-Back is on.',
  },
  'site-chat': {
    code: 'conversion-pass',
    why: 'Chat cannot save a page that never asks. Conversion Pass rewrites the pages people land on.',
  },
  'media-clean': {
    code: 'speed-fix',
    why: 'Light images help, and the public speed score is the proof. Website Speed Fix is the full measured job.',
  },
  'a11y-pass': {
    code: 'conversion-pass',
    why: 'Access fixes help people stay. Conversion Pass then makes the page actually ask for the enquiry.',
  },
  'whatsapp-setup': {
    code: 'dm-reply',
    why: 'WhatsApp is one inbox. Instagram and Facebook DMs are another. DM Reply System covers those two.',
  },
  'dm-reply': {
    code: 'enquiry-reply',
    why: 'Social DMs are covered. Website forms still need an instant acknowledgement. Enquiry Auto-Reply is that.',
  },
  'intake-forms': {
    code: 'booking',
    why: 'An intake form is wasted if there is no Book now into the diary. Booking System is that door.',
  },
  'inbox-triage': {
    code: 'sop-playbook',
    why: 'Triage sorts the mail. The playbook writes the jobs that hurt when the expert is away.',
  },
  'sop-playbook': {
    code: 'team-ai',
    why: 'A written playbook lands when the team has shared setup and real tasks. Team AI is that session.',
  },
  'dashboard-lite': {
    code: 'tracking-forms',
    why: 'A dashboard is empty until the events exist. Tracking and Forms Pack is the source of those numbers.',
  },
  geo: {
    code: 'search-fix',
    why: 'AI search still needs Google to index you. Search Fix is that index job, not a pack that already includes it.',
  },
  'client-finder': {
    code: 'geo',
    why: 'New names to call sit next to being findable when those people search. AI Search Visibility is that job.',
  },
  website: {
    code: 'conversion-pass',
    why: 'A hosted site still needs pages that ask. Conversion Pass is the rewrite once the site is live.',
  },
  'website-hook': {
    code: 'website',
    why: 'The hook is the way in. The Hosted Website Plan is the full monthly site.',
  },
  'team-ai': {
    code: 'change-pack',
    why: 'A session gets the team using the tools. Change Pack is the training built before a bigger rollout.',
  },
  'change-pack': {
    code: 'team-ai',
    why: 'A rollout still needs a shared setup the team can use on Monday. Team AI is that half day.',
  },
  'content-system': {
    code: 'profile-posting',
    why: 'A content month still needs a Maps cadence. Profile Posting System is that listing rhythm.',
  },
  'found-booked': {
    code: 'reviews',
    why: 'Once people can find you and book, the next leak is no one asking for the review. Review Engine is that ask.',
  },
  'catch-the-lead': {
    code: 'booking',
    why: 'The listing and the missed call are covered. Booking System lets the ones who will tap finish without ringing.',
  },
  'bundle-clinic': {
    code: 'booking',
    why: 'The listing and the missed call are covered. Booking System lets the ones who will tap finish without ringing.',
  },
  'bundle-front-door': {
    code: 'missed-call',
    why: 'Maps, reviews, and Book now are covered. Missed-Call Text-Back catches the people who still ring and miss you.',
  },
  'local-pack': {
    code: 'missed-call',
    why: 'The listing is alive. Missed-Call Text-Back catches the ring-outs that still happen from Maps.',
  },
  'full-diary': {
    code: 'google-profile',
    why: 'The diary is covered. Google Profile Fix is the listing those bookings should be coming from.',
  },
  'get-found-full': {
    code: 'conversion-pass',
    why: 'You can be found and still lose the enquiry on a page that never asks. Conversion Pass is that rewrite.',
  },
  'call-and-book': {
    code: 'google-profile',
    why: 'Diary and missed-call are covered. Google Profile Fix is the listing those taps and rings should start from.',
  },
  'maps-trust': {
    code: 'missed-call',
    why: 'The listing and the reviews are covered. Missed-Call Text-Back catches the ring-outs from that same panel.',
  },
  'get-found': {
    code: 'onpage-search',
    why: 'Index and FAQs are covered. On-Page Search Pack then fixes titles, headings, and thin pages.',
  },
  'quote-path': {
    code: 'enquiry-reply',
    why: 'Quotes are captured and chased. Enquiry Auto-Reply covers the form that is not a quote.',
  },
  'bundle-speed-next': {
    code: 'speed-fix',
    why: 'Pages that ask still lose people if they load late. Website Speed Fix is the measured three-day job.',
  },
}

export type FunnelRelatedOffer = {
  product: FunnelProductCard
  why: string
}

export function relatedOfferForSlug(slug: string | undefined): FunnelRelatedOffer | null {
  if (!slug) return null
  const entry = RELATED[slug as FunnelProductCode]
  if (!entry) return null
  const product = FUNNEL_PRODUCT_CATALOGUE.find((p) => p.code === entry.code)
  if (!product) return null
  return {product, why: entry.why}
}

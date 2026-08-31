import {
  FUNNEL_PRODUCT_CATALOGUE,
  type FunnelProductCard,
  type FunnelProductCode,
} from '../../constants/funnel'

/** One related door per SKU. Packs when the jobs already sit together. Otherwise the next job. */
const RELATED: Partial<Record<FunnelProductCode, {code: FunnelProductCode; why: string}>> = {
  'google-profile': {
    code: 'found-booked',
    why: 'A clean listing still loses people if Book now is missing and a missed call goes to voicemail. Found and booked does all three at the pack price.',
  },
  booking: {
    code: 'call-and-book',
    why: 'Book now is wasted if the people who still ring get voicemail. Call and book wires the diary and the miss together.',
  },
  'missed-call': {
    code: 'call-and-book',
    why: 'A text-back catches the miss. Booking gives the ones who will tap a slot. Call and book is both, at the pack price.',
  },
  reviews: {
    code: 'maps-trust',
    why: 'Reviews land harder on a listing that is already clean. Maps trust is Profile Fix plus Review Engine.',
  },
  'profile-posting': {
    code: 'local-pack',
    why: 'Posts on a messy listing do not help. Maps alive cleans the profile, starts the review ask, then sets the posting cadence.',
  },
  'noshow-rescue': {
    code: 'full-diary',
    why: 'Reminders only help once Book now and missed-call text-back are live. Full diary is the three together.',
  },
  'search-fix': {
    code: 'get-found',
    why: 'Pages can be indexed and still lose the click if search cannot read your FAQs. Get found is Search Fix plus Schema and FAQ.',
  },
  'schema-faq': {
    code: 'get-found',
    why: 'Markup helps once Google can actually find the pages. Get found does the index block and the FAQs in one window.',
  },
  'onpage-search': {
    code: 'get-found-full',
    why: 'Titles and headings sit next to the index fix and the FAQ markup. Get found (full) is the three together.',
  },
  'conversion-pass': {
    code: 'bundle-speed-next',
    why: 'Rewritten pages still fail if forms and taps are not tracked. Pages that ask is Conversion Pass plus Tracking, while the site is open.',
  },
  'tracking-forms': {
    code: 'bundle-speed-next',
    why: 'Tracking without pages that ask is a report on a leak. Pages that ask does the copy and the events together.',
  },
  'quote-capture': {
    code: 'quote-path',
    why: 'A quote that sits quiet still needs a chase. Quote path is Capture plus Follow-Up at the pack price.',
  },
  'quote-followup': {
    code: 'quote-path',
    why: 'Chase works when the quote was captured cleanly. Quote path is both jobs in one window.',
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
    code: 'get-found',
    why: 'AI search still needs Google to index you and read your FAQs. Get found is that pair.',
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

/**
 * Quote Capture live copy (local asset).
 * Private /go/quote-capture door. Prices allowed on /go only.
 * Copy deck v2.
 */
import type {FunnelProductCopy} from '../funnelCopy'

export const QUOTE_CAPTURE_LIVE_COPY = {
  eyebrow: 'SYSBILT. One payment. Live about a week after your rate-card call',
  h1Generic: 'Quoting is the job nobody pays you for',
  h1Personal: (b: string) => `${b}, quoting is the job nobody pays you for`,
  sub: "Every week you measure, work the numbers and write it up, at night, for strangers who won't say their budget and might never reply. Quote Capture puts that work on your website: plain questions, your locked prices, a real quotation with one total, a pay link in the box, and a priced lead in your hands while the buyer is still keen.",
  ctaLabel: 'Get Quote Capture, $2,800',
  proofLabel: 'The second job',
  proofHeadingLive: 'Tuesday, 9pm, kitchen table, quote number three',
  proofHeadingGeneric: 'Tuesday, 9pm, kitchen table, quote number three',
  proofLead: (_b: string | null) =>
    "One of tonight's quotes is real. One wanted the job for a third of what it costs. One will never reply at all, and you'll only find out by the silence.",
  proofLeadGeneric:
    "One of tonight's quotes is real. One wanted the job for a third of what it costs. One will never reply at all, and you'll only find out by the silence.",
  proofAfter:
    "You'll price all three anyway, because that's the rule of the game: you do the estimating for free and hope. Nobody invoices for quoting time. It just quietly takes your nights, and it's the only part of the business that grows when you get busier.",
  proofAfterGeneric:
    "You'll price all three anyway, because that's the rule of the game: you do the estimating for free and hope. Nobody invoices for quoting time. It just quietly takes your nights, and it's the only part of the business that grows when you get busier.",
  painLabel: 'What this is costing you',
  painHeading: 'Three ways the old way bleeds you',
  painLines: [
    "Buyers leave when they can't see how the job is priced.",
    'The ones who stay send "need a quote please" and make you drag the details out by email.',
    'And the whole time, your evenings are the estimating department.',
  ],
  bridgeLabel: 'The fix',
  bridgeHeading: 'Your website starts doing the estimating',
  bridgeBody:
    "We lock your rate card first: what you sell, what you refuse, and how size, access and extras move the total. Then we install a wizard that asks the buyer plain questions and does the maths, only ever from that card.\n\nThe visitor sees a real quotation on screen. Scope of works, line items, one total, not a vague range they can't trust. It leaves with them as a PDF, by email and by SMS, with a Stripe pay link in the box. You get the lead with the price already attached, so the follow-up call is a close, not a fishing trip.\n\nJobs you don't do get a polite soft no on the page. No PDF, no SMS, no alert noise for you.",
  bridgeGaugeCaption: 'Questions in. Quotation out. Pay link in the box.',
  benefitsLabel: 'What changes for you',
  benefitsHeading: 'Priced leads instead of empty enquiries',
  benefits: [
    {
      title: 'Serious buyers see your total before they can ghost',
      text: 'A clear quotation on screen beats another "we\'ll get back to you". The number does the first conversation for you.',
    },
    {
      title: "You only talk to people who've seen your price",
      text: "The wizard does the scoping interview, the card does the maths, and the buyer who leaves their details has already accepted your ballpark. The ones who vanish at the total were never staying, and now they cost you nothing.",
    },
    {
      title: 'Some jobs close themselves',
      text: "The quotation goes out with a pay link, full payment or a deposit rule you set. There will be mornings you wake up to a paid deposit from someone you've never spoken to. That's the moment this stops feeling like software.",
    },
    {
      title: 'Out of scope stays quiet',
      text: "Work you don't do gets a soft no with your number on it. No junk PDF, no 6am alert about a job you'd never take.",
    },
  ],
  processLabel: 'How it runs',
  processHeading: 'Pay, rate card, install',
  processSteps: [
    {
      label: 'Pay',
      text: 'One fixed price. You get the access wizard and we book your rate-card call.',
    },
    {
      label: 'Rate card',
      text: "Thirty minutes to lock what you sell, what you refuse, and how size, access and extras change the total. You approve every number. Nothing goes live that you didn't sign off.",
    },
    {
      label: 'Install',
      text: 'The wizard goes on your site, we live test it with you, then hand over so you can edit prices yourself and manage quotes in your own system.',
    },
  ],
  stackLabel: 'Everything included',
  stackHeading: 'One price, the full quote loop, nothing rented monthly',
  stackItems: [
    {
      title: 'Guided wizard',
      text: 'Plain questions that map to your locked rate card. The buyer never sees jargon, you never see an invented price.',
    },
    {
      title: 'On-screen quotation',
      text: "Scope of works, line items, and a single total the buyer can trust. Totals carry the site-conditions line, so nobody mistakes it for a promise you can't inspect.",
    },
    {
      title: 'PDF, email and SMS',
      text: 'The quotation leaves with them, pay link in the box. Full payment by default, or a deposit rule you set.',
    },
    {
      title: 'Owner alert',
      text: 'The priced lead lands with you, contacts, quote detail and pay link, so you can call while it is still warm.',
    },
    {
      title: 'Yours to edit',
      text: "The quote lands in your quote or invoice system, editable so you can tweak and resend in minutes. Don't have one? We set up a basic one in your name for $100.",
    },
    {
      title: 'Handover that sticks',
      text: 'Self-serve price edits, the disclaimer done properly, a live test with you on the phone, and 14 days of aftercare.',
    },
  ],
  scopeLine:
    'One website install on your locked rate card. AI Concierge is +$600. Basic quote or invoice system setup is +$100 if you have none. Care or Ops retainers are separate if you want us running quotes ongoing.',
  priceLabel: 'Investment',
  price: '$2,800',
  priceLead: 'Paid once, then the rate-card call. No monthly quote software fee.',
  priceBody:
    'An estimator on staff costs a salary and knocks off at five. Rented quoting software costs hundreds a month forever and still leaves the maths and the typing to you. This is one payment. It works nights, weekends and public holidays, and it only ever says numbers you approved.',
  addonLabel: 'The add-on',
  addonHeading: "AI Concierge, for buyers who'd rather talk than tap. +$600",
  addonBody:
    "Some people won't click through a wizard, but they'll answer questions in a chat. The Concierge asks what your best estimator would ask, in plain conversation, and prices from the exact same locked rate card. The AI can talk. It can't touch the maths. It never invents a price, never offers a discount, and anything outside your catalogue gets the same polite soft no. The wizard stays either way.",
  guarantee:
    'Our promise: the wizard quotes from your locked rate card and delivers quotation, PDF path, and owner alert as agreed, or we keep working at no extra cost until it does.',
  priceAnchor:
    'One recovered job from a click that would have bounced usually covers the whole thing. Right now that click lands on a blank form and gets asked to write a novel. This costs you once, then prices the next lead, and the next, for nothing.',
  faqLabel: 'Objections',
  faqHeading: 'Straight answers before you buy',
  faqs: [
    {
      q: 'My jobs are too custom to price automatically',
      a: 'The card holds your rules, not just your prices: how size, access, materials and extras move the total, the same rules you apply in your head. The standard parts of a job get priced on screen. Anything genuinely custom gets flagged for your call, with the priced parts already done. You approve every number and every rule before it goes live.',
    },
    {
      q: 'Is this a monthly quote tool?',
      a: 'No. You pay once. The wizard runs on your site and your prices. No rent for a quoting SaaS.',
    },
    {
      q: 'Will it invent prices?',
      a: 'No. Everything is locked to your rate card. Out-of-catalogue jobs get a soft no, not a made-up number.',
    },
    {
      q: "Won't customers just take my total and shop around?",
      a: "They already shop around, silently, with your competitors' numbers and not yours. Now they leave with your scope, your total and your pay link in their pocket, and the ones who were price-hunting filter themselves out before they cost you a site visit. You lose the tyre-kickers and keep the buyers.",
    },
    {
      q: 'Do I need a quote system first?',
      a: 'If you already have a quote or invoice platform, we use yours. If you have none, basic setup in your name is $100. There is no tie-in to any one brand. We work with what you already pay for, or we stand up a simple one for you.',
    },
    {
      q: 'What about the AI chat?',
      a: 'Optional. The AI Concierge is $600 and talks only on the same locked rate card. It qualifies, it explains, it never invents a price and it never discounts.',
    },
    {
      q: 'Can I try it before I pay?',
      a: 'Yes. The demo at /demo/quote-capture shows the whole feel with clearly labelled sample rates. Your install runs on your real card, approved by you.',
    },
    {
      q: 'Is this refundable?',
      a: "There's no change-of-mind refund, because we start straight away. If the install doesn't quote and alert as agreed, we keep working at no extra cost until it does. That's the promise, and it's the one that matters.",
    },
  ],
  finalLabel: 'Last step',
  finalHeading: 'Give the second job to the website',
  finalLine:
    'Pay once, lock the rate card, and every serious visitor gets a real quotation with your number on it, while you stay on the tools.',
  proofKind: 'quote-capture',
} as FunnelProductCopy & {
  priceBody: string
  addonLabel: string
  addonHeading: string
  addonBody: string
}

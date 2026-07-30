/**
 * Hosted Website Plan intake. One question per screen.
 * Stages match /go/access: About you · Your work · Access · Done.
 * Submits to HubSpot via /api/funnel/access (product: website).
 */

import {WEBSITE_TIER_META, type WebsiteTierCode} from './websiteAgreementCopy'

export type WizardFieldType =
  | 'intro'
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'multi'
  | 'boxes'
  | 'upload'
  | 'acks'
  | 'done'

export type WizardOption = { value: string; label: string; hint?: string }

export type WizardField = {
  id: string
  type: WizardFieldType
  title: string
  /** Word in title rendered in red (must appear in title). */
  accentWord?: string
  hint?: string
  placeholder?: string
  options?: WizardOption[]
  /** Required for Continue. Optional fields always show Skip. */
  required?: boolean
  /** Show "Say it in the interview" as well as Skip. */
  interviewEscape?: boolean
  /** Skip label when optional (default Skip for now). */
  skipLabel?: string
  rows?: number
  accept?: string
  multiLabel?: string
  /** Two text inputs on one screen (name + email). */
  twin?: { id: string; label: string; placeholder: string; type: 'text' | 'email' }[]
  /** Repeated short inputs (offerings, profile links). */
  boxCount?: number
  /** Minimum non-empty boxes when required (default 1). */
  minBoxes?: number
  /** Validate each filled box as a URL. */
  boxAsUrl?: boolean
  /** Prefill from another answer id when empty. */
  prefillFrom?: string
}

export type WizardStage = {
  id: string
  label: string
  fields: WizardField[]
}

export const WEBSITE_WIZARD_STAGES: WizardStage[] = [
  {
    id: 'about',
    label: 'About you',
    fields: [
      {
        id: 'intro',
        type: 'intro',
        title: 'Your site starts here',
        accentWord: 'here',
        hint:
          "Payment's confirmed. About ten to fifteen minutes. Nothing to research first. Anything technical has a not sure option, and we handle it.\n\nSave and come back any time. After submit we research straight away and book your twenty minute interview within one business day.",
      },
      {
        id: 'contactName',
        type: 'text',
        title: "What's your name",
        accentWord: 'name',
        placeholder: 'Full name',
        required: true,
      },
      {
        id: 'contactEmail',
        type: 'email',
        title: "What's your email",
        accentWord: 'email',
        placeholder: 'you@business.com.au',
        required: true,
      },
      {
        id: 'contactPhone',
        type: 'tel',
        title: "What's your mobile",
        accentWord: 'mobile',
        hint: 'Australian number. We use this for the interview.',
        placeholder: '04xx xxx xxx',
        required: true,
      },
      {
        id: 'preferCall',
        type: 'select',
        title: 'Best window for the interview',
        accentWord: 'interview',
        hint: 'Twenty minutes on the phone. We record it with your say-so.',
        required: true,
        options: [
          { value: 'early_morning', label: 'Early morning', hint: 'Before 9am' },
          { value: 'mid_morning', label: 'Mid morning', hint: '9am to 11am' },
          { value: 'lunch', label: 'Lunchtime', hint: '11am to 1pm' },
          { value: 'early_arvo', label: 'Early afternoon', hint: '1pm to 3pm' },
          { value: 'late_arvo', label: 'Late afternoon', hint: '3pm to 5pm' },
          { value: 'after_hours', label: 'After hours', hint: 'Evenings if that suits you better' },
        ],
      },
      {
        id: 'coContact',
        type: 'text',
        title: 'Who else needs to be across this',
        accentWord: 'else',
        hint: 'Partner, office manager, someone else who should get updates. Skip if it is just you.',
        twin: [
          { id: 'coContactName', label: 'Their name', placeholder: 'Name', type: 'text' },
          { id: 'coContactEmail', label: 'Their email', placeholder: 'email@business.com.au', type: 'email' },
        ],
        skipLabel: 'Just me',
      },
      {
        id: 'businessName',
        type: 'text',
        title: 'Business name',
        accentWord: 'Business',
        placeholder: 'As you want it on the site',
        required: true,
      },
      {
        id: 'preferredDomain',
        type: 'text',
        title: 'Your domain name',
        accentWord: 'domain',
        hint: 'The web address you own or want, like yourbusiness.com.au. Skip if you do not have one yet.',
        placeholder: 'yourbusiness.com.au',
        skipLabel: 'Skip for now',
      },
      {
        id: 'abn',
        type: 'text',
        title: 'ABN',
        accentWord: 'ABN',
        hint: 'Optional. Helps us get the legal bits right.',
        placeholder: 'XX XXX XXX XXX',
        skipLabel: 'Skip for now',
      },
    ],
  },
  {
    id: 'work',
    label: 'Your work',
    fields: [
      {
        id: 'whatYouDo',
        type: 'textarea',
        title: 'What do you do',
        accentWord: 'do',
        hint: 'Plain English. One or two sentences is enough.',
        placeholder: 'We help…',
        required: true,
        rows: 4,
      },
      {
        id: 'whoFor',
        type: 'textarea',
        title: 'Who is it for',
        accentWord: 'for',
        hint: 'Your target buyers. The people you actually want to sell to. Who should look at the homepage and think, that is me.',
        placeholder: 'e.g. Homeowners in the inner west who need a new roof',
        required: true,
        rows: 4,
      },
      {
        id: 'area',
        type: 'text',
        title: 'Where do you work',
        accentWord: 'Where',
        hint: 'Suburb, region, or statewide.',
        placeholder: 'e.g. Inner west Sydney, or NSW',
        required: true,
      },
      {
        id: 'offerings',
        type: 'boxes',
        title: 'Main things a visitor should go for',
        accentWord: 'Main',
        hint: 'Up to six services or offers. Short labels are fine. Fill at least one.',
        placeholder: 'e.g. Roof repair',
        required: true,
        boxCount: 6,
        minBoxes: 1,
        interviewEscape: true,
      },
      {
        id: 'dontWant',
        type: 'textarea',
        title: 'Anything you definitely do not want',
        accentWord: 'not',
        hint: 'Optional. Work you turn away, tone to avoid, words you hate.',
        placeholder: 'Optional',
        rows: 3,
        skipLabel: 'Skip for now',
        interviewEscape: true,
      },
      {
        id: 'proof',
        type: 'textarea',
        title: 'Proof we can put on the site',
        accentWord: 'Proof',
        hint: 'Reviews, years trading, licences, associations. Or say you will cover it in the interview.',
        placeholder: 'Optional for now',
        rows: 4,
        skipLabel: 'Skip for now',
        interviewEscape: true,
      },
      {
        id: 'social',
        type: 'boxes',
        title: 'Links to your profiles',
        accentWord: 'profiles',
        hint: 'Google Business, Instagram, Facebook, LinkedIn, or similar. Put your strongest one first. Up to three. One is fine.',
        placeholder: 'https://',
        boxCount: 3,
        minBoxes: 0,
        boxAsUrl: true,
        skipLabel: 'Skip for now',
        interviewEscape: true,
      },
      {
        id: 'logo',
        type: 'upload',
        title: 'Upload your logo',
        accentWord: 'logo',
        hint: 'PNG or SVG preferred. Skip if you do not have one yet.',
        accept: 'image/png,image/jpeg,image/svg+xml,image/webp,.ai,.eps',
        skipLabel: 'Skip for now',
      },
      {
        id: 'photos',
        type: 'upload',
        title: 'Upload a few photos',
        accentWord: 'photos',
        hint: 'Team, work, place. Skip if you will send them later.',
        accept: 'image/*',
        multiLabel: 'You can pick more than one.',
        skipLabel: 'Skip for now',
      },
      {
        id: 'enquiryPath',
        type: 'select',
        title: 'How should people contact you',
        accentWord: 'contact',
        required: true,
        options: [
          {
            value: 'form_email',
            label: 'Form to my email',
            hint: 'Enquiries land in your inbox. We set the form up.',
          },
          {
            value: 'call',
            label: 'Call us',
            hint: 'Phone number front and centre. Form optional.',
          },
          {
            value: 'book',
            label: 'Book a time',
            hint: 'If you already use a booking tool, we can point to it.',
          },
          {
            value: 'unsure',
            label: 'Not sure yet',
            hint: 'We will recommend one on the interview.',
          },
        ],
      },
    ],
  },
  {
    id: 'access',
    label: 'Access',
    fields: [
      {
        id: 'domainSituation',
        type: 'select',
        title: 'Where is your domain',
        accentWord: 'domain',
        required: true,
        options: [
          {
            value: 'have_login',
            label: 'I have the login',
            hint: 'Ready to share when we ask.',
          },
          {
            value: 'have_no_login',
            label: 'I have a domain, no login',
            hint: 'We will help you find who holds it.',
          },
          {
            value: 'need_new',
            label: 'I need a new one',
            hint: 'We will help you pick and register.',
          },
          {
            value: 'unsure',
            label: 'Not sure',
            hint: 'Common. We sort it on the call.',
          },
        ],
      },
      {
        id: 'domainName',
        type: 'text',
        title: 'Is this the domain you want to work on',
        accentWord: 'domain',
        hint: 'We pulled this from earlier. Edit it if it is wrong. Confirm with Continue.',
        placeholder: 'yourbusiness.com.au',
        required: true,
        prefillFrom: 'preferredDomain',
      },
      {
        id: 'emailGotcha',
        type: 'select',
        title: 'Where does your work email live',
        accentWord: 'email',
        hint: 'Moving a website the wrong way can knock email offline. We check this before we touch DNS.',
        required: true,
        options: [
          {
            value: 'same_as_web',
            label: 'Same place as the website',
            hint: 'cPanel, same host as the site.',
          },
          {
            value: 'google',
            label: 'Google Workspace',
            hint: 'Gmail for work.',
          },
          {
            value: 'microsoft',
            label: 'Microsoft 365',
            hint: 'Outlook for work.',
          },
          {
            value: 'other',
            label: 'Somewhere else',
            hint: 'We will ask on the call.',
          },
          {
            value: 'unsure',
            label: 'Not sure',
            hint: 'We will find out together. No drama.',
          },
        ],
      },
      {
        id: 'hasSite',
        type: 'select',
        title: 'Do you have a site today',
        accentWord: 'site',
        required: true,
        options: [
          { value: 'yes', label: 'Yes', hint: 'We will look at what to keep.' },
          { value: 'no', label: 'No', hint: 'Fresh build from your answers.' },
          { value: 'sort_of', label: 'Sort of', hint: 'Placeholder, old page, half-finished.' },
        ],
      },
      {
        id: 'currentUrl',
        type: 'url',
        title: 'Current site address',
        accentWord: 'address',
        placeholder: 'https://',
        skipLabel: 'Skip for now',
      },
      {
        id: 'keepFromOld',
        type: 'textarea',
        title: 'Anything to keep from the old site',
        accentWord: 'keep',
        hint: 'Pages, wording, photos. Skip if nothing matters.',
        placeholder: 'Optional',
        rows: 3,
        skipLabel: 'Skip for now',
        interviewEscape: true,
      },
      {
        id: 'compliance',
        type: 'textarea',
        title: 'Any rules for claims or wording',
        accentWord: 'rules',
        hint: 'Health, finance, legal, franchisor. Skip if none.',
        placeholder: 'Optional',
        rows: 3,
        skipLabel: 'Skip for now',
        interviewEscape: true,
      },
      {
        id: 'acks',
        type: 'acks',
        title: 'Before we lock this in',
        accentWord: 'lock',
        hint: 'Tick each one. This is the deal in plain terms.',
        required: true,
      },
    ],
  },
  {
    id: 'done',
    label: 'Done',
    fields: [
      {
        id: 'done',
        type: 'done',
        title: 'We have what we need',
        accentWord: 'need',
        hint: 'Next we research your market and rivals, then book the twenty minute interview within one business day. Build follows. About fourteen days to live once we have what we need from you.',
      },
    ],
  },
]

export function websiteWizardAcks(tier: WebsiteTierCode) {
  const meta = WEBSITE_TIER_META[tier]
  return [
    {
      id: 'ack_scope',
      label: `${meta.name} site on our hosting. Not a custom app or online shop.`,
    },
    {
      id: 'ack_term',
      label:
        'Twelve months from go-live. Leave early and I pay the remaining months of the term.',
    },
    {
      id: 'ack_billing',
      label: `Today I pay $${meta.enrolmentAud} to start. Monthly $${meta.monthlyAud} autopay begins the day the site goes live.`,
    },
    {
      id: 'ack_interview',
      label: 'Twenty minute phone interview. We record it with my say-so.',
    },
    {
      id: 'ack_content',
      label: 'I will answer follow-ups so we can ship on time.',
    },
  ] as const
}

/** @deprecated Prefer websiteWizardAcks(tier) so Brochure / Practice / Full match the paid plan. */
export const WEBSITE_WIZARD_ACKS = websiteWizardAcks('brochure')

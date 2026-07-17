import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import {m, AnimatePresence} from 'framer-motion'
import {
  ArrowRight,
  Box,
  Building2,
  Check,
  Code2,
  Globe2,
  LayoutTemplate,
  Phone,
  Server,
  ShoppingBag,
  Sparkles,
  X,
} from 'lucide-react'
import {SysbiltLogo} from '../../components/SysbiltLogo'
import {PageMeta} from '../../components/PageMeta'
import {SITE_ORIGIN} from '../../constants/seoMeta'
import {
  FUNNEL_PRODUCT_CATALOGUE,
  FUNNEL_PRODUCT_LABELS,
  isFunnelProductCode,
  type FunnelProductCode,
} from '../../constants/funnel'
import {FunnelLegalFooter} from './FunnelCtaBlock'
import {FUNNEL_COLOURS, FUNNEL_CSS_VARS} from './funnelTheme'
import {
  DOMAIN_REGISTRARS,
  HOSTING_PROVIDERS,
  type AccessPathId,
  type FunnelAccessPayload,
  type PhoneSetupId,
  type PlatformId,
  type SameProviderId,
} from './funnelAccessTypes'

const SCHEDULER_URL = 'https://meetings-ap1.hubspot.com/felipe-chaparro'
const HELP_EMAIL = 'mailto:hello@sysbilt.com?subject=Access%20form%20help'

const RED = FUNNEL_COLOURS.accent
const INK = FUNNEL_COLOURS.ink
const CREAM = FUNNEL_COLOURS.onInk
/** Brand cream — same as theme.ts / FUNNEL_COLOURS.ground (#FFF2EC), not a grey off-cream */
const GROUND = FUNNEL_COLOURS.ground

type StepId =
  | 'product'
  | 'name'
  | 'email'
  | 'business'
  | 'website'
  | 'phone'
  | 'phoneSetup'
  | 'platform'
  | 'provider'
  | 'domainProvider'
  | 'hostingProvider'
  | 'access'
  | 'accessDetail'
  | 'notes'
  | 'done'

type PhaseId = 'about' | 'site' | 'access' | 'done'

const PHASES_SPEED: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your site'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

const PHASES_MISSED: {id: PhaseId; n: number; label: string}[] = [
  {id: 'about', n: 1, label: 'About you'},
  {id: 'site', n: 2, label: 'Your phone'},
  {id: 'access', n: 3, label: 'Access'},
  {id: 'done', n: 4, label: 'Done'},
]

function phaseIndex(phase: PhaseId, phases: typeof PHASES_SPEED): number {
  return phases.findIndex((p) => p.id === phase)
}

function phaseForStep(step: StepId, missedCall: boolean): PhaseId {
  if (step === 'done') return 'done'
  if (
    step === 'product' ||
    step === 'name' ||
    step === 'email' ||
    step === 'business'
  ) {
    return 'about'
  }
  if (missedCall) {
    if (step === 'phone' || step === 'phoneSetup') return 'site'
    return 'access'
  }
  if (step === 'website') return 'about'
  if (
    step === 'platform' ||
    step === 'provider' ||
    step === 'domainProvider' ||
    step === 'hostingProvider'
  ) {
    return 'site'
  }
  return 'access'
}

const PLATFORM_OPTIONS: {
  id: PlatformId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'wordpress',
    label: 'WordPress',
    blurb: 'Self-hosted WordPress. Usually a /wp-admin login.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'wordpress-com',
    label: 'WordPress.com',
    blurb: 'Hosted by Automattic. You log in at wordpress.com.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'shopify',
    label: 'Shopify',
    blurb: 'Online store. Admin is at Shopify, not a separate host.',
    icon: <ShoppingBag className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'squarespace',
    label: 'Squarespace',
    blurb: 'All-in-one builder. Domain and hosting are usually together.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'wix',
    label: 'Wix',
    blurb: 'Drag-and-drop builder. Login is through Wix.',
    icon: <Globe2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'webflow',
    label: 'Webflow',
    blurb: 'Design-led builder. Designer or Editor login.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'framer',
    label: 'Framer',
    blurb: 'Modern site builder. You manage it inside Framer.',
    icon: <Sparkles className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'bigcommerce',
    label: 'BigCommerce',
    blurb: 'Ecommerce platform. Admin is inside BigCommerce.',
    icon: <ShoppingBag className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'magento',
    label: 'Magento',
    blurb: 'Adobe Commerce / Magento. Often needs a developer login.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'joomla',
    label: 'Joomla',
    blurb: 'Older CMS. Admin is usually /administrator.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'drupal',
    label: 'Drupal',
    blurb: 'Enterprise CMS. Often needs a developer to hand over access.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'custom',
    label: 'Custom / code',
    blurb: 'Built from scratch. Hosting access matters most.',
    icon: <Code2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'other',
    label: 'Not sure',
    blurb: 'Cannot find a match. Pick this and we will work it out with you.',
    icon: null,
    unsure: true,
  },
]

const PROVIDER_OPTIONS: {
  id: SameProviderId
  label: string
  blurb: string
  unsure?: boolean
}[] = [
  {
    id: 'yes',
    label: 'Yes, same place',
    blurb: 'Domain and hosting login are with one company.',
  },
  {
    id: 'no',
    label: 'No, different',
    blurb: 'Domain in one place, hosting somewhere else.',
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will work it out on a short call if needed.',
    unsure: true,
  },
]

const ACCESS_OPTIONS: {
  id: AccessPathId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'wp-admin',
    label: 'Website admin',
    blurb: 'Create a temporary admin, or tell us how we should get in.',
    icon: <LayoutTemplate className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'hosting',
    label: 'Hosting panel',
    blurb: 'cPanel, Plesk, or your host dashboard.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'agency',
    label: 'Someone else',
    blurb: 'Agency or developer. We will ask you to introduce us.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'call',
    label: 'Quick call',
    blurb: 'We walk through access together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
]

const PHONE_SETUP_OPTIONS: {
  id: PhoneSetupId
  label: string
  blurb: string
  icon: React.ReactNode
  unsure?: boolean
}[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    blurb: 'A handset or mobile number for the business.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'landline',
    label: 'Landline',
    blurb: 'Office phone that rings on desks or a handset.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'voip',
    label: 'VoIP / app',
    blurb: 'Aircall, RingCentral, 3CX, Microsoft Teams, and similar.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'mixed',
    label: 'Mixed',
    blurb: 'Calls go to more than one place depending on the day.',
    icon: <Box className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'unsure',
    label: 'Not sure',
    blurb: 'Fine. We will work it out on a short call if needed.',
    icon: null,
    unsure: true,
  },
]

const MISSED_CALL_ACCESS_OPTIONS: {
  id: AccessPathId
  label: string
  blurb: string
  icon: React.ReactNode
}[] = [
  {
    id: 'forward',
    label: 'Call forward',
    blurb: 'You can change divert / unanswered forwarding on the number.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'provider',
    label: 'Phone / SMS login',
    blurb: 'Carrier portal, VoIP admin, or SMS provider we can use.',
    icon: <Server className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'crm',
    label: 'CRM already linked',
    blurb: 'HubSpot or similar already sees your calls. Tell us how.',
    icon: <Building2 className="w-full h-full" strokeWidth={1.25} />,
  },
  {
    id: 'call',
    label: 'Quick call',
    blurb: 'We walk through access together. About five minutes.',
    icon: <Phone className="w-full h-full" strokeWidth={1.25} />,
  },
]

function isValidName(value: string): boolean {
  const t = value.trim()
  if (t.length < 2) return false
  if (!/[A-Za-z]/.test(t)) return false
  if (/^\d+$/.test(t)) return false
  return true
}

function isValidEmail(value: string): boolean {
  const t = value.trim()
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)
}

function isValidWebsite(value: string): boolean {
  const t = value.trim().toLowerCase()
  if (t.length < 4) return false
  return /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(t)
}

function isValidBusiness(value: string): boolean {
  return value.trim().length >= 2
}

function isValidPhone(value: string): boolean {
  const clean = value.replace(/\s+/g, '')
  return /^(0[23478])\d{8}$/.test(clean)
}

type HelpBlock = {
  title: string
  body: string
  steps?: string[]
  links?: {label: string; href: string}[]
}

function helpForStep(step: StepId): HelpBlock {
  switch (step) {
    case 'product':
      return {
        title: 'Which fix you bought',
        body: 'You are about to tell us what we need so we can start the job. First up: which product you paid for. If you landed here from checkout, this may already be filled in.',
      }
    case 'name':
      return {
        title: 'A short form, then we start',
        body: 'You are on a short access form. A few plain questions about you and your site so we can begin as soon as we can. No tech degree needed. If a later step feels unclear, open Help again and we will walk you through it.',
        steps: [
          'About you: name, email, business',
          'Your site: URL, what it runs on, where it lives',
          'Access: the easiest way for us to get in',
        ],
      }
    case 'email':
      return {
        title: 'Which email to use',
        body: 'Use the same email you used at checkout if you can. That helps us match your payment to this form. We only use it for this job and delivery updates.',
      }
    case 'business':
      return {
        title: 'Business name',
        body: 'The name on the website, the one customers know. Legal company name is fine too if that is what you use day to day.',
      }
    case 'phone':
      return {
        title: 'Which number we watch',
        body: 'The Australian business number customers dial. Ten digits, mobile or landline.',
        steps: [
          'Use the main enquiry number, not a private mobile unless that is the public line',
          'Include the leading 0',
        ],
      }
    case 'phoneSetup':
      return {
        title: 'How the phone is set up',
        body: 'This tells us how missed calls show up today. Hover a card, then Select. Not sure is fine.',
      }
    case 'website':
      return {
        title: 'Which site we are fixing',
        body: 'Paste the main website URL for this job.',
        steps: [
          'Include https:// if you have it',
          'Use the live public site, not a staging link, unless that is what we should work on',
        ],
      }
    case 'platform':
      return {
        title: 'What runs the site',
        body: 'This is the system behind the site (WordPress, Shopify, Wix, and so on). Hover a card to read a short plain explanation, then press Select. If you are not sure, pick Not sure. We can work it out.',
        steps: [
          'Open your site in a browser',
          'Scroll to the footer. Many WordPress sites say "Powered by WordPress"',
          'Or open Help links below for a quick check',
        ],
        links: [
          {
            label: 'How to tell if a site is WordPress',
            href: 'https://www.wpbeginner.com/beginners-guide/how-to-know-if-a-website-is-wordpress/',
          },
        ],
      }
    case 'provider':
      return {
        title: 'Domain vs hosting',
        body: 'Two different things, often from the same company.',
        steps: [
          'Domain: the address people type (yourbusiness.com.au). You pay a registrar for that name each year.',
          'Hosting: where the site files live and get served from.',
          'Same company: one login usually covers both. Different companies: two logins.',
          'Not sure: pick that. We will sort it on a short call if needed.',
        ],
      }
    case 'domainProvider':
      return {
        title: 'Who holds the domain',
        body: 'This is who you pay for the domain name each year. Check the email where you get renewal notices, or look it up.',
        steps: [
          'Search your inbox for "domain renewal" or "dns"',
          'Or use the Whois lookup link below and enter your domain',
          'If nothing rings a bell, choose Other or Not sure',
        ],
        links: [{label: 'Whois lookup (see registrar)', href: 'https://who.is/'}],
      }
    case 'hostingProvider':
      return {
        title: 'Where the site is hosted',
        body: 'This is the company that serves the site. Shopify, Wix, and Squarespace usually host themselves. WordPress sites often use a separate host.',
        steps: [
          'Check invoices or emails for "hosting", "cPanel", or your host brand',
          'Ask whoever built the site if you have an agency or developer',
          'Not sure is fine. We can find it together',
        ],
      }
    case 'access':
      return {
        title: 'How we get in',
        body: 'Pick the easiest path for you. We never need more access than the job requires. Hover a card for a short explanation, then Select.',
        steps: [
          'Website admin: temporary admin user, or tell us how to request one',
          'Hosting panel: cPanel, Plesk, or your host dashboard',
          'Someone else: agency or developer. You introduce us',
          'Quick call: we walk through it together in about five minutes',
        ],
      }
    case 'accessDetail':
      return {
        title: 'Access notes',
        body: 'Anything that helps us log in without a chase. Do not put passwords in this form if you would rather send them by email.',
        steps: [
          'Login URL (for example yoursite.com.au/wp-admin)',
          'Who manages the site day to day',
          'Best times for a short call if you chose that path',
        ],
      }
    case 'notes':
      return {
        title: 'Anything else',
        body: 'Optional. Staging sites, plugins to leave alone, or people we should copy on updates. If nothing comes to mind, leave it blank and continue.',
      }
    default:
      return {
        title: 'Help',
        body: 'Reply to your payment email anytime. A human answers.',
      }
  }
}

/**
 * BOXT-style card:
 * Rest: big icon + title (card height holds the empty space)
 * Hover/selected: icon shrinks, blurb + Select fade into the freed space
 */
function SelectCard({
  selected,
  onSelect,
  title,
  blurb,
  icon,
  unsure,
}: {
  selected: boolean
  onSelect: () => void
  title: string
  blurb: string
  icon?: React.ReactNode
  unsure?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      data-selected={selected ? 'true' : undefined}
      className="group relative flex h-[300px] w-full flex-col items-center overflow-hidden rounded-2xl border border-dark/12 bg-white px-4 pt-8 pb-4 text-center shadow-[0_8px_24px_-18px_rgba(26,26,26,0.28)] transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#E21E3F] hover:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E21E3F] focus-visible:ring-offset-2 data-[selected=true]:border-[#E21E3F] data-[selected=true]:shadow-[0_16px_40px_-20px_rgba(226,30,63,0.35)]"
    >
      {/* Tall icon at rest → short on hover so copy fits underneath without jumping neighbours */}
      <div className="mb-5 flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center text-dark transition-all duration-300 ease-out group-hover:mb-2 group-hover:h-9 group-hover:w-9 group-hover:text-[#E21E3F] group-data-[selected=true]:mb-2 group-data-[selected=true]:h-9 group-data-[selected=true]:w-9 group-data-[selected=true]:text-[#E21E3F]">
        {unsure ? (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1A1A1A] text-2xl text-[#FFF2EC] transition-all duration-300 group-hover:h-9 group-hover:w-9 group-hover:text-base group-data-[selected=true]:h-9 group-data-[selected=true]:w-9 group-data-[selected=true]:text-base">
            <span className="font-serif leading-none">?</span>
          </div>
        ) : (
          <div className="h-full w-full [&_svg]:h-full [&_svg]:w-full">{icon}</div>
        )}
      </div>

      <div className="shrink-0 font-sans text-base font-semibold leading-snug text-dark transition-colors duration-300 group-hover:text-[#E21E3F] group-data-[selected=true]:text-[#E21E3F]">
        {title}
      </div>

      <div className="mt-0 flex max-h-0 w-full flex-1 flex-col overflow-hidden opacity-0 transition-all duration-300 ease-out group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100 group-data-[selected=true]:mt-3 group-data-[selected=true]:max-h-40 group-data-[selected=true]:opacity-100">
        <p className="flex-1 px-0.5 font-sans text-[13px] leading-relaxed text-dark/55">{blurb}</p>
        <span
          className="mt-3 flex w-full shrink-0 items-center justify-center rounded-lg py-2.5 font-sans text-sm font-semibold text-white"
          style={{backgroundColor: RED}}
        >
          Select
        </span>
      </div>
    </button>
  )
}

/**
 * Stage bar: black track, cream fill grows with progress.
 * Back circle ~85% of pill height; hover only on that button.
 */
function StageJourney({
  phase,
  phases,
  canGoBack,
  onBack,
  onHelp,
}: {
  phase: PhaseId
  phases: typeof PHASES_SPEED
  canGoBack: boolean
  onBack: () => void
  onHelp: () => void
}) {
  const active = phaseIndex(phase, phases)
  const trackRef = useRef<HTMLDivElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [fillWidth, setFillWidth] = useState(120)

  const measure = useCallback(() => {
    const track = trackRef.current
    const end = endRef.current
    if (!track || !end) return
    const t = track.getBoundingClientRect()
    const e = end.getBoundingClientRect()
    setFillWidth(Math.max(96, e.right - t.left + 6))
  }, [])

  useLayoutEffect(() => {
    measure()
    const raf = requestAnimationFrame(measure)
    const t1 = window.setTimeout(measure, 50)
    const t2 = window.setTimeout(measure, 400)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    if (trackRef.current) ro?.observe(trackRef.current)
    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.removeEventListener('resize', onResize)
      ro?.disconnect()
    }
  }, [measure, active, canGoBack, phases])

  return (
    <div
      ref={trackRef}
      className="relative flex h-12 w-full min-w-0 items-center rounded-full shadow-[0_4px_18px_-6px_rgba(26,26,26,0.28)] md:h-[52px]"
      style={{backgroundColor: INK}}
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full transition-[width] duration-500 ease-out"
        style={{width: fillWidth, backgroundColor: CREAM}}
        aria-hidden
      />

      <div className="relative z-10 flex h-full min-w-0 flex-1 items-center gap-0 pl-1.5 pr-2 md:pl-2 md:pr-3">
        <div className="flex shrink-0 items-center gap-2 md:gap-2.5">
          {canGoBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-solid border-dark text-dark transition-colors duration-200 hover:bg-dark/10 active:bg-dark/15 md:h-[42px] md:w-[42px]"
              aria-label="Back"
              title="Back"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ) : (
            <span className="w-1 shrink-0" aria-hidden />
          )}

          <div className="shrink-0">
            <SysbiltLogo className="w-[92px] md:w-[108px]" />
          </div>
        </div>

        <nav
          className="flex min-w-0 flex-1 items-center gap-0 overflow-x-auto"
          aria-label="Progress"
        >
          {phases.map((p, i) => {
            const done = i < active
            const current = i === active
            const filled = i <= active
            return (
              <div
                key={p.id}
                ref={current ? endRef : undefined}
                className="shrink-0 whitespace-nowrap px-2.5 font-sans text-[12px] tracking-wide md:px-3.5 md:text-[13px]"
                style={{
                  color: filled ? INK : 'rgba(255,242,236,0.4)',
                  fontWeight: current || done ? 600 : 400,
                }}
              >
                {p.n}. {p.label}
              </div>
            )
          })}
        </nav>

        <button
          type="button"
          onClick={onHelp}
          className="ml-2 inline-flex shrink-0 items-center gap-2 font-sans text-[13px] text-cream/55 transition-colors hover:text-cream"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-cream/40 text-cream/70 transition-colors hover:border-cream/80 hover:bg-white/10 hover:text-cream md:h-[42px] md:w-[42px]">
            <span className="text-[15px] font-medium leading-none">?</span>
          </span>
          <span className="hidden sm:inline">Help</span>
        </button>
      </div>
    </div>
  )
}

const inputClass =
  'w-full max-w-md mx-auto rounded-xl border border-dark/12 bg-white px-4 py-4 font-sans text-lg text-dark placeholder:text-dark/35 shadow-[0_8px_24px_-16px_rgba(26,26,26,0.28)] focus:outline-none focus:ring-2 focus:ring-[#E21E3F]/35 focus:border-[#E21E3F]'

const FunnelAccessPage: React.FC = () => {
  const [params] = useSearchParams()
  const prefilled = params.get('p')
  const initialProduct = isFunnelProductCode(prefilled) ? prefilled : null

  const [step, setStep] = useState<StepId>(initialProduct ? 'name' : 'product')
  const [product, setProduct] = useState<FunnelProductCode | null>(initialProduct)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [business, setBusiness] = useState('')
  const [website, setWebsite] = useState('')
  const [phone, setPhone] = useState('')
  const [phoneSetup, setPhoneSetup] = useState<PhoneSetupId | null>(null)
  const [platform, setPlatform] = useState<PlatformId | null>(null)
  const [sameProvider, setSameProvider] = useState<SameProviderId | null>(null)
  const [domainProvider, setDomainProvider] = useState('')
  const [hostingProvider, setHostingProvider] = useState('')
  const [accessPath, setAccessPath] = useState<AccessPathId | null>(null)
  const [accessDetail, setAccessDetail] = useState('')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [helpOpen, setHelpOpen] = useState(false)

  const isMissedCall = product === 'missed-call'
  const phases = isMissedCall ? PHASES_MISSED : PHASES_SPEED

  const stepOrder = useMemo((): StepId[] => {
    if (isMissedCall) {
      const base: StepId[] = initialProduct
        ? ['name', 'email', 'business', 'phone', 'phoneSetup']
        : ['product', 'name', 'email', 'business', 'phone', 'phoneSetup']
      base.push('access', 'accessDetail', 'notes', 'done')
      return base
    }
    const base: StepId[] = initialProduct
      ? ['name', 'email', 'business', 'website', 'platform', 'provider']
      : ['product', 'name', 'email', 'business', 'website', 'platform', 'provider']
    if (sameProvider === 'no') {
      base.push('domainProvider', 'hostingProvider')
    }
    base.push('access', 'accessDetail', 'notes', 'done')
    return base
  }, [initialProduct, sameProvider, isMissedCall])

  const stepIndex = Math.max(0, stepOrder.indexOf(step))
  const lineProgress =
    step === 'done'
      ? 100
      : Math.round(((stepIndex + 1) / Math.max(stepOrder.length, 1)) * 100)

  const activePhase = phaseForStep(step, isMissedCall)

  const firstStep = initialProduct ? 'name' : 'product'
  const help = helpForStep(step)
  const liveProducts = FUNNEL_PRODUCT_CATALOGUE.filter((p) => p.status === 'live')
  const canGoBack = step !== 'done' && step !== firstStep
  const accessOptions = isMissedCall ? MISSED_CALL_ACCESS_OPTIONS : ACCESS_OPTIONS

  function goNext(from: StepId) {
    setError(null)
    const idx = stepOrder.indexOf(from)
    const next = stepOrder[idx + 1]
    if (next) setStep(next)
  }

  function goBack() {
    setError(null)
    const idx = stepOrder.indexOf(step)
    if (idx > 0) setStep(stepOrder[idx - 1])
  }

  async function submit() {
    if (!product || !accessPath) {
      setError('Something is missing. Use Back to check your answers.')
      return
    }
    if (isMissedCall) {
      if (!phoneSetup) {
        setError('Something is missing. Use Back to check your answers.')
        return
      }
    } else if (!platform || !sameProvider) {
      setError('Something is missing. Use Back to check your answers.')
      return
    }
    setSubmitting(true)
    setError(null)
    const payload: FunnelAccessPayload = isMissedCall
      ? {
          product,
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          phone: phone.trim(),
          phoneSetup: phoneSetup!,
          accessPath,
          accessDetail: accessDetail.trim(),
          notes: notes.trim(),
        }
      : {
          product,
          name: name.trim(),
          email: email.trim(),
          business: business.trim(),
          website: website.trim(),
          platform: platform!,
          sameProvider: sameProvider!,
          domainProvider: domainProvider.trim(),
          hostingProvider: hostingProvider.trim(),
          accessPath,
          accessDetail: accessDetail.trim(),
          notes: notes.trim(),
        }
    try {
      const res = await fetch('/api/funnel/access', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload),
      })
      const data = (await res.json().catch(() => ({}))) as {error?: string}
      if (!res.ok) {
        throw new Error(data.error || 'Could not submit. Try again or reply to your payment email.')
      }
      setStep('done')
      setHelpOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  function selectPhoneSetup(id: PhoneSetupId) {
    setPhoneSetup(id)
    window.setTimeout(() => goNext('phoneSetup'), 200)
  }

  function selectPlatform(id: PlatformId) {
    setPlatform(id)
    window.setTimeout(() => goNext('platform'), 200)
  }

  function selectProvider(id: SameProviderId) {
    setSameProvider(id)
    window.setTimeout(() => {
      if (id === 'no') setStep('domainProvider')
      else setStep('access')
    }, 200)
  }

  function selectAccess(id: AccessPathId) {
    setAccessPath(id)
    window.setTimeout(() => goNext('access'), 200)
  }

  return (
    <div
      className="min-h-screen font-sans selection:bg-dark selection:text-cream"
      style={{...FUNNEL_CSS_VARS, backgroundColor: GROUND, color: INK}}
    >
      <PageMeta
        title="Access form | SYSBILT"
        description="Tell us how to reach your site so we can start delivery."
        canonical={`${SITE_ORIGIN}/go/access`}
        robots="noindex, nofollow"
      />

      {/* Top progress line */}
      <div className="fixed top-0 inset-x-0 z-[60] h-1 bg-black/10">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{width: `${lineProgress}%`, backgroundColor: RED}}
        />
      </div>

      {/* Cream page header — floating cream pill like BOXT (not a dark track) */}
      <header
        className="sticky top-0 z-40 pt-[10px] pb-2 md:pt-3 md:pb-3"
        style={{backgroundColor: GROUND}}
      >
        <div className="mx-auto max-w-5xl px-3 md:px-6">
          <StageJourney
            phase={activePhase}
            phases={phases}
            canGoBack={canGoBack}
            onBack={goBack}
            onHelp={() => setHelpOpen(true)}
          />
        </div>
      </header>

      <AnimatePresence>
        {helpOpen ? (
          <>
            <m.button
              type="button"
              aria-label="Close help"
              className="fixed inset-0 z-[70] bg-dark/40"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setHelpOpen(false)}
            />
            <m.aside
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{type: 'spring', stiffness: 320, damping: 34}}
              className="fixed right-0 top-0 bottom-0 z-[80] flex w-[min(100%,400px)] flex-col border-l border-dark/10 bg-white shadow-2xl"
            >
              <div
                className="flex items-center justify-between border-b border-white/10 px-5 py-4"
                style={{backgroundColor: INK}}
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    Help
                  </p>
                  <p className="mt-0.5 font-sans text-sm text-cream">{help.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setHelpOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 hover:text-white"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-5">
                <p className="mb-5 font-sans text-[15px] leading-relaxed text-dark/75">{help.body}</p>
                {help.steps?.length ? (
                  <ol className="mb-6 list-decimal space-y-2.5 pl-5">
                    {help.steps.map((line) => (
                      <li key={line} className="font-sans text-[14px] leading-relaxed text-dark/70">
                        {line}
                      </li>
                    ))}
                  </ol>
                ) : null}
                {help.links?.length ? (
                  <ul className="mb-8 space-y-2">
                    {help.links.map((link) => (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="font-sans text-sm underline underline-offset-4"
                          style={{color: RED}}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
              <div className="space-y-3 border-t border-dark/10 px-5 py-5" style={{backgroundColor: FUNNEL_COLOURS.surface}}>
                <p className="font-sans text-sm leading-relaxed text-dark/70">
                  Still stuck? Email us or book a short call. A human answers.
                </p>
                <a
                  href={HELP_EMAIL}
                  className="block w-full border border-dark py-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-dark"
                >
                  Email hello@sysbilt.com
                </a>
                <a
                  href={SCHEDULER_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full py-3 text-center font-mono text-xs uppercase tracking-[0.16em] text-white"
                  style={{backgroundColor: RED}}
                >
                  Request a call
                </a>
              </div>
            </m.aside>
          </>
        ) : null}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14 pb-24">
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{opacity: 0, y: 12}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
            className="rounded-3xl border border-dark/[0.06] bg-white p-6 md:p-12 min-h-[460px] shadow-[0_24px_60px_-36px_rgba(26,26,26,0.35)]"
          >
            {product && step !== 'product' && step !== 'done' ? (
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-dark/40 mb-4 text-center md:text-left">
                {FUNNEL_PRODUCT_LABELS[product]}
              </p>
            ) : null}

            {step === 'product' ? (
              <>
                <QuestionTitle>
                  Which <span style={{color: RED}}>fix</span> did you buy?
                </QuestionTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  {liveProducts.map((p) => (
                    <div key={p.code}>
                      <SelectCard
                        selected={product === p.code}
                        onSelect={() => {
                          setProduct(p.code)
                          window.setTimeout(() => setStep('name'), 200)
                        }}
                        title={p.title}
                        blurb={p.blurb}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'name' ? (
              <OneField
                title="What is your name?"
                hint="So we know who to write to. First and last is ideal."
                value={name}
                onChange={setName}
                placeholder="First and last name"
                autoComplete="name"
                disabled={!isValidName(name)}
                onNext={() => goNext('name')}
              />
            ) : null}

            {step === 'email' ? (
              <OneField
                title="What is your email?"
                hint="Preferably the same email you used at checkout."
                value={email}
                onChange={setEmail}
                placeholder="you@business.com.au"
                type="email"
                autoComplete="email"
                disabled={!isValidEmail(email)}
                onNext={() => goNext('email')}
              />
            ) : null}

            {step === 'business' ? (
              <OneField
                title="What is the business name?"
                hint="The trading name customers know."
                value={business}
                onChange={setBusiness}
                placeholder="Trading name"
                autoComplete="organization"
                disabled={!isValidBusiness(business)}
                onNext={() => goNext('business')}
              />
            ) : null}

            {step === 'phone' ? (
              <OneField
                title="Which number should we watch?"
                hint="The Australian business line customers dial. Ten digits."
                value={phone}
                onChange={setPhone}
                placeholder="02 1234 5678 or 0412 345 678"
                type="tel"
                autoComplete="tel"
                disabled={!isValidPhone(phone)}
                onNext={() => goNext('phone')}
              />
            ) : null}

            {step === 'phoneSetup' ? (
              <>
                <QuestionTitle>
                  How is the <span style={{color: RED}}>phone</span> set up?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card, then Select. Not sure is fine.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {PHONE_SETUP_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={phoneSetup === opt.id}
                        onSelect={() => selectPhoneSetup(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'website' ? (
              <OneField
                title="Which website are we fixing?"
                hint="Paste the live site URL for this job."
                value={website}
                onChange={setWebsite}
                placeholder="https://yourbusiness.com.au"
                inputMode="url"
                disabled={!isValidWebsite(website)}
                onNext={() => goNext('website')}
              />
            ) : null}

            {step === 'platform' ? (
              <>
                <QuestionTitle>
                  What runs your <span style={{color: RED}}>website</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-2xl leading-relaxed">
                  Hover a card to read the hint, then press Select. Cannot find yours? Use Not sure.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {PLATFORM_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={platform === opt.id}
                        onSelect={() => selectPlatform(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'provider' ? (
              <>
                <QuestionTitle>
                  Are domain and hosting with the same{' '}
                  <span style={{color: RED}}>provider</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-xl leading-relaxed">
                  Domain is the web address. Hosting is where the site files live.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
                  {PROVIDER_OPTIONS.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={sameProvider === opt.id}
                        onSelect={() => selectProvider(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        unsure={opt.unsure}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'domainProvider' ? (
              <ComboboxField
                title="Where is the domain registered?"
                hint="Start typing to find your registrar. If it is not listed, type the name and keep going. Not sure is fine."
                value={domainProvider}
                onChange={setDomainProvider}
                options={DOMAIN_REGISTRARS}
                onNext={() => goNext('domainProvider')}
                placeholder="e.g. GoDaddy, Crazy Domains"
              />
            ) : null}

            {step === 'hostingProvider' ? (
              <ComboboxField
                title="Where is the site hosted?"
                hint="Start typing to find your host. Shopify, Wix, and Squarespace usually host themselves. Type your own if it is missing."
                value={hostingProvider}
                onChange={setHostingProvider}
                options={HOSTING_PROVIDERS}
                onNext={() => goNext('hostingProvider')}
                placeholder="e.g. SiteGround, WP Engine"
              />
            ) : null}

            {step === 'access' ? (
              <>
                <QuestionTitle>
                  How should we get <span style={{color: RED}}>in</span>?
                </QuestionTitle>
                <p className="font-sans text-dark/55 mb-6 max-w-xl leading-relaxed">
                  Hover, then Select. Pick whatever is easiest for you.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {accessOptions.map((opt) => (
                    <div key={opt.id}>
                      <SelectCard
                        selected={accessPath === opt.id}
                        onSelect={() => selectAccess(opt.id)}
                        title={opt.label}
                        blurb={opt.blurb}
                        icon={opt.icon}
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : null}

            {step === 'accessDetail' ? (
              <OneField
                title="Anything we should know about access?"
                hint={
                  isMissedCall
                    ? accessPath === 'forward'
                      ? 'Carrier name, or how you change divert today.'
                      : accessPath === 'provider'
                        ? 'VoIP or SMS login URL, or say you will email credentials separately.'
                        : accessPath === 'crm'
                          ? 'Which CRM, and whether calls already log there.'
                          : 'Best times to call, or anything that usually trips people up.'
                    : accessPath === 'wp-admin'
                      ? 'Login URL, or say you will email credentials separately.'
                      : accessPath === 'hosting'
                        ? 'Hosting panel name, or how you usually log in.'
                        : accessPath === 'agency'
                          ? 'Who manages the site? Name or email is enough.'
                          : 'Best times to call, or anything that usually trips people up.'
                }
                value={accessDetail}
                onChange={setAccessDetail}
                placeholder="Optional but helpful"
                multiline
                disabled={false}
                onNext={() => goNext('accessDetail')}
                allowEmpty
              />
            ) : null}

            {step === 'notes' ? (
              <>
                <OneField
                  title="Anything else?"
                  hint="Optional. Skip if you are done."
                  value={notes}
                  onChange={setNotes}
                  placeholder="Optional"
                  multiline
                  disabled={false}
                  onNext={() => void submit()}
                  allowEmpty
                  nextLabel={submitting ? 'Sending…' : 'Submit and start the clock'}
                  nextDisabled={submitting}
                />
                {error ? (
                  <p className="mt-4 font-sans text-sm text-[#9A1730] text-center">{error}</p>
                ) : null}
              </>
            ) : null}

            {step === 'done' ? (
              <div className="text-center md:text-left max-w-xl mx-auto md:mx-0 py-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto md:mx-0 text-white"
                  style={{backgroundColor: RED}}
                >
                  <Check className="w-6 h-6" strokeWidth={2.5} />
                </div>
                <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-dark mb-3">
                  Access received. We are on it
                </h1>
                <p className="font-sans text-dark/65 leading-relaxed mb-8">
                  Your delivery clock starts from this submission. If we need anything else, we will
                  email {email || 'you'}, usually the same day.
                </p>
                <Link
                  to={product ? `/go/${product}` : '/go'}
                  className="font-sans text-sm underline underline-offset-4 text-dark/55 hover:text-dark"
                >
                  Back to the offer page
                </Link>
              </div>
            ) : null}
          </m.div>
        </AnimatePresence>

        <FunnelLegalFooter />
      </main>
    </div>
  )
}

function QuestionTitle({children}: {children: React.ReactNode}) {
  return (
    <h1 className="font-serif text-3xl md:text-[2.4rem] tracking-tight text-dark mb-3 leading-[1.15] text-center md:text-left">
      {children}
    </h1>
  )
}

function OneField({
  title,
  hint,
  value,
  onChange,
  placeholder,
  onNext,
  disabled,
  allowEmpty,
  type = 'text',
  autoComplete,
  inputMode,
  multiline,
  nextLabel = 'Next',
  nextDisabled,
}: {
  title: string
  hint?: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  onNext: () => void
  disabled: boolean
  allowEmpty?: boolean
  type?: string
  autoComplete?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
  multiline?: boolean
  nextLabel?: string
  nextDisabled?: boolean
}) {
  const blockNext = nextDisabled || (!allowEmpty && disabled)
  return (
    <div className="max-w-lg mx-auto text-center py-4">
      <QuestionTitle>{title}</QuestionTitle>
      {hint ? (
        <p className="font-sans text-dark/55 mb-8 leading-relaxed">{hint}</p>
      ) : (
        <div className="mb-8" />
      )}
      {multiline ? (
        <textarea
          className={`${inputClass} min-h-[140px] resize-y text-base`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <input
          className={inputClass}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !blockNext) onNext()
          }}
        />
      )}
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={blockNext}
          onClick={onNext}
          className="inline-flex items-center gap-2 font-mono font-bold uppercase tracking-[0.16em] text-xs px-10 py-4 text-white disabled:opacity-40 transition-opacity"
          style={{backgroundColor: INK}}
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

function ComboboxField({
  title,
  hint,
  value,
  onChange,
  options,
  onNext,
  placeholder = 'Start typing to search',
}: {
  title: string
  hint?: string
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  onNext: () => void
  placeholder?: string
}) {
  const [open, setOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const query = value
  const normalised = query.trim().toLowerCase()

  const filtered = useMemo(() => {
    if (!normalised) return [...options]
    return options.filter((opt) => opt.toLowerCase().includes(normalised))
  }, [options, normalised])

  const showCustom =
    normalised.length > 0 &&
    !options.some((opt) => opt.toLowerCase() === normalised)

  const customLabel = showCustom ? `Use "${query.trim()}"` : null

  const items = useMemo(() => {
    if (customLabel) return [...filtered, customLabel]
    return filtered
  }, [filtered, customLabel])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    setHighlight(0)
  }, [normalised, open])

  function pick(opt: string) {
    if (customLabel && opt === customLabel) {
      onChange(query.trim())
    } else {
      onChange(opt)
    }
    setOpen(false)
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setHighlight((h) => Math.min(h + 1, Math.max(items.length - 1, 0)))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (open && items[highlight]) {
        pick(items[highlight])
      } else if (value.trim()) {
        onNext()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  useEffect(() => {
    const el = listRef.current?.children[highlight] as HTMLElement | undefined
    el?.scrollIntoView({block: 'nearest'})
  }, [highlight])

  return (
    <div className="mx-auto max-w-lg py-4 text-center">
      <QuestionTitle>{title}</QuestionTitle>
      {hint ? <p className="mb-8 font-sans leading-relaxed text-dark/55">{hint}</p> : null}

      <div ref={rootRef} className="relative mx-auto w-full max-w-md text-left">
        <input
          className={inputClass}
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-controls="provider-listbox"
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            onChange(e.target.value)
            setOpen(true)
          }}
          onKeyDown={onKeyDown}
        />

        {open ? (
          <ul
            id="provider-listbox"
            ref={listRef}
            role="listbox"
            className="absolute left-0 right-0 z-20 mt-2 max-h-64 overflow-y-auto rounded-2xl border border-dark/10 bg-white py-2 shadow-[0_16px_40px_-20px_rgba(26,26,26,0.35)]"
          >
            {items.length === 0 ? (
              <li className="px-4 py-3 font-sans text-sm text-dark/45">No matches. Keep typing your provider.</li>
            ) : (
              items.map((opt, i) => {
                const active = i === highlight
                const isCustom = Boolean(customLabel && opt === customLabel)
                return (
                  <li key={opt} role="option" aria-selected={value === opt}>
                    <button
                      type="button"
                      className={[
                        'flex w-full items-center px-4 py-2.5 text-left font-sans text-[15px] transition-colors',
                        active ? 'bg-[#FFF2EC] text-dark' : 'text-dark/80 hover:bg-[#FFF2EC]',
                        isCustom ? 'font-medium' : '',
                      ].join(' ')}
                      style={active ? {boxShadow: `inset 3px 0 0 ${RED}`} : undefined}
                      onMouseEnter={() => setHighlight(i)}
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => pick(opt)}
                    >
                      {opt}
                    </button>
                  </li>
                )
              })
            )}
          </ul>
        ) : null}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          disabled={!value.trim()}
          onClick={onNext}
          className="inline-flex items-center gap-2 px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] text-white transition-opacity disabled:opacity-40"
          style={{backgroundColor: INK}}
        >
          Next
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default FunnelAccessPage

import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  CircleHelp,
  ClipboardList,
  Globe2,
  GraduationCap,
  PenLine,
  Workflow,
  type LucideIcon,
} from 'lucide-react'

import CTAButton from '../components/CTAButton'
import BackButton from '../components/BackButton'
import { PageMeta } from '../components/PageMeta'
import { SEO_META } from '../constants/seoMeta'
import { VISIBLE_NAP } from '../constants/organizationJsonLd'
import { useContactForm } from '../hooks/useContactForm'
import { DIAGNOSIS_OPTIONS } from '../constants/contactData'

interface ContactPageProps {
  onBack: () => void
}

type StepId = 'name' | 'email' | 'company' | 'phone' | 'friction' | 'message'

const STEPS: StepId[] = ['name', 'email', 'company', 'phone', 'friction', 'message']

const DIAGNOSIS_META: Record<
  string,
  { title: string; blurb: string; Icon: LucideIcon; unsure?: boolean }
> = {
  [DIAGNOSIS_OPTIONS[0]]: {
    title: 'Website & Leads',
    blurb: 'I need more enquiries',
    Icon: Globe2,
  },
  [DIAGNOSIS_OPTIONS[1]]: {
    title: 'CRM & Sales',
    blurb: "I'm losing track of leads",
    Icon: ClipboardList,
  },
  [DIAGNOSIS_OPTIONS[2]]: {
    title: 'Automation',
    blurb: 'Too much manual work',
    Icon: Workflow,
  },
  [DIAGNOSIS_OPTIONS[3]]: {
    title: 'AI',
    blurb: 'I want bots to handle things',
    Icon: Bot,
  },
  [DIAGNOSIS_OPTIONS[4]]: {
    title: 'Content',
    blurb: "I can't keep up with posting",
    Icon: PenLine,
  },
  [DIAGNOSIS_OPTIONS[5]]: {
    title: 'Training',
    blurb: "My team won't use the tools",
    Icon: GraduationCap,
  },
  [DIAGNOSIS_OPTIONS[6]]: {
    title: 'Dashboards',
    blurb: "I can't see my numbers",
    Icon: BarChart3,
  },
  [DIAGNOSIS_OPTIONS[7]]: {
    title: 'Not sure',
    blurb: "I just know something's broken",
    Icon: CircleHelp,
    unsure: true,
  },
}

function isValidName(value: string): boolean {
  const t = value.trim()
  if (t.length < 2) return false
  if (!/[A-Za-z]/.test(t)) return false
  if (/^\d+$/.test(t)) return false
  return true
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

function isValidPhone(value: string): boolean {
  const clean = value.replace(/\s+/g, '')
  return /^(0[23478])\d{8}$/.test(clean)
}

function isValidCompany(value: string): boolean {
  return value.trim().length >= 2
}

function DiagnosisCard({
  option,
  selected,
  onSelect,
}: {
  option: string
  selected: boolean
  onSelect: () => void
}) {
  const meta = DIAGNOSIS_META[option]
  const Icon = meta?.Icon ?? CircleHelp
  const title = meta?.title ?? option
  const blurb = meta?.blurb ?? ''
  const unsure = meta?.unsure

  return (
    <button
      type="button"
      onClick={onSelect}
      data-selected={selected ? 'true' : undefined}
      className={[
        'group relative flex h-[168px] w-full flex-col items-center overflow-hidden rounded-sm border px-3 pt-5 pb-3 text-center',
        'transition-[border-color,box-shadow,background-color] duration-300 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-on-dark focus-visible:ring-offset-2 focus-visible:ring-offset-dark',
        selected
          ? 'border-gold-on-dark bg-gold-on-dark/10 shadow-[0_16px_40px_-22px_rgba(212,168,75,0.45)]'
          : 'border-white/10 bg-white/[0.04] hover:border-gold-on-dark/60 hover:bg-gold-on-dark/[0.06] hover:shadow-[0_16px_40px_-24px_rgba(212,168,75,0.35)]',
      ].join(' ')}
    >
      <div
        className={[
          'mb-3 flex h-12 w-12 shrink-0 items-center justify-center transition-all duration-300 ease-out',
          'group-hover:mb-1.5 group-hover:h-8 group-hover:w-8',
          'group-data-[selected=true]:mb-1.5 group-data-[selected=true]:h-8 group-data-[selected=true]:w-8',
          selected ? 'text-gold-on-dark' : 'text-white/70 group-hover:text-gold-on-dark',
        ].join(' ')}
      >
        {unsure ? (
          <div
            className={[
              'flex h-12 w-12 items-center justify-center rounded-full border border-white/20 font-serif text-xl text-cream transition-all duration-300',
              'group-hover:h-8 group-hover:w-8 group-hover:border-gold-on-dark/50 group-hover:text-base group-hover:text-gold-on-dark',
              'group-data-[selected=true]:h-8 group-data-[selected=true]:w-8 group-data-[selected=true]:border-gold-on-dark/50 group-data-[selected=true]:text-base group-data-[selected=true]:text-gold-on-dark',
            ].join(' ')}
          >
            ?
          </div>
        ) : (
          <Icon className="h-full w-full" strokeWidth={1.25} />
        )}
      </div>

      <div
        className={[
          'shrink-0 font-sans text-sm font-semibold leading-snug transition-colors duration-300',
          selected ? 'text-gold-on-dark' : 'text-white group-hover:text-gold-on-dark',
        ].join(' ')}
      >
        {title}
      </div>

      <div
        className={[
          'mt-0 flex max-h-0 w-full flex-1 flex-col overflow-hidden opacity-0 transition-all duration-300 ease-out',
          'group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100',
          'group-data-[selected=true]:mt-2 group-data-[selected=true]:max-h-24 group-data-[selected=true]:opacity-100',
        ].join(' ')}
      >
        <p className="flex-1 px-0.5 font-sans text-[12px] leading-relaxed text-white/55">{blurb}</p>
        <span className="mt-2 flex w-full shrink-0 items-center justify-center rounded-sm bg-gold-on-dark py-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-dark">
          Select
        </span>
      </div>
    </button>
  )
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const { formState, updateField, status, errorMessage, handleSubmit } = useContactForm()
  const [step, setStep] = useState<StepId>('name')
  const [fieldError, setFieldError] = useState<string | null>(null)
  const [direction, setDirection] = useState(1)

  const stepIndex = STEPS.indexOf(step)
  const progressPct = Math.round(((stepIndex + 1) / STEPS.length) * 100)

  const inputClass =
    'w-full bg-white/5 border border-white/10 px-4 py-4 font-sans text-xl text-white focus:outline-none focus:border-gold-on-dark focus:bg-white/10 transition-[border-color,background-color,box-shadow] duration-300 ease-out placeholder:text-white/40 rounded-sm mt-2 hover:border-white/25 hover:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(212,168,75,0.15)]'

  function canAdvance(current: StepId): boolean {
    switch (current) {
      case 'name':
        return isValidName(formState.name)
      case 'email':
        return isValidEmail(formState.email)
      case 'company':
        return isValidCompany(formState.company)
      case 'phone':
        return isValidPhone(formState.phone)
      case 'friction':
        return Boolean(formState.frictionPoint)
      case 'message':
        return formState.message.trim().length > 0
      default:
        return false
    }
  }

  function validationMessage(current: StepId): string {
    switch (current) {
      case 'name':
        return 'Enter your name (letters, at least two characters).'
      case 'email':
        return 'Enter a valid email address.'
      case 'company':
        return 'Enter your business name.'
      case 'phone':
        return 'Enter a 10-digit Australian number (e.g. 0412 345 678).'
      case 'friction':
        return 'Pick the closest match.'
      case 'message':
        return 'Add a short note about your situation.'
      default:
        return 'Please complete this step.'
    }
  }

  function goNext() {
    if (!canAdvance(step)) {
      setFieldError(validationMessage(step))
      return
    }
    setFieldError(null)
    if (step === 'message') {
      void handleSubmit()
      return
    }
    const next = STEPS[stepIndex + 1]
    if (next) {
      setDirection(1)
      setStep(next)
    }
  }

  function goBackStep() {
    setFieldError(null)
    if (stepIndex === 0) {
      onBack()
      return
    }
    setDirection(-1)
    setStep(STEPS[stepIndex - 1])
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 'message' && step !== 'friction') {
      e.preventDefault()
      goNext()
    }
  }

  const stepVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? 28 : -28,
      filter: 'blur(4px)',
    }),
    center: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: dir > 0 ? -20 : 20,
      filter: 'blur(3px)',
    }),
  }

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-dark lg:overflow-hidden">
      <PageMeta
        title={SEO_META.contact.title}
        description={SEO_META.contact.description}
        canonical={SEO_META.contact.canonical}
      />

      <div className="w-full lg:w-5/12 h-auto lg:h-screen bg-cream text-dark flex flex-col p-8 md:p-12 lg:px-16 lg:pb-12 lg:pt-20 border-r border-dark/10 justify-between order-first relative z-10">
        <div className="flex-none mb-12 lg:mb-0 pt-2 lg:pt-0">
          <BackButton onClick={onBack} label="Back" />
        </div>

        <div className="flex-1 flex flex-col justify-center py-8 lg:py-0">
          <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-dark mb-6 md:mb-8 block">
            / THE PROMISE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.0] lg:leading-[0.9] tracking-tighter text-dark mb-8 md:mb-10">
            This is not a <br />
            <span className="italic font-serif text-gold-on-cream">Sales Call</span>
          </h1>
          <div className="space-y-6 max-w-lg">
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark">
              No salespeople here. When you fill this out, you are starting a conversation directly
              with us.
            </p>
            <p className="font-sans text-lg md:text-xl font-light leading-relaxed text-dark/80">
              We will personally review your situation and tell you honestly if we can help.
            </p>
          </div>
        </div>

        <div className="flex-none mt-10 lg:mt-0">
          <div className="w-12 h-[1px] bg-gold mb-4" />
          <address className="not-italic font-sans text-sm md:text-base font-light leading-relaxed text-dark/80 space-y-1">
            <p className="font-medium text-dark">{VISIBLE_NAP.name}</p>
            <p>{VISIBLE_NAP.localityLine}</p>
            <p>{VISIBLE_NAP.abnDisplay}</p>
            <p>
              <a
                href={`mailto:${VISIBLE_NAP.email}`}
                className="underline decoration-dark/20 underline-offset-4 hover:text-dark"
              >
                {VISIBLE_NAP.email}
              </a>
            </p>
            <p>
              <a
                href={VISIBLE_NAP.url}
                className="underline decoration-dark/20 underline-offset-4 hover:text-dark"
              >
                {VISIBLE_NAP.url}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="w-full lg:w-7/12 min-h-screen lg:h-screen bg-dark text-cream p-6 md:p-12 lg:px-16 lg:py-12 flex flex-col relative lg:overflow-y-auto">
        {status !== 'success' ? (
          <>
            <div className="absolute top-0 inset-x-0 h-2 bg-white/15">
              <div
                className="h-full bg-gold-on-dark transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto lg:mx-0 pt-10 lg:pt-4">
              <AnimatePresence mode="wait" custom={direction}>
                <m.div
                  key={step}
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  onKeyDown={onKeyDown}
                >
                  <div className="mb-8 border-b border-white/10 pb-6">
                    <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-on-dark mb-4 block">
                      {step === 'name' ? '/ YOUR DETAILS' : `/ STEP ${stepIndex + 1} OF ${STEPS.length}`}
                    </span>

                    {step === 'name' ? (
                      <>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter text-white mb-3">
                          Tell Us About Your{' '}
                          <span className="italic font-serif text-gold-on-dark">Business</span>
                        </h2>
                        <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-5">
                          Fill this out. We will get back to you within 24 hours.
                        </p>
                        <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 font-bold">
                          YOUR NAME<span className="text-gold-on-dark ml-1">*</span>
                        </label>
                      </>
                    ) : (
                      <>
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter text-white mb-3">
                          {step === 'email' && (
                            <>
                              What is your{' '}
                              <span className="italic font-serif text-gold-on-dark">email</span>?
                            </>
                          )}
                          {step === 'company' && (
                            <>
                              What is the{' '}
                              <span className="italic font-serif text-gold-on-dark">business</span>?
                            </>
                          )}
                          {step === 'phone' && (
                            <>
                              Best <span className="italic font-serif text-gold-on-dark">number</span>{' '}
                              to reach you?
                            </>
                          )}
                          {step === 'friction' && (
                            <>
                              What do you need{' '}
                              <span className="italic font-serif text-gold-on-dark">help</span> with?
                            </>
                          )}
                          {step === 'message' && (
                            <>
                              Anything <span className="italic font-serif text-gold-on-dark">else</span>?
                            </>
                          )}
                        </h2>
                        <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed">
                          {step === 'email' && 'We will reply here within one business day.'}
                          {step === 'company' && 'Trading name or website is fine.'}
                          {step === 'phone' && 'Australian mobile or landline, ten digits.'}
                          {step === 'friction' &&
                            'Hover a card, then Select. Pick the closest match.'}
                          {step === 'message' && 'A few lines on your situation is enough.'}
                        </p>
                      </>
                    )}
                  </div>

                  <input
                    type="text"
                    name="website"
                    value={formState.honeypot}
                    onChange={(e) => updateField('honeypot', e.target.value)}
                    autoComplete="off"
                    tabIndex={-1}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      opacity: 0,
                      pointerEvents: 'none',
                    }}
                  />

                  {step === 'name' && (
                    <input
                      autoFocus
                      className={inputClass}
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) => {
                        updateField('name', e.target.value)
                        setFieldError(null)
                      }}
                      autoComplete="name"
                    />
                  )}

                  {step === 'email' && (
                    <input
                      autoFocus
                      type="email"
                      className={inputClass}
                      placeholder="you@business.com.au"
                      value={formState.email}
                      onChange={(e) => {
                        updateField('email', e.target.value)
                        setFieldError(null)
                      }}
                      autoComplete="email"
                    />
                  )}

                  {step === 'company' && (
                    <input
                      autoFocus
                      className={inputClass}
                      placeholder="Company name or website"
                      value={formState.company}
                      onChange={(e) => {
                        updateField('company', e.target.value)
                        setFieldError(null)
                      }}
                      autoComplete="organization"
                    />
                  )}

                  {step === 'phone' && (
                    <input
                      autoFocus
                      type="tel"
                      className={inputClass}
                      placeholder="0412 345 678"
                      value={formState.phone}
                      onChange={(e) => {
                        updateField('phone', e.target.value)
                        setFieldError(null)
                      }}
                      autoComplete="tel"
                    />
                  )}

                  {step === 'friction' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {DIAGNOSIS_OPTIONS.map((opt) => (
                        <DiagnosisCard
                          key={opt}
                          option={opt}
                          selected={formState.frictionPoint === opt}
                          onSelect={() => {
                            updateField('frictionPoint', opt)
                            setFieldError(null)
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {step === 'message' && (
                    <textarea
                      autoFocus
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell us a bit about your situation."
                      value={formState.message}
                      onChange={(e) => {
                        updateField('message', e.target.value)
                        setFieldError(null)
                      }}
                    />
                  )}
                </m.div>
              </AnimatePresence>

              {(fieldError || (status === 'error' && errorMessage)) && (
                <div className="mt-4 p-4 border border-red-solid bg-red-solid/10 text-red-solid font-sans text-sm rounded-sm">
                  {fieldError || errorMessage}
                </div>
              )}

              <div className="mt-8 flex items-center gap-3">
                <button
                  type="button"
                  onClick={goBackStep}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 text-white/80 transition-[border-color,color,background-color] duration-300 hover:border-gold-on-dark hover:bg-gold-on-dark/10 hover:text-gold-on-dark"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={status === 'submitting'}
                  className="group/next flex-1 inline-flex items-center justify-center gap-2 bg-gold-on-dark text-dark px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-[opacity,transform,box-shadow] duration-300 hover:opacity-95 hover:shadow-[0_12px_32px_-12px_rgba(212,168,75,0.55)] active:scale-[0.99] disabled:opacity-50 disabled:shadow-none"
                >
                  {status === 'submitting'
                    ? 'Sending…'
                    : step === 'message'
                      ? 'Send'
                      : 'Next'}
                  {status !== 'submitting' && step !== 'message' ? (
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/next:translate-x-0.5" />
                  ) : null}
                </button>
              </div>
            </div>
          </>
        ) : (
          <m.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 flex flex-col justify-center max-w-md mt-10 md:mt-0"
          >
            <div className="w-24 h-24 bg-gold-on-dark rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-gold-on-dark/30">
              <Check className="w-12 h-12 text-dark" />
            </div>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tighter text-white mb-6">
              Got <span className="italic font-serif text-gold-on-dark">It</span>
            </h2>
            <p className="font-sans text-lg md:text-xl font-light text-white/80 mb-8 leading-relaxed">
              Thanks for reaching out. We will review your details and get back to you within one
              business day.
            </p>

            <div className="bg-white/5 border border-white/10 p-6 mb-12 rounded-sm transition-[border-color,background-color] duration-300 hover:border-gold-on-dark/40 hover:bg-gold-on-dark/[0.06]">
              <p className="font-sans text-sm text-white/90 mb-4">
                <strong className="text-white font-bold">Want to skip the wait?</strong> Book a
                15-minute discovery call directly in the calendar.
              </p>
              <a
                href="https://meetings-ap1.hubspot.com/felipe-chaparro"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gold-on-dark text-dark px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-[opacity,box-shadow] duration-300 hover:opacity-95 hover:shadow-[0_12px_32px_-12px_rgba(212,168,75,0.55)]"
              >
                Book Discovery Call
              </a>
            </div>

            <div className="w-fit">
              <CTAButton theme="dark" onClick={onBack}>
                BACK TO HOME
              </CTAButton>
            </div>
          </m.div>
        )}
      </div>
    </div>
  )
}

export default ContactPage

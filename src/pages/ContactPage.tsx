import React, { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'

import CTAButton from '../components/CTAButton'
import BackButton from '../components/BackButton'
import { PageMeta } from '../components/PageMeta'
import { SEO_META } from '../constants/seoMeta'
import { useContactForm } from '../hooks/useContactForm'
import { DIAGNOSIS_OPTIONS } from '../constants/contactData'

interface ContactPageProps {
  onBack: () => void
}

type StepId = 'name' | 'email' | 'company' | 'phone' | 'friction' | 'message'

const STEPS: StepId[] = ['name', 'email', 'company', 'phone', 'friction', 'message']

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

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const { formState, updateField, status, errorMessage, handleSubmit } = useContactForm()
  const [step, setStep] = useState<StepId>('name')
  const [fieldError, setFieldError] = useState<string | null>(null)

  const stepIndex = STEPS.indexOf(step)
  const progressPct = Math.round(((stepIndex + 1) / STEPS.length) * 100)

  const inputClass =
    'w-full bg-white/5 border border-white/10 px-4 py-4 font-sans text-xl text-white focus:outline-none focus:border-gold focus:bg-white/10 transition-colors duration-200 ease-out placeholder:text-white/40 rounded-sm mt-2'

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
    if (next) setStep(next)
  }

  function goBackStep() {
    setFieldError(null)
    if (stepIndex === 0) {
      onBack()
      return
    }
    setStep(STEPS[stepIndex - 1])
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step !== 'message' && step !== 'friction') {
      e.preventDefault()
      goNext()
    }
  }

  return (
    <div className="min-h-screen lg:h-screen w-full flex flex-col lg:flex-row relative z-[9999] bg-dark lg:overflow-hidden">
      <PageMeta
        title={SEO_META.contact.title}
        description={SEO_META.contact.description}
        canonical={SEO_META.contact.canonical}
      />

      {/* LEFT: cream promise column — unchanged language of the page */}
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

        <div className="hidden lg:block flex-none opacity-40">
          <div className="w-12 h-[1px] bg-gold mb-4" />
          <p className="type-eyebrow text-dark">DIRECT LINE OPEN</p>
        </div>
      </div>

      {/* RIGHT: dark wizard */}
      <div className="w-full lg:w-7/12 min-h-screen lg:h-screen bg-dark text-cream p-6 md:p-12 lg:px-16 lg:py-12 flex flex-col relative lg:overflow-y-auto">
        {status !== 'success' ? (
          <>
            <div className="absolute top-0 inset-x-0 h-1 bg-white/10">
              <div
                className="h-full bg-gold-on-dark transition-all duration-500 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-xl w-full mx-auto lg:mx-0 pt-10 lg:pt-4">
              <div className="mb-8 border-b border-white/10 pb-6">
                <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-gold-on-dark mb-4 block">
                  / STEP {stepIndex + 1} OF {STEPS.length}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tighter text-white mb-3">
                  {step === 'name' && (
                    <>
                      What is your <span className="italic font-serif text-gold-on-dark">name</span>?
                    </>
                  )}
                  {step === 'email' && (
                    <>
                      What is your <span className="italic font-serif text-gold-on-dark">email</span>?
                    </>
                  )}
                  {step === 'company' && (
                    <>
                      What is the <span className="italic font-serif text-gold-on-dark">business</span>?
                    </>
                  )}
                  {step === 'phone' && (
                    <>
                      Best <span className="italic font-serif text-gold-on-dark">number</span> to reach
                      you?
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
                  {step === 'name' && 'So we know who we are speaking with.'}
                  {step === 'email' && 'We will reply here within one business day.'}
                  {step === 'company' && 'Trading name or website is fine.'}
                  {step === 'phone' && 'Australian mobile or landline, ten digits.'}
                  {step === 'friction' && 'Pick the closest match. We can refine on the call.'}
                  {step === 'message' && 'A few lines on your situation is enough.'}
                </p>
              </div>

              {/* honeypot */}
              <input
                type="text"
                name="website"
                value={formState.honeypot}
                onChange={(e) => updateField('honeypot', e.target.value)}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
              />

              <AnimatePresence mode="wait">
                <m.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  onKeyDown={onKeyDown}
                >
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
                      {DIAGNOSIS_OPTIONS.map((opt) => {
                        const selected = formState.frictionPoint === opt
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => {
                              updateField('frictionPoint', opt)
                              setFieldError(null)
                            }}
                            className={[
                              'text-left rounded-sm border px-4 py-4 font-sans text-sm leading-snug transition-colors',
                              selected
                                ? 'border-gold-on-dark bg-gold-on-dark/10 text-white'
                                : 'border-white/10 bg-white/5 text-white/80 hover:border-gold-on-dark/50 hover:text-white',
                            ].join(' ')}
                          >
                            {opt}
                          </button>
                        )
                      })}
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
                  className="inline-flex h-12 w-12 items-center justify-center rounded-sm border border-white/15 text-white/80 hover:border-gold-on-dark hover:text-gold-on-dark transition-colors"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={goNext}
                  disabled={status === 'submitting'}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gold-on-dark text-dark px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {status === 'submitting'
                    ? 'Sending…'
                    : step === 'message'
                      ? 'Send'
                      : 'Next'}
                  {status !== 'submitting' && step !== 'message' ? (
                    <ArrowRight className="w-4 h-4" />
                  ) : null}
                </button>
              </div>
            </div>
          </>
        ) : (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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

            <div className="bg-white/5 border border-white/10 p-6 mb-12 rounded-sm">
              <p className="font-sans text-sm text-white/90 mb-4">
                <strong className="text-white font-bold">Want to skip the wait?</strong> Book a
                15-minute discovery call directly in the calendar.
              </p>
              <a
                href="https://meetings-ap1.hubspot.com/felipe-chaparro"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-gold-on-dark text-dark px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
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

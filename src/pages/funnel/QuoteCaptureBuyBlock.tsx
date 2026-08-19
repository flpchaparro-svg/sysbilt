import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  formatAud,
  QC_PRICE_BASE,
  QC_PRICE_CONCIERGE,
  QC_PRICE_ZOHO,
  quoteCaptureProductTotal,
} from '../../constants/quoteCapturePricing'
import {FUNNEL_COLOURS} from './funnelTheme'
import {FunnelPrimaryButton, FunnelQuietLink} from './FunnelCtaBlock'
import type {FunnelCtaSize} from './FunnelCtaBlock'

function CheckRow({
  checked,
  onChange,
  title,
  blurb,
  locked,
  theme,
}: {
  checked: boolean
  onChange?: (next: boolean) => void
  title: string
  blurb: string
  locked?: boolean
  theme: 'light' | 'dark'
}) {
  const ink = theme === 'dark' ? FUNNEL_COLOURS.onInk : FUNNEL_COLOURS.ink
  const muted = theme === 'dark' ? `${FUNNEL_COLOURS.onInk}99` : FUNNEL_COLOURS.muted
  const border = theme === 'dark' ? `${FUNNEL_COLOURS.onInk}28` : `${FUNNEL_COLOURS.ink}18`
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${
        locked ? 'cursor-default' : 'cursor-pointer'
      }`}
      style={{borderColor: border}}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={locked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-4 w-4 shrink-0 accent-[#E21E3F]"
      />
      <span className="min-w-0">
        <span className="block font-sans text-base font-semibold" style={{color: ink}}>
          {title}
        </span>
        <span className="mt-1 block font-sans text-sm leading-relaxed" style={{color: muted}}>
          {blurb}
        </span>
      </span>
    </label>
  )
}

export function QuoteCaptureBuyBlock({
  theme = 'light',
  size = 'xl',
  align = 'start',
}: {
  theme?: 'light' | 'dark'
  size?: FunnelCtaSize
  align?: 'start' | 'center'
}) {
  const [concierge, setConcierge] = useState(false)
  const [zohoSetup, setZohoSetup] = useState(false)
  const [terms, setTerms] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const total = quoteCaptureProductTotal({concierge, zohoSetup})
  const ink = theme === 'dark' ? FUNNEL_COLOURS.onInk : FUNNEL_COLOURS.ink
  const muted = theme === 'dark' ? `${FUNNEL_COLOURS.onInk}80` : FUNNEL_COLOURS.muted
  const alignClass = align === 'center' ? 'items-center' : 'items-start'

  async function pay() {
    if (!terms || busy) return
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/quote-capture/buy', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({concierge, zohoSetup, terms: true}),
      })
      const data = (await res.json()) as {url?: string; error?: string}
      if (!res.ok || !data.url) {
        setError(data.error || 'Could not start payment')
        setBusy(false)
        return
      }
      window.location.href = data.url
    } catch {
      setError('Could not start payment')
      setBusy(false)
    }
  }

  return (
    <div className={`flex w-full max-w-xl flex-col gap-3 ${alignClass}`}>
      <CheckRow
        theme={theme}
        locked
        checked
        title={`Quote Capture, ${formatAud(QC_PRICE_BASE)}`}
        blurb="The wizard, quotation, email, SMS, pay link, and owner alert on your site."
      />
      <CheckRow
        theme={theme}
        checked={concierge}
        onChange={setConcierge}
        title={`AI Concierge, +${formatAud(QC_PRICE_CONCIERGE)}`}
        blurb="Chat path on the same locked prices. The wizard stays either way."
      />
      <CheckRow
        theme={theme}
        checked={zohoSetup}
        onChange={setZohoSetup}
        title={`Basic quote or invoice setup, +${formatAud(QC_PRICE_ZOHO)}`}
        blurb="Only if you have no quote tool today. Skip this if you already have one."
      />
      <label className="mt-2 flex cursor-pointer items-start gap-3 px-1">
        <input
          type="checkbox"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#E21E3F]"
        />
        <span className="font-sans text-sm leading-relaxed" style={{color: muted}}>
          I have read and agree to the{' '}
          <Link to="/terms" className="underline underline-offset-2" style={{color: ink}}>
            terms
          </Link>
        </span>
      </label>
      <div className="pt-2">
        <FunnelPrimaryButton disabled={!terms || busy} onClick={() => void pay()} size={size}>
          {busy ? 'Starting payment' : `Get Quote Capture, ${formatAud(total)}`}
        </FunnelPrimaryButton>
      </div>
      {!terms ? (
        <p className="font-sans text-sm leading-relaxed" style={{color: muted}}>
          Tick the terms to continue.
        </p>
      ) : null}
      {error ? (
        <p className="font-sans text-sm" style={{color: FUNNEL_COLOURS.accent}}>
          {error}
        </p>
      ) : null}
      <p className="mt-1">
        <FunnelQuietLink href="/demo/quote-capture" theme={theme}>
          Want to feel it first? Try the 60-second demo
        </FunnelQuietLink>
      </p>
    </div>
  )
}

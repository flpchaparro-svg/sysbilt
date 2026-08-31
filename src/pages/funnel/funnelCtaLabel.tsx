import React from 'react'

/**
 * Phone-only CTA text. Full labels stay from `sm` (640px) up, including tablets.
 * Long product names plus wide tracking were clipping inside the red buttons.
 */
export function shortCtaLabel(label: string): string {
  const trimmed = label.trim()
  const fromMatch = trimmed.match(/from\s+(\$[\d,]+)/i)
  if (fromMatch) return `Pay from ${fromMatch[1]}`
  const amount = trimmed.match(/\$[\d,]+/)
  if (amount) return `Pay ${amount[0]}`
  if (/scop/i.test(trimmed)) return 'Start the form'
  if (/waitlist/i.test(trimmed)) return 'Join waitlist'
  return 'Pay now'
}

export function CtaLabelText({label}: {label: string}) {
  const short = shortCtaLabel(label)
  if (short === label) return <>{label}</>
  return (
    <>
      <span className="sm:hidden">{short}</span>
      <span className="hidden sm:inline">{label}</span>
    </>
  )
}

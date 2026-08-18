/** Visitor + owner notify for Quote Capture (Resend + ClickSend). */

export function resendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY?.trim())
}

function envFirst(...names: string[]): string {
  for (const name of names) {
    const value = process.env[name]?.trim()
    if (value) return value
  }
  return ''
}

function clicksendUsername(): string {
  return envFirst('CLICKSEND_USERNAME', 'Clicksend_Username')
}

function clicksendApiKey(): string {
  return envFirst('CLICKSEND_API_KEY', 'Clicksend_API_Key')
}

export function smsConfigured(): boolean {
  return Boolean(clicksendUsername() && clicksendApiKey())
}

/** @deprecated Use smsConfigured. Kept so older call sites still compile. */
export function twilioConfigured(): boolean {
  return smsConfigured()
}

function fromEmail(): string {
  return (
    process.env.QUOTE_CAPTURE_FROM_EMAIL?.trim() ||
    process.env.RESEND_FROM_EMAIL?.trim() ||
    'Quote Capture <onboarding@resend.dev>'
  )
}

export async function sendQuoteEmail(input: {
  to: string
  subject: string
  text: string
  html?: string
}): Promise<{ok: boolean; skipped?: boolean; error?: string}> {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return {ok: false, skipped: true, error: 'RESEND_API_KEY missing'}
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail(),
      to: [input.to],
      subject: input.subject,
      text: input.text,
      html: input.html || undefined,
    }),
  })
  if (!res.ok) {
    const body = await res.text()
    return {ok: false, error: humanizeProviderError('email', res.status, body)}
  }
  return {ok: true}
}

/** Short plain lines for UI / HubSpot. Never dump provider JSON. */
export function humanizeProviderError(
  channel: 'email' | 'sms',
  status: number,
  body: string,
): string {
  const lower = body.toLowerCase()
  if (channel === 'email') {
    if (status === 403 && lower.includes('only send testing emails')) {
      return 'Email skipped: Resend test mode only delivers to the account inbox until a sending domain is verified'
    }
    if (status === 403) return 'Email skipped: Resend rejected the send (check from address / domain)'
    return `Email skipped: Resend ${status}`
  }
  if (lower.includes('insufficient_credit') || lower.includes('insufficient credit')) {
    return 'SMS skipped: ClickSend credit ran out'
  }
  if (lower.includes('url') && (lower.includes('paus') || lower.includes('approv'))) {
    return 'SMS skipped: ClickSend is holding messages with links until URL sending is approved'
  }
  if (lower.includes('invalid_recipient') || lower.includes('invalid recipient')) {
    return 'SMS skipped: mobile number was not accepted'
  }
  if (status === 401 || lower.includes('invalid_credentials')) {
    return 'SMS skipped: ClickSend username or API key rejected'
  }
  if (status >= 400) return `SMS skipped: ClickSend ${status}`
  return 'SMS skipped: ClickSend rejected the send'
}

/** AU-first E.164. Accepts 04…, 4…, 61…, or +61…. */
export function toE164Phone(raw: string): string {
  const compact = raw.replace(/[^\d+]/g, '')
  if (!compact) return ''
  if (compact.startsWith('+')) return compact
  if (compact.startsWith('61') && compact.length >= 11) return `+${compact}`
  if (compact.startsWith('0') && compact.length >= 9) return `+61${compact.slice(1)}`
  if (compact.startsWith('4') && compact.length === 9) return `+61${compact}`
  return `+${compact}`
}

export async function sendQuoteSms(input: {
  to: string
  body: string
}): Promise<{ok: boolean; skipped?: boolean; error?: string}> {
  const username = clicksendUsername()
  const apiKey = clicksendApiKey()
  if (!username || !apiKey) {
    return {ok: false, skipped: true, error: 'ClickSend env missing'}
  }
  const to = toE164Phone(input.to)
  if (to.replace(/\D/g, '').length < 10) return {ok: false, error: 'Invalid phone'}

  const auth = Buffer.from(`${username}:${apiKey}`).toString('base64')
  const res = await fetch('https://rest.clicksend.com/v3/sms/send', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        {
          source: 'sdk',
          to,
          body: input.body.slice(0, 1500),
        },
      ],
    }),
  })

  const raw = await res.text()
  let parsed: {
    response_code?: string
    response_msg?: string
    data?: {messages?: Array<{status?: string; status_text?: string; error_text?: string}>}
  } = {}
  try {
    parsed = raw ? JSON.parse(raw) : {}
  } catch {
    parsed = {}
  }

  const message = parsed.data?.messages?.[0]
  const messageStatus = (message?.status || '').toUpperCase()
  const responseCode = (parsed.response_code || '').toUpperCase()
  const detail = [message?.status, message?.status_text, message?.error_text, parsed.response_msg]
    .filter(Boolean)
    .join(' ')

  if (!res.ok || responseCode !== 'SUCCESS' || (messageStatus && messageStatus !== 'SUCCESS')) {
    return {
      ok: false,
      error: humanizeProviderError('sms', res.status, detail || raw || `HTTP ${res.status}`),
    }
  }
  return {ok: true}
}

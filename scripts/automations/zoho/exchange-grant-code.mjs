#!/usr/bin/env node
/**
 * Exchange a Zoho Self Client grant code for a refresh token (one-time).
 *
 *   # put CLIENT_ID + CLIENT_SECRET in .env.local first
 *   node scripts/automations/zoho/exchange-grant-code.mjs <GRANT_CODE>
 *
 * Then paste ZOHO_INVOICE_REFRESH_TOKEN into .env.local.
 */
import {
  loadEnvLocal,
  getZohoConfig,
  exchangeGrantCode,
  REQUIRED_SCOPES,
} from './zoho-invoice-au.mjs'

loadEnvLocal()

const code = process.argv[2]?.trim()
if (!code) {
  console.error('Usage: node scripts/automations/zoho/exchange-grant-code.mjs <GRANT_CODE>')
  console.error('')
  console.error('Self Client scopes to paste in Zoho API Console (AU):')
  console.error(`  ${REQUIRED_SCOPES}`)
  process.exit(1)
}

const cfg = getZohoConfig()
if (!cfg.clientId || !cfg.clientSecret) {
  console.error('Need ZOHO_INVOICE_CLIENT_ID and ZOHO_INVOICE_CLIENT_SECRET in .env.local')
  process.exit(1)
}

try {
  const data = await exchangeGrantCode({code}, cfg)
  console.log('Success. Add this to .env.local (do not commit):')
  console.log('')
  console.log(`ZOHO_INVOICE_REFRESH_TOKEN=${data.refresh_token}`)
  console.log('')
  if (data.access_token) {
    console.log('(access_token also returned; expires soon; refresh token is what we keep)')
  }
} catch (err) {
  console.error(err instanceof Error ? err.message : err)
  process.exit(1)
}

import {createClient, type SupabaseClient} from '@supabase/supabase-js'
import './auth.js'

export function supabaseUrl(): string {
  return (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '').trim()
}

export function supabaseAnonKey(): string {
  return (process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || '').trim()
}

export function supabaseServiceKey(): string {
  return (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim()
}

export function supabaseConfigured(): boolean {
  return Boolean(supabaseUrl() && (supabaseServiceKey() || supabaseAnonKey()))
}

let serviceClient: SupabaseClient | null = null

export function getServiceSupabase(): SupabaseClient {
  const url = supabaseUrl()
  const key = supabaseServiceKey()
  if (!url || !key) {
    throw new Error('Supabase is not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.')
  }
  if (!serviceClient) {
    serviceClient = createClient(url, key, {
      auth: {autoRefreshToken: false, persistSession: false},
    })
  }
  return serviceClient
}

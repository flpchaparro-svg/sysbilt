import {createClient, type SupabaseClient} from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL || ''
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

let client: SupabaseClient | null = null

export function learnSupabaseConfigured(): boolean {
  return Boolean(url && anon)
}

export function getLearnSupabase(): SupabaseClient {
  if (!url || !anon) {
    throw new Error('Learn sign-in is not configured')
  }
  if (!client) {
    client = createClient(url, anon, {
      auth: {
        persistSession: true,
        detectSessionInUrl: true,
        flowType: 'pkce',
      },
    })
  }
  return client
}

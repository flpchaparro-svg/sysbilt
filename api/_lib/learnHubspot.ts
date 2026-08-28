import {addContactNote, upsertContactByEmail} from './hubspot.js'
import {getServiceSupabase} from './supabase.js'
import type {LearnUser} from './learnAuth.js'

export async function syncLearnHubspot(user: LearnUser): Promise<void> {
  if (!process.env.HUBSPOT_PRIVATE_APP_TOKEN) return
  const supabase = getServiceSupabase()
  const {data} = await supabase
    .from('learn_profiles')
    .select('hubspot_synced_at, display_name')
    .eq('id', user.id)
    .maybeSingle()
  if (data?.hubspot_synced_at) return

  const name = (data?.display_name || user.displayName || '').trim()
  const [firstname, ...rest] = name.split(/\s+/)
  try {
    const result = await upsertContactByEmail({
      email: user.email,
      firstname: firstname || undefined,
      lastname: rest.length ? rest.join(' ') : undefined,
      lifecyclestage: 'subscriber',
      leadSourceDetail: 'learn',
    })
    await addContactNote(result.id, 'Joined SYSBILT Learn.')
    await supabase
      .from('learn_profiles')
      .update({hubspot_synced_at: new Date().toISOString()})
      .eq('id', user.id)
  } catch (err) {
    console.warn('[learn] HubSpot sync skipped', err)
  }
}

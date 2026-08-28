import {getLearnSupabase} from './supabaseClient'

async function authHeader(): Promise<HeadersInit> {
  const {data} = await getLearnSupabase().auth.getSession()
  const token = data.session?.access_token
  if (!token) throw new Error('Sign in required')
  return {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}
}

export async function learnGet<T>(path: string): Promise<T> {
  const headers = await authHeader()
  const res = await fetch(path, {headers})
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data as T
}

export async function learnSend<T>(path: string, body: unknown): Promise<T> {
  const headers = await authHeader()
  const res = await fetch(path, {method: 'POST', headers, body: JSON.stringify(body)})
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data as T
}

export function lessonQuery(courseSlug: string, lessonSlug: string): string {
  return `courseSlug=${encodeURIComponent(courseSlug)}&lessonSlug=${encodeURIComponent(lessonSlug)}`
}

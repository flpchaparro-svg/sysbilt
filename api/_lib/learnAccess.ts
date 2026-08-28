import type {LearnUser} from './learnAuth.js'
import type {LearnAccess, LearnCourseDoc} from './learnSanity.js'
import {getServiceSupabase} from './supabase.js'

export type EntitlementSource = 'open' | 'stripe' | 'grant' | 'company'

export type CourseVisibility = {
  listed: boolean
  entitled: boolean
  locked: boolean
  source: EntitlementSource | null
}

export function emailOnList(email: string, list: string[]): boolean {
  const needle = email.trim().toLowerCase()
  return list.some((item) => item.trim().toLowerCase() === needle)
}

export function visibilityForCourse(
  course: LearnCourseDoc,
  entitled: boolean,
  entitledSource: EntitlementSource | null,
): CourseVisibility {
  if (course.access === 'open') {
    return {listed: true, entitled: true, locked: false, source: entitledSource || 'open'}
  }
  if (course.access === 'premium') {
    return {
      listed: true,
      entitled,
      locked: !entitled,
      source: entitledSource,
    }
  }
  return {
    listed: entitled,
    entitled,
    locked: !entitled,
    source: entitledSource,
  }
}

export async function loadEntitlementMap(
  userId: string,
): Promise<Map<string, EntitlementSource>> {
  const supabase = getServiceSupabase()
  const {data, error} = await supabase
    .from('learn_entitlements')
    .select('course_id, source')
    .eq('user_id', userId)
  if (error) throw error
  const map = new Map<string, EntitlementSource>()
  for (const row of data || []) {
    map.set(row.course_id, row.source as EntitlementSource)
  }
  return map
}

export async function upsertEntitlement(
  userId: string,
  courseId: string,
  source: EntitlementSource,
): Promise<void> {
  const supabase = getServiceSupabase()
  const {error} = await supabase.from('learn_entitlements').upsert(
    {user_id: userId, course_id: courseId, source},
    {onConflict: 'user_id,course_id', ignoreDuplicates: true},
  )
  if (error) throw error
}

export async function syncCourseEntitlements(
  user: LearnUser,
  courses: LearnCourseDoc[],
  existing: Map<string, EntitlementSource>,
): Promise<Map<string, EntitlementSource>> {
  const next = new Map(existing)
  for (const course of courses) {
    if (next.has(course._id)) continue
    if (course.access === 'open') {
      await upsertEntitlement(user.id, course._id, 'open')
      next.set(course._id, 'open')
      continue
    }
    if (emailOnList(user.email, course.grantEmails)) {
      await upsertEntitlement(user.id, course._id, 'grant')
      next.set(course._id, 'grant')
      continue
    }
    if (course.access === 'company' && emailOnList(user.email, course.inviteEmails)) {
      await upsertEntitlement(user.id, course._id, 'company')
      next.set(course._id, 'company')
    }
  }
  return next
}

export function canStartCourse(access: LearnAccess, entitled: boolean): boolean {
  if (access === 'open') return true
  return entitled
}

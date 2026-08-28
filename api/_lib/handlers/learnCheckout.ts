import type {VercelRequest, VercelResponse} from '@vercel/node'
import {requireLearnUser} from '../learnAuth.js'
import {fetchLearnCourseBySlug} from '../learnSanity.js'
import {loadEntitlementMap, visibilityForCourse} from '../learnAccess.js'
import {createLearnCheckoutSession, stripeConfigured} from '../learnStripe.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({error: 'Method not allowed'})
  const user = await requireLearnUser(req, res)
  if (!user) return
  if (!stripeConfigured()) return res.status(503).json({error: 'Payments are not configured yet'})

  const slug = typeof req.body?.slug === 'string' ? req.body.slug : ''
  if (!slug) return res.status(400).json({error: 'slug required'})

  try {
    const course = await fetchLearnCourseBySlug(slug)
    if (!course || course.access !== 'premium') {
      return res.status(404).json({error: 'Course not found'})
    }
    const entitlements = await loadEntitlementMap(user.id)
    const vis = visibilityForCourse(course, entitlements.has(course._id), entitlements.get(course._id) || null)
    if (vis.entitled) return res.status(200).json({alreadyEntitled: true})
    if (!course.stripePriceId && !(course.priceAud && course.priceAud >= 0.5)) {
      return res.status(400).json({error: 'This course has no price yet. Access is by grant only.'})
    }
    const session = await createLearnCheckoutSession({
      courseId: course._id,
      courseTitle: course.title,
      userId: user.id,
      email: user.email,
      successPath: `/learn/${course.slug}`,
      cancelPath: `/learn/${course.slug}`,
      priceAud: course.priceAud,
      stripePriceId: course.stripePriceId,
    })
    return res.status(200).json({url: session.url})
  } catch (err) {
    console.error('[learn/checkout]', err)
    return res.status(500).json({error: err instanceof Error ? err.message : 'Checkout failed'})
  }
}

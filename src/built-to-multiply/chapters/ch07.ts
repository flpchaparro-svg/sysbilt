import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Keeping it honest, legal and on-brand',
    subtitle: 'The discipline that keeps a fast content system premium and safe.',
  }),
  flow(
    ...p(
      'Fast, cheap, high-volume content creation is powerful, and power used carelessly does damage, which is what this chapter is about preventing. The speed that makes a content system valuable also makes it easy to publish something false, something that breaks a rule, or something that quietly cheapens the brand, at scale and in public. This chapter is the discipline that keeps the system premium and safe: the honesty the law requires, the rights you have to respect, and the brand standard that a premium business cannot afford to drop. As with the legal chapters throughout this series, a lawyer\'s eye over anything you are unsure of is cheap insurance, and the principles here are the durable ones.',
    ),
    ...section(
      'REAL CLAIMS',
      'Real claims only',
      ...p('Content makes claims, and in Australia the rule is simple and strict: claims made in your content must be true and able to be backed up, and this applies to a post exactly as it applies to an ad or a page. Saying you are the best, the fastest, the cheapest, the most experienced, without being able to prove it, is misleading conduct, and the law does not care that it was a quick social post rather than a formal advertisement. The same goes for claims about results, about what your service delivers, about outcomes. Content that promises what you cannot demonstrate is a risk, not just to your reputation but legally, and the speed of content makes it easy to fire off a claim in a caption that you would never put in writing on a considered page. Slow down enough to make sure every claim is true. Fast making does not excuse false claiming.'),
      {
        type: 'diagram',
        id: 'btm-ch07-claims-provable',
        caption: 'Claims must be provable. LEFT (crossed): "the best, the fastest, the cheapest" with no evidence, misleading conduct even in a quick post. RIGHT: a specific, provable claim, true and able to be backed up. Fast making does not excuse false claiming.',
      },
    ),
    ...section(
      'NEVER FAKE',
      'Never fake the proof',
      ...p('Testimonials and reviews are the most persuasive content there is, and faking them is both the most tempting shortcut and one of the clearest lines you must never cross. Writing your own reviews, buying them, showing only the glowing ones while hiding the rest, staging a testimonial that never happened, all of it is misleading conduct, all of it is hunted by regulators and platforms, and all of it destroys the trust it was meant to build the moment it is discovered. Real proof only. Real clients, real words, real results, shown honestly. This series builds review-gathering systems precisely so that you have a steady supply of genuine proof and never feel the temptation to invent it, because invented proof is a legal and reputational disaster wearing a marketing costume.'),
      {
        type: 'diagram',
        id: 'btm-ch07-never-fake-proof',
        caption: 'Never fake the proof. LEFT (crossed): fake reviews, written, bought, cherry-picked, misleading conduct that destroys trust when discovered. RIGHT: a steady flow of real reviews from real clients.',
      },
    ),
  ),
  flow(
    ...section(
      'RIGHTS',
      'Rights and real people',
      ...p('Content uses images, music, footage, and sometimes people, and each carries rights you have to respect. You cannot use images, music, or video you do not have the right to use, lifting them from elsewhere because they were easy to grab is a real legal exposure, and the fix is using properly licensed material, your own work, or content you have permission for. Real people carry their own rights: a client, a member of the public, a staff member appearing in your content should have agreed to it, and using someone\'s face or words without permission is a problem waiting to happen. And in the age of AI content, one sharp new line, do not generate images or video that impersonate real, identifiable people, including public figures, which is a fast-growing legal and ethical minefield. Use what is yours or licensed, get permission for real people, and keep AI away from impersonating anyone real.'),
    ),
    ...section(
      'DISCLOSURE',
      'Disclosure where it is owed',
      ...p('Honesty about how content is made matters where it would change how the person reads it. Where the rules or plain decency call for it, be straightforward, a paid partnership disclosed as one, a piece of content clearly marked where marking is required. The direction of regulation and platform policy is toward more transparency, not less, and the safe and honest position is to disclose what a reasonable person would want to know. Content that hides something material about how it was made or paid for is a risk that a moment of clarity would have removed.'),
    ),
    ...section(
      'BRAND COST',
      'The brand cost of looking cheap',
      ...p('The last discipline is not legal, it is commercial, and for a premium business it may be the most important line in the chapter. Content made carelessly with these fast tools reads as cheap, the machine-flavoured writing, the obviously generated image, the generic piece that could belong to anyone, and cheap-looking content does something specific and expensive: it undercuts the premium impression your business charges for. A growing business competing on quality cannot afford to look, in its content, like it does not care, because content is often the first thing a prospective client sees, and the shift this book opened with means the feed is now full of cheap machine content, so the businesses that look considered stand out precisely because so much around them does not.'),
      ...p('This makes your editing pass, the human polish from chapter six, a brand decision rather than a nicety. The voice rules, the visual standards, the human ear and eye before publishing, are what keep the machine\'s speed from costing the business\'s reputation. The quality gate is a rule, held firmly, not a mood you get to when you have time, because in a feed full of cheap content, looking considered is the whole advantage, and it is thrown away the moment you let the tools publish their first draft with your name on it.'),
      {
        type: 'diagram',
        id: 'btm-ch07-looking-cheap',
        caption: 'Looking cheap costs the premium. A feed full of cheap machine content, with one considered on-brand piece standing out. In a feed full of cheap content, looking considered is the whole advantage. Thrown away the moment you let the tools publish their first draft with your name on it.',
      },
      ...p('Honest claims, real proof, respected rights, disclosed where owed, held to a premium standard: that is the discipline that lets a fast content system stay safe and stay premium. The next chapter is how you tell whether any of it is actually working, the numbers that matter and the ones that lie.'),
    ),
  ),
]

import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'The prompt pack',
    subtitle: 'The daily work of a content system, packed into briefings you can copy.',
  }),
  flow(
    ...p(
      'The daily work of a content system runs on words, and these are the briefings that produce them. Each one is built to be copied, filled with your specifics, and edited, because the rule of this whole series holds here too: the tool drafts, you decide, and nothing goes out that has not passed a human eye. Fill the brackets with real detail, the more specific the better, and shape what comes back until it sounds like your business, because it is about to represent it in public.',
    ),
    {
      type: 'promptCard',
      title: 'Voice note into an article',
      body: `Turn this voice note transcript into a first-draft article for my website: [paste transcript]. My business is [what you do] for [who you serve]. Keep my actual points and my way of saying things, organise them under plain headings, open with a direct answer to the question the piece addresses, and mark anywhere I should add a specific example or fact with [ADD DETAIL]. Do not invent facts, figures, or examples. Australian English, no exclamation marks, no em dashes.`,
    },
    {
      type: 'promptCard',
      title: 'Article into a carousel',
      body: `Turn this article into a carousel of [number] slides: [paste article]. Slide one is a strong hook that stops the scroll. Each middle slide makes one clear point in a few words, not paragraphs. The last slide is a clear next step. Keep it to one idea across the whole carousel, in plain Australian English, in my voice: [describe your voice briefly].`,
    },
    {
      type: 'promptCard',
      title: 'Caption sets with variations',
      body: `Write [number] different caption options for a post about [the topic]. My business is [what you do] for [who you serve]. Each caption should open with a different hook, take a slightly different angle, and end with a clear next step. Vary them genuinely rather than rewording the same one. Plain Australian English, no hype, no exclamation marks, and include natural search-friendly words the way my audience would actually phrase it.`,
    },
    {
      type: 'promptCard',
      title: 'Hook batches',
      body: `Give me [number] different hooks for content about [the idea or point]. Each should be one line that stops the scroll, aimed at [who you serve], using a different approach: a question, a surprising statement, a promise of something useful, a common mistake, and so on. Plain Australian English, no clickbait, no exclamation marks. These are for me to test, so make them genuinely different from each other.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'A clean image brief',
      body: `Write a clear, detailed prompt for an AI image tool to create [what you want: a background, a concept image, an illustration] for a post about [the topic]. It should suit a premium, professional brand. Describe the style, mood, composition, and colours [add your brand colours]. Keep it to something illustrative or conceptual, not a fake photo of real products or real people.`,
    },
    {
      type: 'promptCard',
      title: 'A clean video brief',
      body: `Write a short brief for a [length] video about [the topic] for [platform]. My business is [what you do] for [who you serve], and the job of this video is [awareness / trust / getting enquiries]. Give me: the hook for the first few seconds, the main point in the middle, and the call to action at the end, plus a note on the tone and pace that suits the platform. Keep it to one idea. Plain Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'The repurposing prompt',
      body: `Here is a source article: [paste article]. Turn it into a week of content for me: a carousel outline, [number] short social posts each taking one point, a short video script, and a brief email to my list. Keep everything consistent with the article and in my voice: [describe voice]. Each piece should make one clear point and point toward [the next step]. Australian English, no exclamation marks, no em dashes.`,
    },
    {
      type: 'promptCard',
      title: 'The what\'s-working research brief',
      body: `I want to understand what content is working in my field: [describe your niche and who you serve]. Based on what is generally known to perform well, tell me: which formats and hooks tend to work for this kind of business and audience, what angles build trust in this field, and what common content mistakes to avoid. Give me practical ideas I could adapt and make my own, not generic advice.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'The monthly analytics summary',
      body: `Here are my content numbers for the month: [paste or describe the numbers per piece and per platform]. My goals are: [awareness / trust / enquiries, and which content was aimed at which]. Read this honestly against those goals: which pieces genuinely worked for their job, which did not, what patterns you see across them, and what I should make more of and less of next month. Ignore vanity metrics and focus on what connects to real business. Be blunt.`,
    },
    {
      type: 'promptCard',
      title: 'Adapting one piece for another platform',
      body: `Here is a piece I made for [platform]: [paste it]. Adapt it to work natively on [other platform], respecting how that platform's audience and format actually behave rather than just copying it across. Keep the same core idea and my voice, but make it feel made for the new room. Plain Australian English.`,
    },
    ...section(
      'FOUR CHECKS',
      'The checks before anything goes out',
      ...p('Four, in this book\'s terms, run before any piece publishes. Brand: does it sound and look like your business, in your voice and your standards, or does it read as cheap and machine-made, because chapter seven made that a brand decision, not a nicety. Truth: is every claim, fact, and figure true and able to be backed up, because chapter seven made that the law. Rights: do you have the right to every image, clip, and piece of music in it, and has any real person in it agreed, because those rights are real. And quality: is this genuinely worth someone\'s attention, or is it filler you are posting because the tools made it easy, because filler is the flood, and the flood costs you the one thing you cannot generate.'),
      ...p('Pass those four and the tools become what they should be, the fastest content department a business your size has ever had, with your judgment on every piece. The making is fast now. The deciding, the editing, and the standard are still yours, and they are the whole difference. That has been the deal on every page of this series, and it holds here too.'),
      {
        type: 'diagram',
        id: 'btm-ch11-four-checks',
        caption: 'The four checks. BRAND: sounds and looks like you. TRUTH: every claim provable. RIGHTS: every image, clip, person cleared. QUALITY: genuinely worth attention, not filler. A piece passing through all four to publish.',
      },
    ),
  ),
]

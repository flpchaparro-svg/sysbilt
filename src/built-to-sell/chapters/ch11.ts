import type { BtwPage } from '../types'
import { closing, flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'Using AI to run the store faster',
    subtitle: 'AI drafts. You verify. The store publishes only what is true.',
  }),

  flow(
    ...p(
      'A store eats content for breakfast. Every product needs a description, every collection an introduction, every question an answer, every season a refresh, and multiplied across a growing catalogue, the writing alone can be a part-time job. It no longer has to be. Used properly, AI takes the heavy lifting out of the store\'s endless wordwork, turning a blank page into a strong draft in moments, while you stay firmly in charge of what is true. This chapter shows the method, hands you a prompt pack built for stores, and closes with the checks that matter more here than anywhere, because in a store, a made-up detail is not a style problem, it is a refund, a review, and possibly a legal problem.',
    ),
  ),

  flow(
    ...section(
      'THE METHOD',
      'The method',
      ...p(
        'Same as ever, sharpened for retail. AI drafts, you edit, and the store publishes nothing a human has not verified. Direct it with specifics, what the product actually is, who it is for, what makes it different, because the quality of what comes back is set by the quality of what you feed it. And keep one rule absolute: the facts come from you. The AI writes around the specifications; it never invents them. Every measurement, material, compatibility claim, stock statement and delivery promise in anything it drafts gets checked against reality before it ships, because chapter seven\'s law applies to every sentence no matter who wrote it.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch11-method-loop',
        caption:
          'The method: facts in, drafts out. YOU (the facts, specs, policies, prices) → AI (drafts fast) → YOU (verify every claim) → STORE (publishes only what is true). AI has no arrow directly to the store. Footer: "The AI writes around the facts. It never invents them."',
      },
    ),
  ),

  flow(
    ...section(
      'PROMPT PACK',
      'The store prompt pack',
      ...p('Copy, fill the brackets, edit what returns.'),
    ),
    {
      type: 'promptCard',
      title: 'Product description',
      body: `Write a product description for [product name]. It is [what it is] for [who it is for]. Its key details: [paste the real specifications, materials, dimensions]. What makes it different: [your difference]. Open with one plain sentence saying what it is and who it is for, then sell the outcome in warm, confident language, then present the specifications clearly. Do not invent any detail not listed here. Australian English, no hype, no jargon.`,
    },
    {
      type: 'promptCard',
      title: 'Collection page introduction',
      body: `Write a short introduction for a collection page of [category]. My store sells [what you sell] for [who you serve]. In three or four plain sentences: what this range is, who it suits, and how to choose within it. Genuinely helpful, not salesy. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Buying guide',
      body: `Write a buying guide that answers: [the question buyers actually ask, e.g. how to choose the right X]. My store sells [what you sell] for [who you serve]. Open with a direct one-or-two-sentence answer, then use plain headings to walk through how to choose, with honest trade-offs. Keep it useful first and promotional never, ending with a light pointer to our range. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Comparison piece',
      body: `Write a plain-English comparison of [product/type A] versus [product/type B] for someone deciding between them. The honest differences: [list the real differences]. Open with a direct answer about who each one suits, then compare on the things buyers care about. Do not invent specifications. Fair, clear, Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Product FAQ answers',
      body: `Write clear answers to these questions customers ask about [product]: [list the real questions]. Facts to use: [paste the true details and policies]. Answer each in two or three plain sentences, leading with the answer. Do not invent details. Australian English, no jargon.`,
    },
    {
      type: 'promptCard',
      title: 'Shipping and returns page',
      body: `Draft a shipping and returns page from these facts: [your real shipping costs, timeframes, regions, returns window, who pays return postage, refund method and timing]. Write it in plain, confident sentences a customer can understand in one read. State everything honestly and nothing beyond these facts. Note for me anywhere the policy seems unclear or incomplete rather than filling the gap. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Review reply',
      body: `Write a short, genuine reply to this customer review: [paste review]. Reply warmly on behalf of [store name], thanking them for the specifics they mentioned. If critical: respond calmly, acknowledge their experience, and offer to make it right without being defensive and without making promises beyond [what you are actually able to offer]. Brief, human, Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Abandoned cart email',
      body: `Write a short, friendly email to someone who left [product] in their cart at [store name]. Tone: helpful service, not pressure. Remind them what is waiting, answer one likely doubt using these facts: [shipping cost/returns ease/stock truth], and give one clear link back to the cart. No countdown tricks, no false urgency. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Back-in-stock email',
      body: `Write a short email telling a customer that [product] they asked about is back in stock. Warm, brief, one clear action. Mention only true details: [price, any limits]. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Promotional email',
      body: `Write a short email to my customer list about [the offer or news]. My store sells [what you sell] for [who you serve]. Clear subject line, lead with the point, one clear action, and every claim drawn only from these facts: [the real offer, dates, conditions]. Warm and direct, no hard selling, no hype. Australian English.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Social posts from a product',
      body: `Turn this product into [number] short social posts: [paste the product description]. Each post makes one appealing, true point in a few plain sentences, natural rather than promotional, pointing people to the store where it fits. Do not invent details. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Image alt text',
      body: `Write short, plain alt text for this product image: [describe what the image actually shows]. One factual sentence describing what is shown, without starting with "image of". Australian English.`,
    },
  ),

  flow(
    ...section(
      'BEFORE YOU SHIP',
      'The checks before anything ships',
      ...p(
        'Four, as always, with retail teeth. Tone: does it sound like your store or like a machine, and would you say it across the counter. Truth: every specification, price, stock claim and delivery promise checked against reality, because an invented detail in a store is a consumer-law problem wearing a copywriting costume. Originality: does it read like your brand or like everyone\'s, and has your actual knowledge of the product been added. Rules: nothing that overpromises, nothing that narrows a customer\'s rights, nothing about the offer that the offer does not honour.',
        'Pass those four and AI becomes the store\'s tireless copy department, fast, cheap and endlessly patient, with you as the editor whose name is over the door. Skip them and you are publishing a stranger\'s guesses about your own products. The tool is fast. You are the truth. Keep it that way.',
      ),
      {
        type: 'diagram',
        id: 'bts-ch11-four-checks',
        caption:
          'Four checks before it ships. TONE (sounds like your counter), TRUTH (every spec and promise verified), ORIGINALITY (your knowledge added), RULES (nothing that narrows a customer\'s rights). A parcel passing through all four to publish.',
      },
    ),
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Used like this, AI turns the store\'s heaviest ongoing chore into a light one, so the catalogue stays complete, the content stays fresh, and the machine-readable, human-warming store this book describes stays fed without eating your weeks. That is the end of the working chapters. What remains is the reference, the plain meaning of every term, and a note on who to call.',
      ),
    ),
  ),
]

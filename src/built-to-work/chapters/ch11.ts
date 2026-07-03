import type { BtwPage } from '../types'
import { flow, opener, contents, p, section, closing } from '../helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'Using AI to run content faster',
    subtitle:
      'The slowest part of running a website just got quick. Here is how to use it without getting burned.',
  }),

  flow(
    ...p(
      'Much of keeping a website alive comes down to producing content, the articles, the page copy, the small pieces of text that make a site work and help it get found. It used to be slow. It no longer has to be. The same shift that runs through this whole book, capable AI making once-specialist work accessible, shows up here as plainly as anywhere. Used well, AI can take the heavy lifting out of writing, turning a blank page into a strong first draft in moments, while you stay firmly in charge of the result. This chapter shows you how to use it properly, gives you a set of ready-made prompts to copy and use, and, just as importantly, tells you what to check before anything it writes goes live.',
    ),
  ),

  flow(
    ...section(
      'THE METHOD',
      'Using AI properly',
      ...p(
        'The right way to think about AI is as a fast, tireless assistant, not a replacement for your judgement. It is excellent at producing a solid first draft quickly. It is not to be trusted to publish on its own, because it does not know your business the way you do, and it can sound generic or get things wrong if left unchecked.',
        'So the method is simple. You direct it clearly, telling it who you are, who you are writing for, and what you want, the more specific the better. It produces a draft in seconds. Then you read, correct, and shape that draft until it sounds like you and says what is true. This turns hours of writing into minutes of editing, which is a real gain, without handing a stranger the keys to your voice. The prompts that follow are written to give the AI exactly the direction it needs. Replace the parts in brackets with your own details, and the better your input, the better what comes back.',
      ),
    ),
  ),

  flow(
    ...section(
      'THE PROMPT PACK',
      'The starter prompt pack',
      ...p(
        'These are written to be copied and used as they are. Paste one into your AI tool, fill in the brackets with your details, and edit what comes back. Each is built on the principles in this book, plain language, marketing first, and a clear next step.',
      ),
    ),
    {
      type: 'promptCard',
      title: 'Homepage hero',
      body: `Write the hero section for the homepage of my business. We are [what you do] for [who you serve] in [your area]. The one thing that sets us apart is [your difference]. Write a short, confident headline, a single supporting sentence, and the text for one clear button. Plain language, no jargon, no hype. The reader should understand in seconds what we do and why to choose us. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Service page',
      body: `Write a service page for [the service]. My business is [what you do] for [who you serve]. Describe this service in terms of the problem the customer has and how we solve it, not in technical terms. Cover what it is, what the customer gets, and why we are a safe choice. Keep it clear and confident, lead with the benefit to them, and end with a clear next step to get in touch. Australian English, no jargon.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'About page',
      body: `Write an about page for my business. We are [who you are], we do [what you do] for [who you serve], and we started because [your reason or story]. The goal of this page is to build trust, so focus on who we are, what we believe about doing the work well, and why a customer can rely on us. Warm and genuine, not corporate. Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Blog article outline',
      body: `I want to write an article for my website that answers a question my customers often ask: [the question]. My business is [what you do] for [who you serve]. Give me a clear outline for a helpful, practical article that genuinely answers it. Open with a direct, one or two sentence answer to the question, then use plain headings and suggest what to cover under each. Keep it useful rather than salesy. The aim is to be the helpful expert.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Blog article draft',
      body: `Write a helpful article for my website based on this outline: [paste your outline]. My business is [what you do] for [who you serve], and the tone is [confident and plain / warm and friendly]. Answer the reader's question genuinely and usefully, in plain Australian English, with short paragraphs and clear headings. Put a direct answer near the top before you elaborate. Avoid hype and jargon. End with a light, natural invitation to get in touch if they would like help.`,
    },
    {
      type: 'promptCard',
      title: 'Page title and meta description',
      body: `Write a page title and a meta description for this page: [paste the page text or describe it]. The title should be clear, include what we do, and be short enough to display in full in search results. The description should be one or two plain sentences that make someone want to click, including what we offer and where. No keyword stuffing, just clear and appealing.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Image alt text',
      body: `Write short, plain alt text describing this image for accessibility and search: [describe the image]. Describe what is actually shown, factually and briefly, in one sentence. Do not start with "image of". Just describe the content clearly.`,
    },
    {
      type: 'promptCard',
      title: 'FAQ answers',
      body: `Write clear answers to these questions my customers ask: [list your questions]. My business is [what you do] for [who you serve]. Answer each one directly and honestly in two or three plain sentences, the way you would explain it to a customer. Lead with the answer, then add any short detail. Plain Australian English, no jargon.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Review reply',
      body: `Write a short, genuine reply to this customer review: [paste the review]. Reply in a warm, professional voice on behalf of [your business]. Thank them specifically for what they mentioned, keep it brief and human, and avoid sounding like a template. If the review is critical, respond calmly and constructively, acknowledge their experience, and offer to make it right, without being defensive.`,
    },
    {
      type: 'promptCard',
      title: 'Business profile post',
      body: `Write a short post for my business profile about [the news, offer, or update]. My business is [what you do] for [who you serve]. Keep it brief and friendly, get the point across in a few sentences, and end with a simple next step. Plain Australian English, no hype.`,
    },
  ),

  flow(
    {
      type: 'promptCard',
      title: 'Email to your list',
      body: `Write a short email to my customer list about [the topic, offer, or news]. My business is [what you do] for [who you serve], and the tone is [warm / professional]. Keep it brief and genuinely useful, write a clear subject line, lead with the point, and end with one clear action. Plain Australian English, no hard selling.`,
    },
    {
      type: 'promptCard',
      title: 'Turn an article into social posts',
      body: `Turn this article into [number] short social media posts: [paste the article]. My business is [what you do] for [who you serve]. Each post should make one useful point from the article in a few plain sentences, sound natural rather than promotional, and where it fits, point people to read the full piece on our site. Australian English.`,
    },
  ),

  flow(
    ...section(
      'BEFORE YOU PUBLISH',
      'What to check before you publish',
      ...p(
        'AI gives you a draft, not a finished piece, and the difference between the two is you. Before anything it produces goes onto your site or out to your customers, run it past four quick checks. They take a minute, and they are what keep AI a help rather than a liability.',
        'First, tone. Does it sound like you, or does it sound like a machine. Adjust the words until it reads the way your business actually speaks.',
        'Second, accuracy. Is everything it says true. This is the big one, because AI does not only get small things wrong, it can confidently invent things that are not true at all, a service you do not offer, a claim you cannot back, a detail it simply made up. So check every fact, figure, and claim before you stand behind it. This matters most in any field with rules around it. If your work touches health, finance, law, building, or anything regulated, a confident but false claim is not just embarrassing, it can create real legal liability, so anything in that territory must be checked by someone who knows the rules before it goes anywhere near the public.',
      ),
    ),
  ),

  flow(
    ...p(
      'Third, originality. Is it your own and genuinely useful, or is it bland filler that could belong to anyone. Add the specifics, the real detail, and the point of view that only you can bring.',
      'Fourth, anything that carries a rule beyond accuracy. If the text touches on people\'s privacy, or makes a promise or guarantee, make sure it is honest and within the rules before it goes live.',
      'Pass a draft through those four and you get the best of both, the speed of AI and the judgement of a person who knows the business. Skip them, and you risk publishing something generic, wrong, or worse, in your own name. The tool is fast. You are the editor. Keep it that way, and AI becomes one of the most useful tools you have.',
    ),
    {
      type: 'diagram',
      id: 'four-checks',
      caption: 'Four checks before you publish.',
    },
  ),

  flow(
    ...closing(
      'In short',
      ...p(
        'Used like this, AI takes the slowest part of running a website and makes it quick, so keeping your site alive and growing stops being a chore and starts being a habit you can actually keep. That brings us to the end of the working chapters. What follows is a reference to return to, the plain meaning of every term we have used, and a note on getting help when you want it.',
      ),
    ),
  ),
]

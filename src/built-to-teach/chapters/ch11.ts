import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'The prompt pack',
    subtitle: 'Ten copy-ready briefings for procedures, quizzes, podcasts, change packs, onboarding paths, and gap spotting.',
  }),
  flow(
    ...p(
      'The work of building a training system, turning captured knowledge into procedures, videos scripts, podcasts, quizzes, and change explanations, runs on words, and these are the briefings that produce them fast. Each is built to be copied, filled with your specifics, and edited, because the rule of this whole series holds here too: the tool drafts, a person checks it, and nothing becomes official training until someone who knows the work has confirmed it is right. That last point matters more here than almost anywhere, because wrong training teaches wrong confidently, so the human check on anything these prompts produce is not optional. Fill the brackets with your real captured knowledge, and shape what comes back.',
    ),
    {
      type: 'promptCard',
      title: 'Recording or transcript into a written procedure',
      body: `Turn this recording transcript of someone explaining a task into a clean, step-by-step written procedure: [paste transcript]. The task is [what it is], done by [role]. Write it as clear, numbered steps in plain Australian English, keeping the expert's actual method including any tips or warnings they mentioned. Mark anything unclear or missing with [CHECK] rather than guessing. No jargon, no exclamation marks, no em dashes.`,
    },
    {
      type: 'promptCard',
      title: 'Procedure into a quiz',
      body: `Create a short quiz to confirm someone has understood this procedure: [paste procedure]. Give me [number] clear questions that check genuine understanding of the important and easy-to-get-wrong parts, not trivia. Make it a confirmation that the knowledge landed, not a trick test. Include the correct answers separately. Plain Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Procedure into a podcast script',
      body: `Turn this procedure or knowledge into a short, natural podcast-style script explaining it: [paste content]. The audience is [who], listening away from a screen, so focus on the why and the context and the how in a conversational way, not a list of steps to follow along. Warm, clear, in a professional but human tone. Australian English, no exclamation marks. Aim for roughly [length].`,
    },
    {
      type: 'promptCard',
      title: 'Change announcement pack',
      body: `We are changing [what is changing] because [the reason]. It affects [who], and the main thing they need to do differently is [the change]. Create a change announcement pack: a short written note explaining what is changing and why, a two-minute video script covering the same, and an outline for a short podcast episode on the context. Lead with the why, be honest about what will feel harder at first, and reassure people about the support available. Australian English, warm, direct, no exclamation marks.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Onboarding path from a role',
      body: `Design an onboarding path for a new [role] in my business, which is [what you do] for [who you serve]. Break it into a sensible sequence of short learning steps, from what they need on day one to full independence, one skill at a time in a logical order. For each step, suggest the best format (written procedure, screen video, podcast, in-person, agent questions) and note where a quiz should confirm understanding. Do not firehose it. Plain Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'FAQ from real questions',
      body: `Here are questions my team actually asks about [topic or area]: [paste the questions]. Write clear, accurate answers for each, in plain Australian English, based on this knowledge: [paste the relevant captured knowledge]. Answer each directly and practically, the way an experienced person would explain it. Where a question needs information I have not given you, mark it [NEED INFO] rather than inventing an answer.`,
    },
    {
      type: 'promptCard',
      title: 'One-page visual brief from a process',
      body: `Here is a process in my business: [describe or paste the process]. Design a clear one-page visual summary of it that someone could glance at and understand, or pin up as a reference. Describe the layout, what each part shows, and how the steps or elements connect, so a designer or design tool can build it. Keep it simple and scannable, in a clean professional style [add brand colours if relevant].`,
    },
    {
      type: 'promptCard',
      title: 'Knowledge base structure',
      body: `I am building a single source of truth for how my business works. My business is [what you do], and the main areas of knowledge are roughly: [list the areas]. Suggest a clear, logical structure for organising this knowledge so people can actually find things, with sensible categories and a sense of what belongs where. Keep it simple enough that a busy team will actually use it. Explain your reasoning briefly.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Simplify an expert\'s explanation',
      body: `An experienced team member explained something in a way that is accurate but hard for a new person to follow: [paste explanation]. Rewrite it so a capable new starter could understand it, keeping every important detail and the expert's actual method, but removing assumed knowledge and unclear shorthand. Where the explanation assumes something a beginner would not know, spell it out. Plain Australian English.`,
    },
    {
      type: 'promptCard',
      title: 'Spot the gaps in a knowledge base',
      body: `Here is what my training currently covers for [role or area]: [list or paste what exists]. Based on what someone in this role actually needs to know to do the job well, tell me what is likely missing, what questions a new person would probably still have, and what the highest-priority gaps are to fill first. Be practical and specific to this kind of work.`,
    },
    ...section(
      'FOUR CHECKS',
      'The checks before it becomes official training',
      ...p('Four, in this book\'s terms, run before anything these prompts produce becomes training the team relies on. Accurate: is every step, fact, and instruction correct, confirmed by someone who actually knows the work, because wrong training is worse than none. Current: does it reflect how the business does things now, not how it used to, because stale training teaches confidently wrong. Clear: could the actual person it is for follow it without the expert present, which is the whole test of whether it works. And confirmed to land: has it been checked on a real person, or at least paired with a quiz, so you know it teaches rather than just exists. Pass those four and the tools become what they should be here, the fastest way ever to turn one expert\'s knowledge into training the whole team can use, with a human guaranteeing it is right. The making is fast now. The accuracy is still yours to confirm, and in training, accuracy is everything.'),
      {
        type: 'diagram',
        id: 'bte-ch11-four-checks',
        caption: 'The four checks. ACCURATE: confirmed by someone who knows the work. CURRENT: how the business does it now. CLEAR: the actual person could follow it without the expert. CONFIRMED TO LAND: checked on a real person or paired with a quiz. A piece passing through all four to official training. Wrong training teaches wrong confidently. Accuracy is everything.',
      },
    ),
  ),
]

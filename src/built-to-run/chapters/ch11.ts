import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'Using AI to build automations faster',
    subtitle: 'The skill is shifting from configuring to describing.',
  }),
  flow(
    ...p(
      'The quiet revolution inside the revolution: AI has not only earned steps inside your workflows, it has become the fastest way to design, diagnose and document the workflows themselves. The skill of automation is shifting from configuring to describing, and the better you can say what should happen, precisely, with its failure paths and edge cases, the faster anything gets built, whether the builder is a platform\'s AI assistant, a partner like us, or you on a Sunday afternoon. This chapter is the describing craft, packed into prompts.',
    ),
    ...section(
      'THE METHOD',
      'The method',
      ...p('Same series discipline, applied to building: the AI drafts the design, the human owns the decisions, and nothing goes live untested regardless of who or what built it. Chapter seven\'s testing doctrine does not care whether a workflow was hand-built or AI-suggested, and neither should you. Feed the prompts real specifics, your actual systems, your actual steps, your actual edge cases, because a vague brief returns a plausible-looking workflow with your real world missing from it, and plausible-looking is the most dangerous state a workflow can be in.'),
      {
        type: 'diagram',
        id: 'btr-ch11-describing-builds',
        caption: 'Describing is the new building. A precise specification at the centre, three builder-arrows out: platform AI assistant, partner, you on a Sunday. The better the description, the faster anything gets built.',
      },
    ),
  ),
  flow(
    ...section(
      'PROMPT PACK',
      'The automation prompt pack',
      ...p('Copy, fill the brackets, and treat everything that returns as a draft for judgment.'),
    ),
    {
      type: 'promptCard',
      title: 'Describe a workflow properly',
      body: `Help me write a precise specification for an automation. The job in one sentence: [what it should do]. The trigger: [what starts it]. The systems involved: [your actual tools]. The steps as I imagine them: [rough list]. Now ask me the questions a careful builder would ask, especially about edge cases, duplicates, failures, and what a human should approve versus what can run alone. Then write the full specification in plain language.`,
    },
    {
      type: 'promptCard',
      title: 'Design the failure path',
      body: `Here is an automation: [paste the specification or describe the flow]. For each step, tell me what could realistically fail, what should happen when it does (stop, retry, park, alert), and who should be told. Flag any step where a failure would be silent, and suggest how to make it loud. Plain language, practical, no padding.`,
    },
    {
      type: 'promptCard',
      title: 'Find my quick wins',
      body: `Here is a list of repetitive tasks from my week: [paste your chapter-four audit list]. My systems: [your actual tools]. Rank these as automation candidates: which are quick wins (simple, high relief), which are deeper builds, and which should stay human. For each quick win, sketch the trigger, steps and gate in three lines. Be honest about anything that is not worth automating.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Draft the messages a flow will send',
      body: `Write the messages for an automated sequence: [what the sequence is, e.g. invoice reminders / quote follow-up]. Voice: warm, direct, professional, Australian English, no exclamation marks, no pressure tactics. Facts to use and never exceed: [the real details]. Give me each message in order with its timing, and keep every touch worth receiving on its own.`,
    },
    {
      type: 'promptCard',
      title: 'Diagnose an error',
      body: `An automation failed with this error: [paste the exact error text]. The workflow: [what it does, which systems]. It last worked: [when], and what changed recently: [anything you know]. Explain the likely cause in plain language, give me the checks in order of probability, and tell me what NOT to do (like re-running blind if it might double-send).`,
    },
    {
      type: 'promptCard',
      title: 'Document an existing workflow',
      body: `Write plain-English documentation for this automation: [paste the workflow export or describe every step]. Give me: one line saying what it does and why it exists, the trigger, the steps in order, the systems and credentials it touches, what happens on failure, and anything a future person should know before changing it. Short enough to actually be read.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Review before go-live',
      body: `Here is an automation about to go live: [paste the specification]. Review it like a sceptical engineer: what happens on a double trigger, on malformed input, on a busy day with ten times the volume, when a credential expires, and when the receiving system is down? Does anything customer-facing lack a human gate? List the gaps in order of risk.`,
    },
    {
      type: 'promptCard',
      title: 'Decide rule versus AI',
      body: `For this step in a workflow: [describe the step], tell me honestly whether it needs an AI step or whether a plain rule can do it. If a rule can, sketch the rule. If AI genuinely earns its place, say which kind of task it is (classify, extract, summarise, draft, research), what model size the job needs, and what the human check should be.`,
    },
    {
      type: 'promptCard',
      title: 'Plan the platform crossover',
      body: `My automations currently run [number] tasks a month on a per-task platform costing roughly [what you pay], growing about [rate]. Talk me through the crossover economics to a flat-cost self-hosted setup honestly: what the migration involves, what new responsibilities self-hosting brings, and the signals that say move now versus wait.`,
    },
  ),
  flow(
    {
      type: 'promptCard',
      title: 'Introduce an automation to the team',
      body: `Write a short, warm message introducing a new automation to my team. What it does: [the job]. What it takes off their plate: [the relief]. What they still own: [the human parts]. Who to tell if it looks wrong: [the person]. Tone: this is help we built for you, not surveillance. Australian English, brief.`,
    },
    ...section(
      'BEFORE GO-LIVE',
      'The checks before anything goes live',
      ...p('Four, tuned for this book. Specification: does the written flow match what you actually meant, edge cases included, because AI fills gaps with plausible guesses and plausible is not yours. Failure path: every step has one, every silence has an alarm, chapter three\'s test applied to the draft. Gates: everything customer-facing or irreversible drafts rather than sends, chapter six\'s doctrine surviving the excitement of a new build. And truth: any message a flow will send contains only facts you supplied, checked once more at the end, because the words go out under your name at machine scale, which multiplies care, not replaces it.'),
      ...p('Pass those and the building itself joins everything else this book has automated: faster, cheaper, and still, at every gate that matters, yours. The machine drafts the machine. You remain the judgment. That has been the deal on every page, and it holds here too.'),
      {
        type: 'diagram',
        id: 'btr-ch11-four-checks',
        caption: 'The four checks before go-live. SPECIFICATION, FAILURE PATH, GATES, TRUTH. A workflow passing all four to live.',
      },
    ),
  ),
]

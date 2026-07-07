import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch10Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 10,
    title: 'Growing it over time',
    subtitle: 'One proven rung at a time while the hype cycle churns past.',
  }),
  flow(
    ...p(
      'AI is the fastest-moving technology a business owner has ever had to make purchasing decisions about, and the churn is precisely why the growth discipline matters: a business that chases every launch adopts nothing deeply, and a business that waits for the dust to settle waits forever, because the dust is the weather now. This chapter is the composed middle: the ladder, the rhythm, and the posture that lets you ignore most of the noise with confidence.',
    ),
    ...section(
      'LADDER',
      'The ladder',
      ...p('Adoption climbs in a proven order, each rung cheaper to learn and lower-stakes than the next, each building the skills and the assets the next one needs.'),
      ...p('Notes and summaries first, chapter five\'s easiest win: the meeting note-taker, the call summary, the document digest. Lowest risk in the book, felt in the first week, and it quietly builds the habit every later rung requires, the ten-second human skim. Drafting second: the proposals, the follow-ups, the articles, with the briefing skills of chapter six and the prompt library growing as you go, one proven prompt at a time. Classification third, the first unattended thinking: the inbox that sorts itself, the enquiries that route, low-stakes wiring that teaches the automation disciplines on work where errors are cheap. The chat agent fourth, and only once its real prerequisite exists, because chapter eight was unambiguous: knowledge first, agent second, and the knowledge work is the project. Voice fifth, the same agent with higher stakes and a live audience, earned by the chat agent\'s proven record. And connected AI last, chapter nine\'s sockets and thinking steps, the layer with the meters and the keys, adopted when specific tasks have passed the anatomy, proven themselves manually, and now recur at wiring volume.'),
      ...p('The ladder\'s logic is not caution for its own sake. Each rung generates the asset the next rung consumes: the skim habit, the prompt library, the automation disciplines, the knowledge base, the measured track record. Skipping rungs is how businesses arrive at agents with no knowledge and wiring with no gates, which is to say, how the chapter-one statistics get made.'),
      {
        type: 'diagram',
        id: 'btt-ch10-ladder',
        caption: 'The ladder. 1 NOTES & SUMMARIES, 2 DRAFTING, 3 CLASSIFICATION, 4 CHAT AGENT, 5 VOICE, 6 CONNECTED AI. Each rung builds the asset the next consumes. Skipping rungs is how the chapter-one statistics get made.',
      },
    ),
  ),
  flow(
    ...section(
      'MEASURING',
      'Measuring at every rung',
      ...p('The climb is governed by chapter six\'s habit, applied as a gate between rungs: the current rung earns the next one by measuring well. Costs roughly known, savings roughly honest, errors logged and shrinking, and the switch-off test passed, we would genuinely notice its absence. A rung that cannot pass does not condemn AI; it flags a fit problem, a briefing problem, or a knowledge problem, each fixable, and each far cheaper to fix at the current rung than to carry up the ladder. The discipline sounds slow and is the opposite: businesses that measure climb faster, because every step is load-bearing and nothing has to be climbed twice.'),
      {
        type: 'diagram',
        id: 'btt-ch10-rung-gate',
        caption: 'The gate between rungs. Pass conditions: costs known, savings honest, errors shrinking, we would notice its absence. Failed stamp routes sideways to fix fit, briefing, or knowledge here, where it is cheap.',
      },
    ),
    ...section(
      'POSTURE',
      'Ignoring the launch of the week',
      ...p('Now the posture, because the industry will spend the next decade announcing revolutions at you, and a level head is worth money. The composed rules: capabilities are adopted when they are dependable, not when they are demonstrated, and the gap between those is where early adopters pay tuition on your behalf, gratefully accepted. The principles in this book, the fit test, the sizing, the gates, the meters, are deliberately model-agnostic: when a genuinely better model arrives, and they keep arriving, everything here applies to it unchanged, usually within a day, because swapping a well-gated model is a config change, which means you lose nothing by composure and gain every improvement on schedule. And the question for any shiny thing remains the boring one: which task, on which rung, does this do better, cheaper, or safer than what measured well last month? A real answer earns a trial at the appropriate rung. No answer is itself the answer.'),
      {
        type: 'diagram',
        id: 'btt-ch10-launch-week',
        caption: 'The launch of the week. Shiny launches stream past a calm business holding one question: which task, on which rung, does this do better, cheaper, or safer than what measured well last month? Composure costs nothing.',
      },
    ),
  ),
  flow(
    ...section(
      'HUMANS',
      'The humans, as the capability grows',
      ...p('Last, the thread this series never drops, because the ladder\'s ceiling is human. Each rung is introduced to the team the way our automation book requires, before it ships, framed as the relief it is. The prompt library and the knowledge base get owners and rhythms, because unowned assets rot into next year\'s confident misinformation. Training climbs with the tools, our training book\'s whole system pointed at this exact moment, the fastest-changing skill set in the building. And the decisions stay human, permanently, not as a transitional caution but as the design: the machine\'s territory grows, the gates move outward with evidence, and accountability never delegates, because that was the deal on page one and it is the deal at scale.'),
      ...p('Climbed this way, rung by measured rung, a business arrives somewhere the hype-chasers never do: AI woven through the week, paying at every point of contact, understood by the people using it, and boring, which is, as everywhere in this series, the highest state infrastructure can achieve. What remains is the toolkit, the prompts that run the daily craft, and the plain-words glossary, and then the honest invitation.'),
    ),
  ),
]

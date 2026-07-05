import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch08Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 8,
    title: 'Lead tracking: knowing where every job came from',
    subtitle: 'Which marketing actually turns into paid work.',
  }),
  flow(
    ...p(
      'Half of most marketing budgets is wasted; the trouble is knowing which half. That old joke survives because most businesses genuinely cannot answer the only question that matters about their marketing: which of it actually turns into paid work? Not clicks, not likes, work. Lead tracking is the discipline that answers it, the CRM is where the answer lives, and this chapter is how to build it honestly, including the part most guides skip: where tracking ends and judgment begins.',
    ),
    ...section(
      'THE QUESTION',
      'The question, stated properly',
      ...p('Notice the question is not which marketing brings leads, it is which brings work. The difference is everything. A channel can flood you with enquiries that never buy, another can send three leads a month who all close at premium prices. Judged on volume, the first looks better; judged on won revenue, the truth reverses. This is why lead tracking must live in the CRM rather than in the marketing tools: only the CRM sees the whole journey, from source to enquiry to quote to won or lost, and can therefore connect where they came from to what they were worth. The tools that only see the click will always flatter the click.'),
      {
        type: 'diagram',
        id: 'btc-ch08-leads-or-work',
        caption: 'Leads, or work. CHANNEL A: many leads, few won. CHANNEL B: three leads, all won, larger value. Only the CRM sees the whole journey.',
      },
    ),
  ),
  flow(
    ...section(
      'AT BIRTH',
      'Source, captured at the moment of birth',
      ...p('The mechanics start where chapter four planted the flag: every contact carries its source, tagged the moment it is captured, automatically wherever wiring allows. The website form stamps the lead with the page and the campaign that brought it. The phone gets the same treatment through call tracking, different numbers shown to different channels, so the call from the website and the call from the profile listing stop being indistinguishable, and the phone, which for many businesses is the biggest channel of all, finally enters the ledger. Referrals and walk-ins get asked, kindly, and logged, one question at intake that pays for itself all year.'),
      ...p('For the digital sources, the labelling that makes precision possible is a small convention called UTMs: tags added to the links you put out in the world, this link is from the newsletter, this from the profile, this from the spring campaign, so that when someone arrives, the source arrives with them. You do not need to master the syntax, you need the convention applied consistently to every link the business publishes, which is a one-page standard and a habit.'),
      {
        type: 'diagram',
        id: 'btc-ch08-source-birth',
        caption: 'Source, captured at birth. Website form, phone with call tracking, referral logged, social with UTM on every link. Memory-based source data is fiction by Friday.',
      },
    ),
  ),
  flow(
    ...section(
      'READING IT',
      'Reading it: first touch, last touch, and honesty',
      ...p('Now the part where most tracking goes quietly wrong. A customer\'s path is rarely one step: they saw the social post, later searched your name, read three pages, and enquired through the website form. So what was the source, the post that started it or the search that finished it? First touch credits the introduction; last touch credits the closer; and every neat report you will ever see silently picks one and hides the choice.'),
      ...p('The honest posture: know that both exist, record what you can, and read attribution as evidence, not gospel. In practice, for a growing business, the workable rule is to log the first known source on the contact and let the deal record the path in its notes, then judge channels over quarters, not weeks, on won revenue. Precision beyond that is mostly theatre at this scale, and the pursuit of it costs more than the wrong answers it prevents.'),
      ...realPicture({
        title: 'Attribution and the dark funnel',
        paragraphs: [
          'It is worth saying plainly what the analytics industry rarely does: attribution is messier than any dashboard pretends, and the mess is structural, not a tooling gap you can buy your way out of.',
          'Part of the journey is simply invisible. The recommendation over coffee, the mention in a group chat, the person who saw your signage, remembered the name, and searched it a week later, none of it leaves a tag. Marketers call this the dark funnel, and for a reputation-driven business it is often the biggest channel there is, systematically credited to whatever visible step came last, usually the search, which then looks miraculous while the word of mouth that caused it looks like nothing. Meanwhile privacy rules and blocked trackers erase more of the visible trail every year, and the AI-assistant shift from this series\' other books moves whole decisions somewhere no analytics can follow: a machine may weigh you against three competitors and recommend you, and all your systems will ever record is a warm lead who seems to have appeared from nowhere.',
          'The composed response is not to abandon tracking, it is to size your confidence honestly. Tag everything that can be tagged, ask everyone who can be asked, and then treat the numbers as strong evidence about the visible channels and weak evidence about the whole. When the data says a channel produces nothing, believe it enough to investigate, not enough to execute, because word of mouth dies quietly when the visible marketing that seeds it gets cut on a dashboard\'s say-so. The businesses that get burned are not the ones with imperfect data, everyone has imperfect data; they are the ones who mistook the ledger for the territory.',
        ],
      }),
      {
        type: 'diagram',
        id: 'btc-ch08-dark-funnel',
        caption: 'The journey and the dark funnel. Dashed unmeasurable steps, solid tagged final step wearing gets all the credit. Evidence, not gospel.',
      },
    ),
  ),
  flow(
    ...section(
      'WHAT TO DO',
      'What to actually do with it',
      ...p('Tracking earns nothing until it moves money, so the loop closes in a standing quarterly decision: leads, won deals and won revenue by source, read side by side, and the budget and effort shifted toward what demonstrably pays. The patterns that emerge are almost always more useful than the totals: the channel that brings many leads that rarely close, a message-to-market mismatch worth fixing before worth cutting; the source whose leads close big but slowly; the referrals quietly outperforming everything, which is not a coincidence but an instruction, build the review-and-referral machinery harder. And one number worth knowing per channel even roughly: what a won customer costs from each source, because it turns the eternal should we spend more on this from a feeling into arithmetic.'),
      ...p('That is the whole discipline: capture at birth, read with honesty, decide quarterly. The machine that makes it effortless, the wiring that moves every lead, message and dollar between systems without human ferrying, is the next chapter, where the CRM takes its place at the centre of the business.'),
    ),
  ),
]

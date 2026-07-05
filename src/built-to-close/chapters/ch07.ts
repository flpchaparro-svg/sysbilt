import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch07Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 7,
    title: 'Following up without burning people',
    subtitle: 'Rails can carry warmth or spam with equal efficiency.',
  }),
  flow(
    ...p(
      'Follow-up is where this book either pays or backfires. Done well, it is the most profitable habit in business: deals that would have died in silence get carried to an answer, and clients feel looked after rather than chased. Done badly, it torches the very asset it was meant to grow, because nothing teaches a market to ignore you faster than being pestered. This chapter is the craft: the cadence, the content, the stopping, the law, and the machinery underneath your messages that most businesses discover only after they have broken it.',
    ),
    ...section(
      'PERSISTENT OR PEST',
      'Persistent, or pest',
      ...p('The line between the two is not frequency. It is value. A pest\'s message asks for something and offers nothing: just checking in, just following up, any thoughts. Each one says, in effect, do my admin for me. A persistent professional\'s message gives before it asks: the answer to a doubt, a useful detail, a relevant example, a genuine deadline, and then makes the next step easy. Same cadence, opposite experience, because one is pressure and the other is service.'),
      ...p('So the standing rule for every sequence written in this system: every touch carries something. If a message cannot offer anything, information, help, ease, honesty, it is not ready to send, and just checking in is banned from the building. This single rule is most of the craft; everything else is timing.'),
      {
        type: 'diagram',
        id: 'btc-ch07-persistent-pest',
        caption: 'Persistent, or pest. LEFT: just checking in, asks, offers nothing. RIGHT: the doubt answered, gives before it asks. Same cadence. Opposite experience.',
      },
    ),
  ),
  flow(
    ...section(
      'CADENCE',
      'Cadence: the shape of a follow-up',
      ...p('The rhythm that works is front-loaded and decaying. Interest is hottest at the start, so the early touches come quicker, and each one after breathes longer. For a quote, the shape looks like: the send, a touch a few days later confirming it landed and inviting questions, another the next week answering the likeliest doubt, a third a week or two on with a gentle nudge on timing, and then a graceful close. Five to seven touches over the arc, mixed across channels, the email, the call, the message, because people live on different ones, and a call after two unanswered emails often lands as refreshing rather than pushy when it comes with warmth.'),
      ...p('The precise numbers matter less than the shape and the honesty: a rhythm you would be comfortable receiving, from a business you respected, about something you had actually asked for. That last clause matters, these people enquired. Following up on an invited conversation is not intrusion, it is finishing what they started, and most silence is not rejection, it is busyness, which is exactly why the deal that gets a sixth touch closes surprisingly often.'),
      {
        type: 'diagram',
        id: 'btc-ch07-followup-shape',
        caption: 'The shape of a follow-up. Front-loaded, decaying rhythm, mixed channels, ending in a graceful close. Every touch worth receiving.',
      },
    ),
  ),
  flow(
    ...section(
      'GRACEFUL CLOSE',
      'The graceful close',
      ...p('Every sequence ends, and the ending is a tool, not a defeat. The close-out message says, kindly and plainly: we will stop chasing, the door stays open, here is how to reach us when the timing is right. It works twice over. It earns replies, the honesty of it regularly shakes loose a decision that pressure never would, and it protects the relationship, because the person who went quiet in April may be ready in October, and how you stopped is what they will remember. The closed deal goes to lost with its reason, the contact stays warm on the long-cycle list, and chapter five\'s win-back machinery takes it from there. Stopping well is a skill, and businesses that master it get to follow up harder in the middle, because the exit is guaranteed to be graceful.'),
    ),
  ),
  flow(
    ...section(
      'THE LAW',
      'The law, plainly',
      ...p('Australian law draws the same line this chapter does, and it is worth knowing where it sits. Commercial electronic messages, email and SMS both, require three things: consent to receive them, express or reasonably inferred from an existing relationship such as an enquiry or a purchase, clear identification of who is sending, and a working unsubscribe honoured promptly. A person who enquired about your service can reasonably expect follow-up about that enquiry; the same person harvested onto a bulk promotional list is a different matter entirely. Respect the line, make leaving easy, and never message anyone who has asked you to stop. The rules are not the obstacle to good follow-up, they are a description of it, and the lawyer\'s read over your final templates is, as always, cheap insurance.'),
      ...realPicture({
        title: 'Sender reputation',
        paragraphs: [
          'Underneath every email your business sends sits a reputation you cannot see, and it decides whether your messages reach inboxes at all. It is worth understanding plainly, because it is the machinery most businesses only learn about after they have broken it.',
          'Every domain that sends email carries a sender reputation, scored continuously by the systems that receive mail, from how many of your messages get opened, ignored, deleted unread, and above all marked as spam. High reputation, and your follow-ups land in inboxes. Damaged, and they slide to junk folders, silently, with no error message and no notice, your sequences still show sent, the system looks healthy, and nothing arrives. A business can pester its way into invisibility in a single bad campaign and spend months earning the way back.',
          'This is the engineering reason behind this chapter\'s craft rules, not just the courtesy ones. Blasting an old, unsegmented list feels free and is the single most expensive thing you can do with email, because every recipient who shrugs and taps spam is casting a vote against every message you will ever send to anyone. Relevance, chapter five\'s segmentation, is deliverability strategy. So is list hygiene: dead addresses that bounce tell the receiving systems you do not know your own audience, which is why the win-back flow removes the truly gone rather than mailing them forever.',
          'Underneath sit the technical proofs from this series\' first book, the settings that verify your messages genuinely come from you, and the practical disciplines: a new sending setup warms up gradually rather than going from zero to a thousand overnight, volume stays consistent rather than spiking, and the one metric worth a monthly glance is complaints, because spam-button clicks are the reputation killer, and they are almost always earned by irrelevance.',
          'None of this is here to make email frightening. It is here to explain why the whole chapter points one direction: follow-up that people find valuable is also, mechanically, follow-up that keeps arriving. The craft and the plumbing agree. Send things worth receiving, to people who expect them, and the machinery stays yours.',
        ],
      }),
      {
        type: 'diagram',
        id: 'btc-ch07-reputation',
        caption: 'The reputation you cannot see. HIGH sender reputation: your messages arrive. DAMAGED: sent, but nobody sees, no error shown.',
      },
    ),
  ),
  flow(
    ...section(
      'RE-ENGAGEMENT',
      'Re-engagement, done respectfully',
      ...p('Last, the quiet leads and lapsed clients, the third leak\'s population. The re-engagement touch works when it leads with the relationship, not the ask: the check-in that references the actual history, the piece of genuinely useful news, the honest question about how things landed. It fails as a disguised sales blast, and recipients can tell in one line which it is. Rhythm honest to the relationship, once or twice a year for a past client, not monthly, every touch worth receiving on its own, and the list refreshed by chapter four\'s hygiene so you are never warmly writing to someone who moved on two jobs ago.'),
      ...p('Follow-up, done this way, stops being the awkward chore owners avoid and becomes the calmest revenue in the business: invited conversations, finished properly, at scale. The next chapter turns to the other half of lead intelligence, knowing where the work comes from, so the machine does not just close what arrives but tells you where to find more of it.'),
    ),
  ),
]

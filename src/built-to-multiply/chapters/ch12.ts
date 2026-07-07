import type { BtwPage } from '../types'
import { flow, glossary, opener, p, section } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings, plus who to talk to when you are ready.',
  }),
  flow(
    ...p(
      'The last chapter is a reference rather than a read: the plain meaning of the terms this world uses, and the honest note on what comes next.',
    ),
    ...glossary(
      {
        title: 'A plain-English glossary',
        intro: 'The terms worth knowing plainly, so you are never left nodding along to something you do not follow.',
      },
      [
        {
          term: 'Asset library',
          definition: 'Your kept, organised collection of reusable content parts: images, clips, graphics, templates, in your brand look. What makes production faster over time instead of always starting from zero.',
        },
        {
          term: 'Awareness',
          definition: 'The job of getting in front of people who do not yet know you exist. Measured by reach and how well content holds attention, not by enquiries.',
        },
        {
          term: 'Comment-to-DM',
          definition: 'Automation that turns a comment on your post into a direct message and a captured lead. The pipe from public attention to owned ground.',
        },
        {
          term: 'Consideration',
          definition: 'The job of helping people who know you decide whether you are any good. Measured by trust signals: saves, shares, meaningful engagement, follows that lead somewhere.',
        },
        {
          term: 'Content calendar',
          definition: 'The plan of what goes out where and when, filled in a session and published on a schedule. What makes consistency a system rather than a scramble.',
        },
        {
          term: 'Hook',
          definition: 'The opening line or first frame that stops the scroll. The most important part of any piece, because nothing after it is seen if it fails.',
        },
        {
          term: 'Impressions',
          definition: 'How many times content was shown. A raw number that flatters easily; less useful than whether the content actually held or moved anyone.',
        },
        {
          term: 'Lead capture',
          definition: 'The job of turning warm interest into a name, an enquiry, a booking. Measured only by the step taken: clicks, captures, enquiries.',
        },
        {
          term: 'Reach',
          definition: 'How many individual people saw the content. Useful for the awareness job, but on its own says nothing about whether they cared.',
        },
        {
          term: 'Repurposing',
          definition: 'Turning one source piece into many pieces across channels, by reshaping rather than rewriting. The multiplier at the heart of the system.',
        },
        {
          term: 'Saves and shares',
          definition: 'The strong engagement signals the platforms now reward, because a save is a decision and a share is an endorsement, where a like is a reflex.',
        },
        {
          term: 'Source piece',
          definition: 'The one considered piece, made on ground you own, that the many pieces grow from. Make the good thing once, then multiply it.',
        },
        {
          term: 'Variation',
          definition: 'One of several versions of the same idea, put out to see which the audience responds to. The unit of content now, because one post is a guess and many is an experiment.',
        },
        {
          term: 'Vanity metric',
          definition: 'A number that goes up and feels good but changes nothing about the business, like follower count or likes on their own. The trap that feels like success while paying nothing.',
        },
      ],
    ),
  ),
  flow(
    ...section(
      'NEXT STEP',
      'Who to call, and ongoing support',
      ...p('A content system is never finished, because the platforms keep changing, the tools keep improving, and the system underneath, the strategy, the source, the library, the wiring, the trained team, stays exactly as good as it is kept. The businesses getting compound value from content have someone who knows their particular system standing behind it: keeping the strategy honest, the production fast, the brand consistent, the wiring flowing, and the whole thing pointed at real business rather than applause.'),
      ...p('So here is the honest invitation. You have just read what a content system that actually earns looks like: a reason behind every piece, one voice multiplied across every channel, a production line that turns one idea into many without burning anyone out, a standard that keeps it premium in a feed full of cheap machine content, numbers that measure what pays, and wiring that carries the attention home to the ground you own. If, reading it, you saw your own content as the flood from chapter one, effort spilling out and earning applause instead of business, or you decided that building and running this properly is not how you want to spend your time, then it is worth a conversation.'),
      ...p('The place to start is a Content Systems Review. It is a straight, no-obligation look at how your business currently makes and uses content, measured against everything this book describes: whether there is a strategy behind it, whether it is consistent, whether it is measured, whether it is wired to bring you leads or just likes, and what we would build first. There is no pitch and no pressure in it. Either way, you come away with a clear, honest picture of whether your content is a system or a flood, and what it would take to make it earn.'),
      ...p('If that would be useful, request your review at sysbilt.com. Fill in the form and we will get back to you, and you will also receive an audit of your business, a clear read on where you stand right now and where the biggest gains are. Tell us you read this, and we will show you the system from these pages working, the source multiplied, the pieces measured, the comment turned into a lead, so you can see exactly how it turns attention into business before you decide anything at all.'),
      ...p('Because the businesses that win with content are not the ones making the most of it. They are the ones running a system, while everyone else makes a flood. When you are ready for the system, we are ready to build it with you.'),
    ),
  ),
]

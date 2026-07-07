import type { BtwPage } from '../types'
import { flow, opener, p, realPicture, section } from '../../built-to-work/helpers'

export const ch09Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 9,
    title: 'Content as part of the system',
    subtitle: 'The wiring that turns a piece of content into a lead in your business.',
  }),
  flow(
    ...p(
      'Every book in this series has a chapter where the thing stops being a standalone tool and becomes part of one connected machine, and for content that chapter is this one, because content that is not connected to the rest of your business is the fire in the empty room from chapter one, warmth that reaches nothing. This chapter is the wiring: how a piece of content becomes a visitor, becomes a lead, becomes a name your business can act on, and how the whole system points its earned attention at the ground you own.',
    ),
    ...section(
      'POINTS HOME',
      'Content points home',
      ...p('The principle that runs through this whole series applies most sharply here. Content earns attention on rented ground, the platforms, and that attention is worthless until it is carried to ground you own, your website, your list, your CRM. So every piece of content, whatever its job, exists within a system whose direction is always the same: attention flows from the platform, to your owned ground, into your business.'),
      ...p('The path is a chain, and each link is built elsewhere in this series. The content earns the attention. The link, in the bio, in the caption, in the comment, offers the road home. The landing page or the site, from our website book, receives the person and gives them a reason to act. The capture, the form or the offer, turns them into a contact. The CRM, from our follow-up book, remembers them. And the follow-up carries them toward becoming a client. Content is the top of that chain, and a business that makes content without building the rest of the chain is making the top of a machine with nothing underneath, which is why so much content earns nothing: not because the content was bad, but because there was nowhere for the attention to go.'),
      {
        type: 'diagram',
        id: 'btm-ch09-content-points-home',
        caption: 'Content points home. CONTENT earns attention on rented ground → LINK offers the road home → SITE converts → CAPTURE makes a contact → CRM remembers → FOLLOW-UP wins. Content is the top of the machine. Build the whole chain.',
      },
    ),
    ...section(
      'COMMENT TO LEAD',
      'Comment to lead, automatically',
      ...p('Here is the most direct version of the wiring, the one that turns a public post into a private lead without anyone lifting a finger, and it is the bridge between this book and the automation this series builds. Someone comments on your post, a keyword, an interest, a question. The system notices, and automatically sends that person a direct message, the promised link, the guide, the next step, and captures them as a contact, tagged with the post they came from, so a moment of public attention becomes a named lead in your system while you were doing something else.'),
      ...p('This is content and automation working as one, and it solves chapter one\'s core problem mechanically. The attention that content earns no longer evaporates, it is caught, the instant it appears, and carried into the business. The person who would have scrolled past your enquiry form happily comments a keyword, and the system turns that comment into a conversation on ground you own. Built once, it runs on every post, turning your content from something that earns applause into something that earns leads, which is the entire point of making it.'),
      {
        type: 'diagram',
        id: 'btm-ch09-comment-to-lead',
        caption: 'Comment to lead, automatically. Someone comments a keyword → system notices → automatic DM sends promised link → person lands as a tagged contact in the CRM. A moment of public attention becomes a named lead while you were doing something else.',
      },
    ),
  ),
  flow(
    ...section(
      'CRM SIDE',
      'What matters on the CRM side',
      ...p('For the wiring to pay, the business has to know which content actually produced which lead, and this is where content meets the memory of the business from our CRM book. Every contact that comes from content should arrive tagged with where it came from, which post, which platform, which piece, so that the business can eventually see not just that content works but which content works, and feed that back into chapter eight\'s monthly loop.'),
      ...p('This is also where the choice of CRM matters, because some handle social capture and source tagging genuinely well, ingesting the leads your content and its comment-to-DM wiring produce, keeping the source attached, and letting you see the whole path from a specific post to a specific enquiry to a specific client. The businesses that get this right close the loop entirely: they know which content earns real business, not just attention, which is the honest answer to what works that chapter eight was reaching for. Content feeds the CRM, the CRM remembers where each lead came from, and the business finally learns which of its content pays.'),
    ),
    ...realPicture({
      leadIn: 'It is worth being honest about the wiring that carries a comment to a lead, because it looks like magic and it runs on plumbing that breaks quietly, which is the theme this whole series keeps returning to.',
      title: 'The real picture',
      paragraphs: [
        'The connection between a social platform and your systems runs on permissions the platform grants, and those permissions are the platform\'s to change, restrict, or revoke, because this is rented ground and the landlord sets the rules. An automation that reads comments and sends messages works within what the platform allows, and platforms adjust what they allow regularly, sometimes without much warning, so a comment-to-DM flow that ran perfectly can stop when a platform changes its rules, and it stops quietly, no error in your day, just messages that silently stop sending and leads that silently stop arriving, discovered weeks later as a mysteriously quiet stretch. The defence is the one this series builds everywhere: monitoring that watches whether the leads are actually flowing, so silence is caught fast rather than discovered late.',
        'Then there are the limits. Platforms cap how many messages an automation can send in a window, and how fast, precisely to stop the tools from being abused, so a flow that works fine on a normal post can hit a ceiling on a post that unexpectedly takes off, exactly when the attention is most valuable, and the naive version either fails or, worse, trips the platform\'s spam defences and risks the account. The built-properly version respects the limits, queues within them, and never risks the account for the sake of speed, because the account is the rented ground the whole thing stands on and losing it loses everything.',
        'And there is the approval question that most home-made social automation gets wrong. The temptation is to automate the whole thing, comment to message to follow-up, with no human in it, and that is how businesses end up sending the wrong thing to the wrong person at scale, or spamming people in a way the platform punishes, or breaking the honesty rules from chapter seven in public. The disciplined version keeps the automation on the mechanical part, catching the interest and sending the promised thing, and keeps a human on anything that needs judgment, exactly the human-in-the-loop doctrine from our automation book, because content going out at scale under your name needs the same gate as everything else this series builds.',
        'None of this means do not build it, the comment-to-lead wiring is one of the highest-return things in this book. It means build it properly, on the understanding that it runs on rented permissions that change, within limits that must be respected, with a human on the judgment and monitoring on the flow, rather than as a clever hack that works until the day it quietly does not. The difference, as everywhere in this series, is the difference between a system you can trust and a trick that fails when it matters.',
      ],
    }),
    {
      type: 'diagram',
      id: 'btm-ch09-rented-permissions',
      caption: 'Rented permissions, and what breaks. Comment-to-DM flow on a bridge of platform permissions. Failure points: rules change, messages silently stop; message limits hit on a post that takes off. Monitor whether leads are flowing. Human gate on judgment.',
    },
    ...section(
      'IN SHORT',
      'In short',
      ...p('Connected this way, content stops being a separate marketing activity and becomes what it should be, the top of the machine, earning attention on rented ground and carrying it home to the ground you own, where the website converts it, the CRM remembers it, and the follow-up wins it. That is the difference between content that earns applause and content that earns business. The remaining chapters are about keeping the whole system running as it grows, the team that has to run it, and then the toolkit of prompts and the plain-words close. The machine is built. Now it has to be run by people, which is the next chapter.'),
    ),
  ),
]

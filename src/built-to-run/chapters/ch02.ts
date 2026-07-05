import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What an automation is, and what you own',
    subtitle: 'The plain anatomy, the honest platform conversation, and the ownership rules.',
  }),
  flow(
    ...p(
      'Chapter one ended on the question that decides whether this machinery serves you or holds you hostage: who owns the automations, and what happens if the person who built them disappears? Before answering it, the machinery itself needs demystifying, because automation carries more unearned mystique than anything else in this series, and the mystique is expensive. Owners who think it is wizardry either avoid it for years or pay wizard prices for plumbing. This chapter is the plain anatomy, the honest platform conversation, and the ownership rules.',
    ),
    ...section(
      'FOUR PARTS',
      'The four parts of every automation',
      ...p('Every automation ever built, from the simplest reminder to the machinery running a bank, is made of the same four parts.'),
      ...p('The trigger is the event that starts it: a form is submitted, an invoice goes overdue, a deal is marked won, nine oclock arrives on a Monday. The steps are what happens next, in order: create this record, send this email, update that spreadsheet. Conditions are the forks in the road: if the enquiry mentions a service, route it here, otherwise there; if the invoice is under a threshold, chase gently, if over, alert a human. And the action at the end is the result the whole thing exists for: the reply sent, the record updated, the person alerted.'),
      ...p('Trigger, steps, conditions, action. Hold those four and no platform demo can bamboozle you again, because every canvas full of boxes and arrows you will ever see is just those four parts drawn out. The craft, and there is real craft, which chapter three begins, lives in choosing them well, not in anything mystical.'),
      {
        type: 'diagram',
        id: 'btr-ch02-four-parts',
        caption: 'The four parts of every automation. TRIGGER, STEPS, CONDITIONS, ACTION. Every canvas of boxes and arrows you will ever see is these four, drawn out.',
      },
    ),
  ),
  flow(
    ...section(
      'WEBHOOKS',
      'Webhooks, the doorbell between systems',
      ...p('One term earns its plain-English moment now, because the whole connected world runs on it. A webhook is how one system tells another that something just happened, the moment it happens. Your website form does not wait to be asked; the instant someone submits, it rings the next system\'s doorbell and hands over the details. That is all a webhook is: a doorbell with an envelope. When this book says the systems talk to each other, webhooks are most of the talking, and when chapter nine goes under the hood, the doorbell that nobody heard ring is where the trouble stories start.'),
      {
        type: 'diagram',
        id: 'btr-ch02-webhook',
        caption: 'The doorbell with an envelope. System A rings System B the instant something happens. No waiting to be asked.',
      },
    ),
  ),
  flow(
    ...section(
      'PLATFORMS',
      'The platforms, honestly',
      ...p('Automation platforms are the workbenches where these rules get built, and they come in three honest flavours.'),
      ...p('At the easy end sit the plug-and-play platforms, the likes of Zapier: enormous ranges of ready-made connections, gentle to learn, quick to start, and priced per task, which means the bill grows with your success. Fine for first steps and light volumes; expensive plumbing at scale. In the visual middle sit platforms like Make: more power, more logic, friendlier pricing, a canvas where the flows are drawn rather than listed, with a learning curve to match. And at the powerful end sit the self-hosted tools, the likes of n8n: run on your own infrastructure, essentially flat-cost no matter how hard they work, capable of anything, and demanding real technical care in exchange, because self-hosted means self-responsible.'),
      ...p('The honest guidance mirrors the CRM book\'s sizing rule: the right platform is the one your actual volume and appetite justify. Light, occasional automations, the easy end is genuinely fine. A business wiring its nervous system properly, running hundreds of tasks a day, hits the point where per-task pricing becomes a tax on growth and the flat-cost end starts winning decisively, which is a crossover chapter ten returns to. Enterprise automation suites exist above all of this and are, as ever in this series, built for departments and priced accordingly. Not you, and happily so.'),
      {
        type: 'diagram',
        id: 'btr-ch02-three-benches',
        caption: 'The three workbenches. PLUG-AND-PLAY: gentle, quick, priced per task. THE VISUAL MIDDLE: more power, friendlier pricing. SELF-HOSTED: flat cost, full power, self-responsible. Chapter ten covers the crossover.',
      },
    ),
  ),
  flow(
    ...section(
      'WHAT YOU OWN',
      'What you own',
      ...p('Now the chapter-one question, answered as doctrine, because automations concentrate the ownership stakes of everything else in this series into one place. An automation is business logic: how your enquiries get handled, how your invoices get chased, how your systems connect. That logic is an asset, and the rules protect it.'),
      ...p('The accounts are yours: the platform runs under a login the business holds, never inside a freelancer\'s personal account, because an automation living in someone else\'s account is a business process you can lose with a relationship. The credentials are managed: every connection an automation uses runs on a key, and those keys live in the platform\'s credential store, owned and auditable by you, never pasted into workflows or shared in messages, echoing the armour rules from this series\' first book. The workflows are exportable: before committing to any platform, export a workflow and look at it, because the ability to take your logic with you is the difference between a workbench and a cage. And the documentation exists: every automation has a plain-English line somewhere explaining what it does, what triggers it, and what it touches, written down outside anyone\'s head.'),
      ...p('That last rule sounds bureaucratic and is actually survival. An undocumented automation is black magic the day its builder leaves: something happens when forms are submitted, nobody is sure what, and everyone is afraid to touch it. Documented, it is just machinery, maintainable by whoever comes next. Chapter three makes this a design habit rather than a chore, because the anatomy of an automation that works includes being understandable, and that is where we go now.'),
      {
        type: 'diagram',
        id: 'btr-ch02-what-you-own',
        caption: 'What you own. The accounts in the business\'s name, credentials in the vault, workflows exportable, documentation one plain line each, outside every head.',
      },
    ),
  ),
]

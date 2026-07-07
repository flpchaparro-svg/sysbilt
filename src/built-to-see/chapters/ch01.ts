import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch01Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 1,
    title: 'Why you\'re flying blind, even with all this data',
    subtitle: 'The rear-view problem, drowning in dashboards, and seeing clearly instead.',
  }),
  flow(
    ...section(
      'THE SHIFT',
      'The ground has shifted',
      ...p('Start here, because this book rests on it, and because it closes a loop the whole series has been building toward. Knowing what is actually happening in your business, clearly, currently, in one place, used to be either impossible for a growing business or expensive enough that only large companies bothered. It has just become cheap and achievable, and most businesses still do not have it, which means they are making decisions half-blind while the tools to see clearly sit within reach.'),
      ...p('For most of business history, an owner ran on two things: gut feel, and the rear-view mirror. The gut told you how things seemed to be going. The rear-view mirror was the accountant\'s report, arriving weeks after the period it described, telling you how last month or last quarter went, long after you could do anything about it. That was the state of knowing, for everyone who was not a large corporation with a finance department and expensive systems, and it meant running a business a bit like driving while only able to see where you had already been.'),
      ...p('Then the problem flipped, and this is the part that catches modern businesses out. Today the trouble is not too little information, it is too much of it, scattered everywhere. Every tool a business runs throws off numbers, the website, the CRM, the ads, the accounting, the social platforms, the booking system, and each one has its own dashboard, its own login, its own version of a partial truth. So the modern owner is not starved of data, they are drowning in it, with ten dashboards that do not agree and no single place that says, simply, how is the business actually doing. That is its own kind of blindness, and it is arguably worse, because it feels like you should be able to see, and you still cannot.'),
      ...p('What has changed is that connecting all of that scattered information into one clear, current, honest view is now genuinely affordable, the same shift that runs through everything this series builds. The wiring that pulls the numbers from every system into a single place used to be enterprise-grade and priced to match, and now a growing business can have it. So the edge is no longer having data, everyone drowns in data. The edge is seeing clearly: knowing the few numbers that actually matter for your business, seeing them now rather than next month, and being able to act while there is still time to change the outcome. This book is how to build that.'),
      {
        type: 'diagram',
        id: 'bse-ch01-rearview-windscreen',
        caption: 'Rear-view mirror versus windscreen. LEFT: gut feel and the accountant\'s report, accurate and old, where you have already been. RIGHT: a current, honest view you can glance at now and act on today. The shift from learning too late to seeing what is coming.',
      },
    ),
    ...section(
      'ONE JOB',
      'The one job',
      ...p('Your dashboards have one job. Show you the truth about your business, clearly and currently, so you can act while it still matters.'),
      ...p('Everything else serves that. Not the number of charts, not how impressive the display looks, not how much data you can pile onto a screen. The only measure that counts is whether you can look and know, quickly and honestly, how the business is actually doing and what needs your attention today, rather than finding out weeks later when the moment to act has passed.'),
      ...p('Because that is what flying blind actually costs, and the cost is always the same shape: you find out too late. The month was quietly going wrong and you did not see it until the numbers came in. The marketing stopped working and you kept spending. The problem was building for weeks and by the time it showed up somewhere you looked, it was a crisis instead of a warning. Seeing clearly is not about admiring numbers, it is about catching things early, while they are still small and still fixable, which is the entire difference between steering the business and reacting to it.'),
    ),
    ...section(
      'REAR-VIEW',
      'The rear-view problem',
      ...p('It is worth naming the first trap precisely, because so many businesses live in it without realising there is an alternative. Running on the accountant\'s report is running on the rear-view mirror: the information is accurate, and it is old. By the time the monthly figures arrive, the month is over, and whatever they reveal, a bad patch, a rising cost, a dropping conversion, already happened, and you are learning about it too late to have done anything differently.'),
      ...p('This is not the accountant\'s fault, that is what financial reporting is for, recording what happened accurately. The problem is relying on it as your only way of knowing, because it is structurally backward-looking, and a business steered only by where it has already been cannot respond to where it is heading. The shift this book describes is from the rear-view mirror to something closer to a live dashboard in the car: not a report on last month, but a current view you can glance at now and act on today, which is the difference between knowing you took a wrong turn twenty minutes ago and seeing the turn coming up.'),
    ),
  ),
  flow(
    ...section(
      'DROWNING',
      'Drowning in dashboards',
      ...p('The second trap is the opposite of the first and just as blinding, and it is where the more advanced businesses get stuck. Having recognised they need to see more, they end up with too much: every tool\'s dashboard open in a different tab, a dozen sources of numbers, none of them agreeing, and the owner spending time hunting across all of them trying to assemble a picture that never quite comes together. This feels like being data-driven and it is actually just being overwhelmed, because ten partial views in ten places is not visibility, it is a scavenger hunt.'),
      ...p('The reason this fails is that scattered data is not the same as insight. Each tool shows its own slice, in its own way, counting things slightly differently, and no single one tells you how the business is doing overall, so the owner is left trying to hold ten dashboards in their head and reconcile numbers that do not match. What is missing is not more data, it is one honest view that pulls the few numbers that matter into a single place and says, simply, here is how the business is doing. That is what seeing clearly means, and it is the opposite of collecting more dashboards. Less, connected and honest, beats more, scattered and partial, every time.'),
      {
        type: 'diagram',
        id: 'bse-ch01-two-blindnesses',
        caption: 'Two blindnesses. TOP (crossed): too little, gut and the rear-view mirror only. BOTTOM (crossed): too much, ten dashboards in ten tabs, none agreeing, a scavenger hunt. The fix is not more data, it is one honest view.',
      },
    ),
    ...section(
      'TWO WAYS',
      'Flying blind, or seeing clearly',
      ...p('Every business sits somewhere between two ways of operating, and knowing which one you are in shapes everything that follows.'),
      ...p('The first is flying blind, whether from too little information or too much. The decisions get made on gut, on old reports, or on whichever dashboard happened to be open, and the business finds out about problems late, reacts to crises instead of catching warnings, and never quite knows, in the moment, how it is actually doing. It can run this way for a long time, especially when things are going well enough to hide the cost, but it is always a step behind its own reality, learning what happened after it has happened.'),
      ...p('The second is seeing clearly. A handful of numbers that genuinely matter, pulled into one honest, current view, glanced at on a rhythm, so the business knows how it is doing now, catches problems while they are small, and steers on evidence rather than feel. It does not mean staring at data all day, quite the opposite, it means a quick, truthful look that tells you what needs attention, so your judgment is spent on decisions informed by reality rather than guesses. It is calmer, it is earlier, and it turns the business from something that happens to you into something you can actually steer.'),
      ...p('This book is about building the second, and it is the last piece of the system this whole series has been assembling, because everything the other books built, the website, the store, the follow-up, the automation, the AI, the content, the trained team, produces information, and this is where that information finally becomes sight. The chapters ahead are its parts: the data as the asset you own, the anatomy of a dashboard that actually gets used, the few numbers that matter, the library of views, the honesty that keeps it trustworthy, the ability to be alerted rather than to watch, and the final loop that ties the whole business together on one screen. But before any dashboard is built, there is a question that decides whether it shows truth or nonsense, and the businesses drowning in dashboards never ask it. What is all this data actually worth, and can you even trust it? That is chapter two.'),
      {
        type: 'diagram',
        id: 'bse-ch01-flying-or-clear',
        caption: 'Flying blind, or seeing clearly. LEFT (crossed): gut, old reports, scattered tabs, crises instead of warnings, always a step behind. RIGHT (gold): a handful of numbers in one honest view, glanced on a rhythm, steering on evidence. The last piece where information becomes sight.',
      },
    ),
  ),
]

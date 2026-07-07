import type { BtwPage } from '../types'
import { flow, opener, p, section } from '../../built-to-work/helpers'

export const ch02Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 2,
    title: 'What you own: the data of your business',
    subtitle: 'The asset every system was building, owned and reachable data, and shared definitions.',
  }),
  flow(
    ...p(
      'Chapter one ended on the question the dashboard-drowners never ask: what is your data actually worth, and can you trust it? This chapter is the answer, and it matters more than any chart, because a dashboard built on data you do not own or cannot trust is worse than no dashboard, it is a confident lie you will make decisions on. This chapter is about seeing your scattered data as the asset it is, owning it properly, and the one discipline that decides whether everything built on it is truth or nonsense.',
    ),
    ...section(
      'THE ASSET',
      'The asset every other system was quietly building',
      ...p('Every book in this series built a system, and every one of those systems has been quietly producing data all along. The website recorded who visited and what they did. The CRM recorded every lead, every deal, every outcome. The store recorded every order. The automations logged everything they touched. The content earned measurable attention, the accounting kept the numbers, the booking system tracked the appointments. Scattered across all those tools is a complete record of how the business actually works, and most owners have never seen it as a single thing, because it lives in a dozen places.'),
      ...p('That record is an asset, and naming it as one changes how you treat it. Individually, in ten separate tools, it is noise, ten partial views that do not add up. Pulled together, it is the memory and the instrument panel of the entire business, the raw material of every decision you could make on evidence rather than guess. The data your systems have been generating is not exhaust, it is one of the most valuable things the business owns, and the whole point of this book is to stop it being scattered noise and turn it into a single, honest picture you can actually use.'),
      {
        type: 'diagram',
        id: 'bse-ch02-asset-systems-building',
        caption: 'The asset every system was building. Scattered across website, CRM, store, automations, content, accounting, booking: noise in ten places. Pulled together: the memory and instrument panel of the entire business.',
      },
    ),
    ...section(
      'OWNED',
      'Owned, exportable, controlled',
      ...p('The ownership doctrine of this series applies to your data exactly as it applies to your domain, your customer list, your knowledge, and your systems, and here it has a particular edge because data is easy to lose access to without noticing. The data is yours: it lives in accounts the business controls, and you can get it out of every tool that holds it, because data trapped in a system you cannot export from is only half owned, and a business that cannot extract its own numbers is at the mercy of whoever can. This is worth checking tool by tool, because some make your data easy to reach and some quietly hold it hostage, and the difference matters the day you want to move, connect, or simply see everything in one place.'),
      ...p('The reason this matters for a dashboard specifically is that a dashboard works by pulling data from all your systems into one view, and that only works if you can actually get the data out of each of them. So ownership is not an abstract principle here, it is the practical foundation of being able to see clearly at all: the more of your own data you can reach and control, the more complete and honest the single view can be, and the more locked-away it is, the more partial your picture stays.'),
      {
        type: 'diagram',
        id: 'bse-ch02-reachable-or-hostage',
        caption: 'Reachable or hostage. LEFT (gold): data in accounts the business controls, exportable from every tool, the pipes can connect. RIGHT (crossed): data trapped in a system you cannot get out of, only half owned, a partial picture by design.',
      },
    ),
  ),
  flow(
    ...section(
      'DEFINITIONS',
      'The one discipline that decides everything: definitions',
      ...p('Here is the discipline that separates a dashboard you can trust from one that quietly lies, and it is the least glamorous and most important idea in the book: everyone and every system has to mean the same thing by the same word, or every number built on it is wrong.'),
      ...p('It sounds trivial and it is the source of most bad dashboards. What counts as a lead? Is it anyone who filled in a form, or only someone who qualified? Does the website count a lead the same way the CRM does? What counts as a sale, the moment it is agreed, or the moment it is paid? What is revenue, the total invoiced or the amount actually received? If two systems, or two people, define these differently, then any number that combines them is meaningless, and a dashboard that shows leads or sales or revenue is showing a figure that does not actually mean one thing, which is worse than no figure because it looks authoritative.'),
      ...p('So before any dashboard is built, the definitions have to be agreed and written down: this is what we mean by a lead, a sale, a customer, revenue, and everyone and every system uses those same definitions. This is unglamorous, it takes a conversation rather than a tool, and it is the single thing that most determines whether your dashboards tell the truth. A business with clear, shared definitions can trust its numbers. A business where a lead means three different things in three systems is building its dashboards on sand, and the more impressive the dashboard, the more confidently it will mislead. Get the definitions right first, and everything built on them can be trusted. Skip them, and nothing can.'),
      {
        type: 'diagram',
        id: 'bse-ch02-one-word-one-meaning',
        caption: 'One word, one meaning. LEFT (crossed): lead, sale, revenue meaning three different things in three systems, numbers that look authoritative and mean nothing. RIGHT (gold): agreed definitions written down, everyone and every system uses the same words. The foundation everything else rests on.',
      },
      ...p(
        'That is the foundation: your scattered data is a valuable asset, it has to be owned and reachable to be seen, and it has to rest on shared definitions to be trusted. With that settled, the next chapter is about turning it into something a busy person actually looks at and uses, the anatomy of a dashboard that gets used rather than ignored.',
      ),
    ),
  ),
]

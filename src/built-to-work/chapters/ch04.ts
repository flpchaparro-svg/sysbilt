import type { BtwPage } from '../types'
import { section, flow, opener, p } from '../helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Your pages',
    subtitle: 'A lead-generation site is lean. Every page earns its place, or it goes.',
  }),
  flow(
    ...p(
      'A website is a set of pages, and each one has a job. The trouble starts when pages are added because every other site has them, rather than because they earn their place. A lead-generation site is lean. Every page exists to move someone closer to becoming a client, and anything that does not is costing you attention. This chapter is about which pages you need, what each is for, and which ones you can leave out.',
    ),
    ...section(
      'EVERY PAGE\'S JOB',
      'Each page has a purpose, not just a label',
      ...p(
        'It is worth knowing what each common page is actually for, because the label rarely tells the whole story.',
        'The home page is not a welcome mat. It is the page that has seconds to say what you do, who it is for, and why you are worth a closer look, then point the visitor towards the next step. The about page is not a history lesson. It is where a wavering visitor goes to decide whether they trust you, so it carries your story, your proof, and the people behind the work. The services pages explain what you offer in the visitor\'s terms, the problem they have rather than the language you use internally. The contact page removes every obstacle between a ready visitor and reaching you. And the legal pages, privacy and terms, are quiet necessities that protect the business and signal it is run properly. Each one has a role. When a page knows its role, it is written and designed to do that one thing well.',
      ),
      {
        type: 'diagram',
        id: 'ch04-page-jobs',
        caption:
          'What each page is really for. Home: "Says what you do in seconds". About: "Builds trust". Services: "Frames the problem you solve". Contact: "Removes every obstacle". Legal: "Protects the business".',
      },
    ),
  ),
  flow(
    ...section(
      'WHAT YOU NEED',
      'The pages you need, and the ones you do not',
      ...p(
        'A lead-generation site does not need to be large. It needs the right pages, built well.',
        'For most businesses, a small set does the heavy lifting, a strong home page, a service page for each core thing you offer, an about page that builds trust, and a clear way to make contact. Everything beyond that should have to justify itself. Pages added out of habit, the ones nobody visits and nobody maintains, do not sit there harmlessly. They dilute the site, spread your attention thin, and give the visitor more ways to wander off than to act. When in doubt, fewer pages built properly will always outperform more pages built to fill a menu.',
      ),
    ),
  ),
  flow(
    ...section(
      'LOCAL PAGES',
      'Showing up where you work',
      ...p(
        'If your business serves particular areas, the people in those areas are searching with the place name attached. They are not looking for a service in the abstract, they are looking for one near them.',
        'Pages built around the specific areas you serve let you meet that search directly, so the business in the right place has a real advantage over a competitor who left location to chance. The key is that each of these pages is genuine. Write each one with real detail, real photographs, and a real example of your work in that area, or do not publish it at all. A page assembled by copying the same paragraph a dozen times and swapping the place name is worse than useless, because both visitors and the AI systems now reading the web can spot duplicated filler, and it drags down the trust in everything around it. Done with care, these pages put you in front of people at the exact moment they are looking for someone close by. Done lazily, they cost you.',
      ),
    ),
  ),
  flow(
    ...section(
      'YOUR TEAM',
      'The people behind the work',
      ...p(
        'People do business with people. However polished a site is, a visitor is ultimately deciding whether to trust the humans behind it, and a page that introduces those humans does more for trust than almost anything else on the site.',
        'A genuine team page, real names, real faces, a sense of who you are, closes the distance between a stranger and your business. It turns an anonymous company into a group of people a visitor can picture working with. For a business that competes on quality and trust rather than on being the cheapest, this is not a vanity page. It is one of the most persuasive things you can show, because it answers the human question underneath every enquiry, who exactly am I dealing with.',
      ),
    ),
  ),
]

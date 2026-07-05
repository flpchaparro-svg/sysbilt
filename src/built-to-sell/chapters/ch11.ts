import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch11Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 11,
    title: 'Using AI to run the store faster',
    subtitle: 'AI drafts. You verify. The store publishes only what is true.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]

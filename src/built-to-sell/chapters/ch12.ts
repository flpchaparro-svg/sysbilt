import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch12Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 12,
    title: 'Glossary, and who to call',
    subtitle: 'Plain meanings — plus who to talk to when you are ready.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]

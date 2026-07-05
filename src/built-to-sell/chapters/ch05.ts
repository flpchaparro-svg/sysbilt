import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch05Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 5,
    title: 'Your features',
    subtitle: 'Each feature is a small machine with a job to do.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]

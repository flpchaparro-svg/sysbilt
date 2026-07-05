import type { BtwPage } from '../types'
import { flow, opener, p } from '../../built-to-work/helpers'

export const ch04Pages: BtwPage[] = [
  opener({
    type: 'chapterOpener',
    num: 4,
    title: 'Your pages',
    subtitle: 'Every page earns its place, or it costs you attention.',
  }),
  flow(...p('This chapter is being prepared. Return to the Built to Sell hub for an overview.')),
]

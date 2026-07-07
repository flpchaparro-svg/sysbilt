import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why content, and why most of it is wasted' },
      { num: 2, title: 'Strategy before assets' },
      { num: 3, title: 'The anatomy of content that works' },
      { num: 4, title: 'One source, many channels' },
      { num: 5, title: 'The content toolkit' },
      { num: 6, title: 'The production line, day to day' },
      { num: 7, title: 'Keeping it honest, legal and on-brand' },
      { num: 8, title: 'Knowing what works' },
      { num: 9, title: 'Content as part of the system' },
      { num: 10, title: 'Growing it, and training the team to run it' },
      { num: 11, title: 'The prompt pack' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

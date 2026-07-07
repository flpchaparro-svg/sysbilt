import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why you\'re flying blind, even with all this data' },
      { num: 2, title: 'What you own: the data of your business' },
      { num: 3, title: 'The anatomy of a dashboard that gets used' },
      { num: 4, title: 'The numbers that matter' },
      { num: 5, title: 'The dashboard library' },
      { num: 6, title: 'Running it day to day' },
      { num: 7, title: 'Keeping it honest' },
      { num: 8, title: 'Knowing where to look, and when' },
      { num: 9, title: 'The dashboard as the nervous system\'s screen' },
      { num: 10, title: 'Growing it over time' },
      { num: 11, title: 'The prompt pack' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: "Why everyone's talking about AI, and most are wasting money" },
      { num: 2, title: 'What AI actually is, in plain terms' },
      { num: 3, title: 'The anatomy of an AI task that pays' },
      { num: 4, title: 'Choosing the right tool, at the right tier' },
      { num: 5, title: 'The use-case library' },
      { num: 6, title: 'Running it day to day' },
      { num: 7, title: 'Keeping it safe, private and legal' },
      { num: 8, title: 'AI that answers: chat and voice agents' },
      { num: 9, title: 'Connecting AI to your systems' },
      { num: 10, title: 'Growing it over time' },
      { num: 11, title: 'The prompt pack' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

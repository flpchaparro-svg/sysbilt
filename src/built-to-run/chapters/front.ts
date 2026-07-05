import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why your business drowns in admin, and does not have to' },
      { num: 2, title: 'What an automation is, and what you own' },
      { num: 3, title: 'The anatomy of an automation that works' },
      { num: 4, title: 'Finding what to automate' },
      { num: 5, title: 'The automation library' },
      { num: 6, title: 'Running it day to day, and the human in the loop' },
      { num: 7, title: 'Keeping it healthy, safe and legal' },
      { num: 8, title: 'When automations think: adding AI' },
      { num: 9, title: 'Your automations as the nervous system' },
      { num: 10, title: 'Growing it over time' },
      { num: 11, title: 'Using AI to build automations faster' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

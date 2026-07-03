import type { BtwPage } from '../types'
import { contents } from '../helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why your website exists' },
      { num: 2, title: 'What you own, and what keeps it safe' },
      { num: 3, title: 'The anatomy of a page that converts' },
      { num: 4, title: 'Your pages' },
      { num: 5, title: 'Your features' },
      { num: 6, title: 'Running it day to day' },
      { num: 7, title: 'Keeping it healthy, legal and fast' },
      { num: 8, title: 'Getting found' },
      { num: 9, title: 'Your website as the hub' },
      { num: 10, title: 'Growing it over time' },
      { num: 11, title: 'Using AI to run content faster' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

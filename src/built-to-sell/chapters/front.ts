import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why your store exists' },
      { num: 2, title: 'What you own, and what keeps it safe' },
      { num: 3, title: 'The anatomy of a product page that sells' },
      { num: 4, title: 'Your pages' },
      { num: 5, title: 'Your features' },
      { num: 6, title: 'Running it day to day' },
      { num: 7, title: 'Keeping it healthy, legal and fast' },
      { num: 8, title: 'Getting found, by people and by machines' },
      { num: 9, title: 'Your store as the hub' },
      { num: 10, title: 'Selling where the buyers are' },
      { num: 11, title: 'Using AI to run the store faster' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

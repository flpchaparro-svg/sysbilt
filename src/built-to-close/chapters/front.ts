import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why your business needs a memory' },
      { num: 2, title: 'What a CRM actually is, and what you own' },
      { num: 3, title: 'The anatomy of a pipeline that closes' },
      { num: 4, title: 'Your data, and keeping it clean' },
      { num: 5, title: 'Your features' },
      { num: 6, title: 'Running it day to day' },
      { num: 7, title: 'Following up without burning people' },
      { num: 8, title: 'Lead tracking: knowing where every job came from' },
      { num: 9, title: 'Your CRM as the hub' },
      { num: 10, title: 'Getting your team to actually use it' },
      { num: 11, title: 'Using AI to run the CRM faster' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

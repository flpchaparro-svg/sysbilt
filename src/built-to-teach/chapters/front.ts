import type { BtwPage } from '../types'
import { contents } from '../../built-to-work/helpers'

export const frontPages: BtwPage[] = [
  contents({
    type: 'contents',
    items: [
      { num: 1, title: 'Why good systems fail without trained people' },
      { num: 2, title: 'What you actually own: the knowledge of the business' },
      { num: 3, title: 'The anatomy of training that sticks' },
      { num: 4, title: 'Capturing what is in people\'s heads' },
      { num: 5, title: 'The format library' },
      { num: 6, title: 'Running it day to day' },
      { num: 7, title: 'The training agent: a teacher that never sleeps' },
      { num: 8, title: 'Onboarding: from first day to independent' },
      { num: 9, title: 'Change management: rolling out new systems without the revolt' },
      { num: 10, title: 'Growing it, and knowing it works' },
      { num: 11, title: 'The prompt pack' },
      { num: 12, title: 'Glossary, and who to call' },
    ],
  }),
]

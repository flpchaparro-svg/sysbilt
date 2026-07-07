import type { FC } from 'react'
import {
  BteCh01OneSourceManyFormats,
  BteCh01ManagerAsManual,
  BteCh01AdoptionFailure,
  BteCh02AssetUnsafePlace,
  BteCh02SingleSource,
  BteCh02PersonWhoKnewEverything,
  BteCh03OneSkill,
  BteCh03ShowDoCheck,
  BteCh03ShortClose,
} from './bteCh01-03'
import {
  BteCh04PersonIsSource,
  BteCh04RecordNotWrite,
  BteCh04CaptureAsWork,
  BteCh05FormatLibrary,
  BteCh05Podcasts,
  BteCh05InPerson,
  BteCh06InFlow,
  BteCh06LookItUp,
  BteCh06UpdateRitual,
} from './bteCh04-08'
import {
  BteCh07TeacherOnCall,
  BteCh07LearningByAsking,
  BteCh07AgentInterface,
  BteCh08ReadyBeforeArrive,
  BteCh08PathNotFirehose,
  BteCh08TimeToIndependent,
  BteCh09WhyResist,
  BteCh09WhyBeforeHow,
  BteCh09SupportThenCommit,
  BteCh09TheDip,
  BteCh10Signals,
  BteCh10LibraryCompounds,
  BteCh10HighestValueFirst,
  BteCh11FourChecks,
} from './bteCh09-11'

type DiagramProps = { caption: string }

/** All Built to Teach diagram IDs → components. */
export const BTE_DIAGRAMS: Record<string, FC<DiagramProps>> = {
  'bte-ch01-one-source-many-formats': BteCh01OneSourceManyFormats,
  'bte-ch01-manager-as-manual': BteCh01ManagerAsManual,
  'bte-ch01-adoption-failure': BteCh01AdoptionFailure,
  'bte-ch02-asset-unsafe-place': BteCh02AssetUnsafePlace,
  'bte-ch02-single-source': BteCh02SingleSource,
  'bte-ch02-person-who-knew-everything': BteCh02PersonWhoKnewEverything,
  'bte-ch03-one-skill': BteCh03OneSkill,
  'bte-ch03-show-do-check': BteCh03ShowDoCheck,
  'bte-ch03-short-close': BteCh03ShortClose,
  'bte-ch04-person-is-source': BteCh04PersonIsSource,
  'bte-ch04-record-not-write': BteCh04RecordNotWrite,
  'bte-ch04-capture-as-work': BteCh04CaptureAsWork,
  'bte-ch05-format-library': BteCh05FormatLibrary,
  'bte-ch05-podcasts': BteCh05Podcasts,
  'bte-ch05-in-person': BteCh05InPerson,
  'bte-ch06-in-flow': BteCh06InFlow,
  'bte-ch06-look-it-up': BteCh06LookItUp,
  'bte-ch06-update-ritual': BteCh06UpdateRitual,
  'bte-ch07-teacher-on-call': BteCh07TeacherOnCall,
  'bte-ch07-learning-by-asking': BteCh07LearningByAsking,
  'bte-ch07-agent-interface': BteCh07AgentInterface,
  'bte-ch08-ready-before-arrive': BteCh08ReadyBeforeArrive,
  'bte-ch08-path-not-firehose': BteCh08PathNotFirehose,
  'bte-ch08-time-to-independent': BteCh08TimeToIndependent,
  'bte-ch09-why-resist': BteCh09WhyResist,
  'bte-ch09-why-before-how': BteCh09WhyBeforeHow,
  'bte-ch09-support-then-commit': BteCh09SupportThenCommit,
  'bte-ch09-the-dip': BteCh09TheDip,
  'bte-ch10-signals': BteCh10Signals,
  'bte-ch10-library-compounds': BteCh10LibraryCompounds,
  'bte-ch10-highest-value-first': BteCh10HighestValueFirst,
  'bte-ch11-four-checks': BteCh11FourChecks,
}

export const BTE_DIAGRAM_IDS = Object.keys(BTE_DIAGRAMS)

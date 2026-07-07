import type { FC } from 'react'
import {
  BttCh01TwoTruths,
  BttCh01OneRule,
  BttCh01InventoryCamera,
  BttCh02PredictionMachine,
  BttCh02MemoryWindowMeter,
  BttCh02BarristerMail,
  BttCh03FourFeatures,
  BttCh03ThreeQuestions,
} from './bttCh01-03'
import {
  BttCh04ThreeDoors,
  BttCh04SizedToJob,
  BttCh04Arithmetic,
  BttCh05LibraryMap,
  BttCh05ImagesLine,
  BttCh05WhoAnswers2am,
  BttCh05OtherColumn,
  BttCh06BriefingFourParts,
  BttCh06PromptLibrary,
  BttCh06SwitchOffTest,
  BttCh07PrivacyLine,
  BttCh07WhyInvents,
  BttCh07TrustGradient,
  BttCh08AgentTerritory,
  BttCh08KnowledgeProduct,
  BttCh08ListeningLoop,
} from './bttCh04-08'
import {
  BttCh09StandardPlug,
  BttCh09FourThoughts,
  BttCh09MeteredFailure,
  BttCh09TokensHealth,
  BttCh10Ladder,
  BttCh10RungGate,
  BttCh10LaunchWeek,
  BttCh11FourChecks,
} from './bttCh09-11'

type DiagramProps = { caption: string }

/** All Built to Think diagram IDs → components. */
export const BTT_DIAGRAMS: Record<string, FC<DiagramProps>> = {
  'btt-ch01-two-truths': BttCh01TwoTruths,
  'btt-ch01-one-rule': BttCh01OneRule,
  'btt-ch01-inventory-camera': BttCh01InventoryCamera,
  'btt-ch02-prediction-machine': BttCh02PredictionMachine,
  'btt-ch02-memory-window-meter': BttCh02MemoryWindowMeter,
  'btt-ch02-barrister-mail': BttCh02BarristerMail,
  'btt-ch03-four-features': BttCh03FourFeatures,
  'btt-ch03-three-questions': BttCh03ThreeQuestions,
  'btt-ch04-three-doors': BttCh04ThreeDoors,
  'btt-ch04-sized-to-job': BttCh04SizedToJob,
  'btt-ch04-arithmetic': BttCh04Arithmetic,
  'btt-ch05-library-map': BttCh05LibraryMap,
  'btt-ch05-images-line': BttCh05ImagesLine,
  'btt-ch05-who-answers-2am': BttCh05WhoAnswers2am,
  'btt-ch05-other-column': BttCh05OtherColumn,
  'btt-ch06-briefing-four-parts': BttCh06BriefingFourParts,
  'btt-ch06-prompt-library': BttCh06PromptLibrary,
  'btt-ch06-switch-off-test': BttCh06SwitchOffTest,
  'btt-ch07-privacy-line': BttCh07PrivacyLine,
  'btt-ch07-why-invents': BttCh07WhyInvents,
  'btt-ch07-trust-gradient': BttCh07TrustGradient,
  'btt-ch08-agent-territory': BttCh08AgentTerritory,
  'btt-ch08-knowledge-product': BttCh08KnowledgeProduct,
  'btt-ch08-listening-loop': BttCh08ListeningLoop,
  'btt-ch09-standard-plug': BttCh09StandardPlug,
  'btt-ch09-four-thoughts': BttCh09FourThoughts,
  'btt-ch09-metered-failure': BttCh09MeteredFailure,
  'btt-ch09-tokens-health': BttCh09TokensHealth,
  'btt-ch10-ladder': BttCh10Ladder,
  'btt-ch10-rung-gate': BttCh10RungGate,
  'btt-ch10-launch-week': BttCh10LaunchWeek,
  'btt-ch11-four-checks': BttCh11FourChecks,
}

export const BTT_DIAGRAM_IDS = Object.keys(BTT_DIAGRAMS)

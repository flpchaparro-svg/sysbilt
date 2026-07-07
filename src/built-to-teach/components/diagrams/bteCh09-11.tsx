import type { ReactNode } from 'react'
import { Fig } from './diagramPrimitives'

type D = { caption: string }

function Plate({ children, footer }: { children: ReactNode; footer?: string }) {
  return (
    <div className="border border-[#1a1a1a]/22 bg-[#FFF2EC]/60 p-4">
      {children}
      {footer ? (
        <p className="mt-4 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-[#8B6914]">{footer}</p>
      ) : null}
    </div>
  )
}

function Box({ title, body, gold = false, crossed = false }: { title: string; body?: string; gold?: boolean; crossed?: boolean }) {
  const border = gold ? 'border-[#C5A059] border-2' : 'border-[#1a1a1a]'
  return (
    <div className={`relative overflow-hidden border bg-[#FFF2EC] p-3 ${border} ${crossed ? 'opacity-70' : ''}`}>
      {crossed ? <div className="pointer-events-none absolute inset-0 flex items-center justify-center"><span className="h-px w-[120%] -rotate-12 bg-[#1a1a1a]/35" /></div> : null}
      <p className={`font-mono text-[11px] font-bold uppercase tracking-widest ${gold ? 'text-[#8B6914]' : 'text-[#1a1a1a]'}`}>{title}</p>
      {body ? <p className="mt-2 font-sans text-[12px] leading-snug text-[#1a1a1a]/70">{body}</p> : null}
    </div>
  )
}

function Row({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{children}</div>
}

function Stack({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-3">{children}</div>
}

function Gate({ label }: { label: string }) {
  return <div className="rounded border-2 border-[#C5A059] bg-[#FFF2EC] px-3 py-2 text-center font-mono text-[11px] font-bold uppercase tracking-widest text-[#8B6914]">{label}</div>
}

export function BteCh07TeacherOnCall({ caption }: D) {
  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <Plate footer="The knowledge of the business, on call, around the clock.">
        <Row>
          <Box gold title="TRAINING AGENT" body="Any hour. Answers instantly from the knowledge base. Never impatient, never makes them feel stupid." />
          <Box title="INTERRUPT A BUSY EXPERT" body="Or wait. The old way." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh07LearningByAsking({ caption }: D) {
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <Plate footer="Spending time asking the agent is itself the training, and better than most courses.">
        <Stack>
          <Box gold title="HOW DO I DO THIS?" body="Answered at the moment of need." />
          <Box gold title="THEN WHAT?" body="The shortest possible lesson, one skill at a time, actively doing." />
          <Box title="WHAT ABOUT THIS?" body="Each question answered while the work happens." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh07AgentInterface({ caption }: D) {
  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <Plate footer="Build the knowledge, and the agent is easy. Skip the knowledge, and the agent is a liability that talks.">
        <Stack>
          <Box title="THE AGENT" body="The easy days at the end. Mature tools. Above the waterline." />
          <Box gold title="THE KNOWLEDGE" body="Captured, organised into a source of truth, kept current. The actual project. Below the waterline." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh08ReadyBeforeArrive({ caption }: D) {
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <Plate footer="The effort that used to repeat for each hire is spent once and reused forever.">
        <Row>
          <Box title="CREATED ON DAY ONE" body="A senior person clearing their calendar. Slow, inconsistent." crossed />
          <Box gold title="PATH ALREADY BUILT" body="Formats and agent waiting. Done once, serves every future starter." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh08PathNotFirehose({ caption }: D) {
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <Plate footer="A path respects how people actually learn.">
        <Row>
          <Box title="EVERYTHING ON DAY ONE" body="An overwhelmed new starter." crossed />
          <Box gold title="DELIBERATE SEQUENCE" body="Day-one essentials, then the next layer, then depth. Each confirmed before the next." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh08TimeToIndependent({ caption }: D) {
  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <Plate footer="Faster to productive, far less senior time, consistent every hire.">
        <Row>
          <Box title="WITHOUT THE SYSTEM" body="Rationed by the expert's availability. Senior person teaching most of a month." crossed />
          <Box gold title="WITH THE SYSTEM" body="Progress as fast as they can learn. Senior time only on the human parts." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh09WhyResist({ caption }: D) {
  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <Plate footer="Address the discomfort, not the objections, which are not the real issue.">
        <Stack>
          <Box title="COMPETENT ON THE OLD WAY" body="Confident and fast." />
          <Box title="A NOVICE AGAIN" body="Slow and unsure in front of others. Nobody enjoys it." crossed />
          <Box gold title="PRACTICAL OBJECTIONS" body="Wrapped around the real discomfort underneath." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh09WhyBeforeHow({ caption }: D) {
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <Plate footer="The why is what buys the willingness to push through the awkward phase.">
        <Row>
          <Box title="STRAIGHT TO THE HOW" body="Buttons to press. A wall of quiet resistance." crossed />
          <Box gold title="WHY FIRST, THEN HOW" body="The problem it solves, what is in it for them, then the steps. Met with willingness." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh09SupportThenCommit({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <Plate footer="Support without commitment fades. Commitment without support revolts.">
        <Stack>
          <Box title="TRAIN" body="Multiple formats." />
          <Box gold title="SUPPORT WINDOW" body="Questions invited. Agent absorbing them. Room to be temporarily incompetent." />
          <Box gold title="THE OLD WAY RETIRED" body="The new way becomes the only way." />
          <Box title="NO SUPPORT OR OLD WAY LEFT" body="Reversion. The failure branch." crossed />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh09TheDip({ caption }: D) {
  return (
    <Fig fig="FIG. 09.4" caption={caption}>
      <Plate footer="Expect the dip, and hold through it.">
        <Stack>
          <Box title="BEFORE CHANGE" body="Steady performance." />
          <Box title="THE DIP" body="Worse before better. Normal and temporary. Exactly when businesses panic and abandon it." crossed />
          <Box gold title="SUPPORT WINDOW" body="Holding people through the dip." />
          <Box gold title="HIGHER THAN BEFORE" body="Rising after the dip pays off." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh10Signals({ caption }: D) {
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <Plate footer="Training is not unmeasurable. The signals are all there, waiting to be used.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Box gold title="QUIZ RESULTS" body="Is knowledge landing?" />
          <Box title="AGENT QUESTIONS" body="A live map of what is unclear." />
          <Box title="ERROR RATES" body="Where training is weak." />
          <Box title="TIME TO INDEPENDENCE" body="Is onboarding improving?" gold />
        </div>
      </Plate>
    </Fig>
  )
}

export function BteCh10LibraryCompounds({ caption }: D) {
  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <Plate footer="The reward for treating training as a living system, not a finished project.">
        <Stack>
          <Box title="QUESTION UNANSWERED" body="Or a repeated mistake, or a new starter's confusion." />
          <Box gold title="CAPTURED AS NEW KNOWLEDGE" body="The knowledge base grows." />
          <Box gold title="ANSWERS MORE BEFORE ASKED" body="Gets better every time it is used." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh10HighestValueFirst({ caption }: D) {
  return (
    <Fig fig="FIG. 10.3" caption={caption}>
      <Plate footer="Start with the highest-value knowledge, prove it works, grow deliberately.">
        <Stack>
          <Box gold title="HIGHEST-VALUE KNOWLEDGE" body="Taught most often, most at risk. Proven by use." />
          <Box title="NEXT STEPS" body="Built only as gaps reveal themselves." />
          <Box title="DOCUMENT EVERYTHING AT ONCE" body="The firehose aimed at the project itself. Usually abandoned." crossed />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh11FourChecks({ caption }: D) {
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <Plate footer="Wrong training teaches wrong confidently. Accuracy is everything.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          <Box gold title="ACCURATE" body="Confirmed by someone who knows the work." />
          <Box title="CURRENT" body="How the business does it now." />
          <Box title="CLEAR" body="The actual person could follow it without the expert." />
          <Box title="CONFIRMED TO LAND" body="Checked on a real person or paired with a quiz." />
        </div>
        <Gate label="OFFICIAL TRAINING" />
      </Plate>
    </Fig>
  )
}

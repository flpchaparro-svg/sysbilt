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

export function BteCh04PersonIsSource({ caption }: D) {
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <Plate>
        <Row>
          <Box title="WRITER FROM OUTSIDE" body="Has to learn it first, slow, and it never happens." crossed />
          <Box gold title="EXPERT DOING THE WORK" body="Already knows the real how, including what they do not realise they know." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh04RecordNotWrite({ caption }: D) {
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <Plate footer="Not a documentation project. A conversation and a recording.">
        <Stack>
          <Box gold title="EXPERT TALKING + DOING" body="Voice and screen capture while the work happens." />
          <Box title="TOOLS" body="The expert shows and tells. The tools handle production." />
          <div className="grid grid-cols-3 gap-2">
            <Box title="PROCEDURE" />
            <Box title="VIDEO" />
            <Box title="GUIDE" gold />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh04CaptureAsWork({ caption }: D) {
  return (
    <Fig fig="FIG. 04.3" caption={caption}>
      <Plate footer="The asset grows by itself, from the actual work, without a big project.">
        <Stack>
          <Box gold title="SINGLE SOURCE OF TRUTH" body="Growing from capture moments above." />
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            <Box title="VOICE NOTE" />
            <Box title="SCREEN GRAB" />
            <Box title="DAILY WORK" body="Each time something is worked out or solved." gold />
          </div>
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh05FormatLibrary({ caption }: D) {
  return (
    <Fig fig="FIG. 05.1" caption={caption}>
      <Plate footer="Match the format to the knowledge and the people, not everything to everything.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          <Box title="PROCEDURES" body="Reference and precision." />
          <Box title="SCREEN VIDEOS" body="Digital tasks." />
          <Box title="AVATAR PRESENTERS" body="A face at scale." />
          <Box title="PODCASTS" body="Context, for the drive home." />
          <Box title="INFOGRAPHICS" body="Processes at a glance." />
          <Box title="SLIDE DECKS" body="Genuine group moments." />
          <Box title="QUIZZES" body="Confirming it landed." />
          <Box title="MEMORABLE EXTRAS" body="The critical, forgettable detail." />
          <Box title="IN-PERSON" body="Judgment, culture, practice." gold />
        </div>
      </Plate>
    </Fig>
  )
}

export function BteCh05Podcasts({ caption }: D) {
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <Plate>
        <Stack>
          <Box gold title="WRITTEN PROCEDURE" body="Turns into an audio conversation." />
          <Box title="LISTENING ON THE DRIVE" body="Reaches people in the time they cannot spend at a screen." />
          <Box gold title="WE CHANGED THIS" body="A short podcast on what and why. A premium touch that also works." />
        </Stack>
      </Plate>
    </Fig>
  )
}

export function BteCh05InPerson({ caption }: D) {
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <Plate footer="Reserve your people's teaching for where their presence actually adds something.">
        <Row>
          <Box title="LET THE SYSTEM CARRY" body="Routine procedures, software walkthroughs, standard context. A video does it better." crossed />
          <Box gold title="RESERVE FOR IN-PERSON" body="Judgment that needs discussion, culture that must be felt, hands-on practice, the sensitive conversation." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh06InFlow({ caption }: D) {
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <Plate footer="Put the answer where the question arises.">
        <Row>
          <Box title="SEPARATE LIBRARY" body="A place people have to remember to visit. A library nobody goes to." crossed />
          <Box gold title="ANSWER AT THE WORK" body="A few seconds from the question. Meets people where the need is." />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh06LookItUp({ caption }: D) {
  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <Plate footer="A team that looks it up has stopped queueing behind its experts.">
        <Row>
          <Box gold title="CHECK THE SYSTEM FIRST" body="Find the answer. Only works if the knowledge is there and findable." />
          <Box title="QUEUE BEHIND A BUSY EXPERT" body="The faded old path." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

export function BteCh06UpdateRitual({ caption }: D) {
  return (
    <Fig fig="FIG. 06.3" caption={caption}>
      <Plate footer="The moment a team catches the training being wrong once, they stop believing it entirely.">
        <Row>
          <Box gold title="UPDATE SAME DAY" body="A tool updates, the training updates in the same motion. Part of the change." />
          <Box title="STALE VERSION LEFT" body="Confidently teaching a new starter the old way. Worse than none." crossed />
        </Row>
      </Plate>
    </Fig>
  )
}

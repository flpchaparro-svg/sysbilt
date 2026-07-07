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

export function BttCh04ThreeDoors({ caption }: D) {
  return (
    <Fig fig="FIG. 04.1" caption={caption}>
      <Plate footer="Most businesses walk through the expensive door for jobs the cheap one does.">
        <Stack><Box gold title="DOOR 1 · CHAT SUBSCRIPTION" body="A person and a window. Most of the value for many businesses." /><Box title="DOOR 2 · AI INSIDE YOUR TOOLS" body="Context built in. Data stays home." /><Box title="DOOR 3 · THE API" body="Powerful, metered, earned." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh04SizedToJob({ caption }: D) {
  return (
    <Fig fig="FIG. 04.2" caption={caption}>
      <Plate footer="Default: smallest model that does the job well.">
        <Stack><Row><Box title="CLASSIFY · EXTRACT · ROUTE" body="Small model · cents" /><Box gold title="CLIENT DRAFT · RESEARCH BRIEF" body="Large model · more cents" /></Row><Box title="REASONING MODEL ON MAIL" body="Premium, and rare at your size." crossed /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh04Arithmetic({ caption }: D) {
  return (
    <Fig fig="FIG. 04.3" caption={caption}>
      <Plate footer="Skip the discipline and the technology happily inverts it, all night.">
        <Row><Box gold title="WELL-DESIGNED AI TASK" body="Cents per task." /><Box title="HUMAN HOUR PREPARED" body="Two orders of magnitude more." /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh05LibraryMap({ caption }: D) {
  return (
    <Fig fig="FIG. 05.1" caption={caption}>
      <Plate>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3"><Box gold title="SUMMARISING" /><Box title="DRAFTING" /><Box title="CLASSIFYING" /><Box title="EXTRACTING" /><Box title="RESEARCHING" /><Box title="ANSWERING" /><Box title="IMAGES" /><Box title="CODE" crossed /></div><p className="mt-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#8B6914]">SOLD AS AI, DONE BY A RULE</p>
      </Plate>
    </Fig>
  )
}

export function BttCh05ImagesLine({ caption }: D) {
  return (
    <Fig fig="FIG. 05.2" caption={caption}>
      <Plate footer="Your gallery is testimony. Testimony is not generated.">
        <Row><Box gold title="SAFE" body="Concepts, internal docs, mood boards. Supports the brand." /><Box title="DANGEROUS" body="Your products, people, finished work presented as real." crossed /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh05WhoAnswers2am({ caption }: D) {
  return (
    <Fig fig="FIG. 05.3" caption={caption}>
      <Plate footer="The answer must be a name, not a model.">
        <Stack><Box title="AI-BUILT WEBSITE" body="Looks finished above the waterline." gold /><Box title="BELOW THE WATERLINE" body="Security · maintenance · accountability · question marks." crossed /><Gate label="WHO ANSWERS FOR IT IN THE ELEVENTH MONTH?" /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh05OtherColumn({ caption }: D) {
  return (
    <Fig fig="FIG. 05.4" caption={caption}>
      <Plate footer="If the input is already structured, pay plumbing prices.">
        <Row><Box title="THE PITCH" body="AI enquiry routing · AI report engine · AI follow-up system." crossed /><Box gold title="THE TRUTH" body="Form dropdown · template plus data · automation chapter five." /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh06BriefingFourParts({ caption }: D) {
  return (
    <Fig fig="FIG. 06.1" caption={caption}>
      <Plate footer="Vague in, fluff out. Specific in, a draft worth editing.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box gold title="CONTEXT" /><Box gold title="THE ASK" /><Box gold title="CONSTRAINTS" /><Box gold title="EXAMPLES" /></div>
      </Plate>
    </Fig>
  )
}

export function BttCh06PromptLibrary({ caption }: D) {
  return (
    <Fig fig="FIG. 06.2" caption={caption}>
      <Plate footer="One person's knack, everyone's capability.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box title="PROPOSAL DRAFT" /><Box title="REVIEW REPLY" /><Box title="POLITE CHASE" /><Box title="MEETING SUMMARY" gold /></div>
      </Plate>
    </Fig>
  )
}

export function BttCh06SwitchOffTest({ caption }: D) {
  return (
    <Fig fig="FIG. 06.3" caption={caption}>
      <Plate footer="Nothing measured, nothing killed, everything drifts.">
        <Stack><Box title="COSTS (roughly)" /><Box title="SAVES (roughly)" /><Box title="GOT WRONG (logged)" gold /><Row><Box gold title="MEASURED WELL → STAYS" /><Box title="NOVELTY → OFF" crossed /></Row></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh07PrivacyLine({ caption }: D) {
  return (
    <Fig fig="FIG. 07.1" caption={caption}>
      <Plate footer="Whose information is this, and would they be comfortable with where it is going?">
        <Stack><Box gold title="AI INSIDE YOUR OWN TOOLS" body="Permitted. Data stays walled." /><Box title="PUBLIC AI TOOLS" body="May leave your control entirely." crossed /><Box title="STRIPPED OF IDENTIFYING DETAILS" body="Permitted with care." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh07WhyInvents({ caption }: D) {
  return (
    <Fig fig="FIG. 07.2" caption={caption}>
      <Plate footer="The doubting is, permanently, your department.">
        <Row><Box title="TRUE" body="Confident, fluent output." gold /><Box title="INVENTED" body="Same shape. Visually identical." crossed /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh07TrustGradient({ caption }: D) {
  return (
    <Fig fig="FIG. 07.3" caption={caption}>
      <Plate footer="Trust it most where you can check it fastest.">
        <Stack><Box gold title="HIGH TRUST" body="Summaries against sources you know. Drafts from facts you supplied." /><Box title="LOW TRUST" body="Figures you did not provide. Citations you have not opened." crossed /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh08AgentTerritory({ caption }: D) {
  return (
    <Fig fig="FIG. 08.1" caption={caption}>
      <Plate footer="An agent that says let me get someone is protecting your brand.">
        <Stack><Box gold title="INSIDE TERRITORY" body="Routine · capture · qualifying · any hour." /><Gate label="THE HANDOFF · CONTEXT ATTACHED" /><Box title="OUTSIDE" body="Judgment · emotion · edge of knowledge." crossed /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh08KnowledgeProduct({ caption }: D) {
  return (
    <Fig fig="FIG. 08.2" caption={caption}>
      <Plate footer="Build it once properly and the agent is merely its first employee.">
        <Stack><Box title="THE AGENT" body="The easy fortnight at the end." /><Box gold title="THE KNOWLEDGE" body="Services, prices, policies, processes, answers. Written down, current, owned." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh08ListeningLoop({ caption }: D) {
  return (
    <Fig fig="FIG. 08.3" caption={caption}>
      <Plate footer="Every recurring fumble is an instruction.">
        <Stack><Box title="CUSTOMERS ASK" /><Box title="AGENT ANSWERS (AND FUMBLES SOME)" /><Box title="FUMBLES MAP WHAT IS THIN" gold /><Box title="KNOWLEDGE UPDATED → EVERYTHING IMPROVES" gold /></Stack>
      </Plate>
    </Fig>
  )
}


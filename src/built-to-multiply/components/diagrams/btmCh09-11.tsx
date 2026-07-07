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

export function BtmCh09ContentPointsHome({ caption }: D) {
  return (
    <Fig fig="FIG. 09.1" caption={caption}>
      <Plate footer="The top of a machine with nothing underneath earns nothing. Build the whole chain.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3"><Box gold title="CONTENT" /><Box title="LINK" /><Box title="SITE" /><Box title="CAPTURE" /><Box title="CRM" /><Box title="FOLLOW-UP" gold /></div>
      </Plate>
    </Fig>
  )
}

export function BtmCh09CommentToLead({ caption }: D) {
  return (
    <Fig fig="FIG. 09.2" caption={caption}>
      <Plate footer="A moment of public attention becomes a named lead, while you were doing something else.">
        <Stack><Box title="COMMENT ON POST" /><Box title="SYSTEM NOTICES" gold /><Box title="AUTO DM + LINK" gold /><Box title="CONTACT IN CRM, TAGGED" gold /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh09RentedPermissions({ caption }: D) {
  return (
    <Fig fig="FIG. 09.3" caption={caption}>
      <Plate footer="Build it properly: rented permissions that change, limits respected, a human on judgment, monitoring on the flow.">
        <Stack><Box title="PLATFORM PERMISSIONS BRIDGE" body="Rules can change. Messages can silently stop." crossed /><Box gold title="MONITOR + HUMAN GATE" body="Are leads actually flowing? Judgment stays human." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh10ToolsWithoutTraining({ caption }: D) {
  return (
    <Fig fig="FIG. 10.1" caption={caption}>
      <Plate footer="Training turns a liability into an asset.">
        <Row><Box title="TOOLS, NO TRAINING" body="Fast flood, off-brand, unmeasured." crossed /><Box gold title="TOOLS IN A TRAINED SYSTEM" body="Consistent, earning content." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh10TeamWrittenDown({ caption }: D) {
  return (
    <Fig fig="FIG. 10.2" caption={caption}>
      <Plate footer="Written down and taught, so anyone can run the line, not just the person who invented it.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3"><Box title="PROCEDURES" gold /><Box title="WHICH TOOL" /><Box title="WHICH MODEL" /><Box title="PROMPT LIBRARY" /><Box title="BRAND RULES" /><Box title="WHO APPROVES" gold /></div>
      </Plate>
    </Fig>
  )
}

export function BtmCh10OneChannelNext({ caption }: D) {
  return (
    <Fig fig="FIG. 10.3" caption={caption}>
      <Plate footer="Excellent on one beats thin across six. Add the next only when the current one runs without heroics.">
        <Stack><Box gold title="CHANNEL ONE · SOLID" body="Rhythm, measured, earning, team-run." /><Box title="SIX CHANNELS AT ONCE" body="Thin everywhere. The flood in ambitious costume." crossed /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh11FourChecks({ caption }: D) {
  return (
    <Fig fig="FIG. 11.1" caption={caption}>
      <Plate>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box gold title="BRAND" /><Box title="TRUTH" /><Box title="RIGHTS" /><Box title="QUALITY" /></div><Gate label="PUBLISH" />
      </Plate>
    </Fig>
  )
}


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

export function BttCh01TwoTruths({ caption }: D) {
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <Plate footer="This book is the composed middle.">
        <Row><Box gold title="THE SHIFT IS REAL" body="Capable AI now within reach of a growing business, not just giants." /><Box title="THE WASTE IS REALER" body="Tool bought first, problem defined never, nobody measuring." crossed /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh01OneRule({ caption }: D) {
  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <Plate footer="If a checkbox can do it, do not pay a model to think about it.">
        <Stack><Box title="HUMANS" body="The decisions: approve, send, account for it." gold /><Box title="AI" body="The judgment work: read, summarise, draft, make sense of mess." /><Box title="RULES" body="The machine work: copy, route, remind, when-this-then-that." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh01InventoryCamera({ caption }: D) {
  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <Plate footer="Exciting is not a business case.">
        <Row><Box title="AI CAMERAS" body="Impressive, expensive, corrections cost more than counting." crossed /><Box gold title="CLIPBOARD & CHECKLIST" body="Already solved it." /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh02PredictionMachine({ caption }: D) {
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <Plate footer="Built to sound right. Being right is a frequent side effect.">
        <Stack><Box title="MOST PLAUSIBLE NEXT WORDS" body="Given everything so far, the model predicts what comes next." gold /><Row><Box gold title="BRILLIANT WITH MESSY LANGUAGE" /><Box title="CONFIDENTLY WRONG" body="Fluent, plausible, no signal anything is amiss." crossed /></Row></Stack>
      </Plate>
    </Fig>
  )
}

export function BttCh02MemoryWindowMeter({ caption }: D) {
  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <Plate footer="Three mechanics, three spending decisions in disguise.">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3"><Box title="NO MEMORY" body="Context must be supplied every time." /><Box title="THE WINDOW" body="Everything it weighs must fit." /><Box title="THE METER" body="Priced by the token, roughly the word." gold /></div>
      </Plate>
    </Fig>
  )
}

export function BttCh02BarristerMail({ caption }: D) {
  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <Plate footer="Match the model to the job. Default small.">
        <Row><Box title="REASONING MODEL ON ROUTINE TASKS" body="Multiples of the price, all of the wait." crossed /><Box gold title="STANDARD MODEL" body="Fast, cheap. Most of your work is mail." /></Row>
      </Plate>
    </Fig>
  )
}

export function BttCh03FourFeatures({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <Plate footer="It needs all four.">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box gold title="MESSY IN" body="Language, documents, mess." /><Box gold title="CHECKABLE OUT" body="A thirty-second human read." /><Box gold title="REAL VOLUME" body="Recurs enough to compound." /><Box gold title="CHEAP WRONGNESS" body="Errors caught at a gate." /></div>
      </Plate>
    </Fig>
  )
}

export function BttCh03ThreeQuestions({ caption }: D) {
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <Plate footer="No good answer to the third, no deployment.">
        <Stack><Box gold title="1 · COULD A RULE DO THIS?" body="The most valuable, least asked." /><Box title="2 · WHAT DOES WRONG COST?" body="Price the failure, not the average." /><Box title="3 · WHO CATCHES IT?" body="A named human, at a gate." /></Stack>
      </Plate>
    </Fig>
  )
}


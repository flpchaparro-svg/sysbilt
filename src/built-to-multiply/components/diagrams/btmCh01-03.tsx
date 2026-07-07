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

export function BtmCh01WallFell({ caption }: D) {
  return (
    <Fig fig="FIG. 01.1" caption={caption}>
      <Plate footer="When everyone can do a thing, doing it stops setting you apart.">
        <Row><Box title="BEFORE" body="The cost of making was the wall. Only big budgets climbed." crossed /><Box gold title="NOW" body="Making is free. Making is no longer the edge." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh01FireEmptyRoom({ caption }: D) {
  return (
    <Fig fig="FIG. 01.2" caption={caption}>
      <Plate footer="Earn attention, and point it at something you own.">
        <Row><Box title="ATTENTION ON RENTED GROUND" body="A flame with no path. Attention that goes nowhere." crossed /><Box gold title="THE PATH HOME" body="The same flame carried to ground you own." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh01FloodOrSystem({ caption }: D) {
  return (
    <Fig fig="FIG. 01.3" caption={caption}>
      <Plate footer="Less made. More earned.">
        <Row><Box title="THE FLOOD" body="No reason, no consistency, no learning, no path." crossed /><Box gold title="THE SYSTEM" body="One source, a voice, a line, a loop, a pipe." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh02ThreeJobs({ caption }: D) {
  return (
    <Fig fig="FIG. 02.1" caption={caption}>
      <Plate footer="Match the asset to the job, and every dollar lands where it works.">
        <Stack><Box gold title="AWARENESS" body="Get discovered. Measured by reach and how well it holds." /><Box title="CONSIDERATION" body="Build trust. Measured by saves, shares, meaningful engagement." /><Box title="LEAD CAPTURE" body="Turn interest into action. Measured by clicks and captures." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh02InvestmentJob({ caption }: D) {
  return (
    <Fig fig="FIG. 02.2" caption={caption}>
      <Plate footer="The investment follows the job, never the impulse to make the impressive thing.">
        <Row><Box gold title="AWARENESS" body="Many small cheap pieces to learn what lands." /><Box title="CONVERSION" body="One considered piece when you ask someone to believe or act." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh02FewRooms({ caption }: D) {
  return (
    <Fig fig="FIG. 02.3" caption={caption}>
      <Plate footer="Genuinely good in two rooms beats forgettable in six.">
        <Row><Box title="SIX ROOMS, THIN" body="Everywhere, forgettable." crossed /><Box gold title="TWO ROOMS, FULL" body="Properly present where your person actually is." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh03HookValueAction({ caption }: D) {
  return (
    <Fig fig="FIG. 03.1" caption={caption}>
      <Plate footer="Miss the hook and nobody sees it. Miss the value and nobody trusts it. Miss the action and nobody moves.">
        <Stack><Box gold title="HOOK" body="Stops the scroll. Matters more than everything after." /><Box title="VALUE" body="The thing it actually gives." /><Box title="ACTION" body="The next step it wants." /></Stack>
      </Plate>
    </Fig>
  )
}

export function BtmCh03OneIdea({ caption }: D) {
  return (
    <Fig fig="FIG. 03.2" caption={caption}>
      <Plate footer="One idea, done properly, then the next.">
        <Row><Box title="FIVE IDEAS CRAMMED" body="The viewer leaves with none." crossed /><Box gold title="FIVE POSTS, ONE IDEA EACH" body="One idea per piece. The system multiplies." /></Row>
      </Plate>
    </Fig>
  )
}

export function BtmCh03VariationsUnit({ caption }: D) {
  return (
    <Fig fig="FIG. 03.3" caption={caption}>
      <Plate footer="One post is a guess. Ten variations is an experiment. The system is what makes that survivable.">
        <Stack><Box gold title="ONE IDEA" body="At the centre." /><div className="grid grid-cols-2 gap-2 md:grid-cols-4"><Box title="HOOK A" /><Box title="HOOK B" /><Box title="HOOK C" gold /><Box title="MORE LIKE WINNER" gold /></div></Stack>
      </Plate>
    </Fig>
  )
}


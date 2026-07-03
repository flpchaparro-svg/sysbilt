import { useId } from 'react'
import { BtwFigure } from '../BtwFigure'

export function HubSpokeDiagram({ caption }: { caption: string }) {
  const uid = useId().replace(/:/g, '')
  const ink = `arrInk-${uid}`
  const gold = `arrGold-${uid}`

  return (
    <BtwFigure fig="FIG. 09.1" caption={caption}>
      <svg
        viewBox="0 0 720 560"
        className="block h-auto w-full"
        role="img"
        aria-label="Hub and spoke diagram of a website at the centre of connected systems"
      >
        <defs>
          <marker id={ink} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L9,5 L0,10 z" fill="#1A1A1A" />
          </marker>
          <marker id={gold} viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0,0 L9,5 L0,10 z" fill="#8B6914" />
          </marker>
        </defs>
        <path d="M171.5,197.1 L294.1,251.1" stroke="#1A1A1A" strokeWidth="1.5" fill="none" markerEnd={`url(#${ink})`} opacity="0.6" />
        <path d="M360,120 L360,208" stroke="#1A1A1A" strokeWidth="1.5" fill="none" markerEnd={`url(#${ink})`} opacity="0.6" />
        <path d="M548.5,197.1 L425.9,251.1" stroke="#1A1A1A" strokeWidth="1.5" fill="none" markerEnd={`url(#${ink})`} opacity="0.6" />
        <path d="M548.5,372.9 L425.9,308.9" stroke="#1A1A1A" strokeWidth="1.5" fill="none" markerEnd={`url(#${ink})`} opacity="0.6" />
        <path d="M360,352 L360,440" stroke="#8B6914" strokeWidth="1.5" fill="none" markerEnd={`url(#${gold})`} />
        <path d="M294.1,308.9 L171.5,372.9" stroke="#8B6914" strokeWidth="1.5" fill="none" markerEnd={`url(#${gold})`} />
        <circle cx="360" cy="280" r="64" fill="#1A1A1A" stroke="#C5A059" strokeWidth="2" />
        <text x="360" y="274" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="15" fontWeight="700" letterSpacing="1" fill="#D4A84B">
          WEBSITE
        </text>
        <text x="360" y="296" textAnchor="middle" fontFamily="ui-monospace, Menlo, monospace" fontSize="10" fontWeight="700" letterSpacing="3" fill="rgba(255,242,236,0.65)">
          THE HUB
        </text>
        <g fontFamily="ui-monospace, Menlo, monospace" fontSize="13" fontWeight="700" letterSpacing="1.4" fill="#1A1A1A">
          <rect x="66" y="159" width="156" height="52" rx="2" fill="#FFF2EC" stroke="#1A1A1A" strokeWidth="1.4" />
          <text x="144" y="190" textAnchor="middle">CRM</text>
          <rect x="282" y="64" width="156" height="52" rx="2" fill="#FFF2EC" stroke="#1A1A1A" strokeWidth="1.4" />
          <text x="360" y="95" textAnchor="middle">AUTOMATION</text>
          <rect x="498" y="159" width="156" height="52" rx="2" fill="#FFF2EC" stroke="#1A1A1A" strokeWidth="1.4" />
          <text x="576" y="190" textAnchor="middle">REPORTING</text>
          <rect x="498" y="349" width="156" height="52" rx="2" fill="#FFF2EC" stroke="#1A1A1A" strokeWidth="1.4" />
          <text x="576" y="380" textAnchor="middle">PHONE + AI</text>
          <rect x="282" y="444" width="156" height="52" rx="2" fill="#FFF2EC" stroke="#8B6914" strokeWidth="1.4" />
          <text x="360" y="475" textAnchor="middle" fill="#8B6914">CONTENT</text>
          <rect x="66" y="349" width="156" height="52" rx="2" fill="#FFF2EC" stroke="#8B6914" strokeWidth="1.4" />
          <text x="144" y="380" textAnchor="middle" fill="#8B6914">SOCIAL</text>
        </g>
      </svg>
      <div className="mt-4 flex flex-wrap gap-5 border-t border-[#1a1a1a]/10 pt-4">
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]/60">
          <span className="w-[18px] border-t-[1.5px] border-[#1a1a1a]" /> Feeds the hub
        </span>
        <span className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B6914]">
          <span className="w-[18px] border-t-[1.5px] border-[#8B6914]" /> Broadcasts out
        </span>
      </div>
    </BtwFigure>
  )
}

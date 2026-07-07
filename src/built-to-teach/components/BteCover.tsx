import { Link } from 'react-router-dom'
import { BTE_META } from '../types'
import { BTW_PRINT_PAGE_CREAM, BTW_PRINT_PAGE_DARK } from '../../built-to-work/styles'
import { BTW_TOKENS } from '../../built-to-work/tokens'

export function BteCoverPage() {
  return (
    <div className={BTW_PRINT_PAGE_CREAM} style={{ backgroundColor: BTW_TOKENS.cream, color: BTW_TOKENS.ink }}>
      <div className="pointer-events-none absolute inset-[clamp(18px,2.4vw,30px)]" style={{ border: '1px solid rgba(26,26,26,0.22)' }} />
      <div className="relative flex flex-1 flex-col justify-between p-[clamp(48px,7vw,80px)]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4">
          <div className="font-serif text-[22px] font-bold tracking-[0.02em]" style={{ color: BTW_TOKENS.ink }}>SYSBILT</div>
          <div className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-right leading-[1.7]" style={{ color: 'rgba(26,26,26,0.55)' }}>
            The SYSBILT<br />Business Guides<br /><span style={{ color: BTW_TOKENS.goldOnCream }}>No. 07</span>
          </div>
        </div>
        <div className="my-auto">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] mb-[26px]" style={{ color: BTW_TOKENS.goldOnCream }}>/ A FIELD GUIDE FOR TRAINING</div>
          <h1 className="font-serif font-medium leading-[0.9] tracking-[-0.045em] m-0" style={{ fontSize: 'clamp(56px, 11vw, 104px)', color: BTW_TOKENS.ink }}>
            Built<br />to <span className="italic" style={{ color: BTW_TOKENS.goldOnCream }}>Teach</span>
          </h1>
          <div className="w-16 h-[2px] my-10" style={{ backgroundColor: BTW_TOKENS.gold }} />
          <p className="font-sans font-light leading-[1.55] max-w-[34ch] m-0" style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', color: 'rgba(26,26,26,0.72)' }}>{BTE_META.subtitle}</p>
        </div>
        <div className="flex justify-between items-end gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: 'rgba(26,26,26,0.55)' }}>
          <span>First edition · 2026</span>
          <span style={{ color: BTW_TOKENS.goldOnCream }}>sysbilt.com</span>
        </div>
      </div>
    </div>
  )
}

export function BteClosingPage() {
  return (
    <div className={`${BTW_PRINT_PAGE_DARK} bg-[#111111] text-[#FFF2EC]`}>
      <div className="pointer-events-none absolute inset-[clamp(18px,2.4vw,30px)] border border-[#FFF2EC]/12" />
      <div className="relative flex flex-1 flex-col justify-between p-[clamp(48px,7vw,80px)]">
        <div className="font-serif text-[20px] font-bold tracking-[0.02em] text-[#FFF2EC]">SYSBILT</div>
        <div className="my-auto">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#D4A84B] mb-[26px]">/ THE NEXT STEP</div>
          <h2 className="font-serif font-medium text-[clamp(38px,7vw,72px)] leading-[0.98] tracking-[-0.035em] text-[#FFF2EC] m-0 max-w-[18ch]">
            Knowledge owned, not <span className="italic text-[#D4A84B]">rented</span>
          </h2>
          <p className="font-sans font-light text-[clamp(16px,1.8vw,20px)] leading-[1.6] text-[#FFF2EC]/80 max-w-[50ch] mt-8 mb-10">
            Start with a Training Systems Review. A straight, no-obligation look at where your knowledge lives, how onboarding works, and what we would build first. No pitch, no pressure.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-3 font-mono text-[12px] font-bold uppercase tracking-[0.2em] bg-[#D4A84B] text-[#1A1A1A] px-7 py-[18px] hover:bg-[#C5A059] transition-colors print:hidden">
            Request your review at sysbilt.com
          </Link>
        </div>
        <div className="pt-6 border-t border-[#FFF2EC]/14 flex justify-between flex-wrap gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFF2EC]/50">
          <span>Built to Teach · No. 07</span>
          <span className="text-[#D4A84B]">Lead, don&apos;t repeat.</span>
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { Link } from 'react-router-dom'
import ShareButton from '../../components/ShareButton'
import { SITE_ORIGIN } from '../../constants/seoMeta'
import { BTR_META } from '../types'
import { BTW_PRINT_PAGE_CREAM, BTW_PRINT_PAGE_DARK } from '../../built-to-work/styles'
import { BTW_TOKENS } from '../../built-to-work/tokens'

export function BtrCoverPage() {
  const [showModal, setShowModal] = useState(false)

  const handlePrint = () => {
    setShowModal(false)
    setTimeout(() => window.print(), 150)
  }

  const shareUrl = `${SITE_ORIGIN}/guides/${BTR_META.slug}`

  return (
    <div className={BTW_PRINT_PAGE_CREAM} style={{ backgroundColor: BTW_TOKENS.cream, color: BTW_TOKENS.ink }}>
      <div
        className="pointer-events-none absolute inset-[clamp(18px,2.4vw,30px)]"
        style={{ border: '1px solid rgba(26,26,26,0.22)' }}
      />

      {showModal ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1a1a1a]/50 backdrop-blur-sm print:hidden">
          <div className="relative w-[90%] max-w-[320px] border border-[#1A1A1A] bg-[#FFF2EC] p-6 text-center">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#1A1A1A]/40 hover:text-[#1A1A1A]"
              aria-label="Close"
            >
              ×
            </button>
            <h3 className="font-serif text-[22px] font-medium text-[#1A1A1A] mb-2">How to save?</h3>
            <p className="font-sans text-[14px] text-[#1A1A1A]/60 mb-2">Unlock the guide first, then print the full book.</p>
            <p className="font-sans text-[12px] text-[#1A1A1A]/45 mb-6">Use Save as PDF in the print dialog.</p>
            <div className="flex flex-col gap-3">
              <ShareButton url={shareUrl} title={BTR_META.title} mode="inline" variant="neumorphic" className="justify-center" />
              <button
                type="button"
                onClick={handlePrint}
                className="w-full border border-[#1A1A1A] bg-[#1A1A1A] px-5 py-3 font-mono text-[11px] font-bold uppercase tracking-widest text-[#FFF2EC]"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <div className="relative flex flex-1 flex-col justify-between p-[clamp(48px,7vw,80px)]">
        <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-4">
          <div className="font-serif text-[22px] font-bold tracking-[0.02em]" style={{ color: BTW_TOKENS.ink }}>
            SYSBILT
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="shrink-0 border border-[#1A1A1A] bg-[#FFF2EC] px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-[#FFF2EC] transition-colors print:hidden"
          >
            Save / Print
          </button>
          <div
            className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-right leading-[1.7]"
            style={{ color: 'rgba(26,26,26,0.55)' }}
          >
            The SYSBILT
            <br />
            Business Guides
            <br />
            <span style={{ color: BTW_TOKENS.goldOnCream }}>No. 04</span>
          </div>
        </div>

        <div className="my-auto">
          <div
            className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] mb-[26px]"
            style={{ color: BTW_TOKENS.goldOnCream }}
          >
            / A FIELD GUIDE FOR AUTOMATION
          </div>
          <h1
            className="font-serif font-medium leading-[0.9] tracking-[-0.045em] m-0"
            style={{ fontSize: 'clamp(56px, 11vw, 104px)', color: BTW_TOKENS.ink }}
          >
            Built
            <br />
            to <span className="italic" style={{ color: BTW_TOKENS.goldOnCream }}>Run</span>
          </h1>
          <div className="w-16 h-[2px] my-10" style={{ backgroundColor: BTW_TOKENS.gold }} />
          <p
            className="font-sans font-light leading-[1.55] max-w-[34ch] m-0"
            style={{ fontSize: 'clamp(17px, 1.8vw, 21px)', color: 'rgba(26,26,26,0.72)' }}
          >
            {BTR_META.subtitle}
          </p>
        </div>

        <div
          className="flex justify-between items-end gap-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
          style={{ color: 'rgba(26,26,26,0.55)' }}
        >
          <span>First edition · 2026</span>
          <span style={{ color: BTW_TOKENS.goldOnCream }}>sysbilt.com</span>
        </div>
      </div>
    </div>
  )
}

export function BtrClosingPage() {
  return (
    <div className={`${BTW_PRINT_PAGE_DARK} bg-[#111111] text-[#FFF2EC]`}>
      <div className="pointer-events-none absolute inset-[clamp(18px,2.4vw,30px)] border border-[#FFF2EC]/12" />

      <div className="relative flex flex-1 flex-col justify-between p-[clamp(48px,7vw,80px)]">
        <div className="flex justify-between items-start gap-4">
          <div className="font-serif text-[20px] font-bold tracking-[0.02em] text-[#FFF2EC]">SYSBILT</div>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4A84B] border border-[#D4A84B]/40 px-[11px] py-1.5">
            &lt; 24 HRS
          </span>
        </div>

        <div className="my-auto">
          <div className="font-mono text-[11px] font-bold uppercase tracking-[0.26em] text-[#D4A84B] mb-[26px]">
            / THE NEXT STEP
          </div>
          <h2 className="font-serif font-medium text-[clamp(38px,7vw,72px)] leading-[0.98] tracking-[-0.035em] text-[#FFF2EC] m-0 max-w-[16ch]">
            When you&apos;re ready to stop being the{' '}
            <span className="italic text-[#D4A84B]">glue</span>
          </h2>
          <p className="font-sans font-light text-[clamp(16px,1.8vw,20px)] leading-[1.6] text-[#FFF2EC]/80 max-w-[50ch] mt-8 mb-10">
            Start with an Automation Systems Review. A straight, no-obligation look at how your business runs its routine
            work. No pitch, no pressure — a clear map of what your week could stop containing.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 font-mono text-[12px] font-bold uppercase tracking-[0.2em] bg-[#D4A84B] text-[#1A1A1A] px-7 py-[18px] hover:bg-[#C5A059] transition-colors print:hidden"
          >
            Request your review at sysbilt.com
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="pt-6 border-t border-[#FFF2EC]/14 flex justify-between flex-wrap gap-3 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFF2EC]/50">
          <span>Built to Run · No. 04</span>
          <span className="text-[#D4A84B]">Design compounds</span>
        </div>
      </div>
    </div>
  )
}

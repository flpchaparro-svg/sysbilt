import { BtwFigure } from '../BtwFigure'

export function AnatomyDiagram({ caption }: { caption: string }) {
  return (
    <BtwFigure fig="FIG. 03.1" caption={caption}>
      <div className="flex items-stretch gap-5 md:gap-8">
        <div className="flex w-[34%] min-w-[120px] max-w-[210px] shrink-0 flex-col border-[1.5px] border-[#1a1a1a] bg-[#FFF2EC]">
          <div className="flex flex-[2.2] flex-col justify-center gap-2 border-b border-[#1a1a1a]/18 p-3.5">
            <div className="h-2 w-[80%] bg-[#1a1a1a]" />
            <div className="h-2 w-[55%] bg-[#1a1a1a]" />
            <div className="mt-1 h-1.5 w-[70%] bg-[#1a1a1a]/30" />
          </div>
          <div className="flex flex-[1.4] items-center gap-1.5 border-b border-[#1a1a1a]/18 p-3.5">
            <div className="h-[22px] w-[22px] shrink-0 rounded-full bg-[#C5A059]/50" />
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="h-1 w-[90%] bg-[#1a1a1a]/28" />
              <div className="h-1 w-[60%] bg-[#1a1a1a]/28" />
            </div>
          </div>
          <div className="flex flex-[1.4] flex-col justify-center gap-1.5 border-b border-[#1a1a1a]/18 p-3.5">
            <div className="h-1.5 w-[75%] bg-[#1a1a1a]/30" />
            <div className="h-1.5 w-[85%] bg-[#1a1a1a]/30" />
          </div>
          <div className="flex flex-[1.1] items-center justify-center p-3.5">
            <div className="h-[26px] w-[80%] rounded-sm bg-[#C5A059]" />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between py-1">
          {[
            ['01', 'Hero', 'One clear promise. Who it\'s for.', false],
            ['02', 'Proof', 'Evidence you can deliver.', false],
            ['03', 'Offer', 'A reason to act now.', false],
            ['04', 'Action', 'One clear button. Nothing else.', true],
          ].map(([num, title, desc, gold]) => (
            <div key={num as string}>
              <div
                className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${gold ? 'text-[#8B6914]' : 'text-[#1a1a1a]'}`}
              >
                {num} &nbsp;{title}
              </div>
              <div className="mt-1 font-sans text-[13px] leading-[1.5] text-[#1a1a1a]/62">{desc as string}</div>
            </div>
          ))}
        </div>
      </div>
    </BtwFigure>
  )
}

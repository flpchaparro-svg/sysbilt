import {PortableText, type PortableTextComponents} from '@portabletext/react'
import {Info} from 'lucide-react'
import {urlFor} from '../../sanityClient'

const THEME = {
  textMain: 'text-gold-on-dark',
  borderMain: 'border-gold-on-dark',
  bgSubtle: 'bg-white/5',
  borderSubtle: 'border-white/10',
}

export function toolkitHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function blockText(block: {children?: {text?: string}[]}): string {
  return block.children?.map((c) => c.text ?? '').join('') ?? ''
}

export function getToolkitSectionsFromBody(
  body: { _type?: string; style?: string; children?: {text?: string}[] }[] | undefined,
): {id: string; text: string}[] {
  if (!body?.length) return []
  return body
    .filter((block) => block._type === 'block' && block.style === 'h2')
    .map((block) => {
      const text = blockText(block)
      return {id: toolkitHeadingId(text), text}
    })
    .filter((item) => item.id && item.text)
}

export function ToolkitPortableText({value}: {value: unknown}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({children}) => (
        <p className="type-body text-white/75 leading-relaxed text-pretty mb-6 last:mb-0">{children}</p>
      ),
      h2: ({children, value}) => {
        const text = blockText(value as {children?: {text?: string}[]})
        const id = toolkitHeadingId(text)
        return (
          <h2
            id={id}
            className="scroll-mt-32 font-sans font-bold text-xl md:text-2xl uppercase tracking-tight text-white mb-5 mt-16 md:mt-20 first:mt-0 flex items-center gap-3"
          >
            <span className={THEME.textMain}>//</span>
            <span>{children}</span>
          </h2>
        )
      },
      h3: ({children}) => (
        <h3 className="font-sans font-bold text-lg uppercase tracking-tight text-white/90 mb-4 mt-10">{children}</h3>
      ),
      blockquote: ({children}) => (
        <blockquote className="border-l-2 border-gold-on-dark/60 pl-6 my-8 type-body text-white/70 italic">{children}</blockquote>
      ),
    },
    list: {
      bullet: ({children}) => (
        <ul className="border-t border-white/15 mb-8 space-y-0">{children}</ul>
      ),
      number: ({children}) => (
        <ol className="border-t border-white/15 mb-8 list-decimal list-inside space-y-0">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({children}) => (
        <li className="flex gap-4 py-4 border-b border-white/10 type-body text-white/75 leading-relaxed">
          <span className={`type-eyebrow ${THEME.textMain} shrink-0 pt-0.5`}>→</span>
          <span>{children}</span>
        </li>
      ),
      number: ({children}) => (
        <li className="py-4 border-b border-white/10 type-body text-white/75 leading-relaxed">{children}</li>
      ),
    },
    marks: {
      strong: ({children}) => <strong className="font-semibold text-white">{children}</strong>,
      em: ({children}) => <em className="italic text-white/85">{children}</em>,
      code: ({children}) => (
        <code className="font-mono text-sm bg-white/10 px-1.5 py-0.5 text-gold-on-dark">{children}</code>
      ),
      link: ({children, value}) => (
        <a
          href={value?.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold-on-dark underline underline-offset-4 hover:text-white transition-colors"
        >
          {children}
        </a>
      ),
    },
    types: {
      image: ({value}) => {
        if (!value?.asset?._ref) return null
        const alt = value.alt?.trim() || value.caption?.trim() || 'Tool illustration'
        return (
          <figure className="my-10 border-2 border-cream/20 bg-white/5 p-2">
            <img
              src={urlFor(value).width(1200).url()}
              alt={alt}
              className="w-full h-auto object-cover"
              loading="lazy"
              decoding="async"
            />
            {value.caption && (
              <figcaption className="font-mono text-[10px] uppercase tracking-wider text-cream/50 mt-3 px-2">
                {value.caption}
              </figcaption>
            )}
          </figure>
        )
      },
      callout: ({value}) => (
        <div className={`my-10 ${THEME.bgSubtle} border-2 border-cream/30 p-5 md:p-6 flex gap-4 items-start`}>
          <Info className={`${THEME.textMain} shrink-0 mt-0.5`} size={20} />
          <div>
            <h4 className={`type-eyebrow ${THEME.textMain} mb-2`}>{value.title || 'Note'}</h4>
            <p className="type-body text-white/70 leading-relaxed">{value.text}</p>
          </div>
        </div>
      ),
      divider: () => (
        <div className="flex items-center justify-center gap-3 py-10">
          <span className="w-2 h-2 bg-cream/20" />
          <span className="w-2 h-2 bg-gold-on-dark" />
          <span className="w-2 h-2 bg-cream/20" />
        </div>
      ),
    },
  }

  return (
    <div className="toolkit-prose">
      <PortableText value={value as never} components={components} />
    </div>
  )
}

import {PortableText, type PortableTextComponents} from '@portabletext/react'

const components: PortableTextComponents = {
  block: {
    normal: ({children}) => (
      <p className="font-sans text-base md:text-lg text-dark/80 leading-relaxed mb-4 last:mb-0">
        {children}
      </p>
    ),
    h2: ({children}) => (
      <h2 className="font-serif text-2xl md:text-3xl text-dark tracking-tight mb-4">{children}</h2>
    ),
    h3: ({children}) => (
      <h3 className="font-serif text-xl text-dark tracking-tight mb-3">{children}</h3>
    ),
  },
  marks: {
    strong: ({children}) => <strong className="font-semibold text-dark">{children}</strong>,
    em: ({children}) => <em>{children}</em>,
    link: ({children, value}) => (
      <a href={value?.href} className="underline underline-offset-2 text-red-text hover:text-dark">
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({children}) => (
      <ul className="list-disc pl-5 space-y-2 font-sans text-base md:text-lg text-dark/80 mb-4">
        {children}
      </ul>
    ),
    number: ({children}) => (
      <ol className="list-decimal pl-5 space-y-2 font-sans text-base md:text-lg text-dark/80 mb-4">
        {children}
      </ol>
    ),
  },
}

export function FunnelPortableText({value}: {value: unknown}) {
  if (!value || (Array.isArray(value) && value.length === 0)) return null
  return <PortableText value={value as never} components={components} />
}

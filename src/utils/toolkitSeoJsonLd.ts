import {SITE_ORIGIN} from '../constants/seoMeta'
import {getCategoryLabel, type ToolkitCategory} from '../constants/toolkit'
import {urlFor} from '../sanityClient'

function toIsoDateTime(value: string | undefined): string | undefined {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date.toISOString()
}

export function buildToolkitArticleJsonLd(params: {
  tool: {
    name: string
    summary: string
    benefits?: string[]
    body?: unknown
    category: ToolkitCategory
    _updatedAt?: string
    focusKeyword?: string
    author?: {name?: string; image?: unknown} | null
  }
  canonicalUrl: string
  pageDescription: string
  shareImage: string
  headline: string
}): Record<string, unknown> {
  const {tool, canonicalUrl, pageDescription, shareImage, headline} = params
  const dateModified = toIsoDateTime(tool._updatedAt)

  const author =
    tool.author?.name != null && tool.author.name.trim() !== ''
      ? {
          '@type': 'Person' as const,
          name: tool.author.name.trim(),
          ...(tool.author.image != null
            ? {
                image: {
                  '@type': 'ImageObject' as const,
                  url: urlFor(tool.author.image).width(400).height(400).url(),
                },
              }
            : {}),
        }
      : {
          '@type': 'Organization' as const,
          name: 'SYSBILT',
          url: SITE_ORIGIN,
        }

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline,
    description: pageDescription,
    ...(dateModified ? {dateModified} : {}),
    author,
    publisher: {
      '@type': 'Organization',
      name: 'SYSBILT',
      url: SITE_ORIGIN,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/images/og-sysbilt.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    isPartOf: {
      '@type': 'CollectionPage',
      name: 'Business Toolkit',
      url: `${SITE_ORIGIN}/toolkit`,
    },
    articleSection: getCategoryLabel(tool.category),
    inLanguage: 'en-AU',
  }

  if (shareImage) {
    schema.image = {
      '@type': 'ImageObject',
      url: shareImage,
      width: 1200,
      height: 630,
    }
  }

  if (tool.focusKeyword) {
    schema.keywords = tool.focusKeyword
  }

  return schema
}

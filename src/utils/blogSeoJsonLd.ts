import { urlFor } from '../sanityClient';
import { SITE_ORIGIN } from '../constants/seoMeta';

function toIsoDateTime(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const t = Date.parse(value);
  if (Number.isNaN(t)) return undefined;
  return new Date(t).toISOString();
}

/** Flatten Portable Text blocks to plain string for wordCount in JSON-LD */
function portableTextToPlain(body: unknown): string {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (Array.isArray(body)) return body.map(portableTextToPlain).join(' ');
  if (typeof body === 'object' && body !== null) {
    const o = body as Record<string, unknown>;
    if (typeof o.text === 'string') return o.text;
    if (Array.isArray(o.children)) return portableTextToPlain(o.children);
  }
  return '';
}

export function buildBlogPostingJsonLd(params: {
  post: Record<string, unknown> & {
    title?: string;
    body?: unknown;
    publishedAt?: string;
    _updatedAt?: string;
    servicePillar?: string;
    focusKeyword?: string;
    author?: { name?: string; image?: unknown };
  };
  canonicalUrl: string;
  pageDescription: string;
  shareImage: string;
  headline: string;
}): Record<string, unknown> {
  const { post, canonicalUrl, pageDescription, shareImage, headline } = params;
  const datePublished = toIsoDateTime(post.publishedAt);
  const dateModified = toIsoDateTime(post._updatedAt || post.publishedAt) ?? datePublished;

  const plain = portableTextToPlain(post.body);
  const wordCount = plain.split(/\s+/).filter(Boolean).length;

  const author =
    post.author?.name != null && post.author.name !== ''
      ? {
          '@type': 'Person' as const,
          name: post.author.name,
          ...(post.author.image != null
            ? {
                image: {
                  '@type': 'ImageObject' as const,
                  url: urlFor(post.author.image as any).width(400).height(400).url(),
                },
              }
            : {}),
        }
      : {
          '@type': 'Organization' as const,
          name: 'SYSBILT',
          url: SITE_ORIGIN,
        };

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#blogPosting`,
    url: canonicalUrl,
    headline,
    description: pageDescription,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
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
      '@type': 'Blog',
      name: 'Insights',
      url: `${SITE_ORIGIN}/blog`,
    },
    inLanguage: 'en-AU',
  };

  if (shareImage) {
    schema.image = {
      '@type': 'ImageObject',
      url: shareImage,
      width: 1200,
      height: 630,
    };
  }

  if (post.servicePillar) {
    schema.articleSection = post.servicePillar;
  }

  if (post.focusKeyword) {
    schema.keywords = post.focusKeyword;
  }

  if (wordCount > 0) {
    schema.wordCount = wordCount;
  }

  return schema;
}

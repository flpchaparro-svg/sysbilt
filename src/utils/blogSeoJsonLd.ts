import { urlFor } from '../sanityClient';
import { SITE_ORIGIN } from '../constants/seoMeta';
import { organizationIdRef } from '../constants/organizationJsonLd';

function toIsoDateTime(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const t = Date.parse(value);
  if (Number.isNaN(t)) return undefined;
  return new Date(t).toISOString();
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

  const author =
    post.author?.name != null && post.author.name !== ''
      ? {
          '@type': 'Person' as const,
          name: post.author.name,
          ...(post.author.image != null
            ? {
                image: {
                  '@type': 'ImageObject' as const,
                  url: urlFor(post.author.image).width(400).height(400).url(),
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
    '@id': `${canonicalUrl}#article`,
    url: canonicalUrl,
    headline,
    description: pageDescription,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author,
    publisher: organizationIdRef(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
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

  return schema;
}

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityService, SanityCaseStudy } from '../types';

export const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-20',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

export async function getServicesByPillar(pillarName: string): Promise<SanityService[]> {
  // Secure Query: setupFee and retainer are excluded from the projection { ... }
  const query = `*[_type == "service" && pillar == $pillarName] | order(setupFee asc) {
    _id, serviceName, pillar, systemPhase, tagline, theirPain, promise, 
    whoBuysIt, sprintLength, keyTools, leadsTo
  }`;
  return await client.fetch(query, { pillarName });
}

// FETCH LATEST CASE STUDIES
export async function getCaseStudies(): Promise<SanityCaseStudy[]> {
  const query = `*[_type == "caseStudy"] | order(_createdAt desc) {
    _id, clientName, clientIndustry, pillarFocus, terminalLines, 
    problemItems, solutionItems, evidenceMetrics,
    "beforeImage": beforeImage.asset->url,
    "afterImage": afterImage.asset->url,
    "gallery": gallery[].asset->url
  }`;
  return await client.fetch(query);
}
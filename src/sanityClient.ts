import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityService } from '../types';

export const client = createClient({
  projectId: 'wdlc9pg8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-02-20',
});

const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);

// Fetches all services belonging to a specific pillar
export async function getServicesByPillar(pillarName: string): Promise<SanityService[]> {
  const query = `*[_type == "service" && pillar == $pillarName] | order(setupFee asc) {
    _id,
    serviceName,
    pillar,
    systemPhase,
    tagline,
    theirPain,
    promise,
    whoBuysIt,
    sprintLength,
    setupFee,
    retainer,
    keyTools,
    leadsTo
  }`;
  
  return await client.fetch(query, { pillarName });
}
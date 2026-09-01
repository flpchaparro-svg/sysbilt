/**
 * Shared Payment Link fields for SYSBILT catalogue checkouts.
 * Terms checkbox is create-only on Payment Links. Always pass these at create.
 */
export const SYSBILT_ABN = '56115228020'

export const CATALOGUE_TERMS = {
  'consent_collection[terms_of_service]': 'required',
  'custom_text[terms_of_service_acceptance][message]':
    'I have read and agree to the [SYSBILT terms](https://sysbilt.com/terms)',
}

export function websiteTerms(tier) {
  const t = tier === 'brochure' || tier === 'practice' || tier === 'full' ? tier : 'practice'
  return {
    'consent_collection[terms_of_service]': 'required',
    'custom_text[terms_of_service_acceptance][message]':
      `I have read and agree to the [Hosted Website Plan agreement](https://sysbilt.com/go/website/agreement?tier=${t}&preview=1)`,
  }
}

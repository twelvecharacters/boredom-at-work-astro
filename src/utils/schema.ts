// Shared Schema.org helpers.

/**
 * Parse a human price string (e.g. "Free–$20/month", "$25-40/mo", "$299")
 * into a valid Schema.org offer object, or null when no numeric price is
 * present (e.g. "Free / API-based"). Used by ReviewSchema and SoftwareAppSchema.
 */
export function parseOffers(priceRange: string) {
  const numbers = priceRange.match(/[\d.]+/g)?.map(Number) || [];
  const hasFree = /free/i.test(priceRange);
  const currency = 'USD';

  if (hasFree && numbers.length >= 1) {
    return {
      '@type': 'AggregateOffer',
      lowPrice: 0,
      highPrice: numbers[numbers.length - 1],
      priceCurrency: currency,
      offerCount: 2,
      availability: 'https://schema.org/InStock',
    };
  }
  if (numbers.length >= 2) {
    return {
      '@type': 'AggregateOffer',
      lowPrice: numbers[0],
      highPrice: numbers[numbers.length - 1],
      priceCurrency: currency,
      offerCount: 2,
      availability: 'https://schema.org/InStock',
    };
  }
  if (numbers.length === 1) {
    return {
      '@type': 'Offer',
      price: numbers[0],
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    };
  }
  return null;
}

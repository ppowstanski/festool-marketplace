import type { ListingFormData, GeneratedPost } from '../types/listing';
import { COUNTRIES, LANGUAGES, CONDITIONS } from '../constants/listing';

export function generatePost(data: ListingFormData): GeneratedPost {
  const title = generateTitle(data);
  const body = generateBody(data);

  return {
    title,
    body,
    photoCount: data.photos.length,
  };
}

function generateTitle(data: ListingFormData): string {
  // Get country flag and code
  const country = COUNTRIES.find(c => c.code === data.country);
  const countryPart = country ? `[${country.flag} ${country.code}]` : '';

  // Get language codes (max 3)
  const langCodes = data.languages.slice(0, 3).join('/');
  const langPart = data.languages.length > 3 ? `[${langCodes}...]` : `[${langCodes}]`;

  // Shorten product name if too long
  const productName = data.productName.length > 40
    ? data.productName.substring(0, 37) + '...'
    : data.productName;

  // Format price
  const pricePart = data.negotiable
    ? `${data.price}${data.currency} (neg.)`
    : `${data.price}${data.currency}`;

  return `${countryPart} ${langPart} ${productName} - ${pricePart}`;
}

function generateBody(data: ListingFormData): string {
  const parts: string[] = [];

  // Product
  parts.push(`🏷️ Product: ${data.productName}`);

  // Price
  const priceText = data.negotiable
    ? `${data.price} ${data.currency} (negotiable)`
    : `${data.price} ${data.currency}`;
  parts.push(`💰 Price: ${priceText}`);

  // Location
  const country = COUNTRIES.find(c => c.code === data.country);
  const locationText = country
    ? `${country.flag} ${country.name}, ${data.city}`
    : data.city;
  parts.push(`📍 Country & City: ${locationText}`);

  // Languages
  const languageFlags = data.languages
    .map(code => {
      const lang = LANGUAGES.find(l => l.code === code);
      return lang ? `${lang.flag} ${lang.name}` : code;
    })
    .join(' • ');
  parts.push(`💬 Languages: ${languageFlags}`);

  // Shipping
  parts.push('📦 Shipping:');
  data.shippingOptions.forEach(option => {
    if (option === 'local-pickup') {
      parts.push('   [✓] Local pickup');
    } else if (option === 'national') {
      parts.push('   [✓] National shipping');
    } else if (option === 'dhl-europe') {
      const costPart = data.dhlShippingCost ? ` (${data.dhlShippingCost})` : '';
      parts.push(`   [✓] DHL Europe${costPart}`);
    }
  });

  // Year (optional)
  if (data.year) {
    parts.push(`📅 Year: ${data.year}`);
  }

  // Condition
  const condition = CONDITIONS.find(c => c.value === data.condition);
  const stars = condition ? '⭐'.repeat(condition.stars) : '';
  const conditionLabel = condition ? condition.label.split('(')[0].trim() : data.condition;
  parts.push(`${stars} Condition: ${conditionLabel}`);

  // Description
  parts.push('📄 Details:');
  parts.push(data.description);

  // Included items
  parts.push('');
  parts.push('📦 Included:');
  parts.push(data.includedItems);

  // Contact (optional)
  if (data.contact && data.contact.trim()) {
    parts.push('');
    parts.push(`📞 Contact: ${data.contact}`);
  }

  return parts.join('\n');
}

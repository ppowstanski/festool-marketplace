import type { Country, Language, Currency, ConditionOption, ShippingOption } from '../types/listing';

export const COUNTRIES: Country[] = [
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
];

export const LANGUAGES: Language[] = [
  { code: 'EN', name: 'English', flag: '🇬🇧' },
  { code: 'DE', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'FR', name: 'Français', flag: '🇫🇷' },
  { code: 'IT', name: 'Italiano', flag: '🇮🇹' },
  { code: 'ES', name: 'Español', flag: '🇪🇸' },
  { code: 'PL', name: 'Polski', flag: '🇵🇱' },
];

export const CURRENCIES: Currency[] = [
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'CZK', symbol: 'Kč', name: 'Czech Koruna' },
  { code: 'HUF', symbol: 'Ft', name: 'Hungarian Forint' },
];

export const CONDITIONS: ConditionOption[] = [
  { value: 'new', label: 'New (unused, in original packaging)', stars: 5 },
  { value: 'like-new', label: 'Like New (barely used, perfect condition)', stars: 5 },
  { value: 'very-good', label: 'Very Good (light use, excellent condition)', stars: 4 },
  { value: 'good', label: 'Good (regular use, good condition, minor wear)', stars: 3 },
  { value: 'fair', label: 'Fair (visible wear, fully functional)', stars: 2 },
  { value: 'parts', label: 'For Parts (not working, parts only)', stars: 1 },
];

export const SHIPPING_OPTIONS: ShippingOption[] = [
  { value: 'local-pickup', label: 'Local pickup only' },
  { value: 'national', label: 'National shipping' },
  { value: 'dhl-europe', label: 'DHL Europe shipping' },
];

// Default currency based on country
export const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  DE: 'EUR', AT: 'EUR', CH: 'CHF', FR: 'EUR', BE: 'EUR',
  NL: 'EUR', LU: 'EUR', IT: 'EUR', ES: 'EUR', PT: 'EUR',
  PL: 'PLN', CZ: 'CZK', SK: 'EUR', HU: 'HUF',
  DK: 'DKK', SE: 'SEK', FI: 'EUR', NO: 'NOK', IE: 'EUR',
};

// Photo upload constraints
export const PHOTO_CONSTRAINTS = {
  MIN_PHOTOS: 3,
  MAX_PHOTOS: 10,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB in bytes
  ACCEPTED_FORMATS: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  COMPRESSION_OPTIONS: {
    maxWidthOrHeight: 1200,
    initialQuality: 0.8,
  },
};

// Year constraints
export const YEAR_CONSTRAINTS = {
  MIN_YEAR: 1990,
  MAX_YEAR: new Date().getFullYear(),
};

export interface ListingFormData {
  // Location
  country: string;
  city: string;

  // Communication
  languages: string[];

  // Product
  productName: string;
  price: number;
  currency: string;
  negotiable: boolean;

  // Shipping
  shippingOptions: string[];
  dhlShippingCost?: string;

  // Details
  year?: number;
  condition: string;
  description: string;
  includedItems: string;

  // Contact
  contact?: string;
}

export interface GeneratedPost {
  title: string;
  body: string;
}

export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface ConditionOption {
  value: string;
  label: string;
  labelDe: string;
  labelPl: string;
  stars: number;
}

export interface ShippingOption {
  value: string;
  label: string;
}

import { z } from 'zod';
import { YEAR_CONSTRAINTS, PHOTO_CONSTRAINTS } from '../constants/listing';

export const listingSchema = z.object({
  // Location
  country: z.string().min(1, 'Please select a country'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),

  // Communication
  languages: z
    .array(z.string())
    .min(1, 'Please select at least one language'),

  // Product
  productName: z
    .string()
    .min(5, 'Product name must be at least 5 characters')
    .max(100, 'Product name must be less than 100 characters'),
  price: z
    .number({ message: 'Price must be a number' })
    .positive('Price must be greater than 0')
    .max(999999, 'Price must be less than 1,000,000'),
  currency: z.string().min(1, 'Please select a currency'),
  negotiable: z.boolean(),

  // Shipping
  shippingOptions: z
    .array(z.string())
    .min(1, 'Please select at least one shipping option'),
  dhlShippingCost: z.string().optional(),

  // Details
  year: z
    .number()
    .int()
    .min(YEAR_CONSTRAINTS.MIN_YEAR, `Year must be after ${YEAR_CONSTRAINTS.MIN_YEAR}`)
    .max(YEAR_CONSTRAINTS.MAX_YEAR, `Year cannot be in the future`)
    .optional()
    .or(z.literal(undefined)),
  condition: z.string().min(1, 'Please select a condition'),
  description: z
    .string()
    .min(50, 'Description must be at least 50 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  includedItems: z
    .string()
    .min(10, 'Please list what\'s included (minimum 10 characters)')
    .max(1000, 'Included items must be less than 1000 characters'),

  // Media & Contact
  photos: z
    .array(z.any())
    .min(PHOTO_CONSTRAINTS.MIN_PHOTOS, `Minimum ${PHOTO_CONSTRAINTS.MIN_PHOTOS} photos required`)
    .max(PHOTO_CONSTRAINTS.MAX_PHOTOS, `Maximum ${PHOTO_CONSTRAINTS.MAX_PHOTOS} photos allowed`),
  contact: z
    .string()
    .max(100, 'Contact information must be less than 100 characters')
    .optional()
    .or(z.literal('')),
}).refine(
  (data) => {
    // If DHL Europe is selected, validate DHL shipping cost format
    if (data.shippingOptions.includes('dhl-europe') && data.dhlShippingCost) {
      return /^[~]?\d+[-]?\d*[€]?$/.test(data.dhlShippingCost);
    }
    return true;
  },
  {
    message: 'DHL shipping cost format invalid (e.g., "~25€" or "20-30")',
    path: ['dhlShippingCost'],
  }
);

export type ListingSchema = z.infer<typeof listingSchema>;

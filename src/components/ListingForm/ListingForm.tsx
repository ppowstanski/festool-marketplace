import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { listingSchema, type ListingSchema } from '../../schemas/listingSchema';
import { COUNTRIES, LANGUAGES, CURRENCIES, CONDITIONS, SHIPPING_OPTIONS, COUNTRY_CURRENCY_MAP } from '../../constants/listing';
import { PhotoUpload } from './PhotoUpload';
import { PreviewModal } from './PreviewModal';
import type { ListingFormData } from '../../types/listing';

export function ListingForm() {
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<ListingSchema>({
    resolver: zodResolver(listingSchema),
    mode: 'onChange',
    defaultValues: {
      languages: [],
      shippingOptions: [],
      negotiable: false,
      photos: [],
    },
  });

  const selectedCountry = watch('country');
  const shippingOptions = watch('shippingOptions');
  const photos = watch('photos');

  // Auto-select currency when country changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setValue('country', countryCode);

    const currency = COUNTRY_CURRENCY_MAP[countryCode];
    if (currency) {
      setValue('currency', currency);
    }
  };

  const onSubmit = (data: ListingSchema) => {
    setShowPreview(true);
  };

  const progress = Object.keys(errors).length === 0 && isValid ? 100 : 0;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Location Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">📍 Location</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                {...register('country')}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select your country</option>
                {COUNTRIES.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register('city')}
                placeholder="e.g. Berlin, Munich, Hamburg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages I can communicate in <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {LANGUAGES.map(lang => (
                <label key={lang.code} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('languages')}
                    value={lang.code}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span>{lang.flag} {lang.name}</span>
                </label>
              ))}
            </div>
            {errors.languages && (
              <p className="mt-1 text-sm text-red-600">{errors.languages.message}</p>
            )}
          </div>
        </section>

        {/* Product Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">🏷️ Product Details</h2>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('productName')}
              placeholder="e.g. Festool TS 55 EQ Plus Track Saw"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-600">{errors.productName.message}</p>
            )}
          </div>

          {/* Price & Currency */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="350"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Currency <span className="text-red-500">*</span>
              </label>
              <select
                {...register('currency')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
              {errors.currency && (
                <p className="mt-1 text-sm text-red-600">{errors.currency.message}</p>
              )}
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <input
                  type="checkbox"
                  {...register('negotiable')}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Price negotiable</span>
              </label>
            </div>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year of Production (optional)
            </label>
            <input
              type="number"
              {...register('year', { valueAsNumber: true })}
              placeholder="2019"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-600">{errors.year.message}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Condition <span className="text-red-500">*</span>
            </label>
            <select
              {...register('condition')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select condition</option>
              {CONDITIONS.map(condition => (
                <option key={condition.value} value={condition.value}>
                  {'⭐'.repeat(condition.stars)} {condition.label}
                </option>
              ))}
            </select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-600">{errors.condition.message}</p>
            )}
          </div>
        </section>

        {/* Shipping Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">📦 Shipping</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shipping Options <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map(option => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    {...register('shippingOptions')}
                    value={option.value}
                    className="w-4 h-4 text-green-600 rounded focus:ring-green-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors.shippingOptions && (
              <p className="mt-1 text-sm text-red-600">{errors.shippingOptions.message}</p>
            )}
          </div>

          {shippingOptions?.includes('dhl-europe') && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated DHL Shipping Cost (optional)
              </label>
              <input
                type="text"
                {...register('dhlShippingCost')}
                placeholder="~25€ or 20-30€"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.dhlShippingCost && (
                <p className="mt-1 text-sm text-red-600">{errors.dhlShippingCost.message}</p>
              )}
            </div>
          )}
        </section>

        {/* Description Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">📄 Description</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Detailed Description <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={6}
              placeholder="Describe the condition, usage history, any modifications, reason for selling, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              {watch('description')?.length || 0} / 2000 characters (minimum 50)
            </p>
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's Included <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register('includedItems')}
              rows={4}
              placeholder="List all items included (tool, systainer, accessories, manuals, etc.)"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {errors.includedItems && (
              <p className="mt-1 text-sm text-red-600">{errors.includedItems.message}</p>
            )}
          </div>
        </section>

        {/* Photos Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">📸 Photos</h2>

          <Controller
            name="photos"
            control={control}
            render={({ field }) => (
              <PhotoUpload
                photos={field.value}
                onChange={field.onChange}
                error={errors.photos?.message}
              />
            )}
          />
        </section>

        {/* Contact Section */}
        <section className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">📞 Contact</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Information (optional)
            </label>
            <input
              type="text"
              {...register('contact')}
              placeholder="your.email@example.com or +49 123 456 789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="mt-1 text-sm text-gray-500">
              Leave empty to be contacted via Facebook Messenger
            </p>
            {errors.contact && (
              <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>
            )}
          </div>
        </section>

        {/* Submit Button */}
        <div className="sticky bottom-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="text-sm text-gray-600">
              <span className="font-medium">
                {Object.keys(errors).length > 0 ? (
                  <span className="text-red-600">
                    {Object.keys(errors).length} error(s) - {Object.keys(errors).join(', ')}
                  </span>
                ) : isValid ? (
                  <span className="text-green-600">✓ All required fields completed</span>
                ) : (
                  'Fill all required fields'
                )}
              </span>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Preview Post
            </button>
          </div>
        </div>
      </form>

      {showPreview && (
        <PreviewModal
          data={watch() as ListingFormData}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

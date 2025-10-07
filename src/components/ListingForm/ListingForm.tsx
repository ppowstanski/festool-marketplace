import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { listingSchema, type ListingSchema } from '../../schemas/listingSchema';
import { COUNTRIES, LANGUAGES, CURRENCIES, CONDITIONS, SHIPPING_OPTIONS, COUNTRY_CURRENCY_MAP } from '../../constants/listing';
import { PhotoUpload } from './PhotoUpload';
import { PreviewModal } from './PreviewModal';
import type { ListingFormData } from '../../types/listing';
import { useDraftAutoSave } from '../../hooks/useDraftAutoSave';

export function ListingForm() {
  const [showPreview, setShowPreview] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
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

  // Auto-save draft
  const { isDraftSaved, draftTimestamp, clearDraft, saveError } = useDraftAutoSave({
    watch,
    reset,
  });

  const shippingOptions = watch('shippingOptions');

  // Auto-select currency when country changes
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countryCode = e.target.value;
    setValue('country', countryCode);

    const currency = COUNTRY_CURRENCY_MAP[countryCode];
    if (currency) {
      setValue('currency', currency);
    }
  };

  const onSubmit = () => {
    setShowPreview(true);
  };

  const formatDraftTime = (timestamp: number | null): string => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const handleDiscardDraft = () => {
    if (window.confirm('Are you sure you want to discard your draft? This cannot be undone.')) {
      clearDraft();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto space-y-8">
        {/* Draft Indicator */}
        {isDraftSaved && draftTimestamp && (
          <div className="bg-[#39b54a]/10 border border-[#39b54a]/20 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#39b54a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-[#ededed]">Draft saved</p>
                <p className="text-xs text-[#a3a3a3]">Last saved {formatDraftTime(draftTimestamp)}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="px-4 py-2 text-sm text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626] rounded-lg transition-colors"
            >
              Discard draft
            </button>
          </div>
        )}

        {/* Save Error */}
        {saveError && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-red-400">{saveError}</p>
          </div>
        )}

        {/* Location Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">📍 Location</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-[#ededed] mb-2">
                Country <span className="text-red-400">*</span>
              </label>
              <select
                {...register('country')}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
              >
                <option value="">Select your country</option>
                {COUNTRIES.map(country => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
              )}
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-[#ededed] mb-2">
                City <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                {...register('city')}
                placeholder="e.g. Berlin, Munich, Hamburg"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
              )}
            </div>
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Languages I can communicate in <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {LANGUAGES.map(lang => (
                <label key={lang.code} className="flex items-center gap-2 cursor-pointer text-[#ededed]">
                  <input
                    type="checkbox"
                    {...register('languages')}
                    value={lang.code}
                    className="w-4 h-4 text-[#39b54a] bg-[#0a0a0a] border-[#262626] rounded focus:ring-[#39b54a]"
                  />
                  <span>{lang.flag} {lang.name}</span>
                </label>
              ))}
            </div>
            {errors.languages && (
              <p className="mt-1 text-sm text-red-400">{errors.languages.message}</p>
            )}
          </div>
        </section>

        {/* Product Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">🏷️ Product Details</h2>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Product Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              {...register('productName')}
              placeholder="e.g. Festool TS 55 EQ Plus Track Saw"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-400">{errors.productName.message}</p>
            )}
          </div>

          {/* Price & Currency */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-[#ededed] mb-2">
                Price <span className="text-red-400">*</span>
              </label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                placeholder="350"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-400">{errors.price.message}</p>
              )}
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-[#ededed] mb-2">
                Currency <span className="text-red-400">*</span>
              </label>
              <select
                {...register('currency')}
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
              >
                {CURRENCIES.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.code} ({curr.symbol})
                  </option>
                ))}
              </select>
              {errors.currency && (
                <p className="mt-1 text-sm text-red-400">{errors.currency.message}</p>
              )}
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer pb-2">
                <input
                  type="checkbox"
                  {...register('negotiable')}
                  className="w-4 h-4 text-[#39b54a] bg-[#0a0a0a] border-[#262626] rounded focus:ring-[#39b54a]"
                />
                <span className="text-sm text-[#ededed]">Price negotiable</span>
              </label>
            </div>
          </div>

          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Year of Production (optional)
            </label>
            <input
              type="number"
              {...register('year', { valueAsNumber: true })}
              placeholder="2019"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
            />
            {errors.year && (
              <p className="mt-1 text-sm text-red-400">{errors.year.message}</p>
            )}
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Condition <span className="text-red-400">*</span>
            </label>
            <select
              {...register('condition')}
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
            >
              <option value="">Select condition</option>
              {CONDITIONS.map(condition => (
                <option key={condition.value} value={condition.value}>
                  {'⭐'.repeat(condition.stars)} {condition.label}
                </option>
              ))}
            </select>
            {errors.condition && (
              <p className="mt-1 text-sm text-red-400">{errors.condition.message}</p>
            )}
          </div>
        </section>

        {/* Shipping Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">📦 Shipping</h2>

          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Shipping Options <span className="text-red-400">*</span>
            </label>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map(option => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer text-[#ededed]">
                  <input
                    type="checkbox"
                    {...register('shippingOptions')}
                    value={option.value}
                    className="w-4 h-4 text-[#39b54a] bg-[#0a0a0a] border-[#262626] rounded focus:ring-[#39b54a]"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
            {errors.shippingOptions && (
              <p className="mt-1 text-sm text-red-400">{errors.shippingOptions.message}</p>
            )}
          </div>

          {shippingOptions?.includes('dhl-europe') && (
            <div>
              <label className="block text-sm font-medium text-[#ededed] mb-2">
                Estimated DHL Shipping Cost (optional)
              </label>
              <input
                type="text"
                {...register('dhlShippingCost')}
                placeholder="~25€ or 20-30€"
                className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
              />
              {errors.dhlShippingCost && (
                <p className="mt-1 text-sm text-red-400">{errors.dhlShippingCost.message}</p>
              )}
            </div>
          )}
        </section>

        {/* Description Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">📄 Description</h2>

          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Detailed Description <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('description')}
              rows={6}
              placeholder="Describe the condition, usage history, any modifications, reason for selling, etc."
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
            />
            <p className="mt-1 text-sm text-[#a3a3a3]">
              {watch('description')?.length || 0} / 2000 characters (minimum 50)
            </p>
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              What's Included <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('includedItems')}
              rows={4}
              placeholder="List all items included (tool, systainer, accessories, manuals, etc.)"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
            />
            {errors.includedItems && (
              <p className="mt-1 text-sm text-red-400">{errors.includedItems.message}</p>
            )}
          </div>
        </section>

        {/* Photos Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">📸 Photos</h2>

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
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">📞 Contact</h2>

          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              Contact Information (optional)
            </label>
            <input
              type="text"
              {...register('contact')}
              placeholder="your.email@example.com or +49 123 456 789"
              className="w-full px-4 py-2 bg-[#0a0a0a] border border-[#262626] text-[#ededed] placeholder-[#a3a3a3] rounded-lg focus:ring-2 focus:ring-[#39b54a] focus:border-transparent"
            />
            <p className="mt-1 text-sm text-[#a3a3a3]">
              Leave empty to be contacted via Facebook Messenger
            </p>
            {errors.contact && (
              <p className="mt-1 text-sm text-red-400">{errors.contact.message}</p>
            )}
          </div>
        </section>

        {/* Submit Button */}
        <div className="sticky bottom-4 bg-[#141414] rounded-lg shadow-lg shadow-[#39b54a]/10 p-4 border border-[#262626]">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="text-sm text-[#a3a3a3]">
              <span className="font-medium">
                {Object.keys(errors).length > 0 ? (
                  <span className="text-red-400">
                    {Object.keys(errors).length} error(s) - {Object.keys(errors).join(', ')}
                  </span>
                ) : isValid ? (
                  <span className="text-[#39b54a]">✓ All required fields completed</span>
                ) : (
                  'Fill all required fields'
                )}
              </span>
            </div>
            <button
              type="submit"
              disabled={!isValid}
              className="px-6 py-3 bg-[#39b54a] text-white font-semibold rounded-lg hover:bg-[#39b54a]/90 disabled:bg-[#262626] disabled:text-[#a3a3a3] disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#39b54a]/20"
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
          onPostSuccess={clearDraft}
        />
      )}
    </>
  );
}

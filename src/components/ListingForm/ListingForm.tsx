import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { listingSchema, type ListingSchema } from '../../schemas/listingSchema';
import { COUNTRIES, LANGUAGES, CONDITIONS, SHIPPING_OPTIONS, COUNTRY_CURRENCY_MAP } from '../../constants/listing';
import { TranslationSection } from './TranslationSection';
import { LivePreview } from './LivePreview';
import { useDraftAutoSave } from '../../hooks/useDraftAutoSave';
import { MaterialInput } from './MaterialInput';
import { MaterialSelect } from './MaterialSelect';
import { MaterialTextarea } from './MaterialTextarea';
import { useTranslation } from '../../hooks/useTranslation';
import type { TranslationResult } from '../../services/translation';

export function ListingForm() {
  const { t } = useTranslation();
  const [translations, setTranslations] = useState<{
    description: TranslationResult[];
    includedItems: TranslationResult[];
  } | null>(null);

  const {
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ListingSchema>({
    resolver: zodResolver(listingSchema),
    mode: 'onChange',
    defaultValues: {
      languages: [],
      shippingOptions: [],
      negotiable: false,
      currency: 'EUR',
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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Column - Form */}
        <div className="flex-1">
          {/* Page Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-[#ededed] mb-2">
              {t('dashboard.createListing')}
            </h2>
            <p className="text-[#a3a3a3]">
              {t('dashboard.subtitle')}
            </p>
          </div>

          <div className="space-y-8">
        {/* Draft Indicator */}
        {isDraftSaved && draftTimestamp && (
          <div className="bg-[#39b54a]/10 border border-[#39b54a]/20 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#39b54a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-[#ededed]">{t('form.draftSaved')}</p>
                <p className="text-xs text-[#a3a3a3]">{t('form.lastSaved', { time: formatDraftTime(draftTimestamp) })}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="px-4 py-2 text-sm text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#262626] rounded-lg transition-colors"
            >
              {t('form.discardDraft')}
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
          <h2 className="text-xl font-bold text-[#ededed]">{t('form.location')}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Country */}
            <MaterialSelect
              label={t('form.country')}
              required
              {...register('country')}
              onChange={handleCountryChange}
              error={errors.country?.message}
            >
              <option value="">{t('form.country.placeholder')}</option>
              {COUNTRIES.map(country => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </option>
              ))}
            </MaterialSelect>

            {/* City */}
            <MaterialInput
              label={t('form.city')}
              required
              {...register('city')}
              error={errors.city?.message}
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              {t('form.languages')} <span className="text-red-400">*</span>
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
          <h2 className="text-xl font-bold text-[#ededed]">{t('form.productDetails')}</h2>

          {/* Product Name */}
          <MaterialInput
            label={t('form.productName')}
            required
            {...register('productName')}
            error={errors.productName?.message}
          />

          {/* Price & Currency */}
          <div className="grid md:grid-cols-3 gap-4">
            <MaterialInput
              type="number"
              label={t('form.price')}
              required
              {...register('price', { valueAsNumber: true })}
              error={errors.price?.message}
            />

            <MaterialSelect
              label={t('form.currency')}
              required
              {...register('currency')}
              error={errors.currency?.message}
            >
              <option value="EUR">EUR (€)</option>
            </MaterialSelect>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('negotiable')}
                  className="w-4 h-4 text-[#39b54a] bg-[#0a0a0a] border-[#262626] rounded focus:ring-[#39b54a]"
                />
                <span className="text-sm text-[#ededed]">{t('form.negotiable')}</span>
              </label>
            </div>
          </div>

          {/* Year */}
          <MaterialInput
            type="number"
            label={t('form.year')}
            {...register('year', { valueAsNumber: true })}
            error={errors.year?.message}
          />

          {/* Condition */}
          <MaterialSelect
            label={t('form.condition')}
            required
            {...register('condition')}
            error={errors.condition?.message}
          >
            <option value="">{t('form.condition.placeholder')}</option>
            {CONDITIONS.map(condition => (
              <option key={condition.value} value={condition.value}>
                {'⭐'.repeat(condition.stars)} {condition.label}
              </option>
            ))}
          </MaterialSelect>
        </section>

        {/* Shipping Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">{t('form.shipping')}</h2>

          <div>
            <label className="block text-sm font-medium text-[#ededed] mb-2">
              {t('form.shippingOptions')} <span className="text-red-400">*</span>
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
            <MaterialInput
              label={t('form.dhlShippingCost')}
              {...register('dhlShippingCost')}
              error={errors.dhlShippingCost?.message}
            />
          )}
        </section>

        {/* Description Section */}
        <section className="bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-6">
          <h2 className="text-xl font-bold text-[#ededed]">{t('form.description')}</h2>

          <MaterialTextarea
            label={t('form.detailedDescription')}
            required
            {...register('description')}
            rows={14}
            error={errors.description?.message}
            helperText={t('form.descriptionHelper', {
              current: watch('description')?.length || 0,
              max: 2000,
              min: 50
            })}
          />

          <MaterialTextarea
            label={t('form.includedItems')}
            required
            {...register('includedItems')}
            rows={10}
            error={errors.includedItems?.message}
          />
        </section>

        {/* Translation Section */}
        <TranslationSection
          description={watch('description') || ''}
          includedItems={watch('includedItems') || ''}
          selectedLanguages={watch('languages') || []}
          onTranslationsChange={setTranslations}
        />

          </div>
        </div>

        {/* Right Column - Live Preview with Copy Button */}
        <div className="hidden md:block md:w-[700px] flex-shrink-0">
          <LivePreview
            data={watch()}
            translations={translations}
            onCopySuccess={clearDraft}
          />
        </div>
      </div>
    </>
  );
}

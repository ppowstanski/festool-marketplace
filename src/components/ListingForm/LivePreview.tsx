import type { ListingFormData } from '../../types/listing';
import { COUNTRIES, LANGUAGES, CURRENCIES, CONDITIONS } from '../../constants/listing';
import { useTranslation } from '../../hooks/useTranslation';
import { useUserSettings } from '../../hooks/useUserSettings';
import type { TranslationResult } from '../../services/translation';

interface LivePreviewProps {
  data: Partial<ListingFormData>;
  translations?: {
    description: TranslationResult[];
    includedItems: TranslationResult[];
  } | null;
}

export function LivePreview({ data, translations }: LivePreviewProps) {
  const { t } = useTranslation();
  const { settings } = useUserSettings();
  const getCountryName = (code: string) => COUNTRIES.find(c => c.code === code)?.name || code;
  const getLanguageName = (code: string) => LANGUAGES.find(l => l.code === code)?.name || code;
  const getCurrencySymbol = (code: string) => CURRENCIES.find(c => c.code === code)?.symbol || code;
  const getConditionLabelMultiLang = (value: string): React.ReactElement => {
    const condition = CONDITIONS.find(c => c.value === value);
    if (!condition) return <>{value}</>;
    return (
      <>
        🇬🇧 {condition.label} / 🇩🇪 {condition.labelDe} / 🇵🇱 {condition.labelPl}
      </>
    );
  };
  const getConditionStars = (value: string) => CONDITIONS.find(c => c.value === value)?.stars || 0;

  // Get label in user's language
  const getSectionLabel = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'price': 'Price',
        'condition': 'Condition',
        'year': 'Year',
        'description': 'Description',
        'whatsIncluded': "What's Included",
        'shipping': 'Shipping Options',
        'languages': 'Languages',
        'contact': 'Contact',
      },
      'de': {
        'price': 'Preis',
        'condition': 'Zustand',
        'year': 'Jahr',
        'description': 'Beschreibung',
        'whatsIncluded': 'Lieferumfang',
        'shipping': 'Versandoptionen',
        'languages': 'Sprachen',
        'contact': 'Kontakt',
      },
      'pl': {
        'price': 'Cena',
        'condition': 'Stan',
        'year': 'Rok',
        'description': 'Opis',
        'whatsIncluded': 'Co zawiera',
        'shipping': 'Opcje wysyłki',
        'languages': 'Języki',
        'contact': 'Kontakt',
      },
    };

    const userLang = settings.mainLanguage || 'en';
    return translations[userLang.toLowerCase()]?.[key] || translations['en'][key];
  };

  // Get other language translations (excluding user's language)
  const getOtherLangLabels = (key: string): React.ReactElement => {
    const translations: Record<string, Record<string, string>> = {
      'en': {
        'price': 'Price',
        'condition': 'Condition',
        'year': 'Year',
        'description': 'Description',
        'whatsIncluded': "What's Included",
        'shipping': 'Shipping Options',
        'languages': 'Languages',
        'contact': 'Contact',
      },
      'de': {
        'price': 'Preis',
        'condition': 'Zustand',
        'year': 'Jahr',
        'description': 'Beschreibung',
        'whatsIncluded': 'Lieferumfang',
        'shipping': 'Versandoptionen',
        'languages': 'Sprachen',
        'contact': 'Kontakt',
      },
      'pl': {
        'price': 'Cena',
        'condition': 'Stan',
        'year': 'Rok',
        'description': 'Opis',
        'whatsIncluded': 'Co zawiera',
        'shipping': 'Opcje wysyłki',
        'languages': 'Języki',
        'contact': 'Kontakt',
      },
    };

    const userLang = (settings.mainLanguage || 'en').toLowerCase();
    const langs = ['en', 'de', 'pl'].filter(lang => lang !== userLang);

    const langFlags: Record<string, string> = {
      'en': '🇬🇧',
      'de': '🇩🇪',
      'pl': '🇵🇱'
    };

    return (
      <>
        {langs.map((lang, index) => (
          <span key={lang}>
            {index > 0 && ' / '}
            {langFlags[lang]} {translations[lang][key]}
          </span>
        ))}
      </>
    );
  };

  const formatPrice = () => {
    if (!data.price) return null;
    const symbol = data.currency ? getCurrencySymbol(data.currency) : '€';
    return { amount: `${data.price} ${symbol}`, negotiable: data.negotiable };
  };

  const formatLanguages = () => {
    if (!data.languages || data.languages.length === 0) return '---';
    return data.languages.map(getLanguageName).join(', ');
  };

  const formatShippingOptions = () => {
    if (!data.shippingOptions || data.shippingOptions.length === 0) return '---';
    const options = [];
    if (data.shippingOptions.includes('pickup')) options.push('Local Pickup');
    if (data.shippingOptions.includes('dhl-europe')) {
      const cost = data.dhlShippingCost ? ` (${data.dhlShippingCost})` : '';
      options.push(`DHL Europe${cost}`);
    }
    if (data.shippingOptions.includes('other')) options.push('Other Shipping');
    return options.join(', ');
  };

  return (
    <div className="sticky top-24 bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-8">
      <h3 className="text-lg font-bold text-[#ededed] border-b border-[#262626] pb-3">
        {t('preview.title')}
      </h3>

      {/* Product Name */}
      <div>
        <h4 className="text-2xl font-bold text-[#ededed] mb-2">
          {data.productName || 'Product Name'}
          {data.condition && (
            <span className="ml-2 text-yellow-400">
              {'⭐'.repeat(getConditionStars(data.condition))}
            </span>
          )}
        </h4>
        <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
          <span>{data.city || 'City'}, {data.country ? getCountryName(data.country) : 'Country'}</span>
        </div>
      </div>

      {/* Price */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('price')}</h3>
          <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('price')}</p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
        {(() => {
          const priceInfo = formatPrice();
          if (!priceInfo) return <p className="text-xl font-bold text-[#39b54a]">---</p>;
          return (
            <div>
              <p className="text-xl font-bold text-[#39b54a]">{priceInfo.amount}</p>
              {priceInfo.negotiable && (
                <p className="text-xs text-[#a3a3a3] mt-1">
                  🇬🇧 negotiable / 🇩🇪 verhandelbar / 🇵🇱 do negocjacji
                </p>
              )}
            </div>
          );
        })()}
      </div>

      {/* Condition */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('condition')}</h3>
          <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('condition')}</p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
        <div className="text-sm font-medium text-[#ededed]">
          {data.condition ? (
            <>
              <div className="mb-1">
                {'⭐'.repeat(getConditionStars(data.condition))}
              </div>
              <div className="text-xs text-[#a3a3a3]">
                {getConditionLabelMultiLang(data.condition)}
              </div>
            </>
          ) : '---'}
        </div>
      </div>

      {/* Year */}
      {data.year && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('year')}</h3>
            <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('year')}</p>
          </div>
          <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
          <p className="text-sm text-[#ededed]">{data.year}</p>
        </div>
      )}

      {/* Description */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('description')}</h3>
          <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('description')}</p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
        {translations ? (
          <div className="space-y-3">
            {/* User's language first */}
            {translations.description
              .sort((a, b) => {
                const userLang = settings.mainLanguage || 'en';
                if (a.language === userLang) return -1;
                if (b.language === userLang) return 1;
                return 0;
              })
              .map((trans) => {
                const langInfo = LANGUAGES.find(l => l.code.toLowerCase() === trans.language.toLowerCase());
                return (
                  <div key={trans.language} className="flex gap-3">
                    <span className="text-2xl flex-shrink-0">{langInfo?.flag}</span>
                    <p className="text-sm text-[#ededed] whitespace-pre-wrap flex-1">{trans.text}</p>
                  </div>
                );
              })}
          </div>
        ) : (
          <p className="text-sm text-[#ededed] whitespace-pre-wrap">
            {data.description || t('preview.descriptionPlaceholder')}
          </p>
        )}
      </div>

      {/* What's Included */}
      {(data.includedItems || translations) && (
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('whatsIncluded')}</h3>
            <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('whatsIncluded')}</p>
          </div>
          <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
          {translations ? (
            <div className="space-y-3">
              {/* User's language first */}
              {translations.includedItems
                .sort((a, b) => {
                  const userLang = settings.mainLanguage || 'en';
                  if (a.language === userLang) return -1;
                  if (b.language === userLang) return 1;
                  return 0;
                })
                .map((trans) => {
                  const langInfo = LANGUAGES.find(l => l.code.toLowerCase() === trans.language.toLowerCase());
                  return (
                    <div key={trans.language} className="flex gap-3">
                      <span className="text-2xl flex-shrink-0">{langInfo?.flag}</span>
                      <p className="text-sm text-[#ededed] whitespace-pre-wrap flex-1">{trans.text}</p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <p className="text-sm text-[#ededed] whitespace-pre-wrap">{data.includedItems}</p>
          )}
        </div>
      )}

      {/* Shipping */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('shipping')}</h3>
          <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('shipping')}</p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
        <p className="text-sm text-[#ededed]">{formatShippingOptions()}</p>
      </div>

      {/* Languages */}
      <div>
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-2xl font-bold text-[#ededed]">{getSectionLabel('languages')}</h3>
          <p className="text-xs text-[#a3a3a3]">{getOtherLangLabels('languages')}</p>
        </div>
        <div className="mb-3 pb-2 border-b-2 border-[#39b54a]"></div>
        <p className="text-sm text-[#ededed]">{formatLanguages()}</p>
      </div>

    </div>
  );
}

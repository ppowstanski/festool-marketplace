import type { ListingFormData } from '../../types/listing';
import { COUNTRIES, LANGUAGES, CURRENCIES, CONDITIONS } from '../../constants/listing';

interface LivePreviewProps {
  data: Partial<ListingFormData>;
}

export function LivePreview({ data }: LivePreviewProps) {
  const getCountryName = (code: string) => COUNTRIES.find(c => c.code === code)?.name || code;
  const getLanguageName = (code: string) => LANGUAGES.find(l => l.code === code)?.name || code;
  const getCurrencySymbol = (code: string) => CURRENCIES.find(c => c.code === code)?.symbol || code;
  const getConditionLabel = (value: string) => CONDITIONS.find(c => c.value === value)?.label || value;
  const getConditionStars = (value: string) => CONDITIONS.find(c => c.value === value)?.stars || 0;

  const formatPrice = () => {
    if (!data.price) return '---';
    const symbol = data.currency ? getCurrencySymbol(data.currency) : '';
    const negotiable = data.negotiable ? ' (negotiable)' : '';
    return `${symbol}${data.price}${negotiable}`;
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
    <div className="sticky top-24 bg-[#141414] border border-[#262626] rounded-lg p-6 space-y-4">
      <h3 className="text-lg font-bold text-[#ededed] border-b border-[#262626] pb-3">
        Live Preview
      </h3>

      {/* Product Name */}
      <div>
        <h4 className="text-2xl font-bold text-[#ededed] mb-2">
          {data.productName || 'Product Name'}
        </h4>
        <div className="flex items-center gap-3 text-sm text-[#a3a3a3]">
          <span>{data.city || 'City'}, {data.country ? getCountryName(data.country) : 'Country'}</span>
        </div>
      </div>

      {/* Photos */}
      {data.photos && data.photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {data.photos.slice(0, 4).map((photo, index) => (
            <img
              key={index}
              src={URL.createObjectURL(photo)}
              alt={`Preview ${index + 1}`}
              className="w-full h-24 object-cover rounded-lg border border-[#262626]"
            />
          ))}
          {data.photos.length > 4 && (
            <div className="w-full h-24 bg-[#0a0a0a] border border-[#262626] rounded-lg flex items-center justify-center text-[#a3a3a3]">
              +{data.photos.length - 4} more
            </div>
          )}
        </div>
      )}

      {/* Price & Condition */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-[#a3a3a3] mb-1">Price</p>
          <p className="text-xl font-bold text-[#39b54a]">{formatPrice()}</p>
        </div>
        <div>
          <p className="text-xs text-[#a3a3a3] mb-1">Condition</p>
          <p className="text-sm font-medium text-[#ededed]">
            {data.condition ? (
              <>
                {'⭐'.repeat(getConditionStars(data.condition))} {getConditionLabel(data.condition)}
              </>
            ) : '---'}
          </p>
        </div>
      </div>

      {/* Year */}
      {data.year && (
        <div>
          <p className="text-xs text-[#a3a3a3] mb-1">Year</p>
          <p className="text-sm text-[#ededed]">{data.year}</p>
        </div>
      )}

      {/* Description */}
      <div>
        <p className="text-xs text-[#a3a3a3] mb-1">Description</p>
        <p className="text-sm text-[#ededed] whitespace-pre-wrap">
          {data.description || 'Your detailed description will appear here...'}
        </p>
      </div>

      {/* What's Included */}
      {data.includedItems && (
        <div>
          <p className="text-xs text-[#a3a3a3] mb-1">What's Included</p>
          <p className="text-sm text-[#ededed] whitespace-pre-wrap">{data.includedItems}</p>
        </div>
      )}

      {/* Shipping */}
      <div>
        <p className="text-xs text-[#a3a3a3] mb-1">Shipping Options</p>
        <p className="text-sm text-[#ededed]">{formatShippingOptions()}</p>
      </div>

      {/* Languages */}
      <div>
        <p className="text-xs text-[#a3a3a3] mb-1">Languages</p>
        <p className="text-sm text-[#ededed]">{formatLanguages()}</p>
      </div>

      {/* Contact */}
      {data.contact && (
        <div>
          <p className="text-xs text-[#a3a3a3] mb-1">Contact</p>
          <p className="text-sm text-[#ededed]">{data.contact}</p>
        </div>
      )}
    </div>
  );
}

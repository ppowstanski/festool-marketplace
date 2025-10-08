import { useState } from 'react';
import type { ListingFormData } from '../../types/listing';
import { generatePost } from '../../utils/postGenerator';
import type { TranslationResult } from '../../services/translation';
import { useTranslation } from '../../hooks/useTranslation';

interface LivePreviewProps {
  data: Partial<ListingFormData>;
  translations?: {
    description: TranslationResult[];
    includedItems: TranslationResult[];
  } | null;
  onCopySuccess?: () => void;
  isMobileModal?: boolean;
  onClose?: () => void;
}

export function LivePreview({ data, translations, onCopySuccess, isMobileModal = false, onClose }: LivePreviewProps) {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const isFormValid = (): boolean => {
    return !!(
      data.country &&
      data.city &&
      data.languages && data.languages.length > 0 &&
      data.productName &&
      data.price &&
      data.currency &&
      data.shippingOptions && data.shippingOptions.length > 0 &&
      data.condition &&
      data.description &&
      data.includedItems
    );
  };

  const copyToClipboard = async () => {
    if (!isFormValid()) return;

    try {
      const post = generatePost(data as ListingFormData);
      await navigator.clipboard.writeText(`${post.title}\n\n${post.body}`);
      setCopied(true);
      if (onCopySuccess) {
        onCopySuccess();
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Generate formatted post
  const post = isFormValid() ? generatePost(data as ListingFormData) : null;

  // Mobile modal version
  if (isMobileModal) {
    return (
      <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
        {/* Header - sticky to top */}
        <div className="px-4 py-4 border-b border-[#262626] flex items-center justify-between bg-[#0a0a0a]">
          <h2 className="text-2xl font-bold text-[#ededed]">{t('preview.title')}</h2>
          <button
            onClick={onClose}
            className="p-2 text-[#a3a3a3] hover:text-[#ededed] transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!post ? (
          <div className="flex-1 p-6 flex items-center justify-center text-[#a3a3a3]">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>{t('preview.emptyState')}</p>
            </div>
          </div>
        ) : (
          <>
            {/* Content - scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Title */}
              <div>
                <h3 className="text-sm font-medium text-[#ededed] mb-2">{t('preview.postTitle')}</h3>
                <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                  <p className="font-semibold text-[#ededed] break-words">{post.title}</p>
                </div>
              </div>

              {/* Body */}
              <div>
                <h3 className="text-sm font-medium text-[#ededed] mb-2">{t('preview.postBody')}</h3>
                <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                  <pre className="whitespace-pre-wrap break-words font-sans text-[#ededed] text-sm leading-relaxed">{post.body}</pre>
                </div>
              </div>
            </div>

            {/* Copy Button - sticky to bottom */}
            <div className="p-3 border-t border-[#262626] bg-[#0a0a0a] flex items-center gap-3">
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-[#39b54a] text-white font-semibold rounded-lg hover:bg-[#39b54a]/90 transition-colors flex items-center gap-2 shadow-lg text-sm"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {t('preview.copied')}
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    {t('preview.copyButton')}
                  </>
                )}
              </button>
              <p className="text-[10px] text-[#a3a3a3] leading-tight flex-1">
                {t('preview.instruction')}
              </p>
            </div>
          </>
        )}
      </div>
    );
  }

  // Desktop version - full height with sticky header/footer
  return (
    <div className="h-[calc(100vh-6rem)] bg-[#0a0a0a] border border-[#262626] rounded-lg overflow-hidden flex flex-col">
      {/* Header - sticky to top */}
      <div className="px-4 py-4 border-b border-[#262626] flex items-center justify-between bg-[#0a0a0a]">
        <h2 className="text-2xl font-bold text-[#ededed]">{t('preview.title')}</h2>
        <p className="text-sm text-[#a3a3a3]">{t('preview.subtitle')}</p>
      </div>

      {!post ? (
        <div className="flex-1 p-6 flex items-center justify-center text-[#a3a3a3]">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>{t('preview.emptyState')}</p>
          </div>
        </div>
      ) : (
        <>
          {/* Content - scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-sm font-medium text-[#ededed] mb-2">{t('preview.postTitle')}</h3>
              <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                <p className="font-semibold text-[#ededed] break-words">{post.title}</p>
              </div>
            </div>

            {/* Body */}
            <div>
              <h3 className="text-sm font-medium text-[#ededed] mb-2">{t('preview.postBody')}</h3>
              <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                <pre className="whitespace-pre-wrap break-words font-sans text-[#ededed] text-sm leading-relaxed">{post.body}</pre>
              </div>
            </div>
          </div>

          {/* Copy Button - sticky to bottom */}
          <div className="p-3 border-t border-[#262626] bg-[#0a0a0a] flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-[#39b54a] text-white font-semibold rounded-lg hover:bg-[#39b54a]/90 transition-colors flex items-center gap-2 shadow-lg text-sm"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t('preview.copied')}
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  {t('preview.copyButton')}
                </>
              )}
            </button>
            <p className="text-[10px] text-[#a3a3a3] leading-tight flex-1">
              {t('preview.instruction')}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

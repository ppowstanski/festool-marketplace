import { useState } from 'react';
import type { ListingFormData } from '../../types/listing';
import { generatePost } from '../../utils/postGenerator';
import type { TranslationResult } from '../../services/translation';

interface LivePreviewProps {
  data: Partial<ListingFormData>;
  translations?: {
    description: TranslationResult[];
    includedItems: TranslationResult[];
  } | null;
  onCopySuccess?: () => void;
}

export function LivePreview({ data, translations, onCopySuccess }: LivePreviewProps) {
  const [copied, setCopied] = useState(false);

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

  return (
    <div className="sticky top-4 bg-[#0a0a0a] border border-[#262626] rounded-lg max-h-[calc(100vh-2rem)] overflow-hidden flex flex-col">
      <div className="px-6 py-4 border-b border-[#262626] flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#ededed]">Post Preview</h2>
        <p className="text-sm text-[#a3a3a3]">This is how your post will look</p>
      </div>

      {!post ? (
        <div className="flex-1 p-6 flex items-center justify-center text-[#a3a3a3]">
          <div className="text-center">
            <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p>Fill out the form to see your post preview</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <div>
              <h3 className="text-sm font-medium text-[#ededed] mb-2">Post Title</h3>
              <div className="bg-[#141414] rounded-lg p-4 border border-[#262626]">
                <p className="font-semibold text-[#ededed]">{post.title}</p>
              </div>
            </div>

            {/* Body */}
            <div>
              <h3 className="text-sm font-medium text-[#ededed] mb-2">Post Body</h3>
              <div className="bg-[#141414] rounded-lg p-4 border border-[#262626] max-h-[500px] overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-[#ededed] text-sm leading-relaxed">{post.body}</pre>
              </div>
            </div>
          </div>

          {/* Copy Button */}
          <div className="p-6 border-t border-[#262626] bg-[#0a0a0a]">
            <button
              onClick={copyToClipboard}
              className="w-full px-6 py-4 bg-[#39b54a] text-white font-semibold rounded-lg hover:bg-[#39b54a]/90 transition-colors flex items-center justify-center gap-3 shadow-lg"
            >
              {copied ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy to Clipboard
                </>
              )}
            </button>
            <div className="mt-4 bg-[#141414] border border-[#262626] rounded-lg p-3">
              <p className="text-xs text-[#a3a3a3] text-center">
                📋 <strong>Next steps:</strong> Click to copy → Go to Facebook group → Paste → Add photos → Post
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

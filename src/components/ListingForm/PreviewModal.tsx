import { useState } from 'react';
import { generatePost } from '../../utils/postGenerator';
import type { ListingFormData } from '../../types/listing';

interface PreviewModalProps {
  data: ListingFormData;
  onClose: () => void;
  onPostSuccess?: () => void;
}

export function PreviewModal({ data, onClose, onPostSuccess }: PreviewModalProps) {
  const [copied, setCopied] = useState(false);
  const post = generatePost(data);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${post.title}\n\n${post.body}`);
      setCopied(true);
      // Clear draft after successful copy (simulating successful post)
      if (onPostSuccess) {
        onPostSuccess();
      }
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Preview Your Post</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Photos */}
          {data.photos.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                Photos ({data.photos.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {data.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(photo)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Post Title</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="font-semibold text-gray-900">{post.title}</p>
            </div>
          </div>

          {/* Body */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Post Body</h3>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <pre className="whitespace-pre-wrap font-sans text-gray-900">{post.body}</pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-700 font-medium hover:bg-gray-200 rounded-lg transition-colors"
          >
            Edit Post
          </button>
          <button
            onClick={copyToClipboard}
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
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
        </div>

        {/* Helper Text */}
        <div className="px-6 pb-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm">
            <p className="text-blue-900 font-medium mb-2">📋 Next Steps:</p>
            <ol className="list-decimal list-inside space-y-1 text-blue-800">
              <li>Click "Copy to Clipboard" to copy your post text</li>
              <li>Go to your Festool Facebook group</li>
              <li>Create a new post and paste the text</li>
              <li><strong>Manually upload your {data.photos.length} photos</strong> (photos cannot be copied to clipboard)</li>
              <li>Publish your listing!</li>
            </ol>
          </div>
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-xs text-yellow-800">
            <strong>⚠️ Note:</strong> Photos cannot be automatically copied. You'll need to upload them manually when creating your Facebook post.
          </div>
        </div>
      </div>
    </div>
  );
}

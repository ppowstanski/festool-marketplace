import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';
import { PHOTO_CONSTRAINTS } from '../../constants/listing';

interface PhotoUploadProps {
  photos: File[];
  onChange: (photos: File[]) => void;
  error?: string;
}

export function PhotoUpload({ photos, onChange, error }: PhotoUploadProps) {
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const newPhotos = [...photos];

    for (const file of acceptedFiles) {
      // Check if we've reached the max
      if (newPhotos.length >= PHOTO_CONSTRAINTS.MAX_PHOTOS) break;

      // Compress image
      try {
        const compressed = await imageCompression(file, PHOTO_CONSTRAINTS.COMPRESSION_OPTIONS);
        newPhotos.push(compressed);
      } catch (err) {
        console.error('Error compressing image:', err);
        newPhotos.push(file); // Use original if compression fails
      }
    }

    onChange(newPhotos);
  }, [photos, onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    maxSize: PHOTO_CONSTRAINTS.MAX_FILE_SIZE,
    multiple: true,
  });

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onChange(newPhotos);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-green-500 bg-green-50'
            : error
            ? 'border-red-300 bg-red-50'
            : 'border-gray-300 hover:border-green-500'
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <p className="text-gray-600">
            {isDragActive ? (
              'Drop photos here...'
            ) : (
              <>
                Drag & drop photos here, or <span className="text-green-600 font-medium">browse</span>
              </>
            )}
          </p>
          <p className="text-sm text-gray-500">
            {photos.length}/{PHOTO_CONSTRAINTS.MAX_PHOTOS} photos • Min {PHOTO_CONSTRAINTS.MIN_PHOTOS} required • Max 5MB each
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.map((photo, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(photo)}
                alt={`Preview ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700">
        <p className="font-medium mb-2">📸 Photo Tips:</p>
        <ul className="list-disc list-inside space-y-1 text-gray-600">
          <li>Take photos in good lighting (natural daylight is best)</li>
          <li>Show the tool from different angles</li>
          <li>Include close-ups of any wear or damage</li>
          <li>Show serial number/model plate</li>
          <li>Include all accessories in photos</li>
        </ul>
      </div>
    </div>
  );
}

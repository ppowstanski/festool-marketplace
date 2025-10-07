import type { ListingFormData } from '../types/listing';

const DRAFT_STORAGE_KEY = 'festool-listing-draft';

export interface DraftData {
  formData: Omit<ListingFormData, 'photos'>;
  photos: string[]; // base64 encoded
  timestamp: number;
}

/**
 * Convert a File object to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Convert base64 string back to File object
 */
export function base64ToFile(base64: string, filename: string): File {
  // Extract the base64 data and mime type
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}

/**
 * Validate draft data structure
 */
export function validateDraftData(data: unknown): data is DraftData {
  if (!data || typeof data !== 'object') {
    return false;
  }

  const draft = data as Partial<DraftData>;

  return (
    typeof draft.timestamp === 'number' &&
    typeof draft.formData === 'object' &&
    draft.formData !== null &&
    Array.isArray(draft.photos)
  );
}

/**
 * Save draft to localStorage
 */
export async function saveDraft(formData: ListingFormData): Promise<void> {
  try {
    // Separate photos from form data
    const { photos, ...restFormData } = formData;

    // Convert photos to base64
    const photoPromises = photos.map((photo, index) =>
      fileToBase64(photo).then(base64 => ({ base64, index }))
    );
    const photoResults = await Promise.all(photoPromises);
    const photosBase64 = photoResults.map(r => r.base64);

    // Create draft object
    const draftData: DraftData = {
      formData: restFormData,
      photos: photosBase64,
      timestamp: Date.now(),
    };

    // Save to localStorage
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
  } catch (error) {
    // Handle quota exceeded or other errors
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save draft.');
      throw new Error('Storage quota exceeded. Please reduce the number or size of photos.');
    }
    throw error;
  }
}

/**
 * Load draft from localStorage
 */
export function loadDraft(): ListingFormData | null {
  try {
    const draftJson = localStorage.getItem(DRAFT_STORAGE_KEY);

    if (!draftJson) {
      return null;
    }

    const draft = JSON.parse(draftJson);

    if (!validateDraftData(draft)) {
      console.warn('Invalid draft data found, clearing...');
      clearDraft();
      return null;
    }

    // Convert base64 photos back to File objects
    const photos = draft.photos.map((base64, index) =>
      base64ToFile(base64, `photo-${index + 1}.jpg`)
    );

    // Reconstruct full form data
    const formData: ListingFormData = {
      ...draft.formData,
      photos,
    };

    return formData;
  } catch (error) {
    console.error('Error loading draft:', error);
    clearDraft();
    return null;
  }
}

/**
 * Clear draft from localStorage
 */
export function clearDraft(): void {
  localStorage.removeItem(DRAFT_STORAGE_KEY);
}

/**
 * Get draft timestamp if exists
 */
export function getDraftTimestamp(): number | null {
  try {
    const draftJson = localStorage.getItem(DRAFT_STORAGE_KEY);

    if (!draftJson) {
      return null;
    }

    const draft = JSON.parse(draftJson);

    if (validateDraftData(draft)) {
      return draft.timestamp;
    }

    return null;
  } catch {
    return null;
  }
}

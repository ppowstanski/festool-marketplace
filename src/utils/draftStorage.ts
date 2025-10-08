import type { ListingFormData } from '../types/listing';

const DRAFT_STORAGE_KEY = 'festool-listing-draft';

export interface DraftData {
  formData: ListingFormData;
  timestamp: number;
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
    draft.formData !== null
  );
}

/**
 * Save draft to localStorage
 */
export async function saveDraft(formData: ListingFormData): Promise<void> {
  try {
    // Create draft object
    const draftData: DraftData = {
      formData,
      timestamp: Date.now(),
    };

    // Save to localStorage
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draftData));
  } catch (error) {
    // Handle quota exceeded or other errors
    if (error instanceof Error && error.name === 'QuotaExceededError') {
      console.error('localStorage quota exceeded. Cannot save draft.');
      throw new Error('Storage quota exceeded.');
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

    return draft.formData;
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

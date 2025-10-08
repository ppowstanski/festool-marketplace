import { useEffect, useRef, useState } from 'react';
import type { UseFormWatch, UseFormReset } from 'react-hook-form';
import type { ListingFormData } from '../types/listing';
import { saveDraft, loadDraft, clearDraft as clearDraftStorage, getDraftTimestamp } from '../utils/draftStorage';

interface UseDraftAutoSaveOptions {
  watch: UseFormWatch<ListingFormData>;
  reset: UseFormReset<ListingFormData>;
  debounceMs?: number;
}

interface UseDraftAutoSaveReturn {
  isDraftSaved: boolean;
  draftTimestamp: number | null;
  clearDraft: () => void;
  saveError: string | null;
}

export function useDraftAutoSave({
  watch,
  reset,
  debounceMs = 500,
}: UseDraftAutoSaveOptions): UseDraftAutoSaveReturn {
  const [isDraftSaved, setIsDraftSaved] = useState(false);
  const [draftTimestamp, setDraftTimestamp] = useState<number | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isRestoringRef = useRef(false);

  // Restore draft on mount
  useEffect(() => {
    const draft = loadDraft();

    if (draft) {
      isRestoringRef.current = true;
      reset(draft);
      setDraftTimestamp(getDraftTimestamp());
      setIsDraftSaved(true);
      // Allow some time for form to settle before enabling auto-save
      setTimeout(() => {
        isRestoringRef.current = false;
      }, 100);
    }
  }, [reset]);

  // Auto-save on form changes
  useEffect(() => {
    const subscription = watch((formData) => {
      // Don't save while restoring
      if (isRestoringRef.current) {
        return;
      }

      // Clear existing timeout
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      // Set new timeout for debounced save
      saveTimeoutRef.current = setTimeout(async () => {
        try {
          setSaveError(null);
          await saveDraft(formData as ListingFormData);
          setIsDraftSaved(true);
          setDraftTimestamp(Date.now());
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Failed to save draft';
          setSaveError(message);
          setIsDraftSaved(false);
        }
      }, debounceMs);
    });

    return () => {
      subscription.unsubscribe();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [watch, debounceMs]);

  const clearDraft = () => {
    clearDraftStorage();
    setIsDraftSaved(false);
    setDraftTimestamp(null);
    setSaveError(null);
    reset({
      country: '',
      city: '',
      languages: [],
      productName: '',
      price: 0,
      currency: '',
      negotiable: false,
      shippingOptions: [],
      dhlShippingCost: '',
      year: undefined,
      condition: '',
      description: '',
      includedItems: '',
      contact: '',
    });
  };

  return {
    isDraftSaved,
    draftTimestamp,
    clearDraft,
    saveError,
  };
}

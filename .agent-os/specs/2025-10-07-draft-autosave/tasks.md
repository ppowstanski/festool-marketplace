# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-10-07-draft-autosave/spec.md

> Created: 2025-10-07
> Status: Ready for Implementation

## Tasks

- [x] 1. Create draft utility functions
  - [x] 1.1 Write tests for photo serialization (File to base64)
  - [x] 1.2 Implement fileToBase64() function
  - [x] 1.3 Write tests for photo deserialization (base64 to File)
  - [x] 1.4 Implement base64ToFile() function
  - [x] 1.5 Write tests for draft data validation
  - [x] 1.6 Implement validateDraftData() function
  - [x] 1.7 Verify all tests pass

- [x] 2. Create useDraftAutoSave hook
  - [x] 2.1 Write tests for hook functionality
  - [x] 2.2 Implement hook with watch and debounce
  - [x] 2.3 Add localStorage save logic with error handling
  - [x] 2.4 Add draft restoration on mount
  - [x] 2.5 Add clearDraft function
  - [x] 2.6 Return draft status and timestamp
  - [x] 2.7 Verify all tests pass

- [x] 3. Integrate auto-save into ListingForm
  - [x] 3.1 Write integration tests for ListingForm with drafts
  - [x] 3.2 Add useDraftAutoSave hook to ListingForm component
  - [x] 3.3 Handle draft restoration on component mount
  - [x] 3.4 Add draft indicator UI with timestamp
  - [x] 3.5 Add "Discard Draft" button with confirmation
  - [x] 3.6 Verify all tests pass

- [x] 4. Clear draft after successful post
  - [x] 4.1 Write tests for draft clearing after submission
  - [x] 4.2 Call clearDraft in PreviewModal after copy success
  - [x] 4.3 Verify draft is removed from localStorage
  - [x] 4.4 Verify all tests pass

- [ ] 5. End-to-end testing and polish
  - [ ] 5.1 Test complete flow in browser: fill form → refresh → data restored
  - [ ] 5.2 Test photo upload → refresh → photos restored correctly
  - [ ] 5.3 Test discard draft functionality
  - [ ] 5.4 Test draft cleared after post submission
  - [ ] 5.5 Add error handling for localStorage quota exceeded
  - [ ] 5.6 Verify all tests pass

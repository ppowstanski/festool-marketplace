# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-10-07-draft-autosave/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Technical Requirements

- Integrate with existing React Hook Form setup in ListingForm component
- Use localStorage Web API for draft persistence
- Implement debouncing to limit save frequency (500ms delay)
- Serialize File objects separately (convert to base64 for photos)
- Handle edge cases: localStorage quota exceeded, corrupted data
- Clear draft on successful post submission
- Provide UI feedback for draft status

## Approach

We'll use React Hook Form's watch API combined with useEffect to monitor form changes and save to localStorage. Photos will be converted to base64 strings for storage, then reconstructed back to File objects on load.

**Selected Approach**: Hook-based auto-save with localStorage

**Rationale**:
- Works seamlessly with existing React Hook Form setup
- No additional dependencies required
- localStorage is sufficient for single-draft MVP
- Easy to migrate to backend storage later

## Implementation Details

### Auto-Save Hook

Create a custom React hook `useDraftAutoSave` that:
1. Watches all form fields using `watch()`
2. Debounces changes (500ms)
3. Serializes data including photos to base64
4. Saves to localStorage with key `festool-listing-draft`
5. Returns draft status and clear function

### Draft Restoration

On component mount:
1. Check localStorage for existing draft
2. If found, deserialize data
3. Convert base64 photos back to File objects
4. Use `reset()` to populate form with draft data
5. Show visual indicator with timestamp

### Draft Clearing

Provide two mechanisms:
1. **Manual**: "Discard Draft" button that clears localStorage and resets form
2. **Automatic**: Clear draft in PreviewModal after successful copy (simulating post)

### Data Serialization

```typescript
interface DraftData {
  formData: ListingFormData;
  photos: string[]; // base64 encoded
  timestamp: number;
}
```

Photos will be converted using FileReader API to base64 before storage.

## External Dependencies

None - using only browser-native APIs (localStorage, FileReader)

## Error Handling

- Catch localStorage quota exceeded errors and show warning
- Validate draft data structure before restoration
- Handle corrupted JSON gracefully with try/catch
- Show error message if draft restoration fails

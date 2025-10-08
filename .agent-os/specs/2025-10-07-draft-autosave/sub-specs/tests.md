# Tests Specification

This is the tests coverage details for the spec detailed in @.agent-os/specs/2025-10-07-draft-autosave/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Test Coverage

### Unit Tests

**useDraftAutoSave Hook**
- Should save form data to localStorage after debounce delay
- Should not save if form data hasn't changed
- Should serialize photos to base64
- Should return draft status (saved/not saved)
- Should provide clearDraft function
- Should handle localStorage quota exceeded error

**Draft Utility Functions**
- Should convert File to base64 string
- Should convert base64 string back to File object
- Should serialize complete form data with timestamp
- Should deserialize draft data correctly
- Should validate draft data structure
- Should handle corrupted JSON gracefully

### Integration Tests

**ListingForm with Draft Auto-Save**
- Should save draft when user types in text fields
- Should save draft when user selects dropdown values
- Should save draft when user uploads photos
- Should restore draft on component mount
- Should show draft indicator with correct timestamp
- Should clear draft when user clicks "Discard Draft"
- Should clear draft after successful post submission

**localStorage Integration**
- Should persist data across page refreshes
- Should handle multiple form updates within debounce window
- Should not exceed localStorage quota with large photo sets

### Feature Tests

**End-to-End Draft Flow**
- User fills out partial form → closes browser → reopens → data is restored
- User uploads 3 photos → refreshes page → photos are restored as File objects
- User completes form → submits post → draft is cleared
- User with existing draft clicks "Discard Draft" → form is reset to empty state

## Mocking Requirements

- **localStorage**: Mock localStorage for unit tests using a custom implementation
- **FileReader**: Mock FileReader API for photo serialization tests
- **setTimeout/clearTimeout**: Mock debounce timers for predictable test execution

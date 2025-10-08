# Tests Specification

This is the tests coverage details for the spec detailed in @../.agent-os/specs/2025-10-07-listing-form/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Test Coverage

### Unit Tests

**Form Validation Functions**
- Validates country selection (required, one of 19 options)
- Validates city input (2-50 characters, letters and spaces only)
- Validates language selection (minimum 1 required)
- Validates product name (5-100 characters)
- Validates price (numbers only, > 0, < 1000000)
- Validates year (4 digits, 1990-current year)
- Validates description (50-2000 characters)
- Validates what's included (10-1000 characters)
- Validates photo count (3-10 photos)
- Validates photo file types (JPG, JPEG, PNG, WEBP)
- Validates photo file size (max 5MB per image)
- Validates email format (optional field)
- Validates phone format (optional field, any format accepted)

**Post Generation Functions**
- Generates correct title format with country flag and code
- Includes first 3 languages in title, adds "..." if more
- Shortens long product names appropriately
- Formats price with currency symbol correctly
- Adds "(negotiable)" to price when checkbox checked
- Generates complete post body with all fields
- Omits optional fields when not provided
- Formats shipping options with checkmarks correctly
- Includes emoji icons in correct positions

**Draft Save/Load Functions**
- Saves form state to localStorage
- Loads draft from localStorage on mount
- Clears draft after successful submission
- Handles corrupted localStorage data gracefully
- Auto-saves every 30 seconds when form is dirty

### Integration Tests

**Form Submission Flow**
- User fills all required fields → Submit button becomes enabled
- User misses required field → Submit button stays disabled
- User submits valid form → Preview modal opens
- User cancels preview → Returns to form with data intact
- User confirms in preview → Post text is generated
- Generated post matches template format exactly

**Photo Upload Flow**
- User uploads 1 photo → Shows error (minimum 3)
- User uploads 3 photos → Validation passes
- User uploads 11 photos → Shows error (maximum 10)
- User uploads invalid file type → Shows error message
- User uploads 6MB file → Shows error (max 5MB)
- User reorders photos → Order updates correctly
- User deletes photo → Count updates, validation re-runs

**Language Selection**
- User selects 1 language → Valid
- User selects 3 languages → All 3 appear in title
- User selects 5 languages → First 3 in title + "..."
- User deselects all languages → Validation error

**Conditional Fields**
- DHL shipping unchecked → DHL cost field hidden
- DHL shipping checked → DHL cost field appears
- DHL cost field accepts various formats (~25€, 20-30€, etc.)

**Draft Functionality**
- User fills form halfway → Clicks "Save Draft" → localStorage updated
- User refreshes page → Draft loads automatically
- User completes and submits → Draft is cleared
- Auto-save triggers after 30 seconds of inactivity

### Component Tests

**ListingForm Component**
- Renders all 13 fields correctly
- Shows progress indicator (e.g., "7/10 required fields completed")
- Displays validation errors below each field
- Submit button disabled when form invalid
- Submit button enabled when form valid
- Multilingual labels display correctly based on selected language

**CountrySelect Component**
- Renders 19 country options with emoji flags
- Displays labels in correct language
- Updates flag in post preview when changed

**LanguageCheckboxes Component**
- Renders 6 language options with emoji flags
- Allows multiple selections
- Shows error when none selected
- Updates title preview when changed

**PhotoUpload Component**
- Allows drag & drop file upload
- Shows preview thumbnails
- Displays upload progress for each image
- Allows reordering via drag & drop
- Delete button removes photo
- Shows photo count (e.g., "5/10 photos")
- Compresses images before storing

**PreviewModal Component**
- Displays generated title correctly
- Displays generated body with proper formatting
- Shows all uploaded photo thumbnails
- "Copy to Clipboard" button copies full text
- "Edit" button closes modal and returns to form
- "Post to Facebook" link opens Facebook (future enhancement)

**ProgressIndicator Component**
- Shows completion percentage (e.g., "70% complete")
- Updates in real-time as fields are filled
- Highlights current section being filled

### Mocking Requirements

**localStorage**
- Mock `localStorage.getItem()` to return test draft data
- Mock `localStorage.setItem()` to verify save calls
- Mock `localStorage.removeItem()` to verify clear calls

**File Upload**
- Mock `FileReader` for image preview generation
- Mock file objects for upload testing
- Mock image compression library

**Clipboard API**
- Mock `navigator.clipboard.writeText()` for copy functionality
- Verify correct text is copied to clipboard

**Browser Language Detection**
- Mock `navigator.language` to test different locales
- Verify correct translations are loaded

## Manual Testing Checklist

### Desktop Testing

**Form Validation**
- [ ] Fill all required fields → Form submits successfully
- [ ] Leave required field empty → Error message shows
- [ ] Enter invalid city (1 character) → Error shows
- [ ] Enter invalid city (special characters) → Error shows
- [ ] Select no languages → Error shows
- [ ] Enter product name too short (4 chars) → Error shows
- [ ] Enter price of 0 → Error shows
- [ ] Upload 2 photos → Error shows (minimum 3)
- [ ] Upload 11 photos → Error shows (maximum 10)
- [ ] Upload 6MB photo → Error shows (max 5MB)
- [ ] Upload .pdf file → Error shows (invalid format)

**Post Generation**
- [ ] Generate post → Title format matches specification
- [ ] Generate post → Body format matches specification
- [ ] Generate post with negotiable price → "(negotiable)" appears
- [ ] Generate post without optional fields → Optional fields omitted
- [ ] Generate post with 1 language → [EN] in title
- [ ] Generate post with 5 languages → [EN/DE/FR...] in title

**Draft Functionality**
- [ ] Fill form halfway → Click "Save Draft" → localStorage updated
- [ ] Refresh page → Draft loads correctly
- [ ] Edit loaded draft → Changes persist
- [ ] Submit form → Draft clears from localStorage
- [ ] Fill form → Wait 30 seconds → Auto-save triggers

**Photo Management**
- [ ] Upload 5 photos → All 5 show in preview
- [ ] Drag photo to reorder → Order changes
- [ ] Delete photo → Count updates, preview updates
- [ ] Upload photo from camera (if available) → Works

### Mobile Testing

**Responsive Layout**
- [ ] Form displays correctly on mobile (portrait)
- [ ] Form displays correctly on mobile (landscape)
- [ ] All touch targets are at least 44x44px
- [ ] Scroll works smoothly through entire form
- [ ] Sticky buttons stay visible at bottom

**Mobile Inputs**
- [ ] Price field opens numeric keyboard
- [ ] Year field opens numeric keyboard
- [ ] Email field opens email keyboard
- [ ] Phone field opens phone keyboard
- [ ] City field opens text keyboard

**Photo Upload on Mobile**
- [ ] "Take Photo" opens camera
- [ ] "Choose from Gallery" opens photo picker
- [ ] Photos compress before upload
- [ ] Thumbnail previews load quickly
- [ ] Touch drag to reorder photos works

### Multilingual Testing

- [ ] Switch to German → All labels change to German
- [ ] Switch to French → All labels change to French
- [ ] Switch to Polish → All labels change to Polish
- [ ] Placeholders update with language
- [ ] Help text updates with language
- [ ] Validation messages update with language

### Edge Cases

- [ ] Fill form, close browser, reopen → Draft persists
- [ ] Fill form in two tabs → Both work independently
- [ ] Corrupted localStorage data → Form loads with defaults
- [ ] Very long product name (100 chars) → Handles gracefully
- [ ] Very long description (2000 chars) → Handles gracefully
- [ ] Special characters in description → Displays correctly
- [ ] Emoji in description → Displays correctly

### Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

## Performance Testing

- [ ] Form loads in under 2 seconds
- [ ] Typing in fields feels responsive (no lag)
- [ ] Uploading 10 photos completes in reasonable time
- [ ] Preview generation is instant (< 100ms)
- [ ] Auto-save doesn't cause UI freezing

## Accessibility Testing

- [ ] All form fields have proper labels
- [ ] Tab navigation works through entire form
- [ ] Screen reader announces field labels correctly
- [ ] Screen reader announces validation errors
- [ ] Error messages have sufficient color contrast
- [ ] Focus indicators are visible on all interactive elements
- [ ] Form works without mouse (keyboard only)

## Testing Strategy

### Development Testing
- Write unit tests for all validation functions
- Write component tests for each form component
- Test post generation logic thoroughly
- Mock external dependencies (localStorage, clipboard, file upload)

### Manual Testing
- Test complete user flows on desktop and mobile
- Test all validation scenarios
- Test multilingual switching
- Test draft save/load functionality
- Test photo upload and management

### Pre-Release Testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS and Android)
- Accessibility audit with screen reader
- Performance profiling with large forms
- Load testing with maximum photos (10 x 5MB)

## Future Test Enhancements

- E2E tests with Playwright or Cypress
- Visual regression testing for UI consistency
- Automated multilingual testing for all 6 languages
- Performance benchmarks for form operations
- Automated accessibility testing with axe-core

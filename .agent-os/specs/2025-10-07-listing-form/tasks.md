# Spec Tasks

These are the tasks to be completed for the spec detailed in @../.agent-os/specs/2025-10-07-listing-form/spec.md

> Created: 2025-10-07
> Status: Ready for Implementation

## Tasks

- [ ] 1. Install Dependencies & Setup Types
  - [ ] 1.1 Install react-hook-form, zod, and @hookform/resolvers
  - [ ] 1.2 Install react-dropzone and browser-image-compression
  - [ ] 1.3 Install @dnd-kit/core and @dnd-kit/sortable
  - [ ] 1.4 Create TypeScript types for listing form data
  - [ ] 1.5 Create country and language constants with emoji flags

- [ ] 2. Build Form Validation Schema
  - [ ] 2.1 Write tests for validation functions
  - [ ] 2.2 Create Zod schema for all 13 fields
  - [ ] 2.3 Implement validation rules (min/max length, formats, required fields)
  - [ ] 2.4 Add custom validation for conditional fields (DHL cost)
  - [ ] 2.5 Verify all validation tests pass

- [ ] 3. Create Basic Form Components
  - [ ] 3.1 Write tests for FormField wrapper component
  - [ ] 3.2 Create FormField component with label, error display, help text
  - [ ] 3.3 Create CountrySelect component with 19 countries and emoji flags
  - [ ] 3.4 Create LanguageCheckboxes component with 6 languages
  - [ ] 3.5 Create ShippingOptions component with 3 shipping methods
  - [ ] 3.6 Create ConditionSelect component with 6 condition levels
  - [ ] 3.7 Verify all component tests pass

- [ ] 4. Implement Photo Upload Component
  - [ ] 4.1 Write tests for PhotoUpload component
  - [ ] 4.2 Integrate react-dropzone for drag & drop upload
  - [ ] 4.3 Implement image compression with browser-image-compression
  - [ ] 4.4 Create thumbnail preview grid
  - [ ] 4.5 Implement drag & drop reordering with dnd-kit
  - [ ] 4.6 Add delete photo functionality
  - [ ] 4.7 Show photo count indicator (e.g., "5/10")
  - [ ] 4.8 Verify all photo tests pass

- [ ] 5. Build Main ListingForm Component
  - [ ] 5.1 Write tests for ListingForm component
  - [ ] 5.2 Set up react-hook-form with Zod validation
  - [ ] 5.3 Add all 13 form fields with proper layout
  - [ ] 5.4 Implement real-time validation with error display
  - [ ] 5.5 Add progress indicator showing completion percentage
  - [ ] 5.6 Style form with TailwindCSS (mobile-first)
  - [ ] 5.7 Verify all form tests pass

- [ ] 6. Implement Draft Save/Load Functionality
  - [ ] 6.1 Write tests for draft save/load hooks
  - [ ] 6.2 Create useDraftSave hook with localStorage integration
  - [ ] 6.3 Implement auto-save every 30 seconds
  - [ ] 6.4 Add manual "Save Draft" button
  - [ ] 6.5 Implement draft loading on component mount
  - [ ] 6.6 Clear draft after successful submission
  - [ ] 6.7 Verify all draft tests pass

- [ ] 7. Create Post Generation Logic
  - [ ] 7.1 Write tests for post generation functions
  - [ ] 7.2 Implement title generation with country code and languages
  - [ ] 7.3 Implement body generation with emoji formatting
  - [ ] 7.4 Handle optional fields (omit when empty)
  - [ ] 7.5 Format shipping options with checkmarks
  - [ ] 7.6 Create usePostGenerator hook
  - [ ] 7.7 Verify all generation tests pass

- [ ] 8. Build Preview Modal Component
  - [ ] 8.1 Write tests for PreviewModal component
  - [ ] 8.2 Create modal component with generated title and body
  - [ ] 8.3 Display photo thumbnails in preview
  - [ ] 8.4 Add "Copy to Clipboard" functionality
  - [ ] 8.5 Add "Edit" button to return to form
  - [ ] 8.6 Style modal with TailwindCSS
  - [ ] 8.7 Verify all preview tests pass

- [ ] 9. Integrate Form into App
  - [ ] 9.1 Update AppPage to include ListingForm
  - [ ] 9.2 Add routing if needed (optional separate route)
  - [ ] 9.3 Test complete flow: fill form → preview → copy
  - [ ] 9.4 Verify form works on authenticated route

- [ ] 10. Mobile Optimization & Responsive Design
  - [ ] 10.1 Test form on mobile breakpoints (<640px)
  - [ ] 10.2 Ensure all touch targets are minimum 44x44px
  - [ ] 10.3 Test mobile photo upload (camera + gallery)
  - [ ] 10.4 Verify sticky buttons stay visible on mobile
  - [ ] 10.5 Test keyboard types (numeric, email, tel) on mobile

- [ ] 11. Polish & Refinements
  - [ ] 11.1 Add helpful tooltips and placeholder text
  - [ ] 11.2 Improve error messages for better UX
  - [ ] 11.3 Add loading states and transitions
  - [ ] 11.4 Test accessibility (keyboard navigation, screen readers)
  - [ ] 11.5 Performance optimization (lazy loading, memoization)

- [ ] 12. Manual Testing & Bug Fixes
  - [ ] 12.1 Test all validation scenarios manually
  - [ ] 12.2 Test draft save/load functionality
  - [ ] 12.3 Test photo upload, reordering, deletion
  - [ ] 12.4 Test post generation with various inputs
  - [ ] 12.5 Test on multiple browsers (Chrome, Firefox, Safari)
  - [ ] 12.6 Test on mobile devices (iOS and Android)
  - [ ] 12.7 Fix any bugs discovered during testing
  - [ ] 12.8 Verify all automated tests pass

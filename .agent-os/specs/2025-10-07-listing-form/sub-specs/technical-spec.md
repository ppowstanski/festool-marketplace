# Technical Specification

This is the technical specification for the spec detailed in @../.agent-os/specs/2025-10-07-listing-form/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Technical Requirements

### Form Structure

**13 Fields Total:**
- **Required fields:** 10 (Country, City, Languages, Product Name, Price, Currency, Shipping Options, Condition, Description, What's Included, Photos)
- **Optional fields:** 3 (DHL Shipping Cost, Year, Contact)

### Field Specifications

#### 1. Country (Dropdown)
- **Type:** Select/Dropdown
- **Required:** Yes
- **Options:** 19 European countries with emoji flags
- **Validation:** Must select one option
- **Output:** `📍 Country & City: 🇩🇪 Germany`

#### 2. City (Text Input)
- **Type:** Text input
- **Required:** Yes
- **Validation:** 2-50 characters, letters and spaces only
- **Output:** Appended to country: `📍 Country & City: 🇩🇪 Germany, Berlin`

#### 3. Communication Languages (Multiple Checkboxes)
- **Type:** Checkbox group
- **Required:** Yes (minimum 1)
- **Options:** 6 languages with emoji flags
- **Output:** `💬 Languages: 🇬🇧 English • 🇩🇪 Deutsch • 🇫🇷 Français`
- **Title logic:** First 3 languages in title: `[EN/DE/FR]`

#### 4. Product Name (Text Input)
- **Type:** Text input
- **Required:** Yes
- **Validation:** 5-100 characters
- **Output:** In title and body: `🏷️ Product: Festool TS 55 EQ Plus Track Saw`

#### 5. Price (Number + Currency + Checkbox)
- **Type:** Number input + Dropdown + Checkbox
- **Required:** Yes
- **Validation:** Numbers only, minimum 1, maximum 999999
- **Currency options:** EUR, PLN, CHF, DKK, SEK, NOK, CZK, HUF
- **Negotiable checkbox:** Optional
- **Output:** `💰 Price: 350 EUR (negotiable)`

#### 6. Shipping Options (Multiple Checkboxes)
- **Type:** Checkbox group
- **Required:** Yes (minimum 1)
- **Options:** Local pickup, National shipping, DHL Europe
- **Output:**
  ```
  📦 Shipping:
     [✓] Local pickup
     [✓] National shipping
     [✓] DHL Europe (~25€)
  ```

#### 7. DHL Shipping Cost (Text Input - Optional)
- **Type:** Text input
- **Required:** No
- **Dependency:** Shows only if "DHL Europe" is checked
- **Validation:** Numbers + currency symbols allowed
- **Output:** Appended to DHL Europe line: `[✓] DHL Europe (~25€)`

#### 8. Year of Production (Number Input - Optional)
- **Type:** Number input
- **Required:** No
- **Validation:** 4 digits, 1990 to current year
- **Output:** `📅 Year: 2019`

#### 9. Condition (Dropdown/Radio)
- **Type:** Select/Radio buttons
- **Required:** Yes
- **Options:** 6 condition levels with star ratings
  - ⭐⭐⭐⭐⭐ New
  - ⭐⭐⭐⭐⭐ Like New
  - ⭐⭐⭐⭐ Very Good
  - ⭐⭐⭐ Good
  - ⭐⭐ Fair
  - ⭐ For Parts
- **Output:** `⭐ Condition: Very Good`

#### 10. Detailed Description (Textarea)
- **Type:** Textarea
- **Required:** Yes
- **Validation:** 50-2000 characters
- **Output:** `📄 Details: [user's description]`

#### 11. What's Included (Textarea)
- **Type:** Textarea
- **Required:** Yes
- **Validation:** 10-1000 characters
- **Output:** `📦 Included: [user's list]`

#### 12. Photos (File Upload)
- **Type:** Multiple file upload
- **Required:** Yes (minimum 3)
- **Validation:**
  - 3-10 photos required
  - Formats: JPG, JPEG, PNG, WEBP
  - Max 5MB per image
  - Recommended: 1200x900px minimum
- **Features:**
  - Preview thumbnails
  - Reorder by drag & drop
  - Delete individual photos
- **Output:** Photos uploaded separately to Facebook (not in text template)

#### 13. Contact Information (Text Input - Optional)
- **Type:** Text input
- **Required:** No
- **Validation:** Email format or phone number, max 100 characters
- **Output:** `📞 Contact: jan.kowalski@email.com` (or omitted if empty)

### Post Generation Logic

#### Title Format
```
[🇩🇪 DE] [EN/DE/FR] Festool TS 55 EQ Plus - 350€
```

**Components:**
1. Country flag + code from Country field
2. Language codes from Languages field (max 3, then "...")
3. Product name (shortened if needed)
4. Price + currency (+ "neg." if negotiable)

#### Body Format
```
[Photos uploaded separately]

🏷️ Product: Festool TS 55 EQ Plus Track Saw
💰 Price: 350 EUR (negotiable)
📍 Country & City: 🇩🇪 Germany, Berlin
💬 Languages: 🇬🇧 English • 🇩🇪 Deutsch
📦 Shipping:
   [✓] Local pickup
   [✓] National shipping
   [✓] DHL Europe (~25€)
📅 Year: 2019
⭐ Condition: Very Good
📄 Details:
[User's description]

📦 Included:
[User's included items]

📞 Contact: [User's contact or omitted]
```

## Approach Options

### Option A: Single-Page Form (Selected)
**Implementation:**
- All 13 fields on one scrollable page
- Progressive validation as user fills out
- Sticky "Generate Preview" button at bottom
- Progress indicator showing completion percentage

**Pros:**
- Simple navigation
- User sees all requirements upfront
- Easy to reference previous fields
- Better for desktop users

**Cons:**
- Can feel overwhelming on mobile
- Longer scroll distance

**Rationale:** Given 13 fields, a single-page form with progress indicator provides the best UX. Multi-step wizards add friction for power users who want to fill quickly.

### Option B: Multi-Step Wizard
**Implementation:**
- Step 1: Location & Languages (3 fields)
- Step 2: Product Details (6 fields)
- Step 3: Photos & Contact (4 fields)

**Pros:**
- Less overwhelming initially
- Better mobile experience
- Clear progress through steps

**Cons:**
- More clicks to complete
- Harder to reference previous fields
- More complex state management

## Implementation Details

### File Structure
```
src/
├── components/
│   ├── ListingForm/
│   │   ├── ListingForm.tsx           # Main form component
│   │   ├── FormField.tsx             # Reusable field wrapper
│   │   ├── CountrySelect.tsx         # Country dropdown
│   │   ├── LanguageCheckboxes.tsx    # Language selection
│   │   ├── ShippingOptions.tsx       # Shipping checkboxes
│   │   ├── ConditionSelect.tsx       # Condition selector
│   │   ├── PhotoUpload.tsx           # Multi-photo upload
│   │   ├── PreviewModal.tsx          # Generated post preview
│   │   └── ProgressIndicator.tsx     # Form completion progress
├── hooks/
│   ├── useListingForm.ts             # Form state management
│   ├── useDraftSave.ts               # Auto-save draft logic
│   └── usePostGenerator.ts           # Generate title & body
├── utils/
│   ├── validation.ts                 # Field validation functions
│   ├── postFormatter.ts              # Format post template
│   └── imageCompression.ts           # Compress photos before upload
├── i18n/
│   ├── translations.ts               # Multilingual strings
│   └── countries.ts                  # Country list with translations
└── types/
    └── listing.ts                    # TypeScript interfaces
```

### State Management

Use React Hook Form for form management:
- Client-side validation with Zod schema
- Real-time error display
- Efficient re-renders
- Built-in dirty field tracking

### Draft Saving

**localStorage Strategy:**
- Key: `festool_listing_draft`
- Auto-save every 30 seconds
- Manual "Save Draft" button
- "Load Draft" on form mount
- Clear draft after successful submission

### Multilingual Approach (Simplified)

**Phase 1 (Current MVP):**
- Form UI in English only
- User enters all content in their preferred language
- "Communication Languages" field indicates which languages seller speaks
- Post generated in user's chosen language
- No automatic translation

**Phase 2 (Future Enhancement):**
- AI-powered translation of description and product details
- Generate multiple language versions of the same listing
- Requires OpenAI or similar translation API integration

## External Dependencies

### React Hook Form
- **Package:** `react-hook-form`
- **Purpose:** Form state management and validation
- **Justification:** Industry-standard solution, excellent TypeScript support, minimal re-renders

### Zod
- **Package:** `zod`
- **Purpose:** Schema validation and TypeScript type inference
- **Justification:** Pairs perfectly with React Hook Form, type-safe validation

### React Dropzone
- **Package:** `react-dropzone`
- **Purpose:** Drag & drop photo upload
- **Justification:** Best-in-class file upload UX, mobile-friendly

### Browser Image Compression
- **Package:** `browser-image-compression`
- **Purpose:** Client-side image optimization
- **Justification:** Reduce file sizes before upload, faster posting

### React Beautiful DnD (or dnd-kit)
- **Package:** `@dnd-kit/core` + `@dnd-kit/sortable`
- **Purpose:** Drag & drop photo reordering
- **Justification:** Modern, accessible, performant

## Validation Rules

### Client-Side Validation
- **Real-time validation:** On blur and on change (after first blur)
- **Error display:** Below field with red text and icon
- **Success indicator:** Green checkmark when valid
- **Submit validation:** Full form re-validation before generation

### Error Messages
Examples of user-friendly validation messages:
- ✅ "Great! Berlin is a major city."
- ❌ "City must be at least 2 characters."
- ⚠️ "Add 2 more photos (minimum 3 required)."
- ✅ "Perfect! Writing in 2 languages will reach more buyers."

## Mobile Optimization

### Responsive Design
- **Breakpoints:** Mobile (<640px), Tablet (640-1024px), Desktop (>1024px)
- **Touch targets:** Minimum 44x44px for all interactive elements
- **Input types:** Use appropriate mobile keyboards (number, email, tel)
- **Sticky buttons:** "Save Draft" and "Generate Preview" always visible

### Photo Upload on Mobile
- Direct camera access with `capture="environment"`
- Photo gallery selection
- Client-side compression before display
- Touch-friendly reordering

## Performance Considerations

- **Lazy load:** Photo upload component only when user scrolls to it
- **Debounce:** Auto-save triggers debounced by 30 seconds
- **Image compression:** Compress photos to max 1200px width, 80% quality
- **Code splitting:** Lazy load PreviewModal component
- **Memoization:** Memo expensive form calculations (post generation)

## Security & Privacy

- **Client-side only:** No server storage, all data in localStorage
- **GDPR compliant:** No tracking, no analytics without consent
- **Photo privacy:** Warning about public photos, option to blur faces
- **Contact info warning:** Alert user that email/phone will be public

## Future Enhancements (Out of Scope)

- AI-assisted description writing (OpenAI integration)
- Auto-translation of descriptions (Google Translate API)
- Price suggestions based on product + condition
- Direct Facebook Graph API posting (requires additional permissions)
- Backend database for saved drafts across devices
- Template system for frequently sold product types

# Spec Requirements Document

> Spec: Festool Listing Form
> Created: 2025-10-07
> Status: Planning

## Overview

Implement a comprehensive multilingual form that collects all necessary information for creating standardized Festool marketplace listings, generates formatted post text, and prepares content for Facebook group posting.

## User Stories

### Seller Creates a Professional Listing

As a Festool tool seller, I want to fill out a structured form with all product details, so that my listing is complete, professional, and reaches buyers across Europe.

**Workflow:**
1. Seller logs in and accesses the listing form
2. Fills out 13 fields covering location, product details, pricing, photos, and shipping
3. Form validates input in real-time
4. Seller previews the generated post with proper formatting
5. Seller publishes or copies the formatted text for Facebook

### Multilingual Seller Reaches International Buyers

As a seller who speaks multiple languages, I want to indicate which languages I can communicate in, so that buyers from different countries know they can contact me.

**Workflow:**
1. Seller selects country and city
2. Checks multiple language options (English, German, French, etc.)
3. Languages appear in generated post title: [EN/DE/FR]
4. Buyers can easily identify if they can communicate with the seller

### Buyer Understands Complete Product Information

As a buyer browsing listings, I want to see consistent, detailed product information with photos, so that I can make informed purchasing decisions without lengthy back-and-forth questions.

**Workflow:**
1. Buyer sees standardized post with all details
2. Clear sections: price, condition, location, shipping, what's included
3. Multiple photos showing product condition
4. Can immediately see if shipping is available to their location

## Spec Scope

1. **13-Field Form Implementation** - Complete form with all required and optional fields as specified
2. **Multilingual Support** - Interface in 6 languages (EN, DE, FR, IT, ES, PL)
3. **Real-time Validation** - Client-side validation with helpful error messages
4. **Photo Upload** - Multiple image upload with preview and reordering (3-10 photos)
5. **Post Generation** - Automatic title and body text generation following template
6. **Draft Saving** - localStorage-based draft persistence with auto-save
7. **Preview Functionality** - Show formatted post before publishing
8. **Mobile Optimization** - Responsive design with mobile-first approach

## Out of Scope

- Facebook direct posting via Graph API (Phase 2)
- AI-assisted description writing
- Auto-translation of descriptions
- Price suggestions based on condition
- Multi-item listings
- Backend database storage
- User authentication beyond Facebook login (already implemented)

## Expected Deliverable

1. Fully functional 13-field form with all specified validations
2. Real-time validation with helpful error messages
3. Multi-photo upload with preview, reordering, and 3-10 image limit
4. Automatic post title generation: `[🇩🇪 DE] [EN/DE] Festool TS 55 - 350€`
5. Automatic post body generation with emoji formatting
6. Draft auto-save to localStorage every 30 seconds
7. Preview modal showing final formatted post
8. Copy to clipboard functionality
9. Mobile-responsive interface with progress indicator
10. Multilingual interface supporting 6 languages

## Spec Documentation

- Tasks: @../.agent-os/specs/2025-10-07-listing-form/tasks.md
- Technical Specification: @../.agent-os/specs/2025-10-07-listing-form/sub-specs/technical-spec.md
- Tests Specification: @../.agent-os/specs/2025-10-07-listing-form/sub-specs/tests.md

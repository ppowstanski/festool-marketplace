# Product Roadmap

> Last Updated: 2025-10-08
> Version: 2.0.0
> Status: In Development

## Important Note: Facebook Groups API Deprecation

**Meta deprecated the Facebook Groups API (including `publish_to_groups` permission) in April 2024.** Third-party apps can no longer post directly to Facebook groups via API.

**Current Approach:** The app generates formatted post text that users copy to clipboard and manually paste into Facebook groups. This still provides value through standardized formatting and consistent post templates.

## Phase 0: Already Completed

- [x] Project setup with React + TypeScript + Vite + TailwindCSS
- [x] Facebook Login integration and authentication flow
- [x] Basic listing form with essential fields
- [x] Post template formatting logic
- [x] Basic responsive UI layout
- [x] Form validation and error handling
- [x] Post preview modal with copy-to-clipboard functionality
- [x] Improved form UI with Material Design inputs
- [x] localStorage-based draft saving and auto-save
- [x] Load and edit saved drafts
- [x] Delete drafts functionality
- [x] Draft timestamp display
- [x] Multi-language support (EN, DE, PL)
- [x] Translation feature for descriptions
- [x] Live preview panel
- [x] Data deletion page for Facebook compliance

## Phase 1: Core MVP - Clipboard-Based Posting (Current)

**Goal:** Launch a functional marketplace post generator that creates standardized, formatted posts for users to copy and paste into Facebook groups.

**Success Criteria:** Users can fill out a form, preview formatted post, copy text to clipboard, and manually post to Festool marketplace groups with consistent formatting.

### Must-Have Features

- [x] Copy-to-clipboard functionality for formatted posts `XS`
- [ ] User guidance/instructions for manual posting process `S`
- [ ] Loading states and user feedback `XS`

### Should-Have Features

- [ ] Sample post examples/templates `S`
- [ ] Quick-fill buttons for common values `S`

### Dependencies

- None (Facebook API no longer required)

## Phase 2: Polish & User Experience (1 week)

**Goal:** Refine the user experience, add helpful features, and optimize performance.

**Success Criteria:** App feels polished, fast, and professional with helpful guidance for users.

### Must-Have Features

- [ ] Custom domain setup `XS`
- [ ] SEO optimization (meta tags, Open Graph) `S`
- [ ] Error boundary and better error messages `S`
- [ ] Performance optimization (code splitting, lazy loading) `M`

### Should-Have Features

- [ ] Onboarding/help guide for first-time users `M`
- [ ] Sample post templates or examples `S`
- [ ] Analytics integration (Google Analytics or similar) `S`

### Dependencies

- Phase 3 completed
- Domain purchased (if applicable)

## Phase 3: Advanced Features (2-3 weeks)

**Goal:** Add features that provide more value to power users through better post management.

**Success Criteria:** Users can manage multiple drafts, use templates, and track their posting history.

### Must-Have Features

- [ ] Draft list view/management dashboard `M`
- [ ] Post templates (save and reuse common listings) `M`
- [ ] Export post history for record keeping `S`

### Should-Have Features

- [ ] Backend database integration (Firebase/Supabase) for cloud sync `L`
- [ ] Copy existing draft to create new listing `S`
- [ ] Tool model autocomplete/suggestions `M`
- [ ] Keyboard shortcuts for power users `S`

### Dependencies

- Phase 2 completed
- Decision on backend platform made (if cloud sync desired)

## Future Considerations

**Note:** These features may not be possible due to Facebook API limitations, but listed for future reference if API access changes.

- ~~Direct posting to Facebook groups (requires API)~~
- ~~View published posts (requires API)~~
- ~~Edit published posts (requires API)~~
- Browser extension for auto-filling Facebook post form
- Mobile app (React Native)
- Multi-language post templates
- Price suggestion based on similar items
- Markdown support for descriptions

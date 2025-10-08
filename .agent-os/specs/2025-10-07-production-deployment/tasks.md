# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-10-07-production-deployment/spec.md

> Created: 2025-10-07
> Status: Ready for Implementation

## Tasks

- [x] 1. Prepare repository for deployment
  - [x] 1.1 Test production build locally
  - [x] 1.2 Verify all changes committed to GitHub
  - [ ] 1.3 Push latest changes to GitHub main branch
  - [x] 1.4 Verify .gitignore excludes node_modules and .env

- [ ] 2. Set up Vercel deployment
  - [ ] 2.1 Create/login to Vercel account
  - [ ] 2.2 Import GitHub repository to Vercel
  - [ ] 2.3 Configure build settings (Framework: Vite)
  - [ ] 2.4 Add environment variable: VITE_FACEBOOK_APP_ID
  - [ ] 2.5 Trigger initial deployment
  - [ ] 2.6 Verify deployment succeeds and get production URL

- [ ] 3. Update Facebook App configuration
  - [ ] 3.1 Access Facebook Developer dashboard
  - [ ] 3.2 Add production URL to Valid OAuth Redirect URIs
  - [ ] 3.3 Add production URL to App Domains
  - [ ] 3.4 Save Facebook App settings

- [ ] 4. Test production deployment
  - [ ] 4.1 Visit production URL in browser
  - [ ] 4.2 Test Facebook Login flow
  - [ ] 4.3 Test form input and validation
  - [ ] 4.4 Test photo upload
  - [ ] 4.5 Test draft auto-save (fill form → refresh)
  - [ ] 4.6 Test preview and copy functionality
  - [ ] 4.7 Test discard draft
  - [ ] 4.8 Verify HTTPS certificate valid

- [ ] 5. Documentation and finalization
  - [ ] 5.1 Document production URL
  - [ ] 5.2 Create user guide (optional)
  - [ ] 5.3 Update roadmap with deployment complete
  - [ ] 5.4 Notify user of successful deployment

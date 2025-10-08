# Spec Requirements Document

> Spec: Production Deployment
> Created: 2025-10-07
> Status: Planning

## Overview

Deploy the Festool Marketplace application to production using Vercel, configure the custom domain (if available), and update Facebook App settings to allow production OAuth callbacks.

## User Stories

### Access Live Application

As a Festool tool seller, I want to access the application via a public URL, so that I can create listings from anywhere without running a local development server.

**Workflow**: User visits production URL → logs in with Facebook → creates and posts listings → application is always available online.

### Seamless Facebook Login

As a user, I want Facebook Login to work on the production site, so that I can authenticate without errors.

**Workflow**: User clicks "Login with Facebook" on production → Facebook OAuth flow completes successfully → user is authenticated and redirected to the form.

## Spec Scope

1. **Vercel Deployment Setup** - Initialize Vercel project and connect GitHub repository
2. **Build Configuration** - Ensure Vite build settings are production-ready
3. **Environment Variables** - Configure Facebook App ID for production
4. **Facebook App OAuth Settings** - Add production domain to Valid OAuth Redirect URIs
5. **Custom Domain (Optional)** - Configure custom domain if user provides one
6. **SSL Certificate** - Verify HTTPS is enabled (automatic with Vercel)
7. **Performance Optimization** - Verify code splitting and lazy loading work correctly

## Out of Scope

- Backend API deployment (not needed yet, frontend-only app)
- Database setup (using localStorage only)
- CI/CD pipeline configuration (Vercel auto-deploys from GitHub)
- Monitoring and analytics integration

## Expected Deliverable

1. Live production URL accessible to anyone
2. Facebook Login works on production domain
3. All features functional (form, draft auto-save, preview, copy)
4. HTTPS enabled with valid certificate
5. Fast load times with optimized builds

## Spec Documentation

- Tasks: @.agent-os/specs/2025-10-07-production-deployment/tasks.md
- Technical Specification: @.agent-os/specs/2025-10-07-production-deployment/sub-specs/technical-spec.md

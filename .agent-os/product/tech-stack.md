# Technical Stack

> Last Updated: 2025-10-07
> Version: 1.0.0

## Frontend

### Application Framework
- **Framework:** React
- **Version:** 18+
- **Language:** TypeScript 5.8+
- **Build Tool:** Vite

### Import Strategy
- **Strategy:** Node.js modules
- **Package Manager:** npm
- **Node Version:** 20 LTS

### CSS Framework
- **Framework:** TailwindCSS
- **Version:** 4.0+
- **PostCSS:** Yes

### UI Component Library
- **Library:** Headless UI or Radix UI
- **Purpose:** Accessible form components and modals

### Icon Library
- **Library:** Heroicons or Lucide React
- **Purpose:** Consistent iconography throughout the app

### Fonts Provider
- **Provider:** Google Fonts
- **Primary Font:** Inter or system fonts

## Backend & APIs

### Application Framework
- **Type:** Frontend-only (serverless)
- **API Integration:** Facebook Graph API for authentication and posting

### Authentication
- **Provider:** Facebook Login SDK
- **Strategy:** OAuth 2.0

### Database System
- **Type:** Not required initially (can add Firebase/Supabase later for draft saving)
- **Alternative:** Browser localStorage for draft functionality

## Infrastructure

### Application Hosting
- **Platform:** Vercel, Netlify, or GitHub Pages
- **Reason:** Free tier, automatic deployments, custom domain support
- **SSL:** Included by default

### Asset Hosting
- **Platform:** Same as application hosting (Vercel/Netlify)
- **Images:** Direct upload to Facebook via Graph API (no separate storage needed)

## Development & Deployment

### CI/CD Pipeline
- **Platform:** GitHub Actions
- **Trigger:** Push to main branch
- **Tests:** Run linting and build verification

### Environments
- **Production:** main branch
- **Development:** local development

### Code Repository
- **Platform:** GitHub
- **URL:** To be created

### Development Flow
- Release flow: `feature branches` → `main/production`

## External APIs & Services

### Facebook Graph API
- **Purpose:** User authentication, group posting
- **Version:** Latest stable
- **Required Permissions:**
  - `public_profile`
  - `publish_to_groups`
  - `groups_access_member_info`

### Facebook App Configuration
- **App Type:** Business App
- **Platform:** Web
- **App Review:** Required for group publishing permissions

## Development Tools

### Linting & Formatting
- **ESLint:** TypeScript configuration
- **Prettier:** Code formatting
- **Husky:** Pre-commit hooks

### Testing (Future)
- **Framework:** Vitest
- **Component Testing:** React Testing Library

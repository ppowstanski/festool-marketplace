# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-10-07-production-deployment/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Technical Requirements

- Deploy to Vercel with automatic deployments from GitHub main branch
- Configure Facebook App with production OAuth redirect URIs
- Ensure HTTPS is enabled (automatic with Vercel)
- Verify build process completes successfully
- Test all features on production URL
- Optional: Configure custom domain with DNS

## Deployment Platform: Vercel

**Rationale**: Vercel provides:
- Zero-configuration deployment for Vite apps
- Automatic HTTPS with valid certificates
- Global CDN for fast loading worldwide
- Free tier sufficient for this use case
- Automatic deployments from GitHub
- Easy environment variable management

**Alternative Considered**: Netlify (also excellent, but we'll use Vercel per tech-stack.md)

## Implementation Steps

### 1. Prepare Repository

- Ensure all code is committed and pushed to GitHub
- Verify `.gitignore` excludes sensitive files
- Check that build process works locally: `npm run build`

### 2. Vercel Setup

- Sign up/login to Vercel (https://vercel.com)
- Import GitHub repository
- Configure build settings:
  - Framework Preset: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Install Command: `npm install`

### 3. Environment Variables

Configure in Vercel dashboard:
- `VITE_FACEBOOK_APP_ID=1772733616680149`

### 4. Facebook App Configuration

Update Facebook App Settings:
- Go to https://developers.facebook.com/apps/1772733616680149/
- Navigate to: App Settings → Basic → Add Platform → Website
- Add production domain to "Valid OAuth Redirect URIs":
  - `https://<vercel-url>.vercel.app/`
  - If custom domain: `https://<custom-domain>/`

### 5. Production Testing Checklist

- [ ] Visit production URL
- [ ] Facebook Login works
- [ ] Form fills out correctly
- [ ] Draft auto-save works
- [ ] Photos upload and display
- [ ] Preview modal opens
- [ ] Copy to clipboard works
- [ ] Page refresh restores draft
- [ ] Discard draft works

## Build Optimization

Current Vite config should handle:
- Code splitting (automatic with dynamic imports)
- Asset optimization (images, CSS)
- Tree shaking (removing unused code)
- Minification (production builds)

No additional configuration needed.

## Custom Domain (Optional)

If user wants a custom domain:
1. Purchase domain from registrar (Namecheap, Google Domains, etc.)
2. Add domain in Vercel dashboard
3. Update DNS records with provided values
4. Add custom domain to Facebook App OAuth settings
5. Wait for DNS propagation (5-60 minutes)

## Rollback Strategy

If production deployment has issues:
- Vercel keeps previous deployments
- Can instantly rollback to previous version
- Or push fix to GitHub → automatic redeployment

## External Dependencies

None - all services already configured (Facebook App, GitHub)

## Security Considerations

- HTTPS enforced by Vercel (automatic)
- Facebook App ID is public (safe to expose in frontend)
- No sensitive keys or secrets in repository
- OAuth flow handled by Facebook SDK (secure)

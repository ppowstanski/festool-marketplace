# Deployment Guide

This guide will help you deploy the Festool Marketplace application to production using Vercel.

## Prerequisites

- ✅ Production build tested locally (completed)
- ✅ All TypeScript errors fixed (completed)
- GitHub account
- Vercel account (free tier is sufficient)

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `festool-marketplace` (or your preferred name)
3. Description: `Facebook marketplace listing tool for Festool tools`
4. Visibility: **Public** (required for Vercel free tier) or **Private** (requires Vercel Pro)
5. **Do NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

## Step 2: Push to GitHub

After creating the repository, run these commands in your terminal:

```bash
cd /Users/piotrpowstanski/Development/Festool/festool-marketplace

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/festool-marketplace.git

# Push all commits
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/signup (or login if you have an account)
2. Sign up with your GitHub account for easiest integration
3. Click "Add New..." → "Project"
4. Import your `festool-marketplace` repository
5. Configure project settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

6. Add Environment Variable:
   - Click "Environment Variables"
   - Name: `VITE_FACEBOOK_APP_ID`
   - Value: `1772733616680149`

7. Click **"Deploy"**

Vercel will build and deploy your app. This takes 1-3 minutes.

## Step 4: Get Your Production URL

After deployment completes, Vercel will show your production URL:
- Format: `https://festool-marketplace-xxxx.vercel.app`
- Copy this URL for the next step

## Step 5: Update Facebook App Settings

1. Go to https://developers.facebook.com/apps/1772733616680149/
2. Navigate to: **Settings** → **Basic**
3. Scroll to **App Domains**:
   - Click "Add Domain"
   - Enter your Vercel domain (e.g., `festool-marketplace-xxxx.vercel.app`)
4. Scroll to **Website** section:
   - If not added, click "Add Platform" → "Website"
   - Site URL: Enter your full Vercel URL (e.g., `https://festool-marketplace-xxxx.vercel.app/`)
5. Navigate to: **Products** → **Facebook Login** → **Settings**
6. Add to **Valid OAuth Redirect URIs**:
   - `https://festool-marketplace-xxxx.vercel.app/`
   - `https://festool-marketplace-xxxx.vercel.app` (without trailing slash)
7. Click **"Save Changes"**

## Step 6: Test Production Deployment

Visit your production URL and test:

- [ ] Page loads without errors
- [ ] Click "Login with Facebook"
- [ ] Facebook OAuth completes successfully
- [ ] Fill out the listing form
- [ ] Upload 3+ photos
- [ ] Refresh page → draft should restore
- [ ] Click "Preview Post"
- [ ] Click "Copy to Clipboard"
- [ ] Draft clears after copy

## Step 7: (Optional) Custom Domain

If you have a custom domain:

1. In Vercel dashboard, go to your project → **Settings** → **Domains**
2. Add your custom domain (e.g., `festool-marketplace.com`)
3. Update DNS records at your domain registrar with Vercel's provided values
4. Wait 5-60 minutes for DNS propagation
5. Update Facebook App settings with custom domain (repeat Step 5)

## Automatic Deployments

Vercel is now connected to your GitHub repository. Every time you push to the `main` branch:
- Vercel automatically builds and deploys
- Changes go live in 1-3 minutes
- Previous deployments are kept for instant rollback

## Troubleshooting

### Facebook Login Doesn't Work

**Error**: "URL Blocked: This redirect failed because the redirect URI is not whitelisted in the app's Client OAuth Settings."

**Fix**: Make sure you added the exact production URL to Facebook App's "Valid OAuth Redirect URIs" including the trailing slash.

### Build Fails on Vercel

**Fix**: Ensure environment variable `VITE_FACEBOOK_APP_ID` is set in Vercel project settings.

### Photos Not Displaying

**Fix**: This is expected behavior. Photos are stored in draft (localStorage) but must be manually uploaded to Facebook after copying the post text.

## Next Steps

Once deployed:
- Share the URL with Festool community members
- Submit Facebook App for review to get `publish_to_groups` permission (allows direct posting)
- Monitor usage and gather feedback
- Consider adding analytics (Google Analytics, Plausible, etc.)

## Production URL

After deployment, document your production URL here:

**Production URL**: `https://festool-marketplace-xxxx.vercel.app`

Replace with your actual URL after Step 4.

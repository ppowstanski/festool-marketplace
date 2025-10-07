# Facebook SDK Configuration Fix

## Error: "Opcja JSSDK nie jest włączona"

This means "Login with Javascript SDK" option is disabled in your Facebook App.

## Fix Steps

### 1. Go to Facebook Developer Console

Visit: https://developers.facebook.com/apps/1772733616680149/

### 2. Enable JavaScript SDK

1. In the left sidebar, click **"Facebook Login"** under **Products**
2. Click **"Settings"** (under Facebook Login)
3. Find the setting: **"Login with the JavaScript SDK"**
4. Toggle it to **"Yes"** (or "Tak" in Polish)
5. Click **"Save Changes"** at the bottom

### 3. Configure OAuth Settings

While you're in Facebook Login Settings, verify these are set:

**Valid OAuth Redirect URIs:**
- `https://localhost:5173/`
- `https://your-vercel-url.vercel.app/` (add after Vercel deployment)

**Allowed Domains for the JavaScript SDK:**
- `localhost`
- `your-vercel-url.vercel.app` (add after Vercel deployment)

### 4. App Domains

Go back to **Settings** → **Basic**:

**App Domains:**
- `localhost` (for development)
- `your-vercel-url.vercel.app` (add after deployment)

### 5. Test Again

1. Refresh your app at https://localhost:5173/
2. Try logging in with Facebook
3. Should work now!

## Additional Notes

### For Production (After Vercel Deployment)

Once you deploy to Vercel and get your production URL:
1. Return to Facebook Developer Console
2. Add your Vercel URL to:
   - Valid OAuth Redirect URIs
   - Allowed Domains for JavaScript SDK
   - App Domains (in Basic Settings)

### App Review (Future)

Currently working with:
- ✅ `public_profile` - works without review

To enable direct posting to groups, you'll need these permissions (require Facebook App Review):
- ❌ `publish_to_groups` - requires review
- ❌ `groups_access_member_info` - requires review

For now, the app works with copy/paste - users manually post to Facebook after copying the formatted text.

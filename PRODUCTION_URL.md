# Production Deployment

## ✅ Live Application

**Production URL**: https://festool-marketplace-gwii.vercel.app

**Status**: Deployed and working
**Facebook Login**: ✅ Configured and working
**Date Deployed**: 2025-10-07

## Deployment Summary

- **Hosting**: Vercel
- **Repository**: https://github.com/ppowstanski/festool-marketplace
- **Auto-deploy**: Enabled (pushes to `main` branch automatically deploy)

## Features Live

✅ Facebook OAuth Login
✅ 13-field listing form with validation
✅ Photo upload (3-10 photos)
✅ Draft auto-save (localStorage)
✅ Post preview
✅ Copy to clipboard
✅ Mobile responsive

## Facebook App Configuration

The following has been configured:
- JavaScript SDK: Enabled
- Valid OAuth Redirect URIs: `https://festool-marketplace-gwii.vercel.app/`
- App Domain: `festool-marketplace-gwii.vercel.app`

## Testing Checklist

Test these features on production:

- [ ] Visit https://festool-marketplace-gwii.vercel.app
- [ ] Login with Facebook
- [ ] Fill out listing form
- [ ] Upload 3+ photos
- [ ] Preview post
- [ ] Copy to clipboard
- [ ] Refresh page - draft should restore
- [ ] Discard draft
- [ ] Test on mobile device

## Next Steps

1. **Share with users**: Send the URL to Festool community members
2. **Monitor usage**: Check for any issues or feedback
3. **Facebook App Review** (optional): Submit app for `publish_to_groups` permission to enable direct posting

## Continuous Deployment

Every time you push to the `main` branch:
```bash
git add .
git commit -m "Your changes"
git push
```

Vercel automatically:
1. Detects the push
2. Builds the app
3. Deploys to production
4. Updates https://festool-marketplace-gwii.vercel.app

Changes go live in ~1-3 minutes.

## Rollback

If you need to rollback to a previous version:
1. Go to https://vercel.com/ppowstanski/festool-marketplace
2. Go to "Deployments" tab
3. Find previous successful deployment
4. Click "..." → "Promote to Production"

## Support

- **GitHub Issues**: https://github.com/ppowstanski/festool-marketplace/issues
- **Vercel Dashboard**: https://vercel.com/ppowstanski/festool-marketplace
- **Facebook App Dashboard**: https://developers.facebook.com/apps/1772733616680149/

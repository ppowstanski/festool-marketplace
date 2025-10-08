# Facebook App Review Guide

This guide walks through the Facebook App Review process to get approval for `publish_to_groups` permission.

> Created: 2025-10-07
> Version: 1.0.0

## Overview

Facebook requires App Review for any permissions beyond `public_profile`. To enable direct posting to groups, we need approval for:

1. **`publish_to_groups`** - Post on behalf of user to groups they manage
2. **`groups_access_member_info`** - Access list of groups user is a member of

**Timeline**: Facebook App Review typically takes 3-7 business days

## Prerequisites

Before submitting for review:

- ✅ App is live on production (https://festool-marketplace-gwii.vercel.app)
- ✅ Facebook Login working
- ✅ App has clear use case documentation
- ✅ Privacy Policy URL (required)
- ✅ Terms of Service URL (optional but recommended)
- ✅ App Icon (1024x1024px)
- ✅ Screen recordings showing the feature

## Step 1: Create Required Legal Pages

### Privacy Policy

You need a privacy policy URL. Create `PRIVACY_POLICY.md` in your repository explaining:

**Key points to include:**
- What data you collect (name, profile picture from Facebook)
- How you use it (to create marketplace listings)
- Data storage (localStorage only, no server storage)
- Data sharing (only posted to Facebook when user explicitly posts)
- User rights (can delete account, clear data)

**Quick option**: Use a privacy policy generator:
- https://www.privacypolicygenerator.info/
- https://www.freeprivacypolicy.com/

Deploy this as a page on your Vercel site: `https://festool-marketplace-gwii.vercel.app/privacy`

### Terms of Service (Optional)

Basic terms explaining:
- App is for Festool tool marketplace listings
- Users are responsible for their posts
- Must comply with Facebook Community Standards

## Step 2: Prepare App Review Materials

### A. App Icon

Upload a 1024x1024px icon:
1. Go to https://developers.facebook.com/apps/1772733616680149/settings/basic/
2. Upload under "App Icon"

### B. Screen Recording

Record a video showing:
1. User logging in with Facebook
2. Filling out the listing form
3. Clicking "Post to Facebook Group"
4. Selecting a group
5. Post appearing in the Facebook group

**Tools**: QuickTime (Mac), OBS Studio (free), Loom

**Length**: 1-3 minutes
**Format**: MP4, MOV

### C. Test User Account

Create a test Facebook account or use your own for review.

## Step 3: Submit for App Review

### Navigate to App Review

1. Go to https://developers.facebook.com/apps/1772733616680149/
2. Left sidebar → **"App Review"** → **"Permissions and Features"**

### Request `publish_to_groups`

1. Find **"publish_to_groups"** in the list
2. Click **"Request"** or **"Get Advanced Access"**
3. Fill out the form:

**Business Verification**: May be required for some permissions
- Provide business details if asked
- May need to verify via documents or domain

**Use Case**: Explain how you'll use the permission
```
We use publish_to_groups to allow Festool tool sellers to post
marketplace listings directly to Festool community Facebook groups.

Users fill out a structured form with tool details, photos, pricing,
and shipping information. When they click "Post to Group", the app
posts the formatted listing on their behalf to their selected Festool
group.

This saves users time by eliminating manual copy/paste and photo
uploads, while ensuring consistent, professional listing formats in
the community.
```

**Current Implementation**: Select "Yes" if you've already implemented it (we'll do this after approval)

**Screen Recording**: Upload your video

**Privacy Policy URL**: `https://festool-marketplace-gwii.vercel.app/privacy`

### Request `groups_access_member_info`

Repeat the same process for this permission:

**Use Case**:
```
We use groups_access_member_info to display a list of Facebook groups
the user is a member of, so they can select which Festool group to
post their marketplace listing to.

The app only shows groups where the user has permission to post,
allowing them to choose the most relevant community for their listing.
```

## Step 4: Wait for Review

- **Timeline**: 3-7 business days typically
- **Status**: Check in App Review dashboard
- **Notifications**: Facebook will email you with results

### Possible Outcomes

**✅ Approved**: You can proceed with implementation
**❌ Rejected**: Facebook explains why and you can resubmit after fixing issues
**🔄 More Info Needed**: Facebook asks clarifying questions

## Step 5: After Approval

Once approved:
1. Implement the direct posting feature (see technical-spec.md)
2. Test thoroughly
3. Deploy to production
4. Permissions are now active for all users

## Common Rejection Reasons & Fixes

### "Doesn't comply with Platform Terms"
**Fix**: Ensure you're not violating Facebook policies:
- No spam or automated posting
- Users explicitly choose to post
- Clear what will be posted

### "Insufficient documentation"
**Fix**: Provide more detailed screen recordings and use case descriptions

### "Privacy Policy missing required info"
**Fix**: Add sections about data collection, storage, and user rights

### "Business verification required"
**Fix**: Complete business verification process with official documents

## Testing Before Submission

Before submitting, test with **Test Users**:

1. Go to **Roles** → **Test Users**
2. Create test user accounts
3. These can use the permissions before approval
4. Verify everything works

## Estimated Timeline

| Task | Time |
|------|------|
| Create privacy policy | 1-2 hours |
| Prepare app icon | 30 mins |
| Record screen demo | 1 hour |
| Fill out submission forms | 1 hour |
| **Facebook review** | **3-7 days** |
| Implement after approval | 4-6 hours |
| **Total** | **~2 weeks** |

## Need Help?

- **Facebook Developer Support**: https://developers.facebook.com/support/
- **App Review Docs**: https://developers.facebook.com/docs/app-review
- **Platform Policy**: https://developers.facebook.com/policy

## Next Steps

After reading this guide:
1. Create privacy policy
2. Prepare screen recording
3. Submit App Review request
4. Wait for approval
5. Return to implementation (technical-spec.md)

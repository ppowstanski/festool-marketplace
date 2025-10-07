# Privacy Policy for Festool Marketplace

**Last Updated**: October 7, 2025

## Introduction

Festool Marketplace ("we", "our", or "us") is a web application that helps sellers create and share listings for Festool tools in Facebook groups. This Privacy Policy explains how we collect, use, and protect your information when you use our service at https://festool-marketplace-gwii.vercel.app.

## Information We Collect

### Information from Facebook

When you log in with Facebook, we receive:
- Your name
- Your profile picture
- Your Facebook user ID
- Access token (used only during your session)

We request these permissions:
- `public_profile` - To identify you and display your name
- `publish_to_groups` (pending approval) - To post listings on your behalf to Facebook groups
- `groups_access_member_info` (pending approval) - To show you which Facebook groups you can post to

### Information You Provide

- Listing details (product name, price, condition, description)
- Photos of tools you're selling
- Location (country and city)
- Languages you speak
- Shipping preferences

### Automatically Collected Information

We do not use cookies or tracking technologies. We do not collect:
- IP addresses
- Device information
- Browsing history
- Analytics data

## How We Use Your Information

We use your information to:
- Authenticate you via Facebook Login
- Display your name when logged in
- Enable you to create marketplace listings
- Post listings to Facebook groups (with your explicit permission)
- Save draft listings locally in your browser

## How We Store Your Information

### Local Storage Only

All data is stored **locally in your browser** using localStorage:
- Draft listings
- Form data
- Session information

**We do NOT store any data on servers**. Everything stays on your device.

### Facebook Storage

When you post a listing to a Facebook group:
- The post is stored by Facebook according to their policies
- Photos are uploaded to Facebook's servers
- You can delete these posts at any time through Facebook

## Data Sharing

We do NOT:
- Sell your data
- Share your data with third parties
- Use your data for advertising
- Track you across websites

We ONLY share data with:
- **Facebook** - When you explicitly click "Post to Facebook Group", we send your listing to Facebook's API

## Your Rights

You have the right to:
- **Access** your data (it's all in your browser's localStorage)
- **Delete** your data (clear browser data or use "Discard Draft" button)
- **Revoke permissions** (disconnect the app in Facebook settings)
- **Export** your data (copy and save your listings before posting)

## Children's Privacy

Our service is not directed to children under 13. We do not knowingly collect information from children.

## Data Retention

- **Draft data**: Stored until you clear it or post your listing
- **Session data**: Cleared when you log out
- **Facebook posts**: Stored by Facebook according to their retention policies

You can clear all local data by:
1. Clicking "Discard Draft" in the app
2. Logging out
3. Clearing your browser's localStorage

## Security

We protect your data by:
- Using HTTPS for all connections
- Storing data only in your browser (no server storage)
- Never storing access tokens permanently
- Using Facebook's secure OAuth authentication

## Changes to This Policy

We may update this Privacy Policy from time to time. The "Last Updated" date at the top will reflect the most recent changes. We will notify users of significant changes by displaying a notice in the application.

## Third-Party Services

### Facebook

Our app integrates with Facebook. Your use of Facebook is governed by Facebook's own policies:
- Facebook Privacy Policy: https://www.facebook.com/privacy/policy/
- Facebook Terms of Service: https://www.facebook.com/terms.php

### Vercel (Hosting)

Our app is hosted on Vercel. Vercel may collect:
- Basic request logs (IP addresses, request times)
- Performance metrics

Vercel Privacy Policy: https://vercel.com/legal/privacy-policy

## Contact Us

If you have questions about this Privacy Policy, please:

- **GitHub Issues**: https://github.com/ppowstanski/festool-marketplace/issues
- **Email**: [Your contact email]

## Your Consent

By using Festool Marketplace, you consent to this Privacy Policy.

---

## For Developers

### Technical Details

- **No backend database**: All user data stored in browser localStorage
- **No analytics**: No Google Analytics, Plausible, or similar services
- **No cookies**: Except those required by Facebook SDK for authentication
- **Open source**: Code is publicly viewable on GitHub

### Data Flow

1. User logs in → Facebook provides profile info → Stored in React state (memory only)
2. User fills form → Data stored in localStorage → Removed after posting
3. User posts to group → Data sent to Facebook API → Stored by Facebook

### localStorage Keys

- `festool-listing-draft` - Draft form data
- `festool-auth` - Session information (temporary)

Users can inspect and delete these at any time via browser DevTools.

---

**This privacy policy was created with transparency and user privacy as top priorities.**

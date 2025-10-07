# GitHub Setup Guide

GitHub requires a Personal Access Token (PAT) instead of password for HTTPS authentication.

## Option 1: Personal Access Token (Quickest)

### Step 1: Create Personal Access Token

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Settings:
   - **Note**: "Festool Marketplace Deployment"
   - **Expiration**: 90 days (or your preference)
   - **Scopes**: Check only `repo` (full control of private repositories)
4. Click **"Generate token"**
5. **COPY THE TOKEN NOW** - you won't see it again!

### Step 2: Update Git Remote

First, let's check your current remote:

```bash
cd /Users/piotrpowstanski/Development/Festool/festool-marketplace
git remote -v
```

If it shows YOUR_USERNAME, update it with your actual username:

```bash
# Replace YOUR_USERNAME with 'ppowstanski'
git remote set-url origin https://github.com/ppowstanski/festool-marketplace.git
```

### Step 3: Push with Token

```bash
git push -u origin main
```

When prompted:
- **Username**: `ppowstanski`
- **Password**: Paste your Personal Access Token (not your GitHub password!)

The token will be cached, so you won't need to enter it again.

## Option 2: SSH Keys (More Secure, One-Time Setup)

### Step 1: Check for Existing SSH Key

```bash
ls -la ~/.ssh/id_*.pub
```

If you see `id_rsa.pub` or `id_ed25519.pub`, you already have a key - skip to Step 3.

### Step 2: Generate New SSH Key

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

Press Enter 3 times (default location, no passphrase for simplicity).

### Step 3: Copy SSH Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire output (starts with `ssh-ed25519`).

### Step 4: Add Key to GitHub

1. Go to https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: "MacBook Festool Project"
4. Key type: "Authentication Key"
5. Paste your SSH key
6. Click **"Add SSH key"**

### Step 5: Update Remote to Use SSH

```bash
cd /Users/piotrpowstanski/Development/Festool/festool-marketplace
git remote set-url origin git@github.com:ppowstanski/festool-marketplace.git
```

### Step 6: Push

```bash
git push -u origin main
```

No password needed!

## Verify Repository Exists

Before pushing, make sure you created the GitHub repository:

1. Go to https://github.com/new
2. Repository name: `festool-marketplace`
3. Public or Private
4. **Don't** initialize with README
5. Click **"Create repository"**

## Troubleshooting

### "repository not found"
- Make sure you created the repository on GitHub first
- Verify the repository name matches exactly
- Check you're using the correct username

### "Permission denied"
- For HTTPS: Make sure you're using the token, not your password
- For SSH: Run `ssh -T git@github.com` to test connection

### "Remote already exists"
```bash
git remote remove origin
git remote add origin https://github.com/ppowstanski/festool-marketplace.git
# or for SSH:
git remote add origin git@github.com:ppowstanski/festool-marketplace.git
```

## After Successful Push

Once `git push -u origin main` succeeds:
1. Verify at https://github.com/ppowstanski/festool-marketplace
2. Continue to Vercel deployment (see DEPLOYMENT.md Step 3)

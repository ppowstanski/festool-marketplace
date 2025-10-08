# Tech Stack

> Version: 1.0.0
> Last Updated: 2025-08-31

## Context

This file is part of the Agent OS standards system. These global tech stack defaults are referenced by all product codebases when initializing new projects. Individual projects may override these choices in their `.agent-os/product/tech-stack.md` file.

## Core Technologies

## Monorepo management
- **Framework:** Nx
- **Version:** 21+
## Frontend Stack

### Application Framework
- **Framework:** Angular + zoneless
- **Version:** 20+
- **Language:** Typescript 5.8+

### Import Strategy
- **Strategy:** Node.js modules
- **Package Manager:** npm
- **Node Version:** 20 LTS

### CSS Framework
- **Framework:** TailwindCSS
- **Version:** 4.0+
- **PostCSS:** Yes

## Assets & Media

## Infrastructure

### Application Hosting
- **Platform:** Digital Ocean
- **Service:** App Platform / Droplets
- **Region:** Primary region based on user base

## Deployment/Development

### CI/CD Pipeline
- **Platform:** GitHub Actions
- **Trigger:** Push to main/staging branches
- **Tests:** Run before deployment

### Environments
- **Production:** main branch
- **Staging:** staging branch
- **Development:** develop branch
- **Review Apps:** PR-based (optional)
### Development flow
- Release flow: `feature branches` → `develop` → `staging` → `main/production`

---

*Customize this file with your organization's preferred tech stack. These defaults are used when initializing new projects with Agent OS.*

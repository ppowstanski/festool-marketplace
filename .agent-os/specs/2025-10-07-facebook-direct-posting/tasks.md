# Spec Tasks

These are the tasks to be completed for the spec detailed in @.agent-os/specs/2025-10-07-facebook-direct-posting/spec.md

> Created: 2025-10-07
> Status: Waiting for Facebook App Review

## Tasks

### Phase 1: App Review Preparation (User Action Required)

- [ ] 1. Create legal pages
  - [ ] 1.1 Create privacy policy page
  - [ ] 1.2 Deploy privacy policy to production
  - [ ] 1.3 Create terms of service (optional)
  - [ ] 1.4 Update Facebook App with privacy policy URL

- [ ] 2. Prepare review materials
  - [ ] 2.1 Create/upload app icon (1024x1024px)
  - [ ] 2.2 Record screen demo of current app
  - [ ] 2.3 Record screen demo of planned direct posting feature
  - [ ] 2.4 Write detailed use case descriptions

- [ ] 3. Submit Facebook App Review
  - [ ] 3.1 Request `publish_to_groups` permission
  - [ ] 3.2 Request `groups_access_member_info` permission
  - [ ] 3.3 Upload screen recordings
  - [ ] 3.4 Fill out use case forms
  - [ ] 3.5 Submit for review

- [ ] 4. Wait for Facebook approval (3-7 business days)
  - [ ] 4.1 Monitor email for Facebook response
  - [ ] 4.2 Respond to any additional info requests
  - [ ] 4.3 Address any rejection reasons if needed

### Phase 2: Implementation (After Approval)

- [ ] 5. Create Facebook API service
  - [ ] 5.1 Write tests for group fetching
  - [ ] 5.2 Implement getUserGroups() function
  - [ ] 5.3 Write tests for photo upload
  - [ ] 5.4 Implement uploadPhoto() function
  - [ ] 5.5 Write tests for post creation
  - [ ] 5.6 Implement createGroupPost() function
  - [ ] 5.7 Add error handling for all API calls
  - [ ] 5.8 Verify all tests pass

- [ ] 6. Create GroupSelector component
  - [ ] 6.1 Write tests for GroupSelector UI
  - [ ] 6.2 Implement modal with group list
  - [ ] 6.3 Add loading state while fetching groups
  - [ ] 6.4 Add group selection handling
  - [ ] 6.5 Add confirmation dialog
  - [ ] 6.6 Style with TailwindCSS
  - [ ] 6.7 Verify all tests pass

- [ ] 7. Update AuthContext with new permissions
  - [ ] 7.1 Update Facebook Login scope
  - [ ] 7.2 Add permission check helpers
  - [ ] 7.3 Handle permission denied scenarios
  - [ ] 7.4 Test permission flow

- [ ] 8. Modify PreviewModal for direct posting
  - [ ] 8.1 Write tests for posting flow
  - [ ] 8.2 Add "Post to Facebook Group" button
  - [ ] 8.3 Integrate GroupSelector component
  - [ ] 8.4 Implement photo upload with progress
  - [ ] 8.5 Implement post creation
  - [ ] 8.6 Show success message with post link
  - [ ] 8.7 Handle all error scenarios
  - [ ] 8.8 Keep "Copy to Clipboard" as backup
  - [ ] 8.9 Verify all tests pass

- [ ] 9. Testing and polish
  - [ ] 9.1 Test with Facebook test users
  - [ ] 9.2 Test with real account in test group
  - [ ] 9.3 Test error scenarios (network failures, permission denied)
  - [ ] 9.4 Test with 3 photos, 10 photos
  - [ ] 9.5 Verify photos appear in correct order
  - [ ] 9.6 Verify formatting is preserved
  - [ ] 9.7 Add loading states and animations
  - [ ] 9.8 Verify all tests pass

- [ ] 10. Deploy to production
  - [ ] 10.1 Push changes to GitHub
  - [ ] 10.2 Verify Vercel deployment succeeds
  - [ ] 10.3 Test on production URL
  - [ ] 10.4 Update documentation
  - [ ] 10.5 Announce new feature to users

## Notes

**⚠️ Important**: Phase 2 (Implementation) can only begin AFTER Facebook approves the app review request. The review process typically takes 3-7 business days.

**Parallel Work**: While waiting for approval, you can work on:
- Creating the privacy policy
- Preparing screen recordings
- Writing tests for the new features
- Designing the UI components

**Estimated Timeline**:
- Phase 1 (Prep + Submit): 1 day
- Wait for approval: 3-7 days
- Phase 2 (Implementation): 2-3 days
- **Total**: 1-2 weeks

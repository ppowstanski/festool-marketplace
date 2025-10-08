# Spec Requirements Document

> Spec: Facebook Direct Posting
> Created: 2025-10-07
> Status: Planning

## Overview

Enable users to post listings directly to Facebook groups from the application, eliminating the need to manually copy/paste text and upload photos. This requires Facebook App Review approval for `publish_to_groups` and `groups_access_member_info` permissions.

## User Stories

### Direct Post to Group

As a seller, I want to post my listing directly to the Festool Facebook group with one click, so that I don't have to manually copy text and upload photos.

**Workflow**: User completes form → clicks "Post to Facebook Group" → selects target group from list → confirms → listing posts directly to Facebook with all photos → success message shown.

### Group Selection

As a seller who is in multiple Festool groups, I want to select which group(s) to post to, so that I can reach the right audience.

**Workflow**: User clicks "Post to Facebook Group" → modal shows list of groups user is a member of → user selects one or multiple groups → posts to all selected groups.

### Post Status Tracking

As a seller, I want to see if my post was successful and get a link to view it on Facebook, so that I can verify it posted correctly.

**Workflow**: After posting → success message shows "Posted successfully!" with link → user clicks link → opens Facebook group post in new tab.

## Spec Scope

1. **Facebook App Review Submission** - Complete App Review process to get `publish_to_groups` permission
2. **Group Discovery API** - Fetch list of groups user is a member of
3. **Direct Posting API** - Post text and photos to selected Facebook group(s)
4. **UI Changes** - Replace "Copy to Clipboard" with "Post to Facebook Group" option
5. **Error Handling** - Handle API errors, permission denied, network failures
6. **Success Feedback** - Show post link and success message

## Out of Scope

- Editing posts after publishing (Facebook API limitation)
- Scheduling posts for later
- Analytics on post performance
- Comments/reactions monitoring
- Multi-group posting in single action (Phase 1 - single group only)

## Expected Deliverable

1. User can click "Post to Facebook Group" in preview modal
2. User sees list of Facebook groups they're a member of
3. User selects target group and confirms
4. Post appears in Facebook group with all photos and formatted text
5. User receives confirmation with link to the post
6. Error messages show clear guidance if posting fails

## Spec Documentation

- Tasks: @.agent-os/specs/2025-10-07-facebook-direct-posting/tasks.md
- Technical Specification: @.agent-os/specs/2025-10-07-facebook-direct-posting/sub-specs/technical-spec.md
- App Review Guide: @.agent-os/specs/2025-10-07-facebook-direct-posting/sub-specs/app-review-guide.md

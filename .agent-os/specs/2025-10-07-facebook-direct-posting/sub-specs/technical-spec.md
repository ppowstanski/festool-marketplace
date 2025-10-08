# Technical Specification

This is the technical specification for the spec detailed in @.agent-os/specs/2025-10-07-facebook-direct-posting/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Technical Requirements

- Request and use `publish_to_groups` permission
- Request and use `groups_access_member_info` permission
- Fetch list of groups user is a member of
- Upload photos to Facebook
- Post formatted text and photos to selected group
- Handle API rate limits and errors
- Show posting progress and results

## Facebook Graph API Endpoints

### 1. Get User's Groups

**Endpoint**: `GET /{user-id}/groups`

**Permission Required**: `groups_access_member_info`

```typescript
const getUserGroups = async (accessToken: string) => {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/me/groups?access_token=${accessToken}`
  );
  return response.json();
};
```

**Response**:
```json
{
  "data": [
    {
      "id": "123456789",
      "name": "Festool Tools Europe"
    }
  ]
}
```

### 2. Upload Photos

**Endpoint**: `POST /{group-id}/photos`

**Permission Required**: `publish_to_groups`

```typescript
const uploadPhoto = async (
  groupId: string,
  photo: File,
  accessToken: string,
  isPublished: boolean = false
) => {
  const formData = new FormData();
  formData.append('source', photo);
  formData.append('access_token', accessToken);
  formData.append('published', isPublished.toString());

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${groupId}/photos`,
    {
      method: 'POST',
      body: formData,
    }
  );
  return response.json();
};
```

**Response**:
```json
{
  "id": "photo_id_123",
  "post_id": "group_id_post_id"
}
```

### 3. Create Group Post with Photos

**Endpoint**: `POST /{group-id}/feed`

**Permission Required**: `publish_to_groups`

**Strategy**: Multi-photo posts require special handling:

**Option A**: Upload photos first (unpublished), then create post with attached photo IDs
```typescript
const createPostWithPhotos = async (
  groupId: string,
  message: string,
  photoIds: string[],
  accessToken: string
) => {
  const response = await fetch(
    `https://graph.facebook.com/v18.0/${groupId}/feed`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        attached_media: photoIds.map(id => ({ media_fbid: id })),
        access_token: accessToken,
      }),
    }
  );
  return response.json();
};
```

**Option B**: Create post, then add photos as comments (less ideal)

We'll use **Option A** for better presentation.

## Implementation Approach

### Phase 1: Update Facebook Login Scope

Modify `src/contexts/AuthContext.tsx`:

```typescript
// Current scope
{ scope: 'public_profile' }

// New scope (after App Review approval)
{
  scope: 'public_profile,publish_to_groups,groups_access_member_info'
}
```

### Phase 2: Create Facebook API Service

Create `src/services/facebookApi.ts`:

```typescript
export interface FacebookGroup {
  id: string;
  name: string;
}

export class FacebookApiService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  async getUserGroups(): Promise<FacebookGroup[]> {
    // Fetch user's groups
  }

  async uploadPhoto(
    groupId: string,
    photo: File,
    published: boolean = false
  ): Promise<string> {
    // Upload photo, return photo ID
  }

  async createGroupPost(
    groupId: string,
    message: string,
    photoIds: string[]
  ): Promise<{ id: string; post_id: string }> {
    // Create post with photos
  }
}
```

### Phase 3: Create Group Selector Component

Create `src/components/GroupSelector.tsx`:

- Modal that shows list of user's groups
- User selects target group
- Confirms posting
- Shows progress while posting

### Phase 4: Modify PreviewModal

Update `src/components/ListingForm/PreviewModal.tsx`:

- Add "Post to Facebook Group" button
- Keep "Copy to Clipboard" as backup option
- Show group selector on click
- Handle posting flow
- Show success/error messages

### Phase 5: Error Handling

Handle common errors:
- Permission denied (user needs to re-login)
- Rate limit exceeded (429)
- Network errors
- Invalid group ID
- Photo upload failures

## API Flow Diagram

```
1. User clicks "Post to Facebook Group"
   ↓
2. Fetch user's groups (groups_access_member_info)
   ↓
3. User selects group from list
   ↓
4. For each photo:
   - Upload photo to group (unpublished)
   - Store photo ID
   ↓
5. Create group post with message + photo IDs
   ↓
6. Show success message with post link
```

## Rate Limiting

Facebook API has rate limits:
- **200 calls per hour per user**
- **Photos**: Count as 1 call each
- **Post creation**: 1 call

For a listing with 10 photos:
- 10 calls (photo uploads)
- 1 call (post creation)
- 1 call (fetch groups)
- **Total**: 12 calls

This is well within limits for typical usage.

## Testing Strategy

### Before App Review Approval

Use **Test Users**:
1. Create test users in Facebook Developer Console
2. Test users can use permissions before approval
3. Verify entire flow works

### After Approval

Test with real account:
1. Login with Facebook
2. Select a test group (create one if needed)
3. Post a test listing
4. Verify it appears correctly in group
5. Check photos are in correct order
6. Verify formatting is preserved

## Rollback Strategy

If posting fails or users don't like it:
- Keep "Copy to Clipboard" option
- Make direct posting optional
- Add setting to disable direct posting
- All existing functionality remains

## Performance Considerations

- **Photo uploads**: Sequential or parallel?
  - **Sequential**: Slower but more reliable
  - **Parallel**: Faster but may hit rate limits
  - **Recommendation**: Sequential with progress indicator

- **Loading states**: Show progress for each photo upload

- **Error recovery**: If photo 5/10 fails, retry or ask user

## Security Considerations

- Access token never exposed to client (already in memory only)
- No server-side storage required (all client-side)
- User must explicitly authorize permissions
- User can revoke access anytime via Facebook settings

## External Dependencies

None - using only Facebook Graph API (already integrated)

## Browser Compatibility

Facebook SDK and Fetch API work in all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## Monitoring

Add logging for:
- Post success rate
- Photo upload failures
- API errors
- Time to complete posting

This helps identify issues and improve reliability.

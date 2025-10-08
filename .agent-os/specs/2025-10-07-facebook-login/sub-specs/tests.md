# Tests Specification

This is the tests coverage details for the spec detailed in @../.agent-os/specs/2025-10-07-facebook-login/spec.md

> Created: 2025-10-07
> Version: 1.0.0

## Test Coverage

### Unit Tests

**AuthContext**
- Provides authentication state to children
- Updates state when user logs in
- Clears state when user logs out
- Persists authentication to localStorage
- Restores authentication from localStorage on mount

**useFacebookAuth Hook**
- Returns authentication state from context
- Throws error when used outside AuthProvider
- login() function initiates Facebook login flow
- logout() function clears authentication state

**Facebook Utility Functions**
- initializeFacebookSDK() loads SDK script correctly
- loadFacebookSDK() handles script load errors
- getUserProfile() fetches user data from FB API
- Handles missing APP_ID gracefully

### Integration Tests

**Login Flow**
- User clicks login button → Facebook SDK login is called
- Successful login → User state is updated with profile data
- Successful login → Access token is stored
- Permission denial → Error message is displayed
- Network error during login → Error is handled gracefully

**Session Persistence**
- Authenticated user refreshes page → Remains logged in
- Stored auth data → Is validated on app load
- Invalid stored token → User is logged out automatically

**Logout Flow**
- User clicks logout → Authentication state is cleared
- User clicks logout → localStorage is cleared
- User clicks logout → Redirected to login page

**Protected Routes**
- Unauthenticated user tries to access app → Redirected to login
- Authenticated user accesses app → Content is displayed
- User logs out from app → Redirected to login page

### Component Tests

**LoginPage**
- Renders login button
- Clicking login button calls authentication function
- Shows loading state during authentication
- Displays error message when login fails

**Header**
- Displays user name when authenticated
- Displays user profile picture when authenticated
- Renders logout button when authenticated
- Clicking logout calls logout function

**ProtectedRoute**
- Renders children when user is authenticated
- Redirects to login when user is not authenticated
- Shows loading state while checking authentication

## Mocking Requirements

### Facebook SDK
- Mock FB.login() to simulate successful/failed authentication
- Mock FB.api() to return user profile data
- Mock SDK initialization to avoid loading external script in tests

### localStorage
- Mock localStorage.getItem() and setItem()
- Test different stored auth states (valid, invalid, expired)

### React Router
- Mock useNavigate() for redirect testing
- Mock useLocation() for protected route testing

## Testing Strategy

### Manual Testing Checklist
Since Facebook Login requires real Facebook App credentials and user interaction:

1. **First-time Login**
   - Visit app → See login page
   - Click login → Redirected to Facebook
   - Grant permissions → Redirected back to app
   - Verify user info displays in header

2. **Session Persistence**
   - After login, refresh page
   - Verify still logged in
   - Close and reopen browser tab
   - Verify still logged in

3. **Permission Denial**
   - Login but deny permissions
   - Verify error message
   - Verify can retry login

4. **Logout**
   - Click logout button
   - Verify redirected to login page
   - Verify localStorage cleared
   - Try to access app directly → Redirected to login

5. **Different Browser**
   - Login in Chrome
   - Open app in Firefox (not logged in)
   - Verify shows login page

### E2E Testing (Future)
- Automate the manual testing checklist
- Use Playwright or Cypress with mock Facebook responses
- Test full authentication flows end-to-end

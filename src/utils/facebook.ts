import type { FacebookUser } from '../types/auth';

const FACEBOOK_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
const FACEBOOK_API_VERSION = 'v21.0';

/**
 * Load Facebook SDK script
 */
export const loadFacebookSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if SDK is already loaded
    if (window.FB) {
      resolve();
      return;
    }

    // Check if script is already in DOM
    if (document.getElementById('facebook-jssdk')) {
      resolve();
      return;
    }

    // Create script element
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Facebook SDK'));

    document.body.appendChild(script);
  });
};

/**
 * Initialize Facebook SDK
 */
export const initializeFacebookSDK = async (): Promise<void> => {
  if (!FACEBOOK_APP_ID) {
    throw new Error('Facebook App ID is not configured');
  }

  return new Promise((resolve) => {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: FACEBOOK_API_VERSION,
      });
      resolve();
    };
  });
};

/**
 * Get user profile from Facebook Graph API
 */
export const getUserProfile = (accessToken: string): Promise<FacebookUser> => {
  return new Promise((resolve, reject) => {
    window.FB.api(
      '/me',
      { fields: 'id,name,email,picture', access_token: accessToken },
      (response: unknown) => {
        if (response && typeof response === 'object' && 'id' in response) {
          resolve(response as FacebookUser);
        } else {
          reject(new Error('Failed to fetch user profile'));
        }
      }
    );
  });
};

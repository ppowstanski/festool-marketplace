export interface FacebookUser {
  id: string;
  name: string;
  email?: string;
  picture: {
    data: {
      url: string;
    };
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: FacebookUser | null;
  accessToken: string | null;
  error: string | null;
}

export interface FacebookAuthResponse {
  accessToken: string;
  userID: string;
  expiresIn: number;
  signedRequest: string;
  graphDomain: string;
  data_access_expiration_time: number;
}

export interface FacebookLoginResponse {
  status: 'connected' | 'not_authorized' | 'unknown';
  authResponse: FacebookAuthResponse | null;
}

declare global {
  interface Window {
    FB: {
      init: (params: {
        appId: string;
        cookie: boolean;
        xfbml: boolean;
        version: string;
      }) => void;
      login: (
        callback: (response: FacebookLoginResponse) => void,
        options?: { scope: string }
      ) => void;
      logout: (callback: () => void) => void;
      api: (
        path: string,
        params: Record<string, unknown>,
        callback: (response: unknown) => void
      ) => void;
      getLoginStatus: (callback: (response: FacebookLoginResponse) => void) => void;
    };
    fbAsyncInit: () => void;
  }
}

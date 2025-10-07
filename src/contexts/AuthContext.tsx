import { createContext, useEffect, useState, type ReactNode } from 'react';
import type { AuthState, FacebookLoginResponse, FacebookUser } from '../types/auth';
import {
  loadFacebookSDK,
  initializeFacebookSDK,
  getUserProfile,
} from '../utils/facebook';

interface AuthContextType extends AuthState {
  login: () => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = 'festool_auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    accessToken: null,
    error: null,
  });

  // Initialize Facebook SDK on mount
  useEffect(() => {
    const initSDK = async () => {
      try {
        await loadFacebookSDK();
        await initializeFacebookSDK();

        // Check for existing session
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const { accessToken, user } = JSON.parse(stored);

          // Verify token is still valid by checking login status
          window.FB.getLoginStatus((response: FacebookLoginResponse) => {
            if (response.status === 'connected' && response.authResponse) {
              setState({
                isAuthenticated: true,
                isLoading: false,
                user,
                accessToken,
                error: null,
              });
            } else {
              // Token expired, clear storage
              localStorage.removeItem(STORAGE_KEY);
              setState((prev) => ({ ...prev, isLoading: false }));
            }
          });
        } else {
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          isLoading: false,
          user: null,
          accessToken: null,
          error: error instanceof Error ? error.message : 'Failed to initialize',
        });
      }
    };

    initSDK();
  }, []);

  const login = async (): Promise<void> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    return new Promise((resolve, reject) => {
      window.FB.login(
        (response: FacebookLoginResponse) => {
          if (response.status === 'connected' && response.authResponse) {
            const { accessToken } = response.authResponse;

            // Fetch user profile
            getUserProfile(accessToken)
              .then((user: FacebookUser) => {
                const authData = {
                  isAuthenticated: true,
                  isLoading: false,
                  user,
                  accessToken,
                  error: null,
                };

                setState(authData);

                // Persist to localStorage
                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify({ accessToken, user })
                );

                resolve();
              })
              .catch((error) => {
                const errorMessage =
                  error instanceof Error ? error.message : 'Failed to fetch profile';
                setState({
                  isAuthenticated: false,
                  isLoading: false,
                  user: null,
                  accessToken: null,
                  error: errorMessage,
                });
                reject(error);
              });
          } else {
            const error = 'Login failed or was cancelled';
            setState({
              isAuthenticated: false,
              isLoading: false,
              user: null,
              accessToken: null,
              error,
            });
            reject(new Error(error));
          }
        },
        {
          scope: 'public_profile',
        }
      );
    });
  };

  const logout = (): void => {
    window.FB.logout(() => {
      setState({
        isAuthenticated: false,
        isLoading: false,
        user: null,
        accessToken: null,
        error: null,
      });
      localStorage.removeItem(STORAGE_KEY);
    });
  };

  const value: AuthContextType = {
    ...state,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  username: string;
  isLoading: boolean;
}

interface Credentials {
  username: string;
  password: string;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    username: '',
    isLoading: true,
  });

  // Load authentication state from storage on mount
  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const result = await chrome.storage.local.get(['auth']);
      const storedAuth = result.auth;
      
      if (storedAuth) {
        setAuthState({
          isAuthenticated: true,
          username: storedAuth.username,
          isLoading: false,
        });
      } else {
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Failed to load auth state:', error);
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const signIn = async (credentials: Credentials): Promise<boolean> => {
    try {
      // Validate credentials (in real app, this would be an API call)
      if (credentials.username === 'test' && credentials.password === 'test') {
        const authData = {
          username: credentials.username,
          authenticatedAt: Date.now(),
        };
        
        // Store in Chrome storage
        await chrome.storage.local.set({ auth: authData });
        
        setAuthState({
          isAuthenticated: true,
          username: credentials.username,
          isLoading: false,
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign in failed:', error);
      return false;
    }
  };

  const signUp = async (credentials: Credentials): Promise<boolean> => {
    try {
      // For demo purposes, same validation as sign in
      // In real app, this would create a new account
      if (credentials.username === 'test' && credentials.password === 'test') {
        const authData = {
          username: credentials.username,
          authenticatedAt: Date.now(),
        };
        
        // Store in Chrome storage
        await chrome.storage.local.set({ auth: authData });
        
        setAuthState({
          isAuthenticated: true,
          username: credentials.username,
          isLoading: false,
        });
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Sign up failed:', error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      // Remove from Chrome storage
      await chrome.storage.local.remove(['auth']);
      
      setAuthState({
        isAuthenticated: false,
        username: '',
        isLoading: false,
      });
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
  };
}

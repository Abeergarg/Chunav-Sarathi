'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signOut, 
  User,
  signInWithPhoneNumber,
  ConfirmationResult
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loginWithPhone: (phoneNumber: string, recaptchaVerifier: any) => Promise<ConfirmationResult>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Defensive check for Firebase Auth and the observer function
    if (!auth || typeof onAuthStateChanged !== 'function') {
      console.warn("Auth system not ready or misconfigured.");
      setLoading(false);
      return;
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => {
        if (unsubscribe) unsubscribe();
      };
    } catch (err) {
      console.error("Failed to initialize auth observer:", err);
      setLoading(false);
    }
  }, []);

  const loginWithGoogle = async () => {
    if (!auth || !googleProvider) {
      alert("Firebase is not configured. Please add your credentials to .env.local");
      return;
    }
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        console.warn("Sign-in popup was closed before completion.");
        return; // Silent return for user cancellation
      }
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const loginWithPhone = async (phoneNumber: string, recaptchaVerifier: any) => {
    if (!auth) {
      alert("Firebase is not configured.");
      throw new Error("Auth not initialized");
    }
    try {
      return await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    } catch (error) {
      console.error("Error signing in with phone:", error);
      throw error;
    }
  };

  const logout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, loginWithPhone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

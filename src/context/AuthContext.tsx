import React, { useContext, useState, createContext, useEffect } from "react";
import { auth } from "../firebase";

interface contextProp {
  currentUser: firebase.User | null;
  signup:
    | ((
        email: string,
        password: string
      ) => Promise<firebase.auth.UserCredential>)
    | null;
  login:
    | ((
        email: string,
        password: string
      ) => Promise<firebase.auth.UserCredential>)
    | null;
  logout: (() => Promise<void>) | null;
  resetPassword: ((email: string) => Promise<void>) | null;
  updateEmail: ((email: string) => Promise<void> | undefined) | undefined | null;
  updatePassword: ((password: string) => Promise<void> | undefined) | undefined | null;
}

const AuthContext = createContext<contextProp>({
  currentUser: null,
  signup: null,
  login: null,
  logout: null,
  resetPassword: null,
  updateEmail: null,
  updatePassword: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

interface providerProps {
  children: JSX.Element;
}

export function AuthProvider({ children }: providerProps) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const resetPassword = (email:string) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updateEmail = (email: string) => {
    return currentUser?.updateEmail(email);
  }

  const updatePassword = (password: string) => {
      return currentUser?.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

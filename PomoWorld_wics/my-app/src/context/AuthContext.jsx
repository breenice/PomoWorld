// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase';  // Assuming firebase.js is set up
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
export const AuthContext = createContext();

// AuthProvider component that wraps around the app to provide auth context
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen for changes in the authentication state
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);  // Set the user on state
    });

    return unsubscribe; // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children} {/* Provide the currentUser state to the app */}
    </AuthContext.Provider>
  );
};

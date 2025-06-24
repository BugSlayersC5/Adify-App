
// AuthContext.js (or wherever your AuthProvider is defined)
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initially no user

  // On component mount, try to load user data from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        // Parse the stored JSON string back to an object
        const userData = JSON.parse(storedUser);
        // Ensure the stored user object has a 'username' for the Navbar
        // If it doesn't (e.g., from an older session), reconstruct it.
        if (!userData.username && userData.firstName && userData.lastName) {
          userData.username = `${userData.firstName} ${userData.lastName}`;
        } else if (!userData.username && userData.firstName) {
          userData.username = userData.firstName;
        } else if (!userData.username && userData.email) {
          userData.username = userData.email.split('@')[0]; // Use part of email if no name
        }
        setUser(userData);
      }
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error);
      localStorage.removeItem('user'); // Clear corrupted data
    }
  }, []);

  // Function to handle user login
  const login = (backendUserData) => {
    // The backendUserData should be the 'user' object returned by your login API
    // which contains firstName, lastName, email, role, etc.
    // Example: { firstName: "John", lastName: "Doe", email: "john@example.com", role: "vendor", ... }

    // Create a 'username' property for easier display in the Navbar
    const username = backendUserData.firstName && backendUserData.lastName
      ? `${backendUserData.firstName} ${backendUserData.lastName}`
      : backendUserData.firstName || backendUserData.email; // Fallback to firstName or email

    const userToStore = {
      ...backendUserData,
      username: username
    };

    setUser(userToStore);
    // Store the enhanced user object in localStorage
    localStorage.setItem('user', JSON.stringify(userToStore));
  };

  // Function to handle user logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Clear all user data from storage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
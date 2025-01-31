import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a Theme Context
const ThemeContext = createContext();

// Hook to use ThemeContext in components
export const useTheme = () => useContext(ThemeContext);

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState({ color: '#000', backgroundColor: '#FFF' });

  useEffect(() => {
    // Get role from localStorage (doctor/user)
    const role = localStorage.getItem('role');

    // Update theme based on the user role
    if (role === 'doctor') {
      setTheme({
        color: '#3973eb',        // Custom color for doctor
        backgroundColor: '#f0f8ff', // Optional background color for doctor
      });
    } else {
      setTheme({
        color: '#30a45e',         // Custom color for user
        backgroundColor: '#fff5e1', // Optional background color for user
      });
    }
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

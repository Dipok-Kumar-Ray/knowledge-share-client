import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Check for saved theme in localStorage or default to light
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    // Apply theme using DaisyUI's theme system
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    // Save to localStorage
    localStorage.setItem("theme", newTheme);
    // Apply theme using DaisyUI's theme system
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const value = {
    theme,
    toggleTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
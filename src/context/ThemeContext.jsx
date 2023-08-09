import { useState, useEffect, createContext } from "react";

const getTheInitialTheme = () => {
  if (window !== "undefined" && window.localStorage) {
    const storedPref = window.localStorage.getItem("color-theme");

    if (typeof storedPref === "string") {
      return storedPref;
    }
  }

  const UserMedia = window.matchMedia("(prefers-color-scheme: dark)");
  if (UserMedia.matches) {
    return "dark";
  }
  return "light";
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getTheInitialTheme);

  const defaultSetTheme = theme => {
    const root = window.document.documentElement;
    const isDark = theme === "dark";
    root.classList.remove(isDark ? "light" : "dark");
    root.classList.add(theme);
    localStorage.setItem("color-theme", theme);
  };

  useEffect(() => {
    defaultSetTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

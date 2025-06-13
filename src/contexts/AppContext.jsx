import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const recordPerPage = 8;
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isMemberSignUpOpen, setIsMemberSignUpOpen] = useState(false);
  const [modifiedResults, setModifiedResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [admin, setAdmin] = useState(
    JSON.parse(localStorage.getItem("gym-admin")) ||
      sessionStorage.getItem("temp-auth") ||
      {}
  );

  // theme-preference
  const initTheme = localStorage.getItem("theme") || "system";
  const [theme, setTheme] = useState(
    initTheme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : initTheme
  );

  useEffect(
    function () {
      document.documentElement.className = theme === "dark" ? "dark" : "";
      localStorage.setItem("theme", theme);
    },
    [theme]
  );

  return (
    <AppContext.Provider
      value={{
        isLoading,
        error,
        isMemberSignUpOpen,
        modifiedResults,
        recordPerPage,
        theme,
        currentPage,
        admin,
        setCurrentPage,
        setTheme,
        setIsLoading,
        setError,
        setIsMemberSignUpOpen,
        setModifiedResults,
        setAdmin,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) throw new Error(`App context out of place`);
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AppContextProvider, useAppContext };

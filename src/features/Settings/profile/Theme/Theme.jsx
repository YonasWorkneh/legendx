import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./theme.css";
import { useAppContext } from "../../../../contexts/AppContext";

export default function ThemePreview() {
  const { theme, setTheme } = useAppContext();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(
    function () {
      setSelectedTheme(theme);
    },
    [theme]
  );

  const themes = ["system", "light", "dark"];

  return (
    <div className="theme-preview-container">
      {themes.map((theme) => (
        <div key={theme} className="theme-option">
          <div
            className={`theme-card ${
              selectedTheme === theme ? "selected" : ""
            }`}
            onClick={() => {
              setTheme(
                theme === "system"
                  ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                  : theme
              );
              setSelectedTheme(theme);
            }}
          >
            {selectedTheme === theme && (
              <div className="theme-check">
                <FaCheck size={8} />
              </div>
            )}
            <div className="window-controls">
              <div className="window-control red" />
              <div className="window-control yellow" />
              <div className="window-control green" />
            </div>

            <div className="dashboard-content">
              <div className={`sidebar ${theme !== "dark" ? "light" : "dark"}`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="sidebar-item" />
                ))}
              </div>

              {theme === "system" ? (
                <div className="system-split">
                  <div className="light">
                    <DashboardContent />
                  </div>
                  <div className="dark">
                    <DashboardContent />
                  </div>
                </div>
              ) : (
                <div className={`main-content ${theme}`}>
                  <DashboardContent />
                </div>
              )}
            </div>
          </div>
          <p
            className={`theme-label ${
              selectedTheme === theme ? "selected" : ""
            }`}
          >
            {theme}
          </p>
        </div>
      ))}
    </div>
  );
}

function DashboardContent() {
  return (
    <>
      <div className="header">
        <div className="header-title" />
        <div className="header-actions">
          <div className="header-action" />
          <div className="header-action" />
        </div>
      </div>

      <div className="search-bar" />

      <div className="content-grid">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="content-item" />
        ))}
      </div>

      <div className="table">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="table-row" />
        ))}
      </div>

      <div className="footer" />
    </>
  );
}

import { useAppContext } from "../context/AppContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const {
    activePage,
    setActivePage,
    role,
    setRole,
    theme,
    setTheme,
    sidebarOpen,
    setSidebarOpen,
  } = useAppContext();

  const menuItems = [
    { key: "overview", label: "Overview" },
    { key: "transactions", label: "Transactions" },
    { key: "insights", label: "Insights" },
    { key: "recent", label: "Recent Activity" },
  ];

  const handleNavClick = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`sidebar sidebar-${theme} ${sidebarOpen ? "open" : ""}`}
      >
        <div>
          <div className="sidebar-top-row">
            <h2 className="sidebar-logo">Finance UI</h2>
            <button
              className="sidebar-close-btn"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>

          <nav className="sidebar-menu">
            {menuItems.map((item) => (
              <button
                key={item.key}
                className={`sidebar-link ${
                  activePage === item.key ? "active" : ""
                }`}
                onClick={() => handleNavClick(item.key)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="sidebar-bottom">
          <button
            className="sidebar-theme-btn"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

        <div className="sidebar-role-buttons">
        <button
            className={`role-btn ${role === "viewer" ? "active" : ""}`}
            onClick={() => setRole("viewer")}
        >
            Viewer
        </button>

        <button
            className={`role-btn ${role === "admin" ? "active" : ""}`}
            onClick={() => setRole("admin")}
        >
            Admin
        </button>
        </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
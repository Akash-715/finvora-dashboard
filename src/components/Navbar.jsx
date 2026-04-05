import { useAppContext } from "../context/AppContext";
import "../styles/navbar.css";

const Navbar = () => {
  const { theme, setSidebarOpen } = useAppContext();

  return (
    <header className={`top-navbar navbar-${theme}`}>
      <div className="navbar-left">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(true)}
        >
          ☰
        </button>

        <h1 className="company-name">FinIQ</h1>
      </div>
    </header>
  );
};

export default Navbar;
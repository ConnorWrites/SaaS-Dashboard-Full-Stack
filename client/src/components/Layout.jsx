import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { logout, getMe } from "../services/api";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
	navigate("/");
      });
  }, [navigate]);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
setUser(null);
navigate("/login", { replace: true });
}
  };
  const atPosition = user?.email.indexOf("@");

  return (
    <div className={`layout ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Sidebar isOpen={isOpen} />
	<div className="main">
        <header className="header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
<span className="header-title">Dashboard</span>
          <div className="header-right">
            {user && <span className="user-email">Welcome{user ? `, ` + user.email.slice(0,1).toUpperCase() + user.email.slice(1, atPosition) : ""}</span>}

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
          </div>
        </header>
<main className="content">
<Outlet />
</main>
</div>
</div>
  );
}

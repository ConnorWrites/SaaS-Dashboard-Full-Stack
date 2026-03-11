import { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { logout, getMe } from "../services/api";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Fetch user info on mount
  useEffect(() => {
    getMe()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} />

      <div className={`main-content ${isOpen ? "" : "collapsed"}`}>
        <header className="header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>

          <h1>My SaaS Dashboard</h1>
          <div style={{ marginLeft: "auto", display: "flex", gap: "1rem" }}>
            {user && <span>Welcome, {user.email}</span>}

          <button onClick={handleLogout}>
            Logout
          </button>
          </div>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
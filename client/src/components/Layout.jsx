import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";
import { logout } from "../services/api";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

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

          <button onClick={handleLogout} style={{ marginLeft: "auto" }}>
            Logout
          </button>
        </header>

        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
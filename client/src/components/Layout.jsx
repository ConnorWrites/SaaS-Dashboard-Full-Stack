import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Layout.css";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="layout">
      <Sidebar isOpen={isOpen} />
      <div className={`main-content ${isOpen ? "" : "collapsed"}`}>
        <header className="header">
          <button className="toggle-btn" onClick={toggleSidebar}>
            ☰
          </button>
          <h1>My SaaS Dashboard</h1>
        </header>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ isOpen }) {
  const linkClasses = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  return (
    <nav className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <h2>{isOpen ? "Dashboard" : "D"}</h2>
      <ul>
        <li>
          <NavLink to="/dashboard" className={linkClasses}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={linkClasses}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

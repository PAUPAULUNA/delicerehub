import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.jpg";
import userCircle from "../../assets/user.png";
import logout from "../../assets/logout.png";
import Notification from "../../assets/bell.png";
import { Link, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        {/* LOGO */}
        <div className="logo">
          <img src={logo} className="logo" alt="delicere logo" />
          <h2>Delicere</h2>
        </div>

        <nav>
          <ul className="sidebar-menu">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/processing"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Orders
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/usermanagement"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                User Management
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/salesreport"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Sales Report
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/inventory"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Inventory Control
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="sidebar-bottom">
        {/* USER */}
        <div className="bottom-section">
          <div className="user-card">
            <div className="user-info">
              <img src={userCircle} className="user" alt="avatar" />
              <div>
                <h1>Pau Luna</h1>
                <p>Admin</p>
              </div>
            </div>
            <div className="Notification">
              <button className="notification-btn">
                <img
                  src={Notification}
                  className="bell-icon"
                  alt="notification"
                />
              </button>
            </div>
          </div>
        </div>
        <button className="logout-btn">
          <img src={logout} className="logout" alt="logout" />
          <span> Log out </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

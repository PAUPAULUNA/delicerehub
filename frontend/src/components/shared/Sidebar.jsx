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
    <div className="container">
      <aside className="sidebar">
        {/* LOGO */}
        <div className="logo">
          <img src={logo} className="logo" alt="delicere logo" />
          <h2>Delicere Hub</h2>
        </div>

        <div>
          <ul className="sidebar-menu">
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            <li>
              <NavLink to="/Processing">Order Processing</NavLink>
            </li>

            <li>
              <NavLink to="/usermanagement">User Management</NavLink>
            </li>

            <li>
              <NavLink to="/salesreport">Sales Report</NavLink>
            </li>

            <li>
              <NavLink to="/inventory">Inventory Control</NavLink>
            </li>

            <li>
              <NavLink to="/settings">System Settings</NavLink>
            </li>
          </ul>
        </div>
        {/* USER */}
        <div className="bottom-section">
          <div className="user-info">
            <img src={userCircle} className="user" alt="avatar" />
            <div>
              <h1>Pau Luna</h1>
              <p>Admin</p>
            </div>
          </div>
          <div className="Notification">
            <img src={Notification} className="bell-icon" alt="notification" />
          </div>
        </div>
        <button className="logout-btn">
          <img src={logout} className="logout" alt="logout" />
          <span> Log out </span>
        </button>
      </aside>
    </div>
  );
};

export default Sidebar;

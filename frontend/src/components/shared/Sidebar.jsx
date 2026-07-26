import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logo.jpg';
import userCircle from '../../assets/user.png';
import logout from '../../assets/logout.png';
import Notification from '../../assets/bell.png';

const Sidebar = () => {
  return (
<div className="container">
    
    <aside className="sidebar">
        {/* LOGO */}
        <div className="logo">
            <img src={logo} className="logo" alt="delicere logo" />
            <h2>Delicere</h2>
        </div>
       
        <div>
            <ul className="sidebar-menu">
                <li className="active">Dashboard</li>
                <li>User Management</li>
                <li>Sales Report</li>
                <li>Inventory Control</li>
                <li>System Settings</li>
            </ul>
        </div>
         {/* USER */}
        <div className="bottom-section">
            <div className="user-info">
                <img src={userCircle} className="user" alt="avatar" />
                <div>
                    <h1><u>Pau Luna</u></h1>
                    <p>Admin</p>
                </div>
            </div>
            <div className="Notification">
                <img src={Notification} className="bell-icon" alt="notification" />
            </div>
        </div>
            <div className="logout-btn">
                <img src={logout} className="logout" alt="logout" />
                <p>Sign Out</p>
        </div>

    </aside>
</div>
  )
}

export default Sidebar

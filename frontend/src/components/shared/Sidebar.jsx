import React from 'react';
import './Sidebar.css';
import logo from '../../assets/logo.jpg';
import userCircle from '../../assets/user.png';
import logout from '../../assets/logout.png';
import Notification from '../../assets/bell.png';

const Sidebar = () => {
  return (
    <aside className="sidebar">
        {/* LOGO */}
        <div className="logo">
            <img src={logo} className="logo" alt="delicere logo" />
            <h1 className="name">Delicere</h1>
        </div>
        {/* USER */}
        <div>
            <div>
                <userCircle className="user" />
                <div>
                    <h1>John Doe</h1>
                    <p>Waiter</p>
                </div>
            </div>
            <div>
                <Notification className="bell" />
            </div>
        </div>

    </aside>
  )
}

export default Sidebar

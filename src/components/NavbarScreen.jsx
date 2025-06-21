import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbarscreen.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux';
import { logout } from '../redux/slices/AuthSlice';

import { Outlet } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import ProfileDropdown from '../comanfunction/Dropdown';

const NavbarScreen = () => {
  const { userInfo } = useSelector((state) => state.login || {})
  const dispatch = useDispatch();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-content">
          <h2 className="logo"><Link to="/">Logo</Link></h2>
          <nav className="nav-links">
            {/* <Link to="/register">Dashboard</Link>
            <Link to="/login">Profile</Link> */}
            {/* <Link to="/cart">Settings</Link> */}
             <Link to="/notescreen">Add the notes</Link>

          </nav>
 
        </div>
                      {userInfo ? (<NavDropdown title={userInfo.name} id='username' className='logout-section'>
              <NavDropdown.Item onClick={() => dispatch(logout())}>Logout</NavDropdown.Item>
            </NavDropdown>) : (
              <Link  className='logout-section' to="/logout">
                Log out
              </Link>

            )}
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)} />}

      <div className="main">
        {/* Top Navbar */}
        <header className="top-navbar">
          <button className="menu-button" onClick={() => setSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className="page-title">Responsive Dashboard</h1>
          <span className='page-title'>
            <ProfileDropdown/>
                     <span> {new Date().getFullYear()}</span>

          </span>
        </header>

        {/* Main Content */}
        <main className="content">

          <Outlet />

        </main>
      </div>
    </div>
  );
};

export default NavbarScreen;

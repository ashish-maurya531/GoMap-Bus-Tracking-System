import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DashboardComponent from '../components/DashboardComponent';
import RoutesComponent from '../components/RoutesComponent';
import AnalyticComponent from '../components/AnalyticComponent';
import DriverComponent from '../components/DriverComponent';
import AboutComponent from '../components/AboutComponent';

function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [linkRoute, setLinkRoute] = useState('dashboard');

  // Toggle sidebar open/close
  const toggleSidebar = () => setOpenSidebarToggle((prev) => !prev);

  // Close sidebar when clicking outside or switching routes
  const closeSidebar = () => setOpenSidebarToggle(false);

  // Close sidebar when clicking anywhere outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest('#sidebar') && !event.target.closest('.menu-icon')) {
        closeSidebar();
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <>
      <div className="grid-container">
        <Header OpenSidebar={toggleSidebar} />

        {/* Sidebar */}
        <aside id="sidebar" className={openSidebarToggle ? 'sidebar-responsive' : ''}>
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <span className="material-symbols-outlined side-logo" id="span-sidebar-icon">
                pin_drop
              </span>
              Go Map
            </div>
            <span className="icon close_icon" onClick={closeSidebar}>
              &#10005;
            </span>
          </div>

          <ul className="sidebar-list">
            <li
              onClick={() => {
                setLinkRoute('dashboard');
                closeSidebar();
              }}
              className="sidebar-list-item"
            >
              <span className="material-symbols-outlined" id="span-sidebar-icon">
                dashboard
              </span>
              Dashboard
            </li>
            <li
              onClick={() => {
                setLinkRoute('route');
                closeSidebar();
              }}
              className="sidebar-list-item"
            >
              <span className="material-symbols-outlined" id="span-sidebar-icon">
                alt_route
              </span>
              Routes
            </li>
            <li
              onClick={() => {
                setLinkRoute('driver');
                closeSidebar();
              }}
              className="sidebar-list-item"
            >
              <span className="material-symbols-outlined" id="span-sidebar-icon">
                groups
              </span>
              Drivers
            </li>
            <li
              onClick={() => {
                setLinkRoute('analytics');
                closeSidebar();
              }}
              className="sidebar-list-item"
            >
              <span className="material-symbols-outlined" id="span-sidebar-icon">
                monitoring
              </span>
              Analytics
            </li>
            <li
              onClick={() => {
                setLinkRoute('about');
                closeSidebar();
              }}
              className="sidebar-list-item"
            >
              <span className="material-symbols-outlined" id="span-sidebar-icon">
                info
              </span>
              About
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="main-container">
          {linkRoute === 'dashboard' && <DashboardComponent />}
          {linkRoute === 'route' && <RoutesComponent />}
          {linkRoute === 'driver' && <DriverComponent />}
          {linkRoute === 'analytics' && <AnalyticComponent />}
          {linkRoute === 'about' && <AboutComponent />}
        </main>
      </div>
    </>
  );
}

export default Home;

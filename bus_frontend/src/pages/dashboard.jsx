import React from 'react'
import { useState } from 'react';
//  { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
//  from 'recharts';
import Header from '../components/Header'
import DashboardComponent from '../components/DashboardComponent';
import RoutesComponent from '../components/RoutesComponent';

import AnalyticComponent from '../components/AnalyticComponent';
import DriverComponent from '../components/DriverComponent';
import AboutComponent from '../components/AboutComponent';

function Home() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
};
const [linkRoute, setLinkRoute] = useState('dashboard');

    
     
console.log("link" ,linkRoute);
  return (
    <>
    <div className='grid-container'>
     <Header OpenSidebar={OpenSidebar}/>
     {/* sidebar */}
     <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
            
            <span class="material-symbols-outlined side-logo" id="span-sidebar-icon">pin_drop</span> Go Map
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li 
            onClick={() => {
              setLinkRoute('dashboard')
            }}
            className='sidebar-list-item'>
                <span class="material-symbols-outlined" id="span-sidebar-icon">dashboard</span> Dashboard
            </li>
            <li
            onClick={() => {
              setLinkRoute('route')
            }}
            className='sidebar-list-item'>
                <span class="material-symbols-outlined" id="span-sidebar-icon">alt_route</span> Routes
            </li>
            <li
            onClick={() => {
              setLinkRoute('driver')
            }}
            className='sidebar-list-item'>
                <span class="material-symbols-outlined" id="span-sidebar-icon">groups</span> Drivers
            </li>
            <li
            onClick={() => {
              setLinkRoute('analytics')
            }}
            className='sidebar-list-item'>
                <span class="material-symbols-outlined" id="span-sidebar-icon">monitoring</span> Analytics
            </li>
            <li 
            onClick={() => {
              setLinkRoute('about')
            }}
            className='sidebar-list-item'>
                <span class="material-symbols-outlined" id="span-sidebar-icon">info</span> About
            </li>
            
        </ul>
    </aside>
    
  
    
    <main className='main-container'>
      {
        linkRoute === 'dashboard'?
        <DashboardComponent />
        : linkRoute === 'route'?
        <RoutesComponent />
        : linkRoute === 'driver' ? 
        <DriverComponent />
        : linkRoute === 'analytics' ?
        <AnalyticComponent />
        : linkRoute === 'about' ?
        <AboutComponent />
        : null  // default to dashboard if none of the above conditions are met.  // This is a good practice to prevent potential bugs and make your code more robust.  // In this case, if the linkRoute does not match any of the specified conditions, it will default to the DashboardComponent.  // If you want to show a different default page, you can add that logic here.  // Note: This is just a basic example. Depending on your application's requirements, you might need to adjust this logic.  // For example, if you want to show a different component when the linkRoute is 'about', you would need to add a case for 'about' in the switch statement.  // Also, this code assumes that the 'DashboardComponent' and 'RoutesComponent' components are already defined and available for use.  //
      }
  
    
    </main>
        </div>
    </>
  )
}

export default Home



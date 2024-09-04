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




// import React from 'react'
// import { useState } from 'react';
// //  { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
// //  from 'recharts';
// import Header from '../components/Header'
// import Sidebar from '../components/Sidebar'

// function Home() {
//   const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
//   const OpenSidebar = () => {
//     setOpenSidebarToggle(!openSidebarToggle);
// };

    
     

//   return (
//     <>
//     <div className='grid-container'>
//      <Header OpenSidebar={OpenSidebar}/>
//       <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
  
    
//     <main className='main-container'>
      
//         <div className='main-title'>
//             <h3>DASHBOARD</h3>
//         </div>

//         <div className='main-cards'>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>Bus</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>300</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>Route</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>12</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>Driver</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>33</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>ALERTS</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>42</h1>
//             </div>
//         </div>
//         <hr></hr>
//         <div className="map-container">
           

//         </div>
//         <hr></hr>

//     </main>
//         </div>
//     </>
//   )
// }

// export default Home









/*
const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];*/

/* <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div> */
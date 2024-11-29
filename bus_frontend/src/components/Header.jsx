import React from 'react'

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';

function Header({OpenSidebar}) {
  
    const navigate = useNavigate();
    const { logout } = useAuth(); // Get the logout function from AuthContext


    const handleLogin = () => {
        // Perform login logic here (e.g., authentication)
        // If successful, navigate to the dashboard
        //logout(); to change the state to prevent back button to got o dashboard
        logout()
        navigate('/login');
    };



  return (
    <header className='header'>
        <div className='menu-icon'>
            <span class="material-symbols-outlined" onClick={OpenSidebar}>menu_open</span>
        </div>
        <div className='header-left a' id="headName">
        <span class="material-symbols-outlined side-logo" id="span-sidebar-icon">pin_drop</span>
            Go Map
        </div>
        <div className='header-right'>
            
        <span class="material-symbols-outlined" onClick={handleLogin}>logout</span>

            
        </div>
    </header>
  )
}

export default Header;
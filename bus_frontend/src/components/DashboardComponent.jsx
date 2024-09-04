import '../App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
//test
function DashboardComponent () {
return (
        <main className='main-container'>
       
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Bus</h3>
                    <span className="material-symbols-outlined">dashboard</span>
                </div>
                <h1>300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Route</h3>
                    <span className="material-symbols-outlined">dashboard</span>
                </div>
                <h1>12</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Driver</h3>
                    <span className="material-symbols-outlined">dashboard</span>
                </div>
                <h1>33</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <span className="material-symbols-outlined">dashboard</span>
                </div>
                <h1>42</h1>
            </div>
        </div>
        <hr></hr>
        <div className="map-container">
           
        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1793339.280490452!2d76.2854427963467!3d28.611301096447786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ssrms%20bareilly!5e0!3m2!1sen!2sin!4v1724613293632!5m2!1sen!2sin"  width="100%" height="100%"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <hr></hr>

      

    </main>
)
}

export default DashboardComponent
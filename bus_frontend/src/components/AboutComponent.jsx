import React, { useState } from 'react';
import '../App.css'; 
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

function AboutComponent() {
    return (
        <>
            <h1>Super Admin</h1>
            <div className="superAdminAbout-about-container">
                <p>We are a dedicated team of developers of the Bus Tracking System.</p>
                <div className="superAdminAbout-developer-images">
                <div className="superAdminAbout-developer-images">
            <div className="superAdminAbout-developer-circle">
                <FaUserCircle size={64} color="#EBEBEB" />
                <div className="superAdminAbout-name">Ashish</div>
            </div>
            <div className="superAdminAbout-developer-circle">
                <FaUserCircle size={64} color="#EBEBEB" />
                <div className="superAdminAbout-name">Arsh</div>
            </div>
            <div className="superAdminAbout-developer-circle">
                <FaUserCircle size={64} color="#EBEBEB" />
                <div className="superAdminAbout-name">Aditya</div>
            </div>
            <div className="superAdminAbout-developer-circle">
                <FaUserCircle size={64} color="#EBEBEB" />
                <div className="superAdminAbout-name">Amarnath</div>
            </div>
        </div>
                </div>
                <h1>Report a probem at </h1><br></br>
                <h3 className="new-about-email">
            <HiOutlineMail size={24} style={{ marginRight: '10px', verticalAlign:'middle'}} />
            ashishanshumaurya1572002@gmail.com
        </h3>
            </div>
        </>
    );
}

export default AboutComponent;

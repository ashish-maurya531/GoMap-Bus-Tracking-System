import React, { useState } from 'react';
import '../App.css'; // Ensure your styles are scoped properly

function AboutComponent() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [problem, setProblem] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to API)
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Problem:', problem);
        // Clear the form fields after submission
        setName('');
        setEmail('');
        setProblem('');
    };

    return (
        <>
            <h1>Super Admin</h1>
            <div className="superAdminAbout-about-container">
                <p>We are a dedicated team of developers of the Bus Tracking System.</p>

                <div className="superAdminAbout-developer-images">
                    <div className="superAdminAbout-developer-circle">
                        <img src="https://img.icons8.com/pastel-glyph/64/EBEBEB/user-male-circle.png" alt="Ashish" />
                        <div className="superAdminAbout-name">Ashish</div>
                    </div>
                    <div className="superAdminAbout-developer-circle">
                        <img src="https://img.icons8.com/pastel-glyph/64/EBEBEB/user-male-circle.png" alt="Arsh" />
                        <div className="superAdminAbout-name">Arsh</div>
                    </div>
                    <div className="superAdminAbout-developer-circle">
                        <img src="https://img.icons8.com/pastel-glyph/64/EBEBEB/user-male-circle.png" alt="Aditya" />
                        <div className="superAdminAbout-name">Aditya</div>
                    </div>
                    <div className="superAdminAbout-developer-circle">
                        <img src="https://img.icons8.com/pastel-glyph/64/EBEBEB/user-male-circle.png" alt="Amarnath" />
                        <div className="superAdminAbout-name">Amarnath</div>
                    </div>
                </div>

                <form className="superAdminAbout-problem-form" onSubmit={handleSubmit}>
                    <h2>Report a Problem</h2>
                    <input 
                        type="text" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="email" 
                        placeholder="Your Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                    <textarea 
                        placeholder="Describe the problem" 
                        value={problem} 
                        onChange={(e) => setProblem(e.target.value)} 
                        required 
                    />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    );
}

export default AboutComponent;

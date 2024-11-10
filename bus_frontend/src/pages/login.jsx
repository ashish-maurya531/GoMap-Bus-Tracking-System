
import React, { useState } from 'react';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext'; // Import useAuth hook
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Src = import.meta.env.VITE_Src;
const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext

    // State to manage input fields
    const [adminId, setAdminId] = useState(null);
    const [password, setPassword] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState(null);



    const handleLogin = async()=>{
        await setIsLoading(true)
        
     
            console.log("test", adminId, password)
    if(!adminId) {
        // setError("Please enter admin Id")
        // tostShow("Please Your Id");
        toast.info('Please Enter Your Admin Id', {});
      
        setIsLoading(false)
        return;
    }
    if(!password) {
        // setError("Please enter password")

        // tostShow("Please Your Password");
        toast.info('Please Enter Your Password', {});

        setIsLoading(false)
        return;
    }

        try {
            const response = await axios.post(`${Src}/login`, { adminId, password });
            console.log("api hit");
            console.log(response.data)
            if (response.data.message===`Login successful! Welcome ${adminId}` && response.data.status==200 ){
                login();
                console.log(adminId + ' ' + password);
                // tostShow(response.data.message);
                toast.success(response.data.message, {
                    autoClose: 2000,
                });

                
                
                setTimeout( ()=>{navigate(`/dashboard`)}, 2000);
            }
            else{
                // setError(response?.data?.message)
                // tostShow(response.data.message);
                toast.error(response.data.message, {});

                console.log("error",adminId + ' ' + password);
                setIsLoading(false)

  
            }
             
          } catch (error) {
                // setError(error?.message)            
              console.error('Login failed:', error);
              setIsLoading(false)
          } 

    
    };

    return (
        <div className="login-page-body-container">
            <h2 className="login-page-fw-bold login-page-text login-page-text-center">
                Go Map
                <img
                    src="icons8-location.gif"
                    class="login-page-location-icon"
                    alt="location icon"
                />
            </h2>
            <form className="login-page-form" >
                <h2 className="login-page-title">ADMIN LOGIN</h2>
               
                <p className="login-page-subtitle">Please enter your login ID and password!</p>

                {/* {error ? <p style={{
                    textAlign: 'center',
                    color:'red',
                    marginTop: '10px',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                }}>{error}</p> : null} */}

                <input
                    type="text"
                    className="login-page-input"
                    placeholder="Admin ID"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    autoComplete="off"
                    required
                />
                <input
                    type="password"
                    className="login-page-input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                />
                <a href="#!" className="login-page-forgot-password">
                    Forgot password?
                </a>
                <button
                disabled={isLoading}
                className="login-page-button" onClick={() => {
                    
                    handleLogin();
                    }}>
                    {isLoading ? "LOGING IN..." : "LOGIN"}
                </button>
            </form>
            <ToastContainer
            position="top-center"
            autoClose={2000}
            theme="dark"
            limit={1}
         
            />
        </div>
    );
};

export default Login;


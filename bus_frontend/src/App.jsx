

// import './App.css';
// import { BrowserRouter as Router, Route, Switch,Navigate } from 'react-router-dom';
// import { AuthProvider } from './components/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Home from './pages/dashboard';
// import Login from './pages/login';


// // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// function App() {
    

//     return (
     


//         <Router>
            
//                 <Routes>
                  
//                     <Route index element={<Navigate to='/login' />} />
//                     <Route path="/login" element={<Login />} />
                   
//                     <Route path="/dashboard" element={<Home />} />


                    
                  

                      
                
//                 </Routes>
            
//         </Router>
//     );
// }

// export default App;



// src/App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/dashboard';
import Login from './pages/login';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Redirect root to /login */}
                    <Route index element={<Navigate to='/login' />} />

                    {/* Public route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected route */}
                    <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

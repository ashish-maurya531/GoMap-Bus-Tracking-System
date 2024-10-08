// // src/App.jsx
// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { AuthProvider } from './components/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Home from './pages/dashboard';
// import Login from './pages/login';

// function App() {
//     return (
//         <AuthProvider>
//             <Router>
//                 <Routes>
//                     {/* Redirect root to /login */}
//                     <Route index element={<Navigate to='/login' />} />

//                     {/* Public route */}
//                     <Route path="/login" element={<Login />} />

//                     {/* Protected route */}
//                     <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
//                 </Routes>
//             </Router>
//         </AuthProvider>
//     );
// }

// export default App;




// import './App.css';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { AuthProvider } from './components/AuthContext';
// import ProtectedRoute from './components/ProtectedRoute';
// import Home from './pages/dashboard';
// import Login from './pages/login';

// function App() {
//     const [isOnline, setIsOnline] = useState(navigator.onLine); // Check initial network status
//     const [showOfflineModal, setShowOfflineModal] = useState(!navigator.onLine);

//     useEffect(() => {
//         // Event listeners to detect network changes
//         const handleOnline = () => {
//             setIsOnline(true);
//             setShowOfflineModal(false); // Close offline modal
//         };

//         const handleOffline = () => {
//             setIsOnline(false);
//             setShowOfflineModal(true); // Show offline modal
//         };

//         window.addEventListener('online', handleOnline);
//         window.addEventListener('offline', handleOffline);

//         // Cleanup listeners on component unmount
//         return () => {
//             window.removeEventListener('online', handleOnline);
//             window.removeEventListener('offline', handleOffline);
//         };
//     }, []);

//     return (
//         <AuthProvider>
//             <div className={`app-container ${isOnline ? '' : 'blurred'}`}>
//                 {showOfflineModal && (
//                     <div className="offline-modal">
//                         <div className="offline-content">
//                             <h2>You are offline</h2>
//                          <p>GoMap will not work properly without an active internet connection.</p>
//                             <p>Please check your internet connection.</p>
//                         </div>
//                     </div>
//                 )}
//                 <Router>
//                     <Routes>
//                         <Route index element={<Navigate to='/login' />} />
//                         <Route path="/login" element={<Login />} />
//                         <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
//                     </Routes>
//                 </Router>
//             </div>
//         </AuthProvider>
//     );
// }

// export default App;



import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/dashboard';
import Login from './pages/login';

function App() {
    const [isOnline, setIsOnline] = useState(navigator.onLine); // Initial online status
    const [showOfflineModal, setShowOfflineModal] = useState(false);
    const [showOnlineNotification, setShowOnlineNotification] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowOfflineModal(false);
            setShowOnlineNotification(true); // Show "back online" notification
            setTimeout(() => setShowOnlineNotification(false), 3000); // Hide the notification after 3 seconds
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowOfflineModal(true); // Show the "You are offline" modal
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AuthProvider>
            <div className={`app-container ${isOnline ? '' : 'blurred'}`}>
                {/* Offline Modal */}
                {showOfflineModal && (
                    <div className="offline-modal">
                        <div className="offline-content">
                            <h2>You are offline</h2>
                            <p>GoMap will not work properly without an active internet connection.</p>
                            <p>Please check your internet connection.</p>
                        </div>
                    </div>
                )}

                {/* Back Online Notification */}
                {showOnlineNotification && (
                    <div className="back-online-notification">
                        <div className="back-online-content">
                            <p>Back online</p>
                        </div>
                    </div>
                )}

                {/* Main Router */}
                <Router>
                    <Routes>
                        <Route index element={<Navigate to='/login' />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/dashboard" element={<ProtectedRoute element={<Home />} />} />
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;

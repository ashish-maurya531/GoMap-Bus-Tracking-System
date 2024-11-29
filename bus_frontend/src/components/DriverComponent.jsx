import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import DriverList from './DriverListComponent';
import { userCreation } from '../relem/relemService.js';

const Src = import.meta.env.VITE_Src;

function DriverComponent() {
    const [dName, setdName] = useState('');
    const [dPhoneNo, setdPhoneNo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDriverDetails, setNewDriverDetails] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoaderVisible, setIsLoaderVisible] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine); // Online status

    const [isAddDriverVisible, setIsAddDriverVisible] = useState(false);
    // Reference to update driver list
    const driverListRef = useRef();
        
    const openAddDriver = () => {
        setIsAddDriverVisible((prev) => !prev);
      };
    

    // Handle online/offline events
    useEffect(() => {
        const handleOnlineStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener('online', handleOnlineStatus);
        window.addEventListener('offline', handleOnlineStatus);

        // Cleanup listeners on unmount
        return () => {
            window.removeEventListener('online', handleOnlineStatus);
            window.removeEventListener('offline', handleOnlineStatus);
        };
    }, []);

    const driverCount = async () => {
        try {
            const response = await axios.get(`${Src}/idCount`);
            return response?.data?.data;
        } catch (error) {
            console.error(error);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, ''); // Allow only alphabets and spaces
        setdName(value);
    };

    const handlePhoneNoChange = (e) => {
        const value = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
        if (value.length <= 10) {
            setdPhoneNo(value);
        }
    };

    const addNewDriver = async () => {
        setIsLoaderVisible(true); // Show loader as soon as the save button is clicked
        setIsModalOpen(true); // Open modal to show loader

        const driverCountData = await driverCount();
        try {
            await axios.post(`${Src}/addDriver`, {
                driverId: driverCountData + 1,
                dName,
                dPhoneNo,
            });

            setNewDriverDetails({
                id: driverCountData + 1,
                name: dName,
                phoneNo: dPhoneNo,
            });

            try {
                userCreation(`${"D" + (driverCountData + 1)}`, dPhoneNo);
            } catch (error) {
                console.error("relem user error", error);
            }

            // After successful driver creation, hide loader and show details
            setIsLoaderVisible(false);

            if (driverListRef.current) {
                driverListRef.current.getDriverList();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setIsSubmitting(false); // Enable the button again
        setdName('');
        setdPhoneNo('');
    };

    const handleSubmit = () => {
        if (!isOnline) {
            // If the user is offline, show an error in the modal
            setIsModalOpen(true);
            setErrorMessage('You are offline. Please check your internet connection.');
            return;
        }

        if (!dName || dPhoneNo.length !== 10) {
            setErrorMessage('Please enter a valid name and a 10-digit phone number.');
        } else {
            setErrorMessage(''); // Clear error if validation passes
            setIsSubmitting(true); // Disable the button immediately on save click
            addNewDriver();
        }
    };

    const isSaveDisabled = !dName || dPhoneNo.length !== 10 || isSubmitting;

    return (
        <>
            <h1 id="addDriverh1" onClick={openAddDriver}>+ Add New Driver</h1>
            <div className="addDriver-container" style={{
          display: isAddDriverVisible ? 'flex' : 'none'}}>
                <div>
                    <input 
                        type="text" 
                        value={dName}
                        onChange={handleNameChange}  
                        className="addDriverInput"  
                        placeholder="Enter driver name" 
                        required 
                    />
                    <input
                        type="text"
                        value={dPhoneNo}
                        onChange={handlePhoneNoChange}
                        className="addDriverInput"
                        placeholder="Enter driver phone number"
                        required 
                    />
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button className="save-button-disabled" onClick={handleSubmit} disabled={isSaveDisabled}>Save</button>
            </div>
            <hr />

            <h1>Drivers List</h1>
            <DriverList ref={driverListRef} />
            <hr />
         

            {/* Modal */}
            {isModalOpen && (
                <div className="DriverComponent-modal">
                    <div className="DriverComponent-modal-content">
                        {isLoaderVisible ? (
                            <>
                                <div className="loader"></div>
                                <p>Creating the driver...</p>
                            </>
                        ) : errorMessage ? (
                            <p>{errorMessage}</p>
                        ) : (
                            <>
                                <h1>New Driver Details</h1>
                                <p>Driver ID: D{newDriverDetails?.id}</p>
                                <p>Name: {newDriverDetails?.name}</p>
                                <p>Phone No: {newDriverDetails?.phoneNo}</p>
                                <p className="modal-info">⚠️Please remember your Driver ID.</p>
                                <button onClick={closeModal}>OK</button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default DriverComponent;

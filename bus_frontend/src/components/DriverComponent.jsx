
// DriverComponent.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DriverList from './DriverListComponent';

function DriverComponent() {
    const [dName, setdName] = useState('');
    const [dPhoneNo, setdPhoneNo] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newDriverDetails, setNewDriverDetails] = useState(null);
    //this is the reference to function to call
    const driverListRef = useRef();

    const driverCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/idCount');
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
        const driverCountData = await driverCount();

        try {
            await axios.post('http://localhost:5000/addDriver', {
                driverId: driverCountData + 1,
                dName,
                dPhoneNo,
            });

            setNewDriverDetails({
                id: driverCountData + 1,
                name: dName,
                phoneNo: dPhoneNo,
            });
            setIsModalOpen(true);

            toast.success('New Driver Added Successfully');
            //this is the reference to the function which is in driverlistcomponent.jsx
            if (driverListRef.current) {
                driverListRef.current.getDriverList();
            }
        } catch (error) {
            toast.error('Failed to Add New Driver');
            console.error(error);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setdName('');
        setdPhoneNo('');
    };

    const isSaveDisabled = !dName || dPhoneNo.length !== 10;

    return (
        <>
            <h1>+ Add New Driver</h1>
            <div className="addDriver-container">
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
                <button onClick={addNewDriver} disabled={isSaveDisabled}>Save</button>
            </div>
            <hr />

            <h1>Drivers List</h1>
            <DriverList ref={driverListRef} />
            <hr />
            <ToastContainer />

            {/* Modal */}
            {isModalOpen && (
                <div className="DriverComponent-modal">
                    <div className="DriverComponent-modal-content">
                        <h1>New Driver Details</h1>
                        <p>Driver ID: D{newDriverDetails?.id}</p>
                        <p>Name: {newDriverDetails?.name}</p>
                        <p>Phone No:{newDriverDetails?.phoneNo}</p>
                        <p className='modal-info'>⚠️Please remember your Driver ID.</p>
                        <button onClick={closeModal}>OK</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default DriverComponent;

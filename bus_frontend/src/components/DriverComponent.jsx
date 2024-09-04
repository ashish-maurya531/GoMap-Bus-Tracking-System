import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DriverList from "./DriverListComponent";
// import getDriverList from "./DriverListComponent";



//get current id no to show


function DriverComponent() {
    const [id, setId] = useState(0);
    const [dName, setdName] = useState(null);
    const [dPhoneNo, setdPhoneNo] = useState(null);
    const driverListRef = useRef();

    const driverCount = async () => {
        try {
            const response = await axios.get('http://localhost:5000/idCount');
            console.log("driver Id count=" + response.data.data);
            // setId(parseInt(response.data.data)+1);
            return response?.data?.data
        }
        catch (error) {

            console.error(error);
        }
    }
    


    const addNewDriver = async () => {
        // console.log("test111", dName, dPhoneNo, await driverCount())
        let driverCountData = await driverCount();

        try {
            const response = await axios.post('http://localhost:5000/addDriver', {
                driverId: driverCountData + 1,
                dName,
                dPhoneNo,
            });
            toast.success("New Driver Added Successfully");
            if (driverListRef.current){
                driverListRef.current.getDriverList(); // Execute the function in DriverListComponent
            }
        } catch (error) {
            toast.error("Failed to Add New Driver");
            console.error(error);
        }




    }


    return (
        <>
            <h1>
                + Add New Driver
            </h1>
            <div className="addDriver-container">
                <div>
                    <input type="text" onChange={(e)=> {
                        setdName(e.target.value);
                    }}  className="addDriverInput"  placeholder="enter driver name" required />
                    <input
                    onChange={(e) => {
                        setdPhoneNo(e.target.value);
                    }}
                    type="number" className="addDriverInput"  placeholder="enter driver phoneNo"
                        required />
                </div>
                <button onClick={addNewDriver}>Save</button>


            </div>
            <hr></hr>


            <h1>
                Drivers List
            </h1>
            <DriverList ref ={driverListRef}  />
            <hr></hr>
            <ToastContainer />

        </>
    )
}

export default DriverComponent;
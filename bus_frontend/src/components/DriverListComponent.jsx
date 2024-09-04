import React, { useState ,useEffect,forwardRef,useImperativeHandle} from 'react';
import axios from 'axios';

const DriverList = forwardRef((props,ref) => {
    const [drivers, setDrivers] = useState([
        // { id: 234, name: 'aditya kumar', phoneNo: '43434343434' },
        // { id: 235, name: 'Driver 2', phoneNo: '54545454545' },
        // { id: 236, name: 'Driver 3', phoneNo: '65656565656' },
        // { id: 237, name: 'Driver 4', phoneNo: "1234567890" },
        // { id: 238, name: 'Driver 5', phoneNo: "9876543210" },
        // { id: 239, name: 'Driver 6', phoneNo: "11111111111" },
        // { id: 240, name: 'Driver 7', phoneNo: "22222222222" },
        
    ]);
    
    const getDriverList = async ()=>{
        console.log(drivers)
        try {
            const response = await axios.get('http://localhost:5000/getdriver');
            setDrivers((response.data.data).reverse());
            // drivers.reverse();
            // console.log(response?.data?.data);
            // console.log("-------------"+drivers)
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    }
    
    useEffect(() => {
        getDriverList();
    }, []);

    useImperativeHandle(ref,()=>({
        getDriverList,
    }))
    
    

  

  

       


        // Add more drivers as needed
    

    const handleEdit = (id) => {
        // Handle edit logic here
        console.log('Edit driver with id:', id);
    };

    const handleDelete = (id) => {
        // Handle delete logic here
        setDrivers(drivers.filter(driver => driver.id !== id));
    };

    return (
        <div className="driverList-container">
            {/* <button onClick={()=>{getDriverList()}}></button> */}
            <div className="driverList-container-search-box">
                <select className="driverList-search-filter">
                    <option value="all">All</option>
                    <option value="id">Id</option>
                    <option value="name">Name</option>

                    
                </select>
                <input type="search" className="driverList-search-input" placeholder="Search by name or id"/>
                <button className="driverList-search-button">
                <span class="material-symbols-outlined">search</span>
                </button>
            </div>
            <div className="driverList-container-list"></div>
            <table className="driverList-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Phone No.</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver.id}>
                            <td>{driver.id}</td>
                            <td>{driver.name}</td>
                            <td>{driver.phoneNo}</td>
                            <td>
                                <button 
                                    className="driverList-edit-button" 
                                    onClick={() => handleEdit(driver.id)}>
                                    Edit
                                </button>
                                <button 
                                    className="driverList-delete-button" 
                                    onClick={() => handleDelete(driver.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

export default DriverList;

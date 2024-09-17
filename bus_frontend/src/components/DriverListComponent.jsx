

// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const DriverList = forwardRef((props, ref) => {
//     const [drivers, setDrivers] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [searchFilter, setSearchFilter] = useState('all');
//     const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//     const [driverToDelete, setDriverToDelete] = useState(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [driverToEdit, setDriverToEdit] = useState(null);
//     const [editName, setEditName] = useState('');
//     const [editPhoneNo, setEditPhoneNo] = useState('');

//     const getDriverList = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/getdriver');
//             setDrivers(response.data.data.reverse());
//         } catch (error) {
//             console.error('Error fetching drivers:', error);
//         }
//     };

//     useEffect(() => {
//         getDriverList();
//     }, []);

//     useImperativeHandle(ref, () => ({
//         getDriverList,
//     }));

//     // Debouncing function to delay the search
//     const debounce = (func, delay) => {
//         let timeoutId;
//         return (...args) => {
//             if (timeoutId) {
//                 clearTimeout(timeoutId);
//             }
//             timeoutId = setTimeout(() => {
//                 func(...args);
//             }, delay);
//         };
//     };

//     const handleSearch = debounce(() => {
//         if (searchFilter === 'id') {
//             const foundDriver = drivers.find(driver => driver.id.toString().includes(searchTerm));
//             if (foundDriver) {
//                 setDrivers([foundDriver]);
//                 toast.success('Driver found');
//             } else {
//                 toast.error('No driver found');
//             }
//         } else if (searchFilter === 'name') {
//             const foundDrivers = drivers.filter(driver => driver.name.toLowerCase().includes(searchTerm.toLowerCase()));
//             if (foundDrivers.length > 0) {
//                 setDrivers(foundDrivers);
//                 toast.success('Driver(s) found');
//             } else {
//                 toast.error('No driver found');
//             }
//         } else {
//             getDriverList(); // Refresh the list if 'all' is selected
//         }
//     }, 300);

//     useEffect(() => {
//         if (searchFilter === 'all' || searchTerm.trim() === '') {
//             getDriverList();
//         }
//     }, [searchFilter, searchTerm]);

//     const handleDelete = async () => {
//         try {
//             await axios.delete(`http://localhost:5000/deleteDriver/${driverToDelete.id}`);
//             setDrivers(drivers.filter(driver => driver.id !== driverToDelete.id));
//             toast.success('Driver deleted successfully');
//         } catch (error) {
//             toast.error('Failed to delete driver');
//             console.error(error);
//         }
//         closeDeleteModal();
//     };

//     const handleEditSave = async () => {
//         try {
//             await axios.put(`http://localhost:5000/updateDriver/${driverToEdit.id}`, {
//                 name: editName,
//                 phoneNo: editPhoneNo
//             });
//             setDrivers(drivers.map(driver => driver.id === driverToEdit.id ? { ...driver, name: editName, phoneNo: editPhoneNo } : driver));
//             toast.success('Driver details updated successfully');
//         } catch (error) {
//             toast.error('Failed to update driver details');
//             console.error(error);
//         }
//         closeEditModal();
//     };

//     const openDeleteModal = (driver) => {
//         setDriverToDelete(driver);
//         setIsDeleteModalOpen(true);
//     };

//     const closeDeleteModal = () => {
//         setIsDeleteModalOpen(false);
//         setDriverToDelete(null);
//     };

//     const openEditModal = (driver) => {
//         setDriverToEdit(driver);
//         setEditName(driver.name);
//         setEditPhoneNo(driver.phoneNo);
//         setIsEditModalOpen(true);
//     };

//     const closeEditModal = () => {
//         setIsEditModalOpen(false);
//         setDriverToEdit(null);
//         setEditName('');
//         setEditPhoneNo('');
//     };

//     const isSearchDisabled = searchFilter !== 'all' && searchTerm.trim() === '';
//     const isEditSaveDisabled = editName.trim() === '' || editPhoneNo.length !== 10;

//     return (
//         <div className="driverList-container">
//             <div className="driverList-container-search-box">
//                 <select 
//                     className="driverList-search-filter" 
//                     value={searchFilter} 
//                     onChange={(e) => setSearchFilter(e.target.value)}
//                 >
//                     <option value="all">All</option>
//                     <option value="id">Id</option>
//                     <option value="name">Name</option>
//                 </select>
//                 <input 
//                     type="search" 
//                     className="driverList-search-input" 
//                     placeholder="Search by name or id" 
//                     value={searchFilter === "all" ? "" : searchTerm} 
//                     onChange={(e) => setSearchTerm(e.target.value)} 
//                     disabled={searchFilter === 'all'}
//                 />
//                 <button 
//                     className="driverList-search-button" 
//                     onClick={handleSearch}
//                     disabled={isSearchDisabled}
//                 >
//                     <span className="material-symbols-outlined">search</span>
//                 </button>
//             </div>
//             <div className="driverList-container-list"></div>
//             <table className="driverList-table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Phone No.</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {drivers.map((driver) => (
//                         <tr key={driver.id}>
//                             <td>{driver.id}</td>
//                             <td>{driver.name}</td>
//                             <td>{driver.phoneNo}</td>
//                             <td>
//                                 <button 
//                                     className="driverList-edit-button" 
//                                     onClick={() => openEditModal(driver)}
//                                 >
//                                     Edit
//                                 </button>
//                                 <button 
//                                     className="driverList-delete-button" 
//                                     onClick={() => openDeleteModal(driver)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Delete Confirmation Modal */}
//             {isDeleteModalOpen && (
//                 <div className="DriverListComponent-modal">
//                     <div className="DriverListComponent-modal-content">
//                         <h2>Confirm Deletion</h2>
//                         <p>Are you sure you want to delete this driver?</p>
//                         <button onClick={handleDelete}>Delete</button>
//                         <button onClick={closeDeleteModal}>Cancel</button>
//                     </div>
//                 </div>
//             )}

//             {/* Edit Driver Modal */}
//             {isEditModalOpen && (
//                 <div className="DriverListComponent-modal">
//                     <div className="DriverListComponent-modal-content">
//                         <h2>Edit Driver Details</h2>
//                         <p>Driver ID: {driverToEdit?.id}</p>
//                         <input 
//                             type="text" 
//                             value={editName} 
//                             onChange={(e) => setEditName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} 
//                             placeholder="Enter new driver name"
//                         />
//                         <input 
//                             type="text" 
//                             value={editPhoneNo} 
//                             onChange={(e) => {
//                                 const value = e.target.value.replace(/\D/g, '');
//                                 if (value.length <= 10) setEditPhoneNo(value);
//                             }} 
//                             placeholder="Enter new phone number"
//                         />
//                         <button onClick={handleEditSave} disabled={isEditSaveDisabled}>Save</button>
//                         <button onClick={closeEditModal}>Close</button>
//                     </div>
//                 </div>
//             )}
//             <ToastContainer />
//         </div>
//     );
// });

// export default DriverList;
















import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DriverList = forwardRef((props, ref) => {
    const [drivers, setDrivers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchFilter, setSearchFilter] = useState('all');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [driverToDelete, setDriverToDelete] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [driverToEdit, setDriverToEdit] = useState(null);
    const [editName, setEditName] = useState('');
    const [editPhoneNo, setEditPhoneNo] = useState('');

    const getDriverList = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getdriver');
            setDrivers(response.data.data.reverse());
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    useEffect(() => {
        getDriverList();
    }, []);
    //very imp this is to link the driver list component to main driver component
    useImperativeHandle(ref, () => ({
        getDriverList,
    }));


    //up to this point
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };


    const handleSearch = debounce(() => {
        if (searchFilter === 'id') {
            const foundDriver = drivers.find(driver => driver.id.toString() === searchTerm);
            if (foundDriver) {
                setDrivers([foundDriver]);
                // toast.success('Driver found');
            } else {
                // toast.error('No driver found');
            }
        } else if (searchFilter === 'name') {
            const foundDrivers = drivers.filter(driver => driver.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (foundDrivers.length > 0) {
                setDrivers(foundDrivers);
                // toast.success('Driver(s) found');
            } else {
                // toast.error('No driver found');
            }
        } else {
            getDriverList(); // Refresh the list if 'all' is selected
        }
    },1000);

    useEffect(() => {
        if (searchFilter === 'all' || searchTerm.trim() === '') {
            getDriverList();
        } else {
            handleSearch();
        }
    }, [searchTerm, searchFilter]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/deleteDriver/${driverToDelete.id}`);
            setDrivers(drivers.filter(driver => driver.id !== driverToDelete.id));
            toast.success('Driver deleted successfully');
            // toast.dismiss(1000);
        } catch (error) {
            toast.error('Failed to delete driver');
            toast.dismiss();
            console.error(error);
        }
        closeDeleteModal();
    };

    const handleEditSave = async () => {
        try {
            await axios.put(`http://localhost:5000/updateDriver/${driverToEdit.id}`, {
                name: editName,
                phoneNo: editPhoneNo
            });
            setDrivers(drivers.map(driver => driver.id === driverToEdit.id ? { ...driver, name: editName, phoneNo: editPhoneNo } : driver));
            toast.success('Driver details updated successfully',{pauseOnHover: false,
                pauseOnFocusLoss: false});
            toast.dismiss();
        } catch (error) {
            toast.error('Failed to update driver details',{
                pauseOnHover: false,
        pauseOnFocusLoss: false
            });
            toast.dismiss();
            console.error(error);
        }
        closeEditModal();
    };

    const openDeleteModal = (driver) => {
        setDriverToDelete(driver);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDriverToDelete(null);
    };

    const openEditModal = (driver) => {
        setDriverToEdit(driver);
        setEditName(driver.name);
        setEditPhoneNo(driver.phoneNo);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setDriverToEdit(null);
        setEditName('');
        setEditPhoneNo('');
    };

    const isSearchDisabled = searchFilter !== 'all' && searchTerm.trim() === '';
    const isEditSaveDisabled = editName.trim() === '' || editPhoneNo.length !== 10;

    return (
        <>
        <div className="driverList-container">
            <div className="driverList-container-search-box">
                <select 
                    className="driverList-search-filter" 
                    value={searchFilter} 
                    onChange={(e) => setSearchFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="id">Id</option>
                    <option value="name">Name</option>
                </select>
                <input 
                    type="search" 
                    className="driverList-search-input" 
                    placeholder="Search by name or id" 
                    value={searchFilter === "all" ? "" : searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    disabled={searchFilter === 'all'}
                />
                <button 
                    className="driverList-search-button" 
                    onClick={handleSearch}
                    disabled={isSearchDisabled}
                >
                    <span className="material-symbols-outlined">search</span>
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
                                    onClick={() => openEditModal(driver)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="driverList-delete-button" 
                                    onClick={() => openDeleteModal(driver)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        
           

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="driver-update-modal">
                    <div className="driver-update-modal-content">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete this driver?</p>
                        <div className='driver-update-modal-actions'>
                        <button className="save-btn" onClick={handleDelete}>Delete</button>
                        <button  onClick={closeDeleteModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
            

            {/* Edit Driver Modal */}
            {isEditModalOpen && (
                <div className="driver-update-modal">
                    <div className="driver-update-modal-content">
                        <h2>Edit Driver Details</h2>
                        <p>Driver ID: {driverToEdit?.id}</p>
                        <input 
                            type="text" 
                            value={editName} 
                            onChange={(e) => setEditName(e.target.value.replace(/[^a-zA-Z\s]/g, ''))} 
                            placeholder="Enter new driver name"
                        />
                        <input 
                            type="text" 
                            value={editPhoneNo} 
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '');
                                if (value.length <= 10) setEditPhoneNo(value);
                            }} 
                            placeholder="Enter new phone number"
                        />
                        <div className='driver-update-modal-actions'>
                        <button className="save-btn" onClick={handleEditSave} disabled={isEditSaveDisabled}>Save</button>
                        <button   onClick={closeEditModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
        <ToastContainer/></>
    );
});

export default DriverList;







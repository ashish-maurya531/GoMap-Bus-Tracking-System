import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import axios from 'axios';
import { deleteRelemUser, updateRelemUser } from '../relem/relemService.js';
import { FaEdit, FaTrash } from 'react-icons/fa';
const Src = import.meta.env.VITE_Src;


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
    const [modalStatus, setModalStatus] = useState(null); 
    const [loading, setLoading] = useState(false); 

    const getDriverList = async () => {
        try {
            const response = await axios.get(`${Src}/getdriver`);
            setDrivers(response.data.data.reverse());
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    useEffect(() => {
        getDriverList();
    }, []);

    useImperativeHandle(ref, () => ({
        getDriverList,
    }));

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
            }
        } else if (searchFilter === 'name') {
            const foundDrivers = drivers.filter(driver => driver.name.toLowerCase().includes(searchTerm.toLowerCase()));
            if (foundDrivers.length > 0) {
                setDrivers(foundDrivers);
            }
        } else {
            getDriverList(); 
        }
    }, 600);

    useEffect(() => {
        if (searchFilter === 'all' || searchTerm.trim() === '') {
            getDriverList();
        } else {
            handleSearch();
        }
    }, [searchTerm, searchFilter]);

    const handleDelete = async () => {
        setLoading(true); // Start the loader
        try {
            const driverstatus = await axios.get(`${Src}/getdriverStatus/${driverToDelete.id}`);
            if (driverstatus.data.status === 200) {
                setModalStatus({ success: false, message: 'Driver is running a bus, not able to delete the driver.' });
            } else if (driverstatus.data.status === 201) {
                await axios.delete(`${Src}/deleteDriver/${driverToDelete.id}`);
                try {
                    deleteRelemUser(driverToDelete.id, driverToDelete.phoneNo);
                } catch (error) {
                    console.error('Failed to delete user from Realm', error);
                }
                setDrivers(drivers.filter(driver => driver.id !== driverToDelete.id));
                setModalStatus({ success: true, message: 'Driver deleted successfully.' });
            }
        } catch (error) {
            setModalStatus({ success: false, message: 'Failed to delete driver.' });
            console.error(error);
        } finally {
            setLoading(false); // Stop the loader after the operation
        }
    };

    const handleEditSave = async () => {
        setLoading(true); // Start the loader
        try {
            const driverstatus = await axios.get(`${Src}/getdriverStatus/${driverToEdit.id}`);
            if (driverstatus.data.status === 200) {
                setModalStatus({ success: false, message: 'Driver is running a bus, not able to update details.' });
            } else if (driverstatus.data.status === 201) {
                await axios.put(`${Src}/updateDriver/${driverToEdit.id}`, {
                    name: editName,
                    phoneNo: editPhoneNo,
                });
                setDrivers(drivers.map(driver => driver.id === driverToEdit.id ? { ...driver, name: editName, phoneNo: editPhoneNo } : driver));
                try {
                    updateRelemUser(driverToEdit.id, driverToEdit.phoneNo, editPhoneNo);
                } catch (error) {
                    console.error('Failed to update user in Realm', error);
                }
                setModalStatus({ success: true, message: 'Driver details updated successfully.' });
            }
        } catch (error) {
            setModalStatus({ success: false, message: 'Failed to update driver details.' });
            console.error(error);
        } finally {
            setLoading(false); // Stop the loader after the operation
        }
    };

    const openDeleteModal = (driver) => {
        setDriverToDelete(driver);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setDriverToDelete(null);
        setModalStatus(null); // Reset modal status
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
        setModalStatus(null); // Reset modal status
    };

    const isEditSaveDisabled = editName.trim() === '' || editPhoneNo.length !== 10;

    const isSearchDisabled = searchFilter !== 'all' && searchTerm.trim() === '';

    return (
        <>
        <div className="driverList-container">
            {/* Rest of the driver list UI */}
            
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
                    // onClick={getDriverList}
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
                                    <FaEdit size={15} />
                                </button>
                                <button 
                                    className="driverList-delete-button" 
                                    onClick={() => openDeleteModal(driver)}
                                >
                                    <FaTrash size={15} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    

        {/* Delete Confirmation Modal */}
        {isDeleteModalOpen && (
            <div className="driver-update-modal" onClick={closeDeleteModal}>
                <div className="driver-update-modal-content" onClick={e => e.stopPropagation()}>
                    {modalStatus ? (
                        <div className={`modal-status ${modalStatus.success ? 'success' : 'failure'}`}>
                            {modalStatus.success ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                        <path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                    </svg>
                                    <p>{modalStatus.message}</p>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                        <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
                                        <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                    </svg>
                                    <p>{modalStatus.message}</p>
                                </>
                            )}
                            <button className="editDeleteOkButton" onClick={closeDeleteModal}>OK</button>
                        </div>
                    ) : (
                        <>
                            <h3>Confirm Delete</h3>
                            <p>Are you sure you want to delete this driver?</p>
                            {loading ? (
                                <div className="loader"></div> // Loader component during deletion
                            ) : (
                                <div className="driver-update-modal-actions">
                                    <button className="editDeleteConfirmButton" onClick={handleDelete}>Delete</button>
                                    <button className="save-btn" onClick={closeDeleteModal}>Cancel</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )}

        {/* Edit Driver Modal */}
        {isEditModalOpen && (
            <div className="driver-update-modal" onClick={closeEditModal}>
                <div className="driver-update-modal-content" onClick={e => e.stopPropagation()}>
                    {modalStatus ? (
                        <div className={`modal-status ${modalStatus.success ? 'success' : 'failure'}`}>
                            {modalStatus.success ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                        <path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                                    </svg>
                                    <p>{modalStatus.message}</p>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                                        <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
                                        <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                                    </svg>
                                    <p>{modalStatus.message}</p>
                                </>
                            )}
                            <button className="editDeleteOkButton" onClick={closeEditModal}>OK</button>
                        </div>
                    ) : (
                        <>
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
                            {loading ? (<>
                                <div className="loader"></div>
                                Updating...</>
                            ) : (
                                <div className="driver-update-modal-actions">
                                    <button className="save-btn" onClick={handleEditSave} disabled={isEditSaveDisabled}>Save</button>
                                    <button className="editDeleteCancelButton" onClick={closeEditModal}>Cancel</button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        )}

        </>
    );
});

export default DriverList;

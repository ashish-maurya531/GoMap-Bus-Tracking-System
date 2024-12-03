// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { FaTrash, FaPlus, FaSave } from 'react-icons/fa'
// import './Route.css'

// const Src = import.meta.env.VITE_Src;

// function BusRouteManager() {
//   const [routes, setRoutes] = useState([])
//   const [errors, setErrors] = useState({})
//   const [showDriverModal, setShowDriverModal] = useState(false);
//   const [modalStatus, setModalStatus] = useState(null);
//   const [loading, setLoading] = useState(false); // Loading state for delete/edit actions



//   useEffect(() => {
//     fetchRoutes()
//   }, [])

//   const fetchRoutes = async () => {
//     try {
//       const response = await axios.get(`${Src}/api/routes`)
//       setRoutes(Array.isArray(response.data.data)? response.data.data : [])
//     } catch (error) {
//       console.error('Error fetching routes:', error)
//       setRoutes([]) // Set to empty array if fetch fails
//     }
//   }
  

//   const addRow = () => {
//     const newId = Math.max(...routes.map(route => route.id || 0), 0) + 1
//     setRoutes([...routes, { id: newId, busNo: '', departureTime: '', arrivalTime: '', route: '',start:'',end:'' }])
//   }

//   const deleteRow = (id) => {
//     setRoutes(routes.filter(route => route.id !== id))
//   }

//   const updateRoute = (id, field, value) => {
//     setRoutes(routes.map(route =>
//       route.id === id ? { ...route, [field]: value } : route
//     ))
//     validateField(id, field, value)
//   }

//   const validateField = (id, field, value) => {
//     if (!value.trim()) {
//       setErrors(prev => ({ ...prev, [id]: { ...prev[id], [field]: 'This field cannot be empty' } }))
//     } else {
//       setErrors(prev => {
//         const newErrors = { ...prev }
//         if (newErrors[id]) {
//           delete newErrors[id][field]
//           if (Object.keys(newErrors[id]).length === 0) {
//             delete newErrors[id]
//           }
//         }
//         return newErrors
//       })
//     }
//   }

//   const saveRoutes = async () => {
//     const newErrors = {}
//     routes.forEach(route => {
//       const routeErrors = {}
//       if (!route.busNo.trim()) routeErrors.busNo = 'Bus number cannot be empty'
//       if (!route.departureTime) routeErrors.departureTime = 'Departure time cannot be empty'
//       if (!route.arrivalTime) routeErrors.arrivalTime = 'Arrival time cannot be empty'
//       if (!route.route.trim()) routeErrors.route = 'Route cannot be empty'
//       if (!route.start.trim()) routeErrors.start = 'Start Point cannot be empty'
//       if (!route.end.trim()) routeErrors.end = 'End Point cannot be empty'
//       if (Object.keys(routeErrors).length > 0) {
//         newErrors[route.id] = routeErrors
//       }
//     })
    
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//     } else {
//       try {
//         setLoading(true)
//         setShowDriverModal(true)
//         await axios.post(`${Src}/api/routes`, routes)
       
//         setLoading(false) 
     
//         setModalStatus({ success: true, message: 'Saved successfully.' });
            
       
       
//       } catch (error) {
//         console.error('Error saving routes:', error)
//         setModalStatus({ success: false, message: 'Failed to save routes.' });

//         setLoading(false)
//       }
//       finally{
//         setLoading(false)
//       }
//     }
//   }

//   const closeDeleteModal = () => {
//     // setIsDeleteModalOpen(false);
//     // setDriverToDelete(null);
//     setShowDriverModal(false)
//     setModalStatus(null); 
  

  
  

   
// };

//   return (
//     <>
//     <h1>View / Update the routes</h1>
//     <div className="newRoute-bus-route-manager">
//       <div className="newRoute-table-container">
//         <table className="newRoute-table">
//           <thead className="newRoute-desktop-only">
//             <tr>
//               <th className='abc'>Bus No</th>
//               <th>Departure</th>
//               <th>Arrival</th>
//               <th>Start</th>
//               <th>End</th>
//               <th>Route</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//       {Array.isArray(routes) && routes.length > 0 ? (
//           <tbody >
//             {routes.map((route) => (
//               <tr key={route.id} className="newRoute-table-row">
                
//                   <div className="newRoute-mobile-row">
//                     <div className="newRoute-mobile-time-container">
//                       <input
//                         type="time"
//                         value={route.departureTime}
//                         onChange={(e) => updateRoute(route.id, 'departureTime', e.target.value)}
//                         className={`newRoute-time-input ${errors[route.id]?.departureTime ? 'newRoute-error' : ''}`}
//                         aria-label="Departure Time"
//                       />
//                       <span className="newRoute-mobile-time-separator">-</span>
//                       <input
//                         type="time"
//                         value={route.arrivalTime}
//                         onChange={(e) => updateRoute(route.id, 'arrivalTime', e.target.value)}
//                         className={`newRoute-time-input ${errors[route.id]?.arrivalTime ? 'newRoute-error' : ''}`}
//                         aria-label="Arrival Time"
//                       />
//                     </div>
//                     <div className="newRoute-mobile-bus-delete">
//                       <input
//                         type="text"
//                         value={route.busNo}
//                         onChange={(e) => updateRoute(route.id, 'busNo', e.target.value)}
//                         placeholder="Bus No"
//                         className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
//                       />
//                       <button onClick={() => deleteRow(route.id)} className="newRoute-icon-button newRoute-delete-btn" aria-label="Delete">
//                         <FaTrash />
//                       </button>
//                     </div>
//                     <div className="newRoute-mobile-bus-delete">
//                       <input
//                         type="text"
//                         value={route.start}
//                         onChange={(e) => updateRoute(route.id, 'start', e.target.value)}
//                         placeholder="start"
//                         className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
//                       />
//                       ➡️
//                       <input
//                         type="text"
//                         value={route.end}
//                         onChange={(e) => updateRoute(route.id, 'end', e.target.value)}
//                         placeholder="end"
//                         className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
//                       />
                    
//                     </div>
//                     <textarea
//                       value={route.route}
//                       onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
//                       placeholder="Route"
//                       className={`newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
//                       rows="1"
//                     />
//                   <hr id="abc2"></hr>
//                   </div>
                
//                 <td className="newRoute-desktop-only">
//                   <input
//                     type="text"
//                     value={route.busNo}
//                     onChange={(e) => updateRoute(route.id, 'busNo', e.target.value)}
//                     placeholder="Bus No"
//                     className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' :""}`}
//                   />
//                 </td>
//                 <td className="newRoute-desktop-only">
//                   <input
//                     type="time"
//                     value={route.departureTime}
//                     onChange={(e) => updateRoute(route.id, 'departureTime', e.target.value)}
//                     className={`newRoute-input ${errors[route.id]?.departureTime ? 'newRoute-error' : ''}`}
//                   />
//                 </td>
//                 <td className="newRoute-desktop-only">
//                   <input
//                     type="time"
//                     value={route.arrivalTime}
//                     onChange={(e) => updateRoute(route.id, 'arrivalTime', e.target.value)}
//                     className={`newRoute-input ${errors[route.id]?.arrivalTime ? 'newRoute-error' : ''}`}
//                   />
//                 </td>

  

//                 <td className="newRoute-desktop-only">
//                   <input
//                     type="text"
//                     value={route.start}
//                     onChange={(e) => updateRoute(route.id, 'start', e.target.value)}
//                     placeholder="start"
//                     className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.start ? 'newRoute-error' :""}`}
//                   />
//                 </td><td className="newRoute-desktop-only">
//                   <input
//                     type="text"
//                     value={route.end}
//                     onChange={(e) => updateRoute(route.id, 'end', e.target.value)}
//                     placeholder="end"
//                     className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.end ? 'newRoute-error' :""}`}
//                   />
//                 </td>
                
//                 <td className="newRoute-desktop-only">
//                   <textarea
//                     value={route.route}
//                     onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
//                     placeholder="Route"
//                     className={`newRoute-input newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
//                     rows="1"
//                   />
//                 </td>
                
//                 <td className="newRoute-desktop-only">
//                   <button onClick={() => deleteRow(route.id)} className="newRoute-icon-button newRoute-delete-btn" aria-label="Delete">
//                     <FaTrash />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         ) : (
//           <p id="p-tag">No routes available</p>
//         )}
//         </table>
//       </div>
//       <div className="newRoute-button-container">
//         <button onClick={addRow} className="newRoute-icon-button newRoute-add-btn">
//           <FaPlus />
//           <span>Add Route</span>
//         </button>
//         <button onClick={saveRoutes} className="newRoute-icon-button newRoute-save-btn">
//           <FaSave />
//           <span>Save Routes</span>
//         </button>
//       </div>
//       {showDriverModal && (
//             <div className="driver-update-modal" onClick={closeDeleteModal}>
//                 <div className="driver-update-modal-content" onClick={e => e.stopPropagation()}>
//               {loading ? (
//                 <>
//                   <h3>Saving Routes</h3>
//                   <div className="loader"></div>
//                 </>
//               ) : (
//                 <div className={`modal-status ${modalStatus.success ? 'success' : 'failure'}`}>
//                   {modalStatus?.success ? (
//                     <>
//                       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
//                         <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
//                         <path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
//                       </svg>
//                       <p>{modalStatus?.message}</p>
//                     </>
//                   ) : (
//                     <>
//                       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
//                         <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
//                         <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
//                         <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
//                       </svg>
//                       <p>{modalStatus?.message}</p>
//                     </>
//                   )}
//                   <button className="editDeleteOkButton" onClick={closeDeleteModal}>OK</button>
//                 </div>
//               )}
                
                       
                    
//                 </div>
//             </div>
//         )}
   
//     </div>
//     </>
//   )
// }

// export default BusRouteManager;

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaPlus, FaSave } from 'react-icons/fa'
import './Route.css'
function TimeDropdown({ value, onChange }) {
  // Generate hours from 1 to 12
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  
  // Generate minutes from 00 to 59
  const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
  
  // Parse existing value or set default
  const parseTime = (timeString) => {
    // Handle various input formats
    const match = timeString.match(/(\d{1,2}):?(\d{0,2})\s*(\w+)/);
    if (match) {
      const hour = match[1].padStart(2, '0');
      const minute = (match[2] || '00').padStart(2, '0');
      const period = match[3].toUpperCase();
      return { hour, minute, period };
    }
    // Fallback to default
    return { hour: '01', minute: '00', period: 'AM' };
  };

  const parsedTime = parseTime(value || '01:00 AM');
  
  const [selectedHour, setSelectedHour] = useState(parsedTime.hour);
  const [selectedMinute, setSelectedMinute] = useState(parsedTime.minute);
  const [selectedPeriod, setSelectedPeriod] = useState(parsedTime.period);

  // Handle change for each dropdown
  const handleChange = (hour, minute, period) => {
    const timeString = `${hour}:${minute} ${period}`;
    setSelectedHour(hour);
    setSelectedMinute(minute);
    setSelectedPeriod(period);
    onChange(timeString);
  };

  return (
    <div style={{ display: 'flex', gap: '1px', alignItems: 'center' }}>
      {/* Hours Dropdown */}
      <select 
        value={selectedHour} 
        onChange={(e) => handleChange(e.target.value, selectedMinute, selectedPeriod)}
        className={`newRoute-time-input`}
                        aria-label="Departure Time"
      >
        {hours.map(hour => (
          <option key={hour} value={hour}>{hour}</option>
        ))}
      </select>

      {/* Minutes Dropdown */}:
      <select 
        value={selectedMinute}
        onChange={(e) => handleChange(selectedHour, e.target.value, selectedPeriod)}
        className={`newRoute-time-input`}
                        aria-label="Arrival Time"
      >
        {minutes.map(minute => (
          <option key={minute} value={minute}>{minute}</option>
        ))}
      </select>

      {/* AM/PM Dropdown */}:
      <select 
        value={selectedPeriod}
        onChange={(e) => handleChange(selectedHour, selectedMinute, e.target.value)}
        className={`newRoute-time-input`}
                        aria-label="AM/PM"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
    </div>
  );
}
const Src = import.meta.env.VITE_Src;

function BusRouteManager() {
  const [routes, setRoutes] = useState([])
  const [errors, setErrors] = useState({})
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [modalStatus, setModalStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`${Src}/api/routes`)
      setRoutes(Array.isArray(response.data.data) ? response.data.data : [])
    } catch (error) {
      console.error('Error fetching routes:', error)
      setRoutes([])
    }
  }

  const addRow = () => {
    const newId = Math.max(...routes.map(route => route.id || 0), 0) + 1
    setRoutes([...routes, { 
      id: newId, 
      busNo: '', 
      departureTime: '07:00 AM', 
      arrivalTime: '08:00 AM', 
      route: '',
      start:'',
      end:'' 
    }])
  }

  const deleteRow = (id) => {
    setRoutes(routes.filter(route => route.id !== id))
  }

  const updateRoute = (id, field, value) => {
    setRoutes(routes.map(route =>
      route.id === id ? { ...route, [field]: value } : route
    ))
    validateField(id, field, value)
  }

  const validateField = (id, field, value) => {
    if (!value.trim()) {
      setErrors(prev => ({ 
        ...prev, 
        [id]: { 
          ...prev[id], 
          [field]: 'This field cannot be empty' 
        } 
      }))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        if (newErrors[id]) {
          delete newErrors[id][field]
          if (Object.keys(newErrors[id]).length === 0) {
            delete newErrors[id]
          }
        }
        return newErrors
      })
    }
  }

  const saveRoutes = async () => {
    const newErrors = {}
    routes.forEach(route => {
      const routeErrors = {}
      if (!route?.busNo) routeErrors.busNo = 'Bus number cannot be empty'
      if (!route?.route) routeErrors.route = 'Route cannot be empty'
      if (!route?.start) routeErrors.start = 'Start Point cannot be empty'
      if (!route?.end) routeErrors.end = 'End Point cannot be empty'
      
      if (Object.keys(routeErrors).length > 0) {
        newErrors[route.id] = routeErrors
      }
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      try {
        setLoading(true)
        setShowDriverModal(true)
        await axios.post(`${Src}/api/routes`, routes)
        
        setModalStatus({ success: true, message: 'Saved successfully.' });
      } catch (error) {
        console.error('Error saving routes:', error)
        setModalStatus({ success: false, message: 'Failed to save routes.' });
      } finally {
        setLoading(false)
      }
    }
  }

  const closeDeleteModal = () => {
    setShowDriverModal(false)
    setModalStatus(null)
  }

  return (
    <>
    <h1>View / Update the routes</h1>
    <div className="newRoute-bus-route-manager">
      <div className="newRoute-table-container">
        <table className="newRoute-table">
          <thead className="newRoute-desktop-only">
            <tr>
              <th className='abc'>Bus No</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Start</th>
              <th>End</th>
              <th>Route</th>
              <th>Action</th>
            </tr>
          </thead>
        {Array.isArray(routes) && routes.length > 0 ? (
          <tbody >
            {routes.map((route) => (
              <tr key={route.id} className="newRoute-table-row">
                
                  <div className="newRoute-mobile-row">
                    <div className="newRoute-mobile-time-container">
                     
                      <TimeDropdown 
                      value={route.departureTime} 
                      onChange={(time) => updateRoute(route.id, 'departureTime', time)}
                      className={`newRoute-time-input ${errors[route.id]?.arrivalTime ? 'newRoute-error' : ''}`}
                        aria-label="Arrival Time"
                    />
                      <span className="newRoute-mobile-time-separator">-</span>
                     
                      <TimeDropdown 
                      value={route.arrivalTime} 
                      onChange={(time) => updateRoute(route.id, 'arrivalTime', time)}
                      className={`newRoute-time-input ${errors[route.id]?.arrivalTime ? 'newRoute-error' : ''}`}
                        aria-label="Arrival Time"
                    />

                
                    </div>
                    <div className="newRoute-mobile-bus-delete">
                      <input
                        type="text"
                        value={route.busNo}
                        onChange={(e) => updateRoute(route.id, 'busNo', e.target.value)}
                        placeholder="Bus No"
                        className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
                      />
                      <button onClick={() => deleteRow(route.id)} className="newRoute-icon-button newRoute-delete-btn" aria-label="Delete">
                        <FaTrash />
                      </button>
                    </div>
                    <div className="newRoute-mobile-bus-delete">
                      <input
                        type="text"
                        value={route.start}
                        onChange={(e) => updateRoute(route.id, 'start', e.target.value)}
                        placeholder="start"
                        className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
                      />
                      ➡️
                      <input
                        type="text"
                        value={route.end}
                        onChange={(e) => updateRoute(route.id, 'end', e.target.value)}
                        placeholder="end"
                        className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
                      />
                    
                    </div>
                    <textarea
                      value={route.route}
                      onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
                      placeholder="Route"
                      className={`newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
                      rows="1"
                    />
                  <hr id="abc2"></hr>
                  </div>
                
                <td className="newRoute-desktop-only">
                  <input
                    type="text"
                    value={route.busNo}
                    onChange={(e) => updateRoute(route.id, 'busNo', e.target.value)}
                    placeholder="Bus No"
                    className={`newRoute-bus-no-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' :""}`}
                  />
                </td>
                <td className="newRoute-desktop-only">
                    <TimeDropdown 
                      value={route.departureTime} 
                      onChange={(time) => updateRoute(route.id, 'departureTime', time)}
                    />
                  </td>
                  <td className="newRoute-desktop-only">
                    <TimeDropdown 
                      value={route.arrivalTime} 
                      onChange={(time) => updateRoute(route.id, 'arrivalTime', time)}
                    />
                  </td>

  

                <td className="newRoute-desktop-only">
                  <input
                    type="text"
                    value={route.start}
                    onChange={(e) => updateRoute(route.id, 'start', e.target.value)}
                    placeholder="start"
                    className={`newRoute-bus-no-input newRoute-small-input wd ${errors[route.id]?.start ? 'newRoute-error' :""}`}
                  />
                </td><td className="newRoute-desktop-only">
                  <input
                    type="text"
                    value={route.end}
                    onChange={(e) => updateRoute(route.id, 'end', e.target.value)}
                    placeholder="end"
                    className={`newRoute-bus-no-input newRoute-small-input wd ${errors[route.id]?.end ? 'newRoute-error' :""}`}
                  />
                </td>
                
                <td className="newRoute-desktop-only">
                  <textarea
                    value={route.route}
                    onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
                    placeholder="Route"
                    className={`newRoute-input newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
                    rows="1"
                  />
                </td>
                
                <td className="newRoute-desktop-only">
                  <button onClick={() => deleteRow(route.id)} className="newRoute-icon-button newRoute-delete-btn" aria-label="Delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <p id="p-tag">No routes available</p>
        )}
        </table>
      </div>
      <div className="newRoute-button-container">
        <button onClick={addRow} className="newRoute-icon-button newRoute-add-btn">
          <FaPlus />
          <span>Add Route</span>
        </button>
        <button onClick={saveRoutes} className="newRoute-icon-button newRoute-save-btn">
          <FaSave />
          <span>Save Routes</span>
        </button>
      </div>
      {showDriverModal && (
            <div className="driver-update-modal" onClick={closeDeleteModal}>
                <div className="driver-update-modal-content" onClick={e => e.stopPropagation()}>
              {loading ? (
                <>
                  <h3>Saving Routes</h3>
                  <div className="loader"></div>
                </>
              ) : (
                <div className={`modal-status ${modalStatus.success ? 'success' : 'failure'}`}>
                  {modalStatus?.success ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#4caf50" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                        <path fill="#ccff90" d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"></path>
                      </svg>
                      <p>{modalStatus?.message}</p>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
                        <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
                        <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
                      </svg>
                      <p>{modalStatus?.message}</p>
                    </>
                  )}
                  <button className="editDeleteOkButton" onClick={closeDeleteModal}>OK</button>
                </div>
              )}
                
                       
                    
                </div>
            </div>
        )}
   
    </div>
    </>
  )
}

export default BusRouteManager;
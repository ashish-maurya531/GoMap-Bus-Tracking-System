// import '../App.css';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// const Src = import.meta.env.VITE_Src;



// function RoutesComponent () {
//   let [route1, setRoute1] = useState("");



//     const route = async () => {
//         setRoute1(route1);

//         try {
//             const response = await axios.get(`${Src}/route`);
//             // console.log((response.data.data));
//             var location = response?.data?.data;
//             setRoute1(location);

//             // alert("New route added");
//         } catch (err) {
//             console.log(err)
//         }
//     }

//     useEffect(() => {
//         route()
//     }
//         , [])



//     const route_update = async () => {

//         try {
//             const updated_routes=document.getElementById("route-textarea-update").value;
           
//             const response = await axios.post(`${Src}/route`, { route: updated_routes,})
           
//             setRoute1(updated_routes);
//             toast.success('Routes Updated Successfuly', {});

            
            
           
//         }catch(err) {
//             console.log(err)
//         };
//         }

        

// // console.log("route1", route1)

// return (
//     <>
//     <h1>View / Update the routes</h1>
//     <div className="route-container">
//         <div>
//             <textarea 
//             value={route1}
//             className="route-textarea" id="route-textarea-update"
//             onChange={
//                 (e) => setRoute1(e.target.value)
//             }
//             spellcheck="false" contenteditable='true'>
                
//             </textarea>
//         </div>
//         <button onClick={()=>{route_update();}}>Save</button>
//         <button onClick={() => {route();}}>Refresh</button>
//     </div>
//     <ToastContainer 
//     position="top-center"
//     autoClose={1000}
//     theme="dark"/>
//     </>

// )
// }

// export default RoutesComponent




// import { useState } from 'react'
// import { FaTrash, FaPlus, FaSave } from 'react-icons/fa'
// import './Route.css'

// const initialRoutes = [
//   { id: 1, busNo: '1504', departureTime: '08:00', arrivalTime: '09:00', route: 'City Center to Suburb A' },
//   { id: 2, busNo: '2301', departureTime: '09:30', arrivalTime: '10:45', route: 'Suburb B to Downtown' },
//   { id: 3, busNo: '3102', departureTime: '11:15', arrivalTime: '12:30', route: 'Airport to City Center' },
// ]

// function BusRouteManager() {
//   const [routes, setRoutes] = useState(initialRoutes)
//   const [errors, setErrors] = useState({})

//   const addRow = () => {
//     const newId = Math.max(...routes.map(route => route.id)) + 1
//     setRoutes([...routes, { id: newId, busNo: '', departureTime: '', arrivalTime: '', route: '' }])
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

//   const saveRoutes = () => {
//     const newErrors = {}
//     routes.forEach(route => {
//       const routeErrors = {}
//       if (!route.busNo.trim()) routeErrors.busNo = 'Bus number cannot be empty'
//       if (!route.departureTime) routeErrors.departureTime = 'Departure time cannot be empty'
//       if (!route.arrivalTime) routeErrors.arrivalTime = 'Arrival time cannot be empty'
//       if (!route.route.trim()) routeErrors.route = 'Route cannot be empty'
//       if (Object.keys(routeErrors).length > 0) {
//         newErrors[route.id] = routeErrors
//       }
//     })

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//       alert('Please fill in all fields before saving')
//     } else {
//       console.log('Saving routes:', routes)
//       alert('Routes saved successfully (check console for details)')
//     }
//   }

//   return (
//     <div className="newRoute-bus-route-manager">
//       <div className="newRoute-table-container">
//         <table className="newRoute-table">
//           <thead className="newRoute-desktop-only">
//             <tr>
//               <th>Departure</th>
//               <th>Arrival</th>
//               <th>Bus No</th>
//               <th>Route</th>
             
//             </tr>
//           </thead>
//           <tbody>
//             {routes.map((route) => (
//               <tr key={route.id} className="newRoute-table-row">
//                 {/* <td className=""> */}
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
//                         className={`newRoute-bus-no-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
//                       />
//                       <button onClick={() => deleteRow(route.id)} className="newRoute-icon-button newRoute-delete-btn" aria-label="Delete">
//                         <FaTrash />
//                       </button>
//                     </div>
//                     <textarea
//                       value={route.route}
//                       onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
//                       placeholder="Route"
//                       className={`newRoute-route-input ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
//                       rows="2"
//                     />
//                     <hr></hr>
//                   </div>
              
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
//                     value={route.busNo}
//                     onChange={(e) => updateRoute(route.id, 'busNo', e.target.value)}
//                     placeholder="Bus No"
//                     className={`newRoute-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
//                   />
//                 </td>
//                 <td className="newRoute-desktop-only">
//                   <textarea
//                     value={route.route}
//                     onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
//                     placeholder="Route"
//                     className={`newRoute-input newRoute-route-input ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
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
//     </div>
//   )
// }

// export default BusRouteManager





// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { FaTrash, FaPlus, FaSave } from 'react-icons/fa'
// import './Route.css'

// function BusRouteManager() {
//   const [routes, setRoutes] = useState([])
//   const [errors, setErrors] = useState({})

//   useEffect(() => {
//     fetchRoutes()
//   }, [])

//   const fetchRoutes = async () => {
//     try {
//       const response = await axios.get('/api/routes')
//       setRoutes(response.data)
//     } catch (error) {
//       console.error('Error fetching routes:', error)
//     }
//   }

//   const addRow = () => {
//     const newId = Math.max(...routes.map(route => route.id), 0) + 1
//     setRoutes([...routes, { id: newId, busNo: '', departureTime: '', arrivalTime: '', route: '' }])
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
//       if (Object.keys(routeErrors).length > 0) {
//         newErrors[route.id] = routeErrors
//       }
//     })

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors)
//       alert('Please fill in all fields before saving')
//     } else {
//       try {
//         await axios.post('/api/routes', routes)
//         alert('Routes saved successfully')
//       } catch (error) {
//         console.error('Error saving routes:', error)
//         alert('Failed to save routes')
//       }
//     }
//   }

//   return (
//     <div className="newRoute-bus-route-manager">
//       <div className="newRoute-table-container">
//         <table className="newRoute-table">
//           <thead className="newRoute-desktop-only">
//             <tr>
//               <th>Bus No</th>
//               <th>Departure</th>
//               <th>Arrival</th>
//               <th>Route</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {routes.map((route) => (
//               <tr key={route.id} className="newRoute-table-row">
//                 <td className="newRoute-mobile-full-width">
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
//                     <textarea
//                       value={route.route}
//                       onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
//                       placeholder="Route"
//                       className={`newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
//                       rows="2"
//                     />
//                   </div>
//                 </td>
//                 <td className="newRoute-desktop-only">
//                   <input
//                     type="text"
//                     value={route.busNo}
//                     onChange={(e) => updateRoute(route.id, 'busNo', e.target.value)}
//                     placeholder="Bus No"
//                     className={`newRoute-input newRoute-small-input ${errors[route.id]?.busNo ? 'newRoute-error' : ''}`}
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
//                   <textarea
//                     value={route.route}
//                     onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
//                     placeholder="Route"
//                     className={`newRoute-input newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
//                     rows="2"
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
//     </div>
//   )
// }

// export default BusRouteManager







import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaPlus, FaSave } from 'react-icons/fa'
import './Route.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Src = import.meta.env.VITE_Src;

function BusRouteManager() {
  const [routes, setRoutes] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    fetchRoutes()
  }, [])

  const fetchRoutes = async () => {
    try {
      const response = await axios.get(`${Src}/api/routes`)
      console.log(response?.data?.data)
      setRoutes(Array.isArray(response.data.data)? response.data.data : [])
      console.log("-----"+routes)
    } catch (error) {
      console.error('Error fetching routes:', error)
      setRoutes([]) // Set to empty array if fetch fails
    }
  }
  

  const addRow = () => {
    const newId = Math.max(...routes.map(route => route.id || 0), 0) + 1
    setRoutes([...routes, { id: newId, busNo: '', departureTime: '', arrivalTime: '', route: '' }])
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
      setErrors(prev => ({ ...prev, [id]: { ...prev[id], [field]: 'This field cannot be empty' } }))
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
      if (!route.busNo.trim()) routeErrors.busNo = 'Bus number cannot be empty'
      if (!route.departureTime) routeErrors.departureTime = 'Departure time cannot be empty'
      if (!route.arrivalTime) routeErrors.arrivalTime = 'Arrival time cannot be empty'
      if (!route.route.trim()) routeErrors.route = 'Route cannot be empty'
      if (Object.keys(routeErrors).length > 0) {
        newErrors[route.id] = routeErrors
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      toast.info('Please fill in all fields before saving')
    } else {
      try {
        await axios.post(`${Src}/api/routes`, routes)
        toast.success('Routes saved successfully')
      } catch (error) {
        console.error('Error saving routes:', error)
        toast.error('Failed to save routes')
      }
    }
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
                      <input
                        type="time"
                        value={route.departureTime}
                        onChange={(e) => updateRoute(route.id, 'departureTime', e.target.value)}
                        className={`newRoute-time-input ${errors[route.id]?.departureTime ? 'newRoute-error' : ''}`}
                        aria-label="Departure Time"
                      />
                      <span className="newRoute-mobile-time-separator">-</span>
                      <input
                        type="time"
                        value={route.arrivalTime}
                        onChange={(e) => updateRoute(route.id, 'arrivalTime', e.target.value)}
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
                    <textarea
                      value={route.route}
                      onChange={(e) => updateRoute(route.id, 'route', e.target.value)}
                      placeholder="Route"
                      className={`newRoute-route-input newRoute-no-resize ${errors[route.id]?.route ? 'newRoute-error' : ''}`}
                      rows="12"
                    />
                  </div>
                  <hr id="abc2"></hr>
                
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
                  <input
                    type="time"
                    value={route.departureTime}
                    onChange={(e) => updateRoute(route.id, 'departureTime', e.target.value)}
                    className={`newRoute-input ${errors[route.id]?.departureTime ? 'newRoute-error' : ''}`}
                  />
                </td>
                <td className="newRoute-desktop-only">
                  <input
                    type="time"
                    value={route.arrivalTime}
                    onChange={(e) => updateRoute(route.id, 'arrivalTime', e.target.value)}
                    className={`newRoute-input ${errors[route.id]?.arrivalTime ? 'newRoute-error' : ''}`}
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
          <p>No routes available</p>
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
      <ToastContainer 
    position="top-center"
    autoClose={1000}
    theme="dark"/>
    </div>
    </>
  )
}

export default BusRouteManager;


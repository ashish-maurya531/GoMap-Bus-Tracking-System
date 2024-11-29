import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaTrash, FaPlus, FaSave } from 'react-icons/fa'
import './Route.css'

const Src = import.meta.env.VITE_Src;

function BusRouteManager() {
  const [routes, setRoutes] = useState([])
  const [errors, setErrors] = useState({})
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [modalStatus, setModalStatus] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for delete/edit actions



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
    } else {
      try {
        setLoading(true)
        setShowDriverModal(true)
        await axios.post(`${Src}/api/routes`, routes)
       
        setLoading(false) 
     
        setModalStatus({ success: true, message: 'Saved successfully.' });
            
       
       
      } catch (error) {
        console.error('Error saving routes:', error)
        setModalStatus({ success: false, message: 'Failed to save routes.' });

        setLoading(false)
      }
      finally{
        setLoading(false)
      }
    }
  }

  const closeDeleteModal = () => {
    // setIsDeleteModalOpen(false);
    // setDriverToDelete(null);
    setShowDriverModal(false)
    setModalStatus(null); 
};

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


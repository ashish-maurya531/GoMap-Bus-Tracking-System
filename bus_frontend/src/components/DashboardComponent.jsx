// import '../App.css';
// import React from 'react';
// import axios from 'axios';
// //test
// import { useState, useRef, useEffect } from "react";
// import { Map as MapLibreMap, NavigationControl, Marker, Popup } from "maplibre-gl";
// import "maplibre-gl/dist/maplibre-gl.css";
// function DashboardComponent () {

    


//     const [mapReady, setMapReady] = useState(false);
//     const [driverloc,setdriverloc]= useState("");
//     const markerRef = useRef(null); // Reference to the Marker instance

//     //api data fetching

//     const getdata=async()=>{
//         try{
//             console.log("fgg");
//              const response = await axios.get('http://localhost:5000/runningBuses');
//             setdriverloc(response.data.data);
//             console.log(driverloc);
//         }
//         catch(err){
//             console.log(err)
//         }
//     }

    

//     useEffect(() => {
//         if (!mapReady) return;
        
//         const map = new MapLibreMap({
//             container: "central-map",
//             center: [79.43612420499357, 28.475825009410213],
//             zoom: 14,
//             style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
//             transformRequest: (url, resourceType) => {
//                 url = url.replace("app.olamaps.io", "api.olamaps.io");
//                 if (url.includes("?")) {
//                     url += "&api_key=qtNESxzjJDR3bbdkxPf1yTvojeOJcFL9T5KW9a42";
//                 } else {
//                     url += "?api_key=qtNESxzjJDR3bbdkxPf1yTvojeOJcFL9T5KW9a42";
//                 }
//                 return { url, resourceType };
//             },
//         });
    
//         const nav = new NavigationControl({
//             visualizePitch: false,
//             showCompass: true,
//         });
//         map.addControl(nav, "top-right");
    
//         map.on('style.load', () => {
//             // Central marker
//             const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText("SRMS COLLEGE");
//             markerRef.current = new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup).addTo(map).togglePopup();
    
//             // Marker coordinates
//             const markerCoordinates = [
//                 { coords: [79.42612, 28.48583], name: '1501' },
//                 { coords: [79.44700, 28.47090], name: '1502' },
//                 { coords: [79.45550, 28.47610], name: '1503' },
//                 { coords: [79.43800, 28.46450], name: '1504' },
//                 { coords: [79.42550, 28.47400], name: '1505' },
//                 { coords: [79.45750, 28.48100], name: '1506' },
//                 { coords: [79.42850, 28.49000], name: '1507' },
//                 { coords: [79.44500, 28.47850], name: '1508' },
         
//                 { coords: [79.42500, 28.46010], name: '1510' },
//                 { coords: [79.44250, 28.48500], name: '1511' },
//                 { coords: [79.45000, 28.45000], name: '1512' },
//             ];
    
//             // Function to draw a line from the center marker to a given bus marker
//             function drawLine(map, startCoords, endCoords) {
//                 const line = [
//                     [startCoords[0], startCoords[1]],
//                     [endCoords[0], endCoords[1]],
//                 ];
    
//                 map.addSource(`line-${endCoords[0]}-${endCoords[1]}`, {
//                     'type': 'geojson',
//                     'data': {
//                         'type': 'Feature',
//                         'geometry': {
//                             'type': 'LineString',
//                             'coordinates': line,
//                         },
//                     },
//                 });
    
//                 map.addLayer({
//                     'id': `line-${endCoords[0]}-${endCoords[1]}`,
//                     'type': 'line',
//                     'source': `line-${endCoords[0]}-${endCoords[1]}`,
//                     'layout': {
//                         'line-join': 'round',
//                         'line-cap': 'round',
//                     },
//                     'paint': {
//                         'line-color': '#888',
//                         'line-width': 2,
//                     },
//                 });
//             }
    
//             // Loop through coordinates and add markers
//             markerCoordinates.forEach((coord) => {
//                 const popup = new Popup({ offset: 23, color:"#555",closeButton: false, closeOnClick: false }).setText(coord.name);
//                 const marker = new Marker().setLngLat(coord.coords).setPopup(popup).addTo(map);
//                 marker.togglePopup(); // Show the popup immediately
    
//                 // Draw a line from the central marker to this bus marker
//                 drawLine(map, [79.43612420499357, 28.475825009410213], coord.coords);
//             });
//         });
    
//     }, [mapReady]);
    








// return (
//         <main className='main-container'>
       
//         <div className='main-title'>
//             <h3>DASHBOARD</h3>
//         </div>

//         <div className='main-cards'>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>Bus</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>3/50</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>Driver</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>4/24</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>Notice</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>33</h1>
//             </div>
//             <div className='card'>
//                 <div className='card-inner'>
//                     <h3>ALERTS</h3>
//                     <span className="material-symbols-outlined">dashboard</span>
//                 </div>
//                 <h1>42</h1>
//             </div>
//         </div>
//         <hr></hr>
//         <div className="map-container">
           
//         <div style={{ width: "100%", height: "54vh", overflow: "hidden" }} ref={() => setMapReady(true)} id="central-map"></div>
//         </div>
//         <hr></hr>

      

//     </main>
// )
// }

// export default DashboardComponent



// import '../App.css';
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';

// function DashboardComponent() {
//     const [mapReady, setMapReady] = useState(false);
//     const [driverLoc, setDriverLoc] = useState([]);
//     const [busesCount, setBusesCount] = useState(0);
//     const [driversCount, setDriversCount] = useState(0);
//     const [showDriverModal, setShowDriverModal] = useState(false);
//     const [showNoticeModal, setShowNoticeModal] = useState(false);
//     const [showAlertModal, setShowAlertModal] = useState(false);
//     const markerRef = useRef(null); // Reference to the Marker instance

//     // API data fetching every 10 seconds
//     const getdata = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/runningBuses');
//             const data = response.data.data;
//             setDriverLoc(data);
//             setBusesCount(data.length);
//             setDriversCount(new Set(data.map(bus => bus.driver_id)).size); // Count unique drivers
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getdata();
//         const interval = setInterval(() => getdata(), 100000); // Fetch every 10 seconds
//         return () => clearInterval(interval); // Clean up interval on component unmount
//     }, []);

//     useEffect(() => {
//         if (!mapReady) return;

//         const map = new MapLibreMap({
//             container: 'central-map',
//             center: [79.43612420499357, 28.475825009410213],
//             zoom: 14,
//             style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
//             transformRequest: (url, resourceType) => {
//                 url = url.replace('app.olamaps.io', 'api.olamaps.io');
//                 url += url.includes('?') ? '&api_key=qtNESxzjJDR3bbdkxPf1yTvojeOJcFL9T5KW9a42' : '?api_key=qtNESxzjJDR3bbdkxPf1yTvojeOJcFL9T5KW9a42';
//                 return { url, resourceType };
//             }
//         });

//         const nav = new NavigationControl({ visualizePitch: false, showCompass: true });
//         map.addControl(nav, 'top-right');

//         map.on('style.load', () => {
//             const popup = new Popup({ offset: 23,closeButton: false, closeOnClick: false }).setText('SRMS COLLEGE');
//             markerRef.current = new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup).addTo(map).togglePopup();

//             driverLoc.forEach((bus) => {
//                 const popup = new Popup({ offset: 23, color: "#555", closeButton: false, closeOnClick: false }).setText(`Bus: ${bus.busno}, Driver: ${bus.driver_id}`);
//                 const marker = new Marker().setLngLat([parseFloat(bus.lon), parseFloat(bus.lat)]).setPopup(popup).addTo(map);
//                 marker.togglePopup();
//             });
//         });
//     }, [mapReady, driverLoc]);

//     const toggleModal = (modalType) => {
//         if (modalType === 'driver') setShowDriverModal(!showDriverModal);
//         if (modalType === 'notice') setShowNoticeModal(!showNoticeModal);
//         if (modalType === 'alert') setShowAlertModal(!showAlertModal);
//     };

//     return (
//         <main className='main-container'>
//             <div className='main-title'>
//                 <h3>DASHBOARD</h3>
//             </div>

//             <div className='main-cards'>
//                 <div className='card' >
//                     <div className='card-inner'>
//                         <h3>Bus</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{busesCount}/50</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('driver')}>
//                     <div className='card-inner'>
//                         <h3>Driver</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{driversCount}/24</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('notice')}>
//                     <div className='card-inner'>
//                         <h3>Notice</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>33</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('alert')}>
//                     <div className='card-inner'>
//                         <h3>ALERTS</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>42</h1>
//                 </div>
//             </div>

//             <hr />

//             <div className="map-container">
//                 <div style={{ width: "100%", height: "54vh", overflow: "hidden" }} ref={() => setMapReady(true)} id="central-map"></div>
//             </div>

//             <hr />

//             {/* Driver Modal */}
//             {showDriverModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('driver')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('driver')}>×</button>
//                         <h2>Driver Details</h2>
//                         <ul>
//                             {driverLoc.map((bus) => (
//                                 <li key={bus.driver_id}>Driver ID: {bus.driver_id}, Bus No: {bus.busno}, Name: ABC</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             {/* Notice Modal */}
//             {showNoticeModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('notice')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('notice')}>×</button>
//                         <h2>Notice Board</h2>
//                         <button>Upload Notice</button>
//                     </div>
//                 </div>
//             )}

//             {/* Alert Modal */}
//             {showAlertModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('alert')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('alert')}>×</button>
//                         <h2>Alerts</h2>
//                         <button>Upload Alert</button>
//                     </div>
//                 </div>
//             )}
//         </main>
//     );
// }

// export default DashboardComponent;






// import '../App.css';
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// const apikey=import.meta.env.VITE_ola_ID;
// function DashboardComponent() {
//     const [mapReady, setMapReady] = useState(false);
//     const [driverLoc, setDriverLoc] = useState([]);
//     const [busesCount, setBusesCount] = useState(0);
//     const [driversCount, setDriversCount] = useState(0);
//     const [showDriverModal, setShowDriverModal] = useState(false);
//     const [showNoticeModal, setShowNoticeModal] = useState(false);
//     const [showAlertModal, setShowAlertModal] = useState(false);
//     const [markers, setMarkers] = useState([]);
//     const [lastUpdated, setLastUpdated] = useState("");
//     const mapRef = useRef(null); // Reference to the map instance

//     const getdata = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/runningBuses');
//             const data = response.data.data;
//             setDriverLoc(data);
//             setBusesCount(data.length);
//             setDriversCount(new Set(data.map(bus => bus.driver_id)).size);
//             setLastUpdated(new Date().toLocaleTimeString()); // Update timestamp
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     useEffect(() => {
//         getdata();
//         const interval = setInterval(() => getdata(), 100000);
//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (!mapReady) return;

//         const map = new MapLibreMap({
//             container: 'central-map',
//             center: [79.43612420499357, 28.475825009410213],
//             zoom: 14,
//             style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
//             transformRequest: (url, resourceType) => {
//                 url = url.replace('app.olamaps.io', 'api.olamaps.io');
//                 url += url.includes('?') ? `&api_key=${apikey}` : `?api_key=${apikey}`;
//                 return { url, resourceType };
//             }
//         });
//             function drawLine(map, startCoords, endCoords) {
//                 const line = [
//                     [startCoords[0], startCoords[1]],
//                     [endCoords[0], endCoords[1]],
//                 ];
    
//                 map.addSource(`line-${endCoords[0]}-${endCoords[1]}`, {
//                     'type': 'geojson',
//                     'data': {
//                         'type': 'Feature',
//                         'geometry': {
//                             'type': 'LineString',
//                             'coordinates': line,
//                         },
//                     },
//                 });
    
//                 map.addLayer({
//                     'id': `line-${endCoords[0]}-${endCoords[1]}`,
//                     'type': 'line',
//                     'source': `line-${endCoords[0]}-${endCoords[1]}`,
//                     'layout': {
//                         'line-join': 'round',
//                         'line-cap': 'round',
//                     },
//                     'paint': {
//                         'line-color': '#888',
//                         'line-width': 2,
//                     },
//                 });
//             }
    
//         const nav = new NavigationControl({ visualizePitch: false, showCompass: true });
//         map.addControl(nav, 'top-right');
//         mapRef.current = map;

//         map.on('style.load', () => {
//             const popup1 = new Popup({ offset: 23, color:"#555",closeButton: false, closeOnClick: false }).setText('SRMS COLLEGE');
//             const collegeMarker = new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup1).addTo(map).togglePopup();
            
//             // Function to update markers
//             const updateMarkers = () => {
//                 markers.forEach(marker => marker.remove()); // Remove old markers

//                 const newMarkers = driverLoc.map((bus) => {
//                     const popup2 = new Popup({ offset: 23 }).setText(`${bus.busno}`);
//                     const marker = new Marker().setLngLat([parseFloat(bus.lon), parseFloat(bus.lat)]).setPopup(popup2).addTo(map);
//                     // marker.togglePopup();
                  
                    
//                 });

//                 setMarkers(newMarkers);
//             };

//             updateMarkers(); // Initial marker setup

//             const observer = new MutationObserver(updateMarkers);
//             observer.observe(document.getElementById('central-map'), { childList: true });
//         });
//     }, [mapReady, driverLoc]);

//     // Prevent map from resetting when markers update


//     useEffect(() => {
//         if (!mapRef.current) return;

//         const map = mapRef.current;
//         const center = map.getCenter(); // Get current center
//         const zoom = map.getZoom(); // Get current zoom level

//         markers.forEach(marker => marker.remove()); // Clear existing markers
//         const newMarkers = driverLoc.map((bus) => {
//             const popup3 = new Popup({ offset: 23 ,closeButton: false, closeOnClick: false}).setText(`${bus.busno}`);
//             const marker = new Marker().setLngLat([parseFloat(bus.lon), parseFloat(bus.lat)]).setPopup(popup3).addTo(map);
//             marker.togglePopup();
//             // drawLine(map, [79.43612420499357, 28.475825009410213], bus.coords);
//             return marker;
//         });

//         setMarkers(newMarkers);

//         // Restore the user's view (center and zoom) after marker update
//         map.setCenter(center);
//         map.setZoom(zoom);
//     }, [driverLoc]);

//     const toggleModal = (modalType) => {
//         if (modalType === 'driver') setShowDriverModal(!showDriverModal);
//         if (modalType === 'notice') setShowNoticeModal(!showNoticeModal);
//         if (modalType === 'alert') setShowAlertModal(!showAlertModal);
//     };

//     return (
//         <main className='main-container'>
//             <div className='main-title'>
//                 <h3>DASHBOARD</h3>
//             </div>

//             <div className='main-cards'>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <h3>Bus</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{busesCount}/50</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('driver')}>
//                     <div className='card-inner'>
//                         <h3>Driver</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{driversCount}/24</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('notice')}>
//                     <div className='card-inner'>
//                         <h3>Notice</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>33</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('alert')}>
//                     <div className='card-inner'>
//                         <h3>ALERTS</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>42</h1>
//                 </div>
//             </div>

//             <hr />

//             <div className="map-container">
//                 <div style={{ width: "100%", height: "54vh", overflow: "hidden" }} ref={() => setMapReady(true)} id="central-map"></div>
//                 <div>Last updated: {lastUpdated} (every 10 seconds)</div>
//             </div>

//             <hr />

//             {/* Driver Modal */}
//             {showDriverModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('driver')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('driver')}>×</button>
//                         <h2>Driver Details</h2>
//                         <ul>
//                             {driverLoc.map((bus) => (
//                                 <li key={bus.driver_id}>Driver ID: {bus.driver_id}, Bus No: {bus.busno}, Name: ABC</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             {/* Notice Modal */}
//             {showNoticeModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('notice')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('notice')}>×</button>
//                         <h2>Notice Board</h2>
//                         <button >Upload Notice</button>
//                     </div>
//                 </div>
//             )}

//             {/* Alert Modal */}
//             {showAlertModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('alert')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('alert')}>×</button>
//                         <h2>Alerts</h2>
//                         <button>Upload Alert</button>
//                     </div>
//                 </div>
//             )}
//         </main>
//     );
// }

// export default DashboardComponent;









//this is the code in which map is initlized outside the mane looping function 
// import '../App.css';
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// const apikey=import.meta.env.VITE_ola_ID;
// const clientId = "39ad20b4-c025-46a2-a92f-dad734412939";
// const clientSecret = "rBocmwOObnP28bomwsndt7wva2HGzXV9";
// function DashboardComponent() {
//     const [driverLoc, setDriverLoc] = useState([]);
//     const [busesCount, setBusesCount] = useState(0);
//     const [driversCount, setDriversCount] = useState(0);
//     const [showDriverModal, setShowDriverModal] = useState(false);
//     const [showNoticeModal, setShowNoticeModal] = useState(false);
//     const [showAlertModal, setShowAlertModal] = useState(false);
//     const [lastUpdated, setLastUpdated] = useState("");
//     const mapRef = useRef(null); // Reference for the map instance
//     const markersRef = useRef([]); // To keep track of markers


//     const fetchAccessToken = async () => {
//         try {
//             const response = await axios.post('https://account.olamaps.io/realms/olamaps/protocol/openid-connect/token', 
//                 new URLSearchParams({
//                     grant_type: 'client_credentials',
//                     scope: 'openid',
//                     client_id: clientId,
//                     client_secret: clientSecret,
//                 }), {
//                     headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
//                 }
//             );
//             return response.data.access_token;
//         } catch (err) {
//             console.error("Error fetching access token:", err);
//             return null;
//         }
//     };
//     // API data fetching every 10 seconds
//     const getdata = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/runningBuses');
//             const data = response.data.data;
//             setDriverLoc(data);
//             setBusesCount(data.length);
//             setDriversCount(new Set(data.map(bus => bus.driver_id)).size); // Count unique drivers
//             setLastUpdated(new Date().toLocaleTimeString());
//         } catch (err) {
//             console.log(err);
//         }
//     };




//     ///////////////////////////
//     function drawLine(map, startCoords, endCoords) {
//                         const line = [
//                             [startCoords[0], startCoords[1]],
//                             [endCoords[0], endCoords[1]],
//                         ];
            
//                         map.addSource(`line-${endCoords[0]}-${endCoords[1]}`, {
//                             'type': 'geojson',
//                             'data': {
//                                 'type': 'Feature',
//                                 'geometry': {
//                                     'type': 'LineString',
//                                     'coordinates': line,
//                                 },
//                             },
//                         });
            
//                         map.addLayer({
//                             'id': `line-${endCoords[0]}-${endCoords[1]}`,
//                             'type': 'line',
//                             'source': `line-${endCoords[0]}-${endCoords[1]}`,
//                             'layout': {
//                                 'line-join': 'round',
//                                 'line-cap': 'round',
//                             },
//                             'paint': {
//                                 'line-color': '#888',
//                                 'line-width': 2,
//                             },
//                         });
//                     }
//     ////////////////////////

//     useEffect(() => {
//         getdata();
//         const interval = setInterval(() => getdata(), 10000); 
//         return () => clearInterval(interval); 
//     }, []);

//     // Initialize map only once
//     // useEffect(() => {
//     //     if (mapRef.current) return;
//     //      // Prevent re-initialization

//     //     const map = new MapLibreMap({
//     //         container: 'central-map',
//     //         center: [79.43612420499357, 28.475825009410213],
//     //         zoom: 14,
//     //         // style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
//     //         // transformRequest: (url, resourceType) => {
//     //         //     url = url.replace('app.olamaps.io', 'api.olamaps.io');
//     //         //     url += url.includes('?') ? `&api_key=${apikey}` : `?api_key=${apikey}`;
//     //         //     return { url, resourceType };
//     //         // }
//     //         style:
//     //         `https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json&api_key=${apikey}`,
//     //     });

//     //     map.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), 'top-right');

//     //     const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText('SRMS COLLEGE');
//     //     new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup).addTo(map).togglePopup();

//     //     mapRef.current = map; // Store the map instance in ref
//     // }, []);
//     /// change 
//     useEffect(() => {
//         const initializeMap = async () => {
//             if (mapRef.current) return; // Prevent re-initialization
            
//             const accessToken = await fetchAccessToken();
//             if (!accessToken) return; // If token fetch failed, return early
            
//             const map = new MapLibreMap({
//                 container: 'central-map',
//                 center: [79.43612420499357, 28.475825009410213],
//                 zoom: 14,
//                 style: `https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json?api_key=${apikey}`,
//                 transformRequest: (url, resourceType) => {
//                     if (resourceType === 'Source' || resourceType === 'Style') {
//                         return {
//                             url,
//                             headers: {
//                                 'Authorization': `Bearer ${accessToken}`, // Set the token in the headers
//                             },
//                         };
//                     }
//                     return { url, resourceType };
//                 },
//             });

//             map.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), 'top-right');

//             const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText('SRMS COLLEGE');
//             new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup).addTo(map).togglePopup();

//             mapRef.current = map; // Store the map instance in ref
//         };

//         initializeMap();
//     }, []);
//     // Update markers without resetting map
//     // useEffect(() => {
//     //     if (!mapRef.current) return; // Ensure map is initialized

//     //     const map = mapRef.current;

//     //     // Clear existing markers
//     //     markersRef.current.forEach(marker => marker.remove());
//     //     markersRef.current = [];

//     //     // Add new markers
//     //     driverLoc.forEach((bus) => {
//     //         const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText(`${bus.busno}`);
//     //         const marker = new Marker().setLngLat([parseFloat(bus.lon), parseFloat(bus.lat)]).setPopup(popup).addTo(map).togglePopup();
//     //         markersRef.current.push(marker); 
//     //         // Keep track of new markers
            
//     //     });
//     // }, [driverLoc]);

//     useEffect(() => {
//         if (!mapRef.current) return; 
    
//         const map = mapRef.current;
    
    
//         markersRef.current.forEach(({ marker, lineId }) => {
//             marker.remove();
//             if (map.getLayer(lineId)) map.removeLayer(lineId);
//             if (map.getSource(lineId)) map.removeSource(lineId);
//         });
//         markersRef.current = [];
    
//         driverLoc.forEach((bus) => {
//             const busCoords = [parseFloat(bus.lon), parseFloat(bus.lat)];
//             const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText(`${bus.busno}`);
//             const marker = new Marker().setLngLat(busCoords).setPopup(popup).addTo(map).togglePopup();
     
//             const lineId = `line-${bus.lon}-${bus.lat}`;
//             markersRef.current.push({ marker, lineId });
    
          
//             try{

//                 drawLine(map, [79.43612420499357, 28.475825009410213], busCoords);
//             }
//             catch(error){
//                 console.log("Error drawing line: ", error);
//             }
//         });
//     }, [driverLoc]);
    

//     const toggleModal = (modalType) => {
//         if (modalType === 'driver') setShowDriverModal(!showDriverModal);
//         if (modalType === 'notice') setShowNoticeModal(!showNoticeModal);
//         if (modalType === 'alert') setShowAlertModal(!showAlertModal);
//     };

//     return (
//         <main className='main-container'>
//             <div className='main-title'>
//                 <h3>DASHBOARD</h3>
//             </div>

//             <div className='main-cards'>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <h3>Bus</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{busesCount}/50</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('driver')}>
//                     <div className='card-inner'>
//                         <h3>Driver</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{driversCount}/24</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('notice')}>
//                     <div className='card-inner'>
//                         <h3>Notice</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>33</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('alert')}>
//                     <div className='card-inner'>
//                         <h3>ALERTS</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>42</h1>
//                 </div>
//             </div>

//             <hr />

//             <div className="map-container">
//                 <div style={{ width: "100%", height: "54vh", overflow: "hidden" }} id="central-map"></div>
//             </div>

//             <hr />
//             <div>Last updated: {lastUpdated}</div>

//             {/* Modals */}
//                     {/* Driver Modal */}
//             {showDriverModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('driver')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('driver')}>×</button>
//                         <h2>Running Buses Details</h2>
//                         <ul>
//                             {driverLoc.map((bus) => (
//                                 <li key={bus.driver_id}>Driver ID: {bus.driver_id}, Bus No: {bus.busno}, Name: ABC</li>
//                             ))}
//                         </ul>
//                     </div>
//                 </div>
//             )}

//             {/* Notice Modal */}
//              {showNoticeModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('notice')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('notice')}>×</button>
//                         <h2>Notice Board</h2>
//                         <button >Upload Notice</button>
//                     </div>
//                 </div>
//             )}

//             {/* Alert Modal */}
//             {showAlertModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('alert')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('alert')}>×</button>
//                         <h2>Alerts</h2>
//                         <button>Upload Alert</button>
//                     </div>
//                 </div>
//             )}

//         </main>
//     );
// }

// export default DashboardComponent;





//this is the code in which map is initlized outside the mane looping function 
// import '../App.css';
// import React, { useState, useRef, useEffect } from 'react';
// import axios from 'axios';
// import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// const apikey=import.meta.env.VITE_ola_ID;
// function DashboardComponent() {
//     const [driverLoc, setDriverLoc] = useState([]);
//     const [busesCount, setBusesCount] = useState(0);
//     const [driversCount, setDriversCount] = useState(0);
//     const [showDriverModal, setShowDriverModal] = useState(false);
//     const [showNoticeModal, setShowNoticeModal] = useState(false);
//     const [showAlertModal, setShowAlertModal] = useState(false);
//     const [lastUpdated, setLastUpdated] = useState("");
//     const mapRef = useRef(null); // Reference for the map instance
//     const markersRef = useRef([]); // To keep track of markers
   

//     const handleFileUpload = (e) => {
//         setSelectedFile(e.target.files[0]);
//       };


//       const uploadNotice = async () => {
//         if (!selectedFile) return alert("Please select a file.");
      
//         const formData = new FormData();
//         formData.append('notice', selectedFile);
      
//         try {
//           await axios.post('http://localhost:5000/upload-notice', formData);
//           alert("Notice uploaded successfully!");
//           fetchNotices(); // Fetch the latest notices
//         } catch (error) {
//           alert("Failed to upload notice.");
//         }
//       };


//       const fetchNotices = async () => {
//         const response = await axios.get('http://localhost:5000/notices');
//         setNotices(response.data.notices);
//       };
      
//       useEffect(() => {
//         fetchNotices();
//       }, []);
      
//       const openPdfModal = (e, pdfFile) => {
//         e.preventDefault();
//         setSelectedPdf(`/notices/${pdfFile}`);
//         setShowPdfModal(true);
//       };
      
//       const closePdfModal = () => {
//         setShowPdfModal(false);
//       };

//     // API data fetching every 10 seconds
//     const getdata = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/runningBuses');
//             const data = response.data.data;
//             setDriverLoc(data);
//             setBusesCount(data.length);
//             setDriversCount(new Set(data.map(bus => bus.driver_id)).size); // Count unique drivers
//             setLastUpdated(new Date().toLocaleTimeString());
//         } catch (err) {
//             console.log(err);
//         }
//     };




//     ///////////////////////////
//     function drawLine(map, startCoords, endCoords) {
//                         const line = [
//                             [startCoords[0], startCoords[1]],
//                             [endCoords[0], endCoords[1]],
//                         ];
            
//                         map.addSource(`line-${endCoords[0]}-${endCoords[1]}`, {
//                             'type': 'geojson',
//                             'data': {
//                                 'type': 'Feature',
//                                 'geometry': {
//                                     'type': 'LineString',
//                                     'coordinates': line,
//                                 },
//                             },
//                         });
            
//                         map.addLayer({
//                             'id': `line-${endCoords[0]}-${endCoords[1]}`,
//                             'type': 'line',
//                             'source': `line-${endCoords[0]}-${endCoords[1]}`,
//                             'layout': {
//                                 'line-join': 'round',
//                                 'line-cap': 'round',
//                             },
//                             'paint': {
//                                 'line-color': '#888',
//                                 'line-width': 2,
//                             },
//                         });
//                     }
//     ////////////////////////

//     useEffect(() => {
//         getdata();
//         const interval = setInterval(() => getdata(), 10000); 
//         return () => clearInterval(interval); 
//     }, []);

//     // Initialize map only once
//     useEffect(() => {
//         if (mapRef.current) return; // Prevent re-initialization

//         const map = new MapLibreMap({
//             container: 'central-map',
//             center: [79.43612420499357, 28.475825009410213],
//             zoom: 14,
//             style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
//             transformRequest: (url, resourceType) => {
//                 url = url.replace('app.olamaps.io', 'api.olamaps.io');
//                 url += url.includes('?') ? `&api_key=${apikey}` : `?api_key=${apikey}`;
//                 return { url, resourceType };
//             }
//             // style:
//             // `https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json&api_key=${apikey}`,
//         });

//         map.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), 'top-right');

//         const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText('SRMS COLLEGE');
//         new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup).addTo(map).togglePopup();

//         mapRef.current = map; // Store the map instance in ref
//     }, []);

//     // Update markers without resetting map
//     // useEffect(() => {
//     //     if (!mapRef.current) return; // Ensure map is initialized

//     //     const map = mapRef.current;

//     //     // Clear existing markers
//     //     markersRef.current.forEach(marker => marker.remove());
//     //     markersRef.current = [];

//     //     // Add new markers
//     //     driverLoc.forEach((bus) => {
//     //         const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText(`${bus.busno}`);
//     //         const marker = new Marker().setLngLat([parseFloat(bus.lon), parseFloat(bus.lat)]).setPopup(popup).addTo(map).togglePopup();
//     //         markersRef.current.push(marker); 
//     //         // Keep track of new markers
            
//     //     });
//     // }, [driverLoc]);

//     useEffect(() => {
//         if (!mapRef.current) return; 
    
//         const map = mapRef.current;
    
    
//         markersRef.current.forEach(({ marker, lineId }) => {
//             marker.remove();
//             if (map.getLayer(lineId)) map.removeLayer(lineId);
//             if (map.getSource(lineId)) map.removeSource(lineId);
//         });
//         markersRef.current = [];
    
//         driverLoc.forEach((bus) => {
//             const busCoords = [parseFloat(bus.lon), parseFloat(bus.lat)];
//             const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText(`${bus.busno}`);
//             const marker = new Marker().setLngLat(busCoords).setPopup(popup).addTo(map).togglePopup();
     
//             const lineId = `line-${bus.lon}-${bus.lat}`;
//             markersRef.current.push({ marker, lineId });
    
          
//             try{

//                 drawLine(map, [79.43612420499357, 28.475825009410213], busCoords);
//             }
//             catch(error){
//                 console.log("Error drawing line: ", error);
//             }
//         });
//     }, [driverLoc]);
    

//     const toggleModal = (modalType) => {
//         if (modalType === 'driver') setShowDriverModal(!showDriverModal);
//         if (modalType === 'notice') setShowNoticeModal(!showNoticeModal);
//         if (modalType === 'alert') setShowAlertModal(!showAlertModal);
//     };

//     return (
//         <main className='main-container'>
//             <div className='main-title'>
//                 <h3>DASHBOARD</h3>
//             </div>

//             <div className='main-cards'>
//                 <div className='card'>
//                     <div className='card-inner'>
//                         <h3>Bus</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{busesCount}/50</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('driver')}>
//                     <div className='card-inner'>
//                         <h3>Driver</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>{driversCount}/24</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('notice')}>
//                     <div className='card-inner'>
//                         <h3>Notice</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>33</h1>
//                 </div>
//                 <div className='card' onClick={() => toggleModal('alert')}>
//                     <div className='card-inner'>
//                         <h3>ALERTS</h3>
//                         <span className="material-symbols-outlined">dashboard</span>
//                     </div>
//                     <h1>42</h1>
//                 </div>
//             </div>

//             <hr />

//             <div className="map-container">
//                 <div style={{ width: "100%", height: "54vh", overflow: "hidden" }} id="central-map"></div>
//             </div>

//             <hr />
//             <div>Last updated: {lastUpdated}</div>

//             {/* Modals */}
//             {/* Driver Modal */}
//             {showDriverModal && (
//             <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('driver')}>
//                 <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button className="getBusDetails-close-btn" onClick={() => toggleModal('driver')}>x</button>
//                 <h2>Driver Details</h2>
//                 <ul>
//                     {driverLoc.map((bus) => (
//                     <li key={bus.driver_id}>
//                         <span>Name: ABC</span>
//                         <span>Bus No: {bus.busno}</span>
//                         <span>Driver ID: {bus.driver_id}</span>
//                     </li>
//                     ))}
//                 </ul>
//                 </div>
//             </div>
//             )}


//             {/* Notice Modal */}
//             {showNoticeModal && (
//             <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('notice')}>
//                 <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                 <button className="getBusDetails-close-btn" onClick={() => toggleModal('notice')}>×</button>
//                 <h2>Latest Notices</h2>

//                 <div>
//                     <input type="file" accept="application/pdf" onChange={handleFileUpload} />
//                     <button onClick={uploadNotice}>Upload Notice</button>
                    
//                     {/* Display selected file name and current date/time */}
//                     {selectedFile && (
//                     <div className="file-details">
//                         <p>File Selected: {selectedFile.name}</p>
//                         <p>Date: {new Date().toLocaleDateString()}</p>
//                         <p>Time: {new Date().toLocaleTimeString()}</p>
//                     </div>
//                     )}
//                 </div>

//                 <ul>
//                     {notices.map((notice) => (
//                     <li key={notice.file}>
//                         <span>{new Date(notice.addedDate).toLocaleString()}</span>
//                         <a href={`/notices/${notice.file}`} target="_blank" onClick={(e) => openPdfModal(e, notice.file)}>Open PDF</a>
//                     </li>
//                     ))}
//                 </ul>

//                 {/* PDF Modal */}
//                 {showPdfModal && (
//                     <div className="pdf-modal-overlay" onClick={closePdfModal}>
//                     <div className="pdf-modal-content">
//                         <button className="pdf-modal-close-btn" onClick={closePdfModal}>×</button>
//                         <iframe src={selectedPdf} width="100%" height="100%" />
//                     </div>
//                     </div>
//                 )}
//                 </div>
//             </div>
//             )}

//             {/* Alert Modal */}
//             {showAlertModal && (
//                 <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('alert')}>
//                     <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
//                         <button className="getBusDetails-close-btn" onClick={() => toggleModal('alert')}>×</button>
//                         <h2>Alerts</h2>
//                         <button>Upload Alert</button>
//                     </div>
//                 </div>
//             )}  

//         </main>
//     );
// }

// export default DashboardComponent;




import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import NoticeModal from './NoticeModal';  // Assuming NoticeModal is in the same directory
const apikey = import.meta.env.VITE_ola_ID;

function DashboardComponent() {
  const [driverLoc, setDriverLoc] = useState([]);
  const [busesCount, setBusesCount] = useState(0);
  const [driversCount, setDriversCount] = useState(0);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("");
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const getdata = async () => {
    try {
      const response = await axios.get('http://localhost:5000/runningBuses');
      const data = response.data.data;
      setDriverLoc(data);
      setBusesCount(data.length);
      setDriversCount(new Set(data.map(bus => bus.driver_id)).size);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.log(err);
    }
  };

  function drawLine(map, startCoords, endCoords) {
    const line = [
      [startCoords[0], startCoords[1]],
      [endCoords[0], endCoords[1]],
    ];

    map.addSource(`line-${endCoords[0]}-${endCoords[1]}`, {
      'type': 'geojson',
      'data': {
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': line,
        },
      },
    });

    map.addLayer({
      'id': `line-${endCoords[0]}-${endCoords[1]}`,
      'type': 'line',
      'source': `line-${endCoords[0]}-${endCoords[1]}`,
      'layout': {
        'line-join': 'round',
        'line-cap': 'round',
      },
      'paint': {
        'line-color': '#888',
        'line-width': 2,
      },
    });
  }

  useEffect(() => {
    getdata();
    const interval = setInterval(() => getdata(), 100000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (mapRef.current) return;

    const map = new MapLibreMap({
      container: 'central-map',
      center: [79.43612420499357, 28.475825009410213],
      zoom: 14,
      style: 'https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json',
      transformRequest: (url, resourceType) => {
        url = url.replace('app.olamaps.io', 'api.olamaps.io');
        url += url.includes('?') ? `&api_key=${apikey}` : `?api_key=${apikey}`;
        return { url, resourceType };
      },
    });

    map.addControl(new NavigationControl({ visualizePitch: false, showCompass: true }), 'top-right');

    const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText('SRMS COLLEGE');
    new Marker().setLngLat([79.43612420499357, 28.475825009410213]).setPopup(popup).addTo(map).togglePopup();

    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    markersRef.current.forEach(({ marker, lineId }) => {
      marker.remove();
      if (map.getLayer(lineId)) map.removeLayer(lineId);
      if (map.getSource(lineId)) map.removeSource(lineId);
    });
    markersRef.current = [];

    driverLoc.forEach((bus) => {
      const busCoords = [parseFloat(bus.lon), parseFloat(bus.lat)];
      const popup = new Popup({ offset: 23, closeButton: false, closeOnClick: false }).setText(`${bus.busno}`);
      const marker = new Marker().setLngLat(busCoords).setPopup(popup).addTo(map).togglePopup();

      const lineId = `line-${bus.lon}-${bus.lat}`;
      markersRef.current.push({ marker, lineId });

      try {
        drawLine(map, [79.43612420499357, 28.475825009410213], busCoords);
      } catch (error) {
        console.log("Error drawing line: ", error);
      }
    });
  }, [driverLoc]);

  const toggleModal = (modalType) => {
    if (modalType === 'driver') setShowDriverModal(!showDriverModal);
    if (modalType === 'notice') setShowNoticeModal(!showNoticeModal);
    if (modalType === 'alert') setShowAlertModal(!showAlertModal);
  };

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Bus</h3>
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <h1>{busesCount}/50</h1>
        </div>
        <div className='card' onClick={() => toggleModal('driver')}>
          <div className='card-inner'>
            <h3>Driver</h3>
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <h1>{driversCount}/24</h1>
        </div>
        <div className='card' onClick={() => toggleModal('notice')}>
          <div className='card-inner'>
            <h3>Notice</h3>
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <h1>33</h1>
        </div>
        <div className='card' onClick={() => toggleModal('alert')}>
          <div className='card-inner'>
            <h3>ALERTS</h3>
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <h1>42</h1>
        </div>
      </div>

      <hr />

      <div className="map-container">
        <div style={{ width: "100%", height: "54vh", overflow: "hidden" }} id="central-map"></div>
      </div>

      <hr />
      <div>Last updated: {lastUpdated}</div>

      {/* Modals */}
      {/* Driver Modal */}
      {showDriverModal && (
        <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('driver')}>
          <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="getBusDetails-close-btn" onClick={() => toggleModal('driver')}>x</button>
            <h2>Driver Details</h2>
            <ul>
              {driverLoc.map((bus) => (
                <li key={bus.driver_id}>
                  <span>Name: ABC</span>
                  <span>Bus No: {bus.busno}</span>
                  <span>Driver ID: {bus.driver_id}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Notice Modal */}
      <NoticeModal showNoticeModal={showNoticeModal} toggleModal={toggleModal} />

      {/* Alert Modal */}
      {showAlertModal && (
        <div className="getBusDetails-modal-overlay" onClick={() => toggleModal('alert')}>
          <div className="getBusDetails-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="getBusDetails-close-btn" onClick={() => toggleModal('alert')}>×</button>
            <h2>Alerts</h2>
            <button>Upload Alert</button>
          </div>
        </div>
      )}
    </main>
  );
}

export default DashboardComponent;

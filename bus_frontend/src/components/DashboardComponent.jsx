import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Map as MapLibreMap, NavigationControl, Marker, Popup } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import NoticeModal from './NoticeModal';  // Assuming NoticeModal is in the same directory
const apikey = import.meta.env.VITE_ola_ID;
const Src = import.meta.env.VITE_Src;



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
      const response = await axios.get(`${Src}/runningBuses`);
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
    const interval = setInterval(() => getdata(), 10000);
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
            <h2>Bus</h2>
          </div>
          <h1>{busesCount}/50</h1>
            <span className="card-icon material-symbols-outlined">directions_bus</span>
        </div>
        <div className='card' onClick={() => toggleModal('driver')}>
          <div className='card-inner'>
            <h2>Driver</h2>
          </div>
          <h1>{driversCount}/24</h1>
            <span className="card-icon material-symbols-outlined">groups</span>
        </div>
        <div className='card' onClick={() => toggleModal('notice')}>
          <div className='card-inner'>
            <h2>Notice</h2>
          </div>
          <h1>33</h1>
            <span className=" card-icon material-symbols-outlined">contract_edit</span>
        </div>
        <div className='card' onClick={() => toggleModal('alert')}>
          <div className='card-inner'>
            <h2>Alerts</h2>
          </div>
          <h1>42</h1>
            <span className="card-icon material-symbols-outlined">bus_alert</span>
        </div>
      </div>

      <hr />

      <div className="map-container">
        <div style={{ width: "100%", height: "59vh", overflow: "hidden" }} id="central-map"></div>
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

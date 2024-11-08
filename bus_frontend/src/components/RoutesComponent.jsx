import '../App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Src = import.meta.env.VITE_Src;



function RoutesComponent () {
  let [route1, setRoute1] = useState("");



    const route = async () => {
        setRoute1(route1);

        try {
            const response = await axios.get(`${Src}/route`);
            // console.log((response.data.data));
            var location = response?.data?.data;
            setRoute1(location);

            // alert("New route added");
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        route()
    }
        , [])



    const route_update = async () => {

        try {
            const updated_routes=document.getElementById("route-textarea-update").value;
           
            const response = await axios.post(`${Src}/route`, { route: updated_routes,})
           
            setRoute1(updated_routes);
            toast.success('Routes Updated Successfuly', {});

            
            
           
        }catch(err) {
            console.log(err)
        };
        }

        

// console.log("route1", route1)

return (
    <>
    <h1>View / Update the routes</h1>
    <div className="route-container">
        <div>
            <textarea 
            value={route1}
            className="route-textarea" id="route-textarea-update"
            onChange={
                (e) => setRoute1(e.target.value)
            }
            spellcheck="false" contenteditable='true'>
                
            </textarea>
        </div>
        <button onClick={()=>{route_update();}}>Save</button>
        <button onClick={() => {route();}}>Refresh</button>
    </div>
    <ToastContainer 
    position="top-center"
    autoClose={1000}
    theme="dark"/>
    </>

)
}

export default RoutesComponent
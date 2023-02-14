//CURRENTLY NOT IN USE

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLocation } from "../store/location";

export function GetLocation() {
    const dispatch = useDispatch();
    const geolocationOptions = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 5000,
        };

    const [loc, setLoc] = useState({ longitude: 139.753, latitude: 35.6844});



    const SuccessCallback = (geolocation) => {
        setLoc({latitude: geolocation.coords.latitude, longitude: geolocation.coords.longitude});
        
    };
    
    const errorCallback = (error) => {
    console.log(error);
    };

        if ("geolocation" in navigator) {
            // Access the API
            navigator.geolocation.getCurrentPosition(
                SuccessCallback,
                errorCallback,
                geolocationOptions
            );
            } else {
            // Use a third-party geolocation service
            console.log("Browser does not support the Geolocation API");
        }

        dispatch(setLocation(loc));




    




}
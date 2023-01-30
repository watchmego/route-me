
import mapboxgl from 'mapbox-gl'
import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import ('./map.css');

export default function Map() {
    

    mapboxgl.accessToken = 'pk.eyJ1IjoicmV1YmVud256IiwiYSI6ImNsZDQwbHp1NzA5Nmczc3Bsamo3dXEzMXAifQ.BXZzAPjB_o8t1pBNjsWwmQ';
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [avoidHW, setAvoidHW] = useState(true);
    const [showDistance, setShowDistance] = useState(true);
    const [showElevation, setShowElevation] = useState(false);
    const [units, setUnits] = useState("metric");

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
        },[map]);


    const handleSetAvoidHW = () => {
        setAvoidHW(!avoidHW);
    }

    const handleChange = (setState, params) => {
        setState(!params);
    }
    return (
        <div className="body-container">
            <div className="map-container" style={{height: "100vh"}} ref={mapContainer} />
            <div className="left-panel">
                <label>
                    <input
                        type="checkbox"
                        checked={avoidHW}
                        onChange={() => handleChange(setAvoidHW, avoidHW)}
                    />Avoid Highways
                </label><br></br>
                <label>
                    <input
                        type="checkbox"
                        checked={showDistance}
                        onChange={() => handleChange(setShowDistance, showDistance)}
                    />Show Distance Markers
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={showElevation}
                        onChange={() => handleChange(setShowElevation, showElevation)}
                    />Show Elevation
                </label>
                <label for="units">
                    <select id="units" name="units">
                        <option value="Metric">Metric</option>
                        <option value="Imperial">Imperial</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
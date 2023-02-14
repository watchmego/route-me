
import React, { useRef, useEffect, useState, useCallback, useContext } from 'react';
import { useDispatch } from 'react-redux';
import maplibregl from 'maplibre-gl';
import { globalConfig } from '../../../g-Config';
import { getAddress } from '../leftPanel/addressLookup';
import { createRoute } from '../../../store/route';
import { locContext } from '.';
import axios from 'axios';
import { FetchRoute } from '../../../store/routeSlice';

import ('./routePanel.css');

export default function RoutePanel({ location }) {
    const [avoidHW, setAvoidHW] = useState(true);
    const [showDistance, setShowDistance] = useState(true);
    const [distance, setDistance] = useState(5000);
    const [showElevation, setShowElevation] = useState(true);
    const [units, setUnits] = useState("metric");
    const GH_KEY = globalConfig.GH_API;
    const [addrLookup, setAddrLookup] = useState('');
    const [startAddr, setStartAddr] = useState({short: ''});
    const [delay, setDelay] = useState(false);
    const [route, setRoute] = useState([]);
    const dispatch = useDispatch();
    const { centre, setCentre, setManualLoc, loc }  = useContext(locContext);
    const request =  {
        api_key: GH_KEY,
        coords: [loc] || null,
        distance: distance,
        heading: Math.random()*360,
        elevation: showElevation
    }


    const lookupAddress = async(address) => {
            const addr = await getAddress(address);
            if(addr.hits.length > 0) {
                setAddrLookup(addr);
                console.log('address',startAddr);
            }
    }

    
    const generateRoute = async (startAddr) => {
        // console.log('getting start address for route',loc.lat, loc.lng);
        // const url = `https://graphhopper.com/api/1/route?key=${request.api_key}&point=${loc.lat},${loc.lng}&elevation=${showElevation}&algorithm=round_trip&ch.disable=true&&round_trip.distance=${request.distance}&vehicle=foot&weighting=shortest&points_encoded=false&heading=${request.heading}`
        // //const response = await fetch(url);
        // axios(url).then((response) => {
        //         console.log('raw data',response);
        //});


        //NEED TO CREATE A THUNK (MIDDLEWARE)

        
        dispatch(FetchRoute(request));
                //dispatch(createRoute(response.data.paths[0]));

        // console.log(url);
        
        // dispatch(createRoute(response.data.paths[0]));
        // const routeData = await response.json();
        // console.log(routeData);
        
        
    }

    const handleChange = (setState, params) => {
        setState(!params);
    }

    return (
        <div className="panel">
            <div className="search">

                    <input 
                        type="text"
                        value={startAddr.short}
                        className="addressInput"
                        onChange={(e) => {
                            setStartAddr({short: e.target.value});
                            //added delay to lookup requests to reduce volume
                            if(!delay && e.target.value.length > 1) {
                                lookupAddress(e.target.value);
                                setDelay(true);
                                setTimeout(() => { setDelay(false);}, 500);
                            }
                        }}
                    />

                <ul className="addressUL">
                    {addrLookup && addrLookup.hits.map(((addr, index) => {
                        let formattedAddr;
                        if(addr.street) {
                            formattedAddr = `${addr.housenumber|| ""} ${addr.street}, ${addr.city}`;
                        } else {
                            formattedAddr = addr.name;
                        }
                        return <li key={index}><button onClick={(e) => {setStartAddr({short: e.target.textContent, coords: addr.point}); setCentre(addr.point); setManualLoc(true)}} value={startAddr.short}>{formattedAddr}</button></li>
                    }))}
                </ul>
            </div>
            <div>
                <button className="generateRoute" onClick={generateRoute}>Create Route</button><br></br>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={avoidHW}
                                onChange={() => handleChange(setAvoidHW, avoidHW)}
                            />Avoid Highways
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={showDistance}
                                onChange={() => handleChange(setShowDistance, showDistance)}
                            />Show Distance Markers
                        </label>
                    </div>
                        <label>
                            <input
                                type="checkbox"
                                checked={showElevation}
                                onChange={() => handleChange(setShowElevation, showElevation)}
                            />Show Elevation
                        </label>
                    <div>
                        <label htmlFor="units">
                            <select id="units" name="units">
                                <option value="Metric">Metric</option>
                                <option value="Imperial">Imperial</option>
                            </select>
                        </label>
                    </div>
            </div>
        </div>
    );
}

import React, { useRef, useEffect, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import { globalConfig } from '../../../g-Config';
import { getAddress } from '../leftPanel/addressLookup';
import ('./map.css');

export default function RoutePanel({ location }) {
    console.log(location);
    const [avoidHW, setAvoidHW] = useState(true);
    const [showDistance, setShowDistance] = useState(true);
    const [showElevation, setShowElevation] = useState(false);
    const [units, setUnits] = useState("metric");
    const API_KEY= globalConfig.API_KEY;
    const [addrLookupRes, setAddrLookupRes] = useState();
    const [startAddr, setStartAddr] = useState('');
    const [delay, setDelay] = useState(false);


    const lookupAddress = async(address) => {
            const addr = await getAddress(address);
            console.log('logging result',addr.hits);
            if(addr.hits.length > 0) {
                console.log('bad setState');
                setAddrLookupRes(addr);
            }
    }


    const handleChange = (setState, params) => {

        setState(!params);
    }

    return (
        <div className="body-container">
            <div className="left-panel">
                <label>
                    <input 
                        type="text"
                        value={startAddr}
                        onChange={(e) => {
                            setStartAddr(e.target.value);
                            console.log(delay);
                            if(!delay && e.target.value.length > 1) {
                                lookupAddress(e.target.value);
                                setDelay(true);
                                setTimeout(() => { setDelay(false); console.log('testing') }, 500);
                            }
                        }}
                    />
                </label>
                <ul>
                    {addrLookupRes && addrLookupRes.hits.map(((addr, index) => {
                        let formattedAddr;
                        if(addr.street) {
                            formattedAddr = `${addr.housenumber|| ""} ${addr.street}, ${addr.city}`;
                        } else {
                            formattedAddr = addr.name;
                        }
                        return <li key={index}><button onClick={(e) => {console.log('startAddr');setStartAddr(e.target.textContent)}} value={startAddr}>{formattedAddr}</button></li>
                    }))}
                </ul>
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
                <label htmlFor="units">
                    <select id="units" name="units">
                        <option value="Metric">Metric</option>
                        <option value="Imperial">Imperial</option>
                    </select>
                </label>
            </div>
        </div>
    );
}
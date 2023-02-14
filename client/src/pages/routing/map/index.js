import Map from "./map";
import RoutePanel from "./routePanel";
import "./index.css";
import { createContext, useState } from "react";

export const locContext = createContext({
    centre: {},
    //setCentre: (loc) => {},
    manualLoc: false,
   // setManualLoc: (loc) => {},
    loc: [],
    //setLoc: (loc) => {},
    showDistance: true,
    distance: 5000


});


export default function RoutePage() {

    const [centre, setCentre] = useState({lat: 35.6844, lng: 139.753});
    const [manualLoc, setManualLoc] = useState(false);
    const [loc, setLoc] = useState(null);
    const [showDistance, setShowDistance] = useState(true);
    const [distance, setDistance] = useState(5000);
      
    return(   
            <div className="routePage">
                <locContext.Provider value={{ 
                    centre, 
                    setCentre, 
                    manualLoc, 
                    setManualLoc, 
                    loc, 
                    setLoc, 
                    showDistance, 
                    setShowDistance,
                    distance,
                    setDistance }}>
                    <Map />
                    <RoutePanel />
                </locContext.Provider>
            </div>
    )

}


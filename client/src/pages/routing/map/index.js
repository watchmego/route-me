import Map from "./map";
import RoutePanel from "./routePanel";
import './index.css';




export default function RoutePage() {
      
    return(   
            <div className="routePage">
                <Map />
                <RoutePanel />
            </div>
    )

}
import { useMap } from "react-leaflet";
import * as L from 'leaflet';

export const routeLayer = (route) => {
    const map = useMap();

      if(Object.keys(route).length > 0) {
        map.eachLayer((layer)=> {if(layer._path) map.removeLayer(layer) });
        let polyline = L.polyline(route, {color: 'red'}).addTo(map);
        map.fitBounds(polyline.getBounds());
        
      }
}


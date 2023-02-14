import React, { useEffect, useRef, useState, useContext, createContext } from 'react';
import { useSelector } from 'react-redux';
import './map.css';
import { MapContainer, TileLayer, useMap, Marker, Popup, Circle } from 'react-leaflet'
import { locContext } from '.';
import * as L from 'leaflet';
import MyMarkers from './markers';
const initialCentre = [34, 72];

const Location = () => {

    const route = useSelector(store => {console.log(store); return store.route});
    const map = useMap();  
    const { centre, setCentre, manualLoc, showDistance, setShowDistance }  = useContext(locContext);
    
  //centre map if address is entered into address search bar
    useEffect(() => {
      if(!manualLoc) {
        map.locate({setView: true, maxZoom: 16});
        map.on('locationfound', (event) => {
          if(JSON.stringify(centre) === JSON.stringify(event.latlng)) {
            console.log(centre, event.latlng, JSON.stringify(centre) === JSON.stringify(event.latlng));
          setCentre(event.latlng);
          }
        })
      } else if(centre.lat && centre !== map.getCenter()){  
        map.setView(centre);
      }
    }, [map, manualLoc, centre]);

    useEffect(() => {
      if(Object.keys(route).length > 0) {
        map.eachLayer((layer)=> {if(layer._path) map.removeLayer(layer) });
        console.log('adding polyline', route);
        let polyline = L.polyline(route.points.coordinates, {color: 'red'}).addTo(map);
        map.fitBounds(polyline.getBounds());
        
      }
    },[route, map])


    return centre
    ? 
    (
      <>
        <MyMarkers map={map}/>
      </>
    )
     : null
}

const Map = () => {
  console.log('rendering map');
  return (
    <div className="container">
      <MapContainer
        center={initialCentre}
        zoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer url={"http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />

        <Location />
        
      </MapContainer>
    </div>
  );
}


export default Map; 
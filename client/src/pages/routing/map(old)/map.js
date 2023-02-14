import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { globalConfig } from '../../../g-Config';
import { GetLocation } from '../../../common/utils';
import useGeolocation from './customHook';

export default function Map() {
  useGeolocation();

  const loc = useSelector(state => state.location);
  const API_KEY= globalConfig.API_KEY;
  console.log('stateful location', loc.longitude, loc.latitude);
  const mapContainerRef = useRef();
  const [map, setMap] = useState();
  

  useEffect(() => {
    console.log('running useEffect', loc);

    if(map) {
      console.log('recentering');
      map.setCenter([loc.longitude, loc.latitude]);
      new maplibregl.Marker({color: "#FF0000"})
      .setLngLat([loc.longitude, loc.latitude])
      .addTo(map);
    } else {
      const newMap = new maplibregl.Map({
        container: mapContainerRef.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
        center: [loc.longitude, loc.latitude],
        zoom: 14
      });
  
      setMap(newMap);
      
      map.addControl(new maplibregl.NavigationControl(), 'top-right');

      new maplibregl.Marker({color: "#FF0000"})
        .setLngLat([loc.longitude, loc.latitude])
        .addTo(map);

      
    }
    // return () => {
    // if(map) map.remove();
    // }
  }, [loc]);

  // useEffect(() => {
  //   console.log("updating location", mapContainerRef);
  // },[loc]);


  return (
      <div className="map-wrap">
        <div ref={mapContainerRef} className="map"/>
      </div>
  );
}



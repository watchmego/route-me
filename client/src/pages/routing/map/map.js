import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import { globalConfig } from '../../../g-Config';
import useGeolocation from './customHook';

export default function Map() {
    useGeolocation();

    const loc = useSelector(state => state.location);
    const API_KEY= globalConfig.API_KEY;
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
  

    useEffect(() => {
        console.log('running useEffect', loc);

        if(map.current) {
            console.log('recentering');
            map.current.setCenter([loc.longitude, loc.latitude]);
//currently not removing marker, todo
            if(marker.current) {
                marker.current.remove();
            }
            marker.current = new maplibregl.Marker({color: "#FF0000"})
            .setLngLat([loc.longitude, loc.latitude])
            marker.current.addTo(map.current);
            
            
        } else {
            map.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            center: [loc.longitude, loc.latitude],
            zoom: 5
        });
        map.current.on("load", () => {
                
                  
                map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

                new maplibregl.Marker({color: "#FF0000"})
                    .setLngLat([loc.longitude, loc.latitude])
                    .addTo(map.current);

            });
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



import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
// import MapLibreGlDirections from '@maplibre/maplibre-gl-directions'
import { globalConfig } from '../../../g-Config';
import useGeolocation from './customHook';

export default function Map() {
    useGeolocation();

    const loc = useSelector(state => state.location);
    const API_KEY= globalConfig.API_KEY;
    const mapContainerRef = useRef(null);
    const map = useRef(null);
    const marker = useRef(null);
    const route = useSelector(state => state.route);

    useEffect(() => {

            map.current = new maplibregl.Map({
            container: mapContainerRef.current,
            style: `https://api.maptiler.com/maps/streets/style.json?key=${API_KEY}`,
            center: [loc.longitude, loc.latitude],
            zoom: 5
        });
        map.current.on("load", () => {

                map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

                marker.current = new maplibregl.Marker({color: "#FF0000"})
                .setLngLat([loc.longitude, loc.latitude])
                marker.current.addTo(map.current);

            });
        return () => {
            if(map.current) map.current.remove();
        }
  }, [loc]);



  return (
      <div className="map-wrap">
        <div ref={mapContainerRef} className="map"/>
      </div>
  );
}



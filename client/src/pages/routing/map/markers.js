import { useState, useEffect, useContext } from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { locContext } from '.';


const removeMarker = (index, map, legend) => {
  map.eachLayer((layer) => {
    if (layer.options && layer.options.pane === "markerPane") {
      if (layer.options.uniceid === index) {
        map.removeLayer(layer);
        legend.textContent = 'goodbye marker 💩';
      }
    }
  });
}

const ShowMarkers = ({ mapContainer, legend, markers }) => {
  return markers.map((marker, index) => {
    return <Marker
      key={index}
      uniceid={index}
      position={marker}
      draggable={true}
      eventHandlers={{
        moveend(e) {
          const { lat, lng } = e.target.getLatLng();
          legend.textContent = `change position: ${lat} ${lng}`;
        }
      }}
    >
      <Popup>
        <button onClick={() => removeMarker(index, mapContainer, legend)}>delete marker 💔</button>
      </Popup>
    </Marker>
  })
}

const MyMarkers = ({ map }) => {
  const [marker, setMarker] = useState([])
  const [legend, setLegend] = useState()
  const { loc, setLoc }  = useContext(locContext); 

  useEffect(() => {
    if (!map) return;
    const legend = L.control({ position: "bottomleft" });

    const info = L.DomUtil.create("div", "legend");

    legend.onAdd = () => {
      info.textContent = `click on the map, move the marker, click on the marker`;
      return info;
    };

    legend.addTo(map);

    map.on('click', (e) => {
        map.eachLayer((layer) => {
            if (layer.options && layer.options.pane === "markerPane") {
                map.removeLayer(layer);
                legend.textContent = 'goodbye marker 💩';
                
            }
          });
      const { lat, lng } = e.latlng;
      setMarker(mar => [...mar, [lat, lng]]);
      setLoc({lat:lat,lng:lng});
      console.log('new start location set',lat,lng, loc);
      info.textContent = `new marker: ${e.latlng}`;
      setLegend(info);
    })

  }, [map, loc, setLoc]);

  return marker.length > 0 && legend !== undefined ? (
    <ShowMarkers
      mapContainer={map}
      legend={legend}
      markers={marker} />
  )
    : null
}

export default MyMarkers;
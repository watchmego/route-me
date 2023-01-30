import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLocation } from "../../../store/location";

export default function useGeolocation() {

console.log('rendering map index');
    const dispatch = useDispatch();

    //const [loc, setLoc] = useState({ longitude: 139.753, latitude: 35.6844});

    
    const successCallback = (geolocation) => {
      console.log('running reducer');
      dispatch(setLocation({latitude: geolocation.coords.latitude, longitude: geolocation.coords.longitude}));
        //setLoc({latitude: geolocation.coords.latitude, longitude: geolocation.coords.longitude});
        
      };
   
    
      
    const errorCallback = (error) => {
    console.log(error);
    };
      
    
    useEffect(() => {
      console.log('index useeffect');
       if ("geolocation" in navigator) {
          // Access the API
          navigator.geolocation.getCurrentPosition(
            successCallback,
            errorCallback,
            {enableHighAccuracy: true,
            maximumAge: 10000,
            timeout: 5000,}
          );
        } else {
          // Use a third-party geolocation service
          console.log("Browser does not support the Geolocation API");
        }
        
    },[]);
}
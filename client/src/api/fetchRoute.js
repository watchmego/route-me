import axios from 'axios';


const generateRoute = async (request) => {
    console.log('getting start address for route',loc.lat, loc.lng);
    const url = `https://graphhopper.com/api/1/route?key=${request.api_key}&point=${loc.lat},${loc.lng}&elevation=${showElevation}&algorithm=round_trip&ch.disable=true&&round_trip.distance=${request.distance}&vehicle=foot&weighting=shortest&points_encoded=false&heading=${request.heading}`
    //const response = await fetch(url);
    axios(url).then((response) => {
            console.log('raw data',response);

    NEED TO CREATE A THUNK (MIDDLEWARE)
            //dispatch(createRoute(response.data.paths[0]));
        });
    // console.log(url);
    
    // dispatch(createRoute(response.data.paths[0]));
    // const routeData = await response.json();
    // console.log(routeData);
    
    
}
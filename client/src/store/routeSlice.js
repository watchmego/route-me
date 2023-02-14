import { createSlice, createAsyncThunk  } from '@reduxjs/toolkit';
import axios from 'axios';
import { createRoute } from './route';



const initialState = {
    loading: false,
    route: {},
    error: ''
}

export const FetchRoute = createAsyncThunk('store/fetchRoute', async (request, thunkAPI) => {
    console.log('new request', request.coords[0].lat);
    
    const url = `https://graphhopper.com/api/1/route?key=${request.api_key}&point=${request.coords[0].lat},${request.coords[0].lng}&elevation=true&algorithm=round_trip&ch.disable=true&round_trip.distance=${request.distance}&vehicle=foot&weighting=shortest&points_encoded=false&heading=${request.heading}`

    const response = await fetch(url);
    const jsonData = await response.json();
    thunkAPI.dispatch(createRoute(jsonData));

});

const routeSlice = createSlice({
    name: 'route',
    initialState,
    extraReducers: builder => {
        builder.addCase(FetchRoute.pending, state => {
            state.loading = true;
        });
        builder.addCase(FetchRoute.fulfilled, (state, action) => {
            state.loading = false;
            state.route = action.payload;
            state.error = '';
        });
        builder.addCase(FetchRoute.rejected, (state, action) => {
            state.loading = false;
            state.route = {};
            state.error = action.error.message;
        });
    }
})

export default routeSlice;



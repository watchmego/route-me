import { combineReducers, createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import locationReducer from './location';
import routeReducer from "./route";
import routeSlice from './routeSlice';


 const rootReducer = combineReducers({
    location: locationReducer,
    route: routeReducer,
    routeSlice: routeSlice.reducer
  })


const store = configureStore({
    reducer: rootReducer, 
    middleware: [thunk]
})

export default store;
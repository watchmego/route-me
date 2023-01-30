import { combineReducers, legacy_createStore as createStore } from "redux";

import locationReducer from './location'

const rootReducer = combineReducers({
    location: locationReducer
  })

let enhancer;

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;
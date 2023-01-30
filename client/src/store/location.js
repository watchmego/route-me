const SET = 'location/SET';
const GET = 'location/GET'

export const setLocation = (loc) => {
    console.log('setting location', loc)
    return {
        type: SET,
        loc
    }
}

export const getLocation = () => {
    return {
        type: GET
    }
}
const initialState = { longitude: 139.753, latitude: 35.6844};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET:
            console.log('reducer', action.loc);
            return action.loc;
        case GET:
            return state;
        default:
            return state;
    }
}

export default locationReducer;
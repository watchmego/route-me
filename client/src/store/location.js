const SET = 'location/SET';
const GET = 'location/GET'

export const setLocation = (loc) => {
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
const initialState = { latitude: 35.6844, longitude: 139.753};

const locationReducer = (state = initialState, action) => {
    switch (action.type) {
        
        case SET:
            return action.loc;
        case GET:
            return state;
        default:
            return state;
    }
}

export default locationReducer;
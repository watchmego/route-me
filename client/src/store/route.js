const CREATE = 'route/create';

export const createRoute = (data) => {
    console.log('logging data in createRoute', data);
    let route = {...data.paths[0]};
    let coords = [];
    for(let i in route.points.coordinates) {
        coords.push([route.points.coordinates[i][1], route.points.coordinates[i][0], route.points.coordinates[i][2]]);
    }
    route.points.coordinates = coords;
    return {
        type: CREATE,
        route
    }
}

const routeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE: 
            //return action.route;
            return action.route
        default:
            return state;
    }
} 

export default routeReducer;
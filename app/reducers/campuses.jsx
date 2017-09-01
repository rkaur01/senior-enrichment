import axios from 'axios';

// ACTION TYPES
const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// ACTION CREATORS
export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses };
    return action;
}

export function updateCampusAction(campus) {
    const action = { type: UPDATE_CAMPUS, campus };
    return action;
}

export function removeCampus(campus) {
    const action = { type: REMOVE_CAMPUS, campus };
    return action;
}

// THUNK CREATORS
export function fetchCampuses() {

    return function thunk(dispatch) {
        return axios.get('/api/campuses')
            .then(res => res.data)
            .then(campuses => {
                const action = getCampuses(campuses);
                dispatch(action);
            });
    };
}


export function postCampus(campus, history) {

    return function thunk(dispatch) {
        return axios.post('/api/campuses', campus)
            .then(res => res.data)
            .then(newCampus => {
                dispatch(getCampus(newCampus));
                history.push(`/campuses/${newCampus.id}`);
            });
    };
}

export function updateCampus(campusId, updateProp, history) {

    return function thunk(dispatch) {
        return axios.put(`/api/campuses/${campusId}`, updateProp)
            .then(res => res.data)
            .then(updatedCampus => {
                dispatch(updateCampusAction(updatedCampus));
                history.push(`/campuses/${campusId}`);
            });
    };
}

// REDUCER
export default function reducer(state = [], action) {

    switch (action.type) {

        case GET_CAMPUSES:
            return action.campuses;

        case GET_CAMPUS:
            return [...state, action.campus];

        case UPDATE_CAMPUS:
            console.log('what is ', action.campus)
            const updatedCampuses = state.map((campus) => {
                if (campus.id !== action.campus.id) {
                    return campus
                }
                return action.campus
            })
            return updatedCampuses


        case REMOVE_CAMPUS:
            const filteredCampuses = state.filter(campus => campus.id !== action.campus.id)
            return filteredCampuses

        default:
            return state;
    }

}
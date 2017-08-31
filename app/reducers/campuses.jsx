import axios from 'axios';

// ACTION TYPES
const GET_CAMPUS = 'GET_CAMPUS';
const GET_CAMPUSES = 'GET_CAMPUSES';

// ACTION CREATORS
export function getCampus(campus) {
    const action = { type: GET_CAMPUS, campus };
    return action;
}

export function getCampuses(campuses) {
    const action = { type: GET_CAMPUSES, campuses };
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

// export function fetchStudentCampus(studentId) {
//     return function thunk(dispatch){
//         return axios.get(`/api/students/${studentId}/campus`)
//             .then(res => res.data)
//             .then(campus => {
//                 console.log("SUPPP IM YOUR FETCHSTUDENTCAMPUS THUNK", campus)
//                 const action = getCampus(campus);
//                 dispatch(action)
//             })
//     }
// }

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

// REDUCER
export default function reducer(state = [], action) {

    switch (action.type) {

        case GET_CAMPUSES:
            return action.campuses;

        case GET_CAMPUS:
            return action.campus;

        default:
            return state;
    }

}
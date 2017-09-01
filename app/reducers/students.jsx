import axios from 'axios';

// ACTION TYPES
const GET_STUDENT = 'GET_STUDENT';
const GET_STUDENTS = 'GET_STUDENTS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';


// ACTION CREATORS
export function getStudent(student) {
    const action = { type: GET_STUDENT, student };
    return action;
}

export function getStudents(students) {
    const action = { type: GET_STUDENTS, students };
    return action;
}

export function updateStudentAction(student){
    const action = { type: UPDATE_STUDENT, student };
    return action;
}

export function removeStudent(student) {
    const action = { type: REMOVE_STUDENT, student };
    return action;
}

// THUNK CREATORS
export function fetchStudents() {

    return function thunk(dispatch) {
        return axios.get('/api/students')
            .then(res => res.data)
            .then(students => {
                const action = getStudents(students);
                dispatch(action);
            });
    };
}

export function postStudent(student, history) {

    return function thunk(dispatch) {
        return axios.post('/api/students', student)
            .then(res => res.data)
            .then(newStudent => {
                dispatch(getStudent(newStudent));
                history.push(`/students/${newStudent.id}`);
            });
    };
}

export function updateStudent(studentId, updateProp, history) {

    return function thunk(dispatch) {
        return axios.put(`/api/students/${studentId}`, updateProp)
            .then(res => res.data)
            .then(updatedStudent => {
                dispatch(updateStudentAction(updatedStudent));
                history.push(`/students/${studentId}`);
            });
    };
}

// REDUCER
export default function reducer(state = [], action) {

    switch (action.type) {

        case GET_STUDENTS:
            return action.students;

        case GET_STUDENT:
            return [...state, action.student];

        case UPDATE_STUDENT:
            const updatedStudents = state.map((student) => {
                if (student.id !== action.student.id) {
                    return student
                }
                return action.student
            })
            return updatedStudents

        case REMOVE_STUDENT:
            const filteredStudents = state.filter(student => student.id !== action.student.id)
            return filteredStudents

        default:
            return state;
    }

}
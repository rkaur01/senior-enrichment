const WRITE_STUDENT_CAMPUS = 'WRITE_STUDENT_CAMPUS';

export function writeStudentCampus(studentCampusId) {
    const action = { type: WRITE_STUDENT_CAMPUS, studentCampusId };
    return action;
}

export default function reducer(state = 0, action) {
    
        switch (action.type) {
                
            case WRITE_STUDENT_CAMPUS:
                return action.studentCampusId;   
    
            default:
                return state;
        }
    
    }
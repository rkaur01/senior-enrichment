import React, {Component} from 'react';
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { getStudent, fetchStudents } from '../reducers/students'

class Student extends Component{

    componentDidMount(){
        const studentId = this.props.match.params.studentId
        store.dispatch(fetchStudents())
    }

    render(){
    const student = this.props.student;

    return (
        <student>
            {!!student &&
                <div>
                    <h1>{student.name}</h1>
                    <h3>Email: {student.email}</h3>
                    <h3>Campus:                                     
                {student.campus?<NavLink to={`/campuses/${student.campus.id}`}>
            <span> {student.campus.name} </span>
                    </NavLink>:
                <span> No campus </span>}
                    </h3> 

                </div>
            }
        </student>
    )}
}

const mapStateToProps = function (state, ownProps) {
    const studentId = Number(ownProps.match.params.studentId)
    const selectedStudent = state.students.filter(student => student.id == studentId)[0]
    return {
        student: selectedStudent
    }
}


export default withRouter(connect(mapStateToProps)(Student));
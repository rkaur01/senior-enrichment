import React, {Component} from 'react';
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStudentCampus } from '../reducers/campuses'
import { getStudent, fetchStudents } from '../reducers/students'

class Student extends Component{

    // const { student, campus } = props
    componentDidMount(){
        const studentId = this.props.match.params.studentId
        store.dispatch(fetchStudents())
        store.dispatch(fetchStudentCampus(studentId))        
    }

    render(){
    //props returns students but not campus, WHY?
    const student = this.props.student;
    const campus = this.props.campus;
    console.log('student ', student)
    console.log('campus', this.props)
    return (
        <student>
            {!!student &&
                <div>
                    <h1>{student.name}</h1>
                    <h3>Email: {student.email}</h3>
                    <h3>Campus: </h3> 
                    {/*2 ERRORS: when page renders I get cannot read id of undefined 
                    but somehow it still reads the name off the same undefined obj
                    also when I do click this link it sends an err in campus.js 
                    saying state.campuses.filter is not a function*/}                                     
                    <NavLink to={`/campuses/${campus.id}`}>
            <span>{campus.name} </span>
                    </NavLink>

                </div>
            }
        </student>
    )}
}

const mapStateToProps = function (state, ownProps) {
    const studentId = Number(ownProps.match.params.studentId)
    const selectedStudent = state.students.filter(student => student.id == studentId)[0]
    console.log('MAPSTATE RETURNS', state)
    return {
        student: selectedStudent,
        campus: state.campuses[0]
    }
}


export default withRouter(connect(mapStateToProps)(Student));
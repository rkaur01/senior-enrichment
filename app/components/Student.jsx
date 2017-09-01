import React, { Component } from 'react';
import store from '../store';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchStudents, updateStudent } from '../reducers/students'
import { writeStudentCampus } from '../reducers/studentCampus'


class Student extends Component {

    componentDidMount() {
        const studentId = this.props.match.params.studentId
        store.dispatch(fetchStudents())
    }

    render() {
        const { campuses, student, selectedCampusId, handleSubmit, handleChange } = this.props;
        

        return (
            <student>
                {!!student &&
                    <div>
                        <h1>{student.name}</h1>
                        <h3>Email: {student.email}</h3>
                        <h3>Campus:
                {student.campus ? <NavLink to={`/campuses/${student.campus.id}`}>
                                <span> {student.campus.name} </span>
                            </NavLink> :
                                <span> No campus </span>}
                        </h3>
                        <br/><br/>
                    </div>
                }
                {/*EDIT STUDENT FORM*/}
                <form onSubmit={evt => handleSubmit(evt, selectedCampusId, student.id)}>
                    <div className="form-group">
                        <h4><label htmlFor="name">Edit Student</label></h4>
                        <input
                            className="form-control"
                            type="text"
                            name="studentName"
                            placeholder="Enter student name"
                        />
                        <input
                            className="form-control"
                            type="text"
                            name="studentEmail"
                            placeholder="Enter student email"
                        />
                        <select onChange={handleChange} name="studentCampusId">
                            {campuses.length && campuses.map(campus =>
                                <option key={campus.id} value={campus.id}>{campus.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-default">Edit Student</button>
                    </div>
                </form>
            </student>
        )
    }
}

const mapStateToProps = function (state, ownProps) {
    const studentId = Number(ownProps.match.params.studentId)
    const selectedStudent = state.students.filter(student => student.id == studentId)[0]
    return {
        student: selectedStudent,
        campuses: state.campuses,
        selectedCampusId: state.studentCampusId        
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleChange(evt){
            dispatch(writeStudentCampus(evt.target.value))
        },
        handleSubmit(evt, campusId, studentId) {
            evt.preventDefault();
            const updatedProps = {};
            const name = evt.target.studentName.value
            const email = evt.target.studentEmail.value
            if(name){
                updatedProps.name=name
            }
            if(email){
                updatedProps.email=email
            }
            if(campusId){
                updatedProps.campusId=campusId
            }
            dispatch(updateStudent(studentId,updatedProps, ownProps.history));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Student));
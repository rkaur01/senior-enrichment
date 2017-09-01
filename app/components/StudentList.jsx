import React from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { postStudent } from '../reducers/students'


function StudentList(props) {
    const { students, handleSubmit } = props;
    var btnStyle = {
        fontSize: 50,
        paddingLeft: 60,
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'red'
    }
    return (
        <div>
            {/*ADD STUDENT BUTTON*/}
            <NavLink to="/students/addStudent" style={btnStyle}>+</NavLink>
            {/*LIST ALL STUDENTS*/}
            <ul>
                {students.map(student => {
                    return (
                        <li key={student.id}>
                            <NavLink to={`/students/${student.id}`}>
                                <span>{student.name} </span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>

        </div>
    )
}

const mapStateToProps = function (state) {
    return {
        students: state.students
    }
}

export default withRouter(connect(mapStateToProps)(StudentList));
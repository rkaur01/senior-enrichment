import React from 'react';
import {withRouter, NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

function StudentList(props) {
    console.log('are we here')
    const { students } = props;

    return(
        <ul>
        {students.map(student => {
            return (
                <li key = {student.id}>
                    <NavLink to={`/students/${student.id}`}>
                        <span>{student.name} </span>
                    </NavLink>
                </li>
            )
        })}
        </ul>
    )
}

const mapStateToProps = function(state){
    return{
        students: state.students
    }
}

export default withRouter(connect(mapStateToProps)(StudentList));
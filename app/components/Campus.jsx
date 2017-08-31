import React from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

function Campus(props) {

    const { campus, students } = props

    return (
        <campus>
            {!!campus &&
                <div>
                    <h2>{campus.name}</h2>
                    <img className="media-object" src={campus.image} alt="image" />
                    <ul>
                    {!!students.length && students.map(student => 
                        (
                            <li key = {student.id}>
                            <NavLink to={`/students/${student.id}`}>
                                <span>{student.name} </span>
                            </NavLink>
                        </li>
                        )
                    )
                    }
                    </ul>
                </div>
            }
        </campus>
    )
}

const mapStateToProps = function (state, ownProps) {
    const campusId = Number(ownProps.match.params.campusId)
    const selectedCampus = state.campuses.filter(campus => campus.id == campusId)[0]
    const campusStudents = state.students.filter(student => student.campusId == campusId)
    
    return {
        campus: selectedCampus,
        students: campusStudents
    }
}

export default withRouter(connect(mapStateToProps)(Campus));
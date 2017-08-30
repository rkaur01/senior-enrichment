import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

function Student(props) {

    const { student } = props

    return (
        <student>
            {!!student &&
                <div>
                    <h1>{student.name}</h1>
                    <h3>Email: {student.email}</h3>
                    {/*Maybe a navlink here to go your specific campus*/}
                    <h3>Campus: </h3>
                </div>
            }
        </student>
    );
}

const mapStateToProps = function (state, ownProps) {
    const studentId = Number(ownProps.match.params.studentId)
    const selectedStudent = state.students.filter(student => student.id == studentId)[0]
    return {
        student: selectedStudent
    }
}

export default withRouter(connect(mapStateToProps)(Student));
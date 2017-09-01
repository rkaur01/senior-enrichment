import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { postStudent } from '../reducers/students'
import { writeStudentCampus } from '../reducers/studentCampus'


function NewStudent(props) {
    const { campuses, selectedCampusId, handleSubmit, handleChange } = props;
    console.log('is this an id', selectedCampusId)
    return (
        <div>
        <h2>Add A Student</h2>
            <form onSubmit={evt => handleSubmit(evt, selectedCampusId)}>
                <div className="form-group">
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
                    <button type="submit" className="btn btn-default">Create Student</button>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses,
        selectedCampusId: state.studentCampusId
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleChange(evt){
            console.log('what is', evt.target.value)
            dispatch(writeStudentCampus(evt.target.value))
        },
        handleSubmit(evt, campusId) {
            evt.preventDefault();
            const name = evt.target.studentName.value
            const email = evt.target.studentEmail.value
            dispatch(postStudent({ name, email, campusId }, ownProps.history));
        }
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewStudent));
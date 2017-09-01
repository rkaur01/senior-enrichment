import React from 'react';
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { updateCampus } from '../reducers/campuses'


function Campus(props) {

    const { campus, students, handleSubmit } = props

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
                    </ul><br/><br/>
                    {/*ADD CAMPUS*/}
            <form onSubmit={evt => handleSubmit(evt, campus.id)}>
            <div className="form-group">
              <h3><label htmlFor="name">Edit Campus</label></h3>
              <input
                className="form-control"
                type="text"
                name="campusName"
                placeholder="Enter campus name"
              />
              <input
              className="form-control"
              type="text"
              name="campusUrl"
              placeholder="Enter campus image url"
            />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-default">Edit Campus</button>
            </div>
          </form>
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

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
        handleSubmit(evt, campusId) {
            evt.preventDefault();
            const updatedProps = {};
            const name = evt.target.campusName.value
            const image = evt.target.campusUrl.value
            if(name){
                updatedProps.name=name
            }
            if(image){
                updatedProps.image=image
            }
            dispatch(updateCampus(campusId,updatedProps, ownProps.history));
        }
    };
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Campus));
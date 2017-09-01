import React from 'react';
import Campus from './Campus'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { postCampus, removeCampus } from '../reducers/campuses'


function CampusList(props) {
    const { campuses, handleSubmit } = props;

    return (
        <div>
            <h3>Campuses</h3>
            <div className="row">
                {
                    campuses.map(campus => (
                        <div className="col-xs-4" key={campus.id}>
                            <NavLink className="thumbnail" to={`/campuses/${campus.id}`}>
                                <img src={campus.image} />
                                <div className="caption">
                                    <h3>
                                        <span>{campus.name}</span>
                                    </h3>
                                </div>
                            </NavLink>
                        </div>
                    ))
                }
            </div>
            {/*ADD CAMPUS*/}
            <form onSubmit={evt => handleSubmit(evt)}>
            <div className="form-group">
              <h3><label htmlFor="name">Add a Campus</label></h3>
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
              <button type="submit" className="btn btn-default">Create Campus</button>
            </div>
          </form>

        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    }
}

const mapDispatchToProps = function (dispatch, ownProps) {
    return {
      handleSubmit (evt) {
        evt.preventDefault();
        const name = evt.target.campusName.value
        const image = evt.target.campusUrl.value
        dispatch(postCampus({ name, image },ownProps.history));
      }
    };
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList));
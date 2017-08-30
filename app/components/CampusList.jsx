import React from 'react';
import Campus from './Campus'
import { withRouter, NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

function CampusList(props) {
    const { campuses } = props;

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
        </div>
    );
}

const mapStateToProps = function (state) {
    return {
        campuses: state.campuses
    }
}

export default withRouter(connect(mapStateToProps)(CampusList));
import React from 'react';
import {withRouter, NavLink} from 'react-router-dom'
import { connect } from 'react-redux';

function CampusList(props) {
    const { campuses } = props;

    return(
        <ul>
        {campuses.map(campus => {
            return (
                <li key = {campus.id}>
                    <NavLink to={`/campuses/${campus.id}`}>
                        <span>{campus.name} </span>
                    </NavLink>
                </li>
            )
        })}
        </ul>
    )
}

const mapStateToProps = function(state){
    return{
        campuses: state.campuses
    }
}

export default withRouter(connect(mapStateToProps)(CampusList));
import React from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

function Campus(props) {

    const { campus } = props

    return (
        <campus>
            {!!campus &&
                <div>
                    <img className="media-object" src={campus.image} alt="image" />
                    <h4>{campus.name}</h4>
                </div>
            }
        </campus>
    )
}

const mapStateToProps = function (state, ownProps) {
    const campusId = Number(ownProps.match.params.campusId)
    const selectedCampus = state.campuses.filter(campus => campus.id == campusId)[0]
    return {
        campus: selectedCampus
    }
}

export default withRouter(connect(mapStateToProps)(Campus));
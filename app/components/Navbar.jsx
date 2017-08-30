import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
    //EVENTUALLY USE FLEXBOX SO YOU CAN ALIGN BOTH LINKS TO THE RIGHT
    var btnStyle = {
        fontSize: 30,
        margin: 10,
        padding: 4,
        textDecoration: 'none',
        backgroundColor: '#d3d3d3',
    }
    return (
        <navbar>
            <NavLink to={'/campuses/'} style={btnStyle}>Home</NavLink>
            <NavLink to={'/students/'} style={btnStyle}>Students</NavLink>
            <hr />
        </navbar>
    )
}
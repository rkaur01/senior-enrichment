import React from 'react';
import { NavLink } from 'react-router-dom'

export default function Navbar(props) {

    return (
        <navbar>
            <NavLink to={'/campuses/'}>
            </NavLink>
            <NavLink to={'/students/'}>
            </NavLink>
        </navbar>
    )
}
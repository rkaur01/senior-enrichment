import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CampusList from './CampusList';
import Campus from './Campus';
import StudentList from './StudentList';
import Student from './Student';
import Navbar from './Navbar';
import store from '../store';
import { fetchCampuses } from '../reducers/campuses'
import { fetchStudents } from '../reducers/students'

export default class Main extends Component {
  
  componentDidMount() {
    const campusesThunk = fetchCampuses();
    store.dispatch(campusesThunk);
    const studentsThunk = fetchStudents();
    store.dispatch(studentsThunk);
  }

  render() {
    return (
      <Router>
        <div>
          <Navbar/>
          <Route exact path="/campuses" component={CampusList} />
          <Route exact path="/students" component={StudentList} />
          <Route path="/campuses/:campusId" component={Campus} />
          <Route exact path="/students/:studentId" component={Student} />          
        </div>
      </Router>

    );
  }
}
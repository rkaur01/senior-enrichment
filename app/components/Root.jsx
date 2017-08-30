import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import CampusList from './CampusList';
import StudentList from './StudentList';
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
          <Route path="/campuses" component={CampusList} />
          <Route path="/students" component={StudentList} />
        </div>
      </Router>

    );
  }
}
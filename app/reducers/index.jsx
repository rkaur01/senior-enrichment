import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'
import studentCampusId from './studentCampus'

const reducer = combineReducers({
  campuses,
  students,
  studentCampusId
})

export default reducer

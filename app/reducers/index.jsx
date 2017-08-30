import { combineReducers } from 'redux'
import campuses from './campuses'
import students from './students'

const initialState = {}

const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    default: return state
  }
};

const reducer = combineReducers({
  campuses,
  students,
  rootReducer
})

export default reducer

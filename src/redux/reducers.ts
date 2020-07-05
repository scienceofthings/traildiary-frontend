import { combineReducers } from '@reduxjs/toolkit'
import trailsReducer from './slices/trail'

const rootReducer = combineReducers({
  trails: trailsReducer,
})

export default rootReducer

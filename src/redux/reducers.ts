import { combineReducers } from '@reduxjs/toolkit'
import trailsReducer from './slices/trail'
import regionReducer from './slices/region'

const rootReducer = combineReducers({
  trails: trailsReducer,
  regions: regionReducer,
})

export default rootReducer

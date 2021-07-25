import { combineReducers } from '@reduxjs/toolkit'
import trailsReducer from './slices/trail'
import regionReducer from './slices/region'
import appReducer from './slices/app'

const rootReducer = combineReducers({
  trails: trailsReducer,
  regions: regionReducer,
  app: appReducer
})

export default rootReducer

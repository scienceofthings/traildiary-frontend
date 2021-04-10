import { combineReducers } from '@reduxjs/toolkit'
import trailsReducer from './slices/trail'
import categoryReducer from './slices/region'

const rootReducer = combineReducers({
  trails: trailsReducer,
  regions: categoryReducer,
})

export default rootReducer

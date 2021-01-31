import { combineReducers } from '@reduxjs/toolkit'
import trailsReducer from './slices/trail'
import categoryReducer from './slices/category'

const rootReducer = combineReducers({
  trails: trailsReducer,
  categories: categoryReducer,
})

export default rootReducer

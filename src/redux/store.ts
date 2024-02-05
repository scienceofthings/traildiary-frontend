import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

export default configureStore({
  enhancers: getDefaultEnhancers => {
    return getDefaultEnhancers()
  },
  reducer: rootReducer,
})

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const middleware = getDefaultMiddleware({
  thunk: {
    extraArgument: { api: 'http://localhost:3000/trails.json' },
  },
})

export default configureStore({
  middleware,
  reducer: rootReducer,
})

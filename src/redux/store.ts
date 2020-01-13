import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from './slices/trail'

const middleware = getDefaultMiddleware({
    thunk: {
        extraArgument: { api: 'http://localhost:3000/trails.json' }
    }
})

export default configureStore({
    middleware,
    reducer: rootReducer
});
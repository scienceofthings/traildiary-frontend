import { Action, AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from './reducers'
import { TrailState } from "./slices/trail"

export type RootState = ReturnType<typeof rootReducer>
type OptionalThunkArgument = { api: string }

// based on https://github.com/reduxjs/redux-thunk/issues/231#issuecomment-528028398
export type AsyncAction<R = void> = ThunkAction<
    Promise<R>,
    RootState,
    OptionalThunkArgument,
    AnyAction
    >

export type DispatchAction<T extends AnyAction = Action> = ThunkDispatch<
    RootState,
    OptionalThunkArgument,
    T
    >

export const useTypedSelector: TypedUseSelectorHook<TrailState> = useSelector
export const useTypedDispatch: () => DispatchAction = useDispatch
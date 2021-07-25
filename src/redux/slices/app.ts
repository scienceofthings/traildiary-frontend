import {createSlice, isAllOf, isFulfilled, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";
import {authenticate} from "../api/authenticate";
import {RootState} from "../index";
import {AnyAction} from "redux";

export type AppAuthState = 'UNAUTHORIZED' | 'AUTHORIZED'

type AppState = {
    authState: AppAuthState
}

const initialState: AppState = {
    authState: "AUTHORIZED"
}

function isActionWithPayloadDetail(action: AnyAction): action is PayloadAction<{ detail: string }> {
    return typeof action.payload?.detail === 'string'
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        dataFetchingFailedWithAuthorizationError: (state) => ({
            ...state,
            authState: 'UNAUTHORIZED'
        }),
        logout: (state) => ({
            ...state,
            authState: 'UNAUTHORIZED'
        })
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticate.fulfilled, (state) => ({
                ...state,
                authState: 'AUTHORIZED'
            }))
            .addCase(authenticate.rejected, (state) => ({
                ...state,
                authState: 'UNAUTHORIZED'
            }))
            .addMatcher(
                isAllOf(isRejectedWithValue, isActionWithPayloadDetail),
                (state) => {
                    return ({
                        ...state,
                        authState: 'UNAUTHORIZED'
                    })
                }

            )
            .addMatcher(
                isFulfilled,
                (state) =>
                    ({
                            ...state,
                            authState: 'AUTHORIZED'
                        })
            )
    }
})

export const isAuthenticated = (state: RootState): boolean => {
    return state.app.authState === 'AUTHORIZED'
}

export const { logout } = appSlice.actions

export default appSlice.reducer

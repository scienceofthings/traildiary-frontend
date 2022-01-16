import {createAsyncThunk} from "@reduxjs/toolkit";
import {getAuthenticationEndpoint} from "../../api/authenticate";

type AuthenticationResponse = {
    token: string
}

type AuthenticationParameters = {
    username: string,
    password: string
}

export const authenticate = createAsyncThunk<AuthenticationResponse, AuthenticationParameters>(
    'authentication/login',
    async (arg, thunkApi) => {
    const credentials = {
        username: arg.username,
        password: arg.password
    }
    const response = await fetch(getAuthenticationEndpoint(), {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify(credentials)
    })

    if (!response.ok) return thunkApi.rejectWithValue(await response.json())

    const result = await response.json()
    localStorage.setItem('jwt', result.access)

    return result
})
import {createAsyncThunk} from "@reduxjs/toolkit";
import {Trail} from "../slices/trail";
import {getTrailsEndpoint} from "../../api/trail";
import {getToken} from "../../misc/jsonWebToken";

export type FetchTrailsResult = Trail[]

export const fetchTrails = createAsyncThunk<FetchTrailsResult>(
    'trails/fetchTrails',
    async(arg, thunkApi) => {
        const response = await fetch(getTrailsEndpoint(), {
            headers: { accept: 'application/json', Authorization: 'JWT ' + getToken() }
        })
        if (!response.ok) return thunkApi.rejectWithValue(await response.json())

        return await response.json()
    }
)
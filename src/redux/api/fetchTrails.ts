import {createAsyncThunk} from "@reduxjs/toolkit";
import {Trail} from "../slices/trail";
import {getTrailsEndpoint} from "../../api/trail";

export const fetchTrails = createAsyncThunk<Trail[]>(
    'trails/fetchTrails',
    async(arg, thunkApi) => {
        const response = await fetch(getTrailsEndpoint(), {
            headers: { accept: 'application/json' }
        })
        if (!response.ok) return thunkApi.rejectWithValue(await response.json())

        return await response.json()
    }
)
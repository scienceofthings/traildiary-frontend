import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrailDetail} from "../slices/trail";
import {getTrailEndpoint} from "../../api/trail";

export const fetchTrail = createAsyncThunk<TrailDetail, number>(
    'trails/fetchTrail',
    async(trailId, thunkApi) => {
        const response = await fetch(getTrailEndpoint(trailId), {
            headers: { accept: 'application/json' }
        })
        if (!response.ok) return thunkApi.rejectWithValue(await response.json())

        return await response.json()
    }
)
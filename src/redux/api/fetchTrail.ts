import {createAsyncThunk} from "@reduxjs/toolkit";
import {TrailDetail} from "../slices/trail";
import {getTrailEndpoint} from "../../api/trail";
import {getToken} from "../../misc/jsonWebToken";

export const fetchTrail = createAsyncThunk<TrailDetail, number>(
    'trails/fetchTrail',
    async(trailId, thunkApi) => {
        const response = await fetch(getTrailEndpoint(trailId), {
            headers: { accept: 'application/json', Authorization: 'JWT ' + getToken() }
        })
        if (!response.ok) return thunkApi.rejectWithValue(await response.json())

        return await response.json()
    }
)
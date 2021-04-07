import {createAsyncThunk} from "@reduxjs/toolkit";
import {Regions} from "../slices/regions";
import {getRegionsEndpoint} from "../../api/regions";

export const fetchRegions = createAsyncThunk<Regions[]>(
    'regions/fetchRegions',
    async (arg, thunkApi) => {
    const response = await fetch(getRegionsEndpoint(), {
        headers: { accept: 'application/json' }
    })

    if (!response.ok) return thunkApi.rejectWithValue(await response.json())

    return await response.json()
})
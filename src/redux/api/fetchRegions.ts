import {createAsyncThunk} from "@reduxjs/toolkit";
import {Region} from "../slices/region";
import {getRegionsEndpoint} from "../../api/regions";
import {getToken} from "../../misc/jsonWebToken";

export const fetchRegions = createAsyncThunk<Region[]>(
    'regions/fetchRegions',
    async (arg, thunkApi) => {
    const response = await fetch(getRegionsEndpoint(), {
        headers: { accept: 'application/json' ,
            Authorization: 'JWT ' + getToken()}
    })

    if (!response.ok) return thunkApi.rejectWithValue(await response.json())

    return await response.json()
})
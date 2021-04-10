import { createSlice,  } from '@reduxjs/toolkit'
import { RootState} from '../index'
import {fetchRegions} from "../api/fetchRegions";
import {ErrorAndPendingAwareState} from "./trail";

export type Region = {
  id: number
  title: string
}

export type RegionsState = ErrorAndPendingAwareState<Region[]>

const initialState: RegionsState = {
  pending: false,
  data: undefined,
  error: false
}

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegions.pending, (state) => ({
      ...state,
      loading: true
    }))
    builder.addCase(fetchRegions.rejected, (state) => ({
      ...state,
      loading: false,
      error: true,
    }))
    builder.addCase(fetchRegions.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      error: false,
      data: action.payload
    }))
  }
})

export const selectRegionsData = (state: RootState): Region[] | undefined => (
  state.regions.data
)

export default regionsSlice.reducer

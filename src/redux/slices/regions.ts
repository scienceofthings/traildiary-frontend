import { createSlice,  } from '@reduxjs/toolkit'
import { RootState} from '../index'
import {fetchRegions} from "../api/fetchRegions";

export type Regions = {
  id: number
  title: string
}

export type RegionsState = {
  loading: boolean
  error: boolean
  data: Regions[]
}

const initialState: RegionsState = {
  loading: false,
  data: [],
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

export const selectRegionsData = (state: RootState): Regions[] => (
  state.regions.data
)

export default regionsSlice.reducer

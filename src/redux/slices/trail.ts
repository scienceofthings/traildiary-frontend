import { createSlice } from '@reduxjs/toolkit'
import { LatLngLiteral } from 'leaflet'
import { Regions } from "./regions";
import {fetchTrail} from "../api/fetchTrail";
import {fetchTrails} from "../api/fetchTrails";
import {RootState} from "../index";

export type ErrorAndPendingAwareState<T> = {
  pending: boolean
  error: boolean
  data?: T
}

export type ResponsiveImageSources = [string, string, string]

export type Trail = {
  id: number
  title: string
  region: Regions["id"]
  start_position: [number, number]
}

export type TrailDetail = Trail & {
  description: string
  technique: string
  todo: string
  gpx_file_name: string
  gpx_points: LatLngLiteral[]
  images: ResponsiveImageSources[]
}

export type TrailsSlice = {
  list: ErrorAndPendingAwareState<Trail[]>
  details: Partial<Record<number, ErrorAndPendingAwareState<TrailDetail>>>
}

const initialState: TrailsSlice = {
  list: {
    error: false,
    pending: false,
    data: []
  },
  details: {},
}

const trailsSlice = createSlice({
  name: 'trails',
  initialState,
  reducers: {},
  extraReducers: (builder => {
    builder.addCase(fetchTrail.fulfilled, (state, action) => ({
      ...state,
      details: {
        ...state.details,
        [action.meta.arg]: {
          data: action.payload,
          pending: false,
          error: false
        }
      }
    }))
    builder.addCase(fetchTrail.rejected, (state, action) => ({
      ...state,
      details: {
        ...state.details,
        [action.meta.arg]: {
          data: undefined,
          pending: false,
          error: false
        }
      }
    }))
    builder.addCase(fetchTrails.fulfilled, (state, action) => ({
      ...state,
      list: {
        pending: false,
        error: false,
        data: action.payload

      }
    }))
    builder.addCase(fetchTrails.rejected, (state) => ({
      ...state,
      list: {
        pending: false,
        error: true,
        data: undefined

      }
    }))
  })
})

export const selectTrailsData = (state: RootState): Trail[] => {
  if (state.trails.list.data === undefined) return []
  return state.trails.list.data
}

export const selectTrailData = (state: RootState, trailId: number): TrailDetail | undefined => {
  const trailDetail = state.trails.details[trailId]
  return trailDetail && trailDetail.data
}

export default trailsSlice.reducer

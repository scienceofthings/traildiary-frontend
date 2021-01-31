import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTrails } from '../../api/trail'
import { AsyncAction } from '../index'
import { LatLngLiteral } from 'leaflet'

export type Trail = {
  id: number
  title: string
  position: LatLngLiteral
  description: string
  gpxFile: string
  categoryId: number
  images: string[]
}

export type TrailsState = {
  loading: boolean
  error?: string | null
  trails: Trail[]
}

const initialState: TrailsState = {
  loading: false,
  trails: [],
}

const trailSlice = createSlice({
  name: 'trails',
  initialState,
  reducers: {
    trailsFetchSuccess: (state, action: PayloadAction<Trail[]>) => {
      return {
        ...state,
        loading: false,
        trails: action.payload,
      }
    },
    setVisibility: {
      reducer(state, action) {
        state.trails[action.payload.id] = action.payload.isVisible
      },
      // We need a prepare function as we need more than one argument for the setVisibility action.
      prepare(id: number, isVisible: boolean) {
        return {
          payload: { id, isVisible },
          meta: 'satisfyTypescript',
          error: 'satisfyTypescript',
        }
      },
    },
    trailsFetchFail: {
      reducer(state, action) {
        state.loading = false
        state.error = action.payload
        return state
      },
      prepare(errormessage: string) {
        return {
          payload: { errormessage },
          meta: 'satisfyTypescript',
          error: 'satisfyTypescript',
        }
      },
    },
    trailsLoading: (state) => {
      state.loading = true
      state.error = null
      return state
    },
  },
})

export const {
  trailsFetchSuccess,
  setVisibility,
  trailsFetchFail,
  trailsLoading,
} = trailSlice.actions
export default trailSlice.reducer

export const loadTrails = (): AsyncAction<void> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch(trailsLoading())
  try {
    const trails = await fetchTrails(api)
    dispatch(trailsFetchSuccess(trails))
  } catch (err) {
    dispatch(trailsFetchFail(err.toString()))
  }
}

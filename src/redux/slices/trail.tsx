import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchTrails } from "../../api/trails";
import { AsyncAction } from "../index";

export type Trail = {
        id: number,
        title: string,
        position: [number, number]
}

interface TrailVisibility {
    [id: number]: boolean
}

export type TrailState = {
    loading: boolean
    trails: Array<Trail>
    trailVisibility: TrailVisibility,
    error?: string | null
    session?: string
}

const initialState: TrailState = {
    loading: false,
    trails: [],
    trailVisibility: {}
}

const trailSlice = createSlice({
    name: 'trails',
    initialState,
    reducers: {
        trailsLoading: {
            reducer(state,action: PayloadAction<string>) {
                state.loading = true;
                state.error = null;
                return state;
            }
        },
        trailsFetchSuccess: {
            reducer(state, action: PayloadAction<Array<Trail>>) {
                const trails = action.payload;
                state.loading = false;
                state.error = null;
                trails.forEach(trail => {
                    state.trails.push(trail);
                    state.trailVisibility[trail.id] = false;
                });
            }
        },
        trailsFetchFail: {
            reducer(state, action) {
                state.loading = false;
                state.error = action.payload;
                return state;
            }
        },
       setVisibility:  {
            reducer(state, action) {
                state.loading = false;
                state.error = null;
                const { id, visible } = action.payload;
                state.trailVisibility[id] = visible;
            },
           prepare(id, visible) {
               return { payload: {id, visible } }
           }

       }
   }
});


export const { trailsLoading, trailsFetchSuccess, trailsFetchFail, setVisibility } = trailSlice.actions;
export default trailSlice.reducer;

export const loadTrails = (): AsyncAction<void> => async (dispatch, getState, {api}) => {
    dispatch(trailsLoading())
    try {
        const trails = await fetchTrails(api)
        dispatch(trailsFetchSuccess(trails))
    } catch (err) {
        dispatch(trailsFetchFail(err.toString()))
    }
}



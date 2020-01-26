import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { fetchTrails } from "../../api/trails";
import { AsyncAction } from "../index";

export type Trail = {
        id: number,
        title: string,
        position: [number, number]
}

export type TrailVisibility = {
    [id: number]: boolean
}

export type TrailState = {
    loading: boolean
    trails: Array<Trail>
    trailVisibility: TrailVisibility,
    error?: string | null
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
        trailsFetchSuccess: {
            reducer(state, action) {
                const trails: Trail[] = action.payload.trails;
                state.loading = false;
                state.error = null;
                trails.forEach(trail => {
                    state.trails.push(trail);
                    state.trailVisibility[trail.id] = false;
                });
            },
            prepare(trails: PayloadAction<Trail[]>) {
                return {
                    payload: {trails}
                }
            }
        },
        setVisibility:  {
            reducer(state, action) {
                state.loading = false;
                state.error = null;
                const { id, visible } = action.payload;
                state.trailVisibility[id] = visible;
            },
            prepare(id: number, visible: boolean) {
                return { payload: {id, visible } }
            }
        },
        trailsFetchFail: {
            reducer(state, action) {
                state.loading = false;
                state.error = action.payload;
                return state;
            },
            prepare(errormessage: string) {
                return {
                    payload: { errormessage }
                }
            }
        },
        trailsLoading: (state) => {
                state.loading = true;
                state.error = null;
                return state;
        }
    }
});


export const { trailsFetchSuccess, setVisibility, trailsFetchFail, trailsLoading } = trailSlice.actions;
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



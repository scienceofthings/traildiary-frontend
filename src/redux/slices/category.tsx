import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AsyncAction } from '../index'
import { fetchCategories } from '../../api/category'

export type Category = {
  id: number
  title: string
}

export type CategoriesState = {
  loading: boolean
  error?: string | null
  categories: Category[]
}

const initialState: CategoriesState = {
  loading: false,
  categories: [],
}

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categoriesFetchSuccess: (state, action: PayloadAction<Category[]>) => {
      return {
        ...state,
        loading: false,
        categories: action.payload,
      }
    },
    categoriesFetchFail: {
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
    categoriesLoading: (state) => {
      state.loading = true
      state.error = null
      return state
    },
  },
})

export const {
  categoriesFetchSuccess,
  categoriesFetchFail,
  categoriesLoading,
} = categorySlice.actions
export default categorySlice.reducer

export const loadCategories = (): AsyncAction<void> => async (
  dispatch,
  getState,
  { api }
) => {
  dispatch(categoriesLoading())
  try {
    const categories = await fetchCategories(api)
    dispatch(categoriesFetchSuccess(categories))
  } catch (err) {
    dispatch(categoriesFetchFail(err.toString()))
  }
}

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import movieApi, { APIKey } from '../../common/apis/movieApi'

export const fetchAsyncMovies = createAsyncThunk(
  'movies/fetchAsyncMovies',
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=movie`,
    )
    return response.data
  },
)

export const fetchAsyncShows = createAsyncThunk(
  'movies/fetchAsyncShows',
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`,
    )
    return response.data
  },
)

export const fetchAsyncDetail = createAsyncThunk(
  'movies/fetchAsyncDetail',
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
    return response.data
  },
)

const initialState = { movies: {}, shows: {}, selected: {}, loading: false }

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    removeSelected: (state) => {
      state.selected = {}
    },
  },
  extraReducers: {
    [fetchAsyncMovies.pending]: (state) => {
      return { ...state, loading: true }
    },
    [fetchAsyncShows.pending]: (state) => {
      return { ...state, loading: true }
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      return { ...state, movies: payload, loading: false }
    },
    [fetchAsyncMovies.rejected]: (state) => {
      console.log('Rejected')
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      return { ...state, shows: payload, loading: false }
    },
    [fetchAsyncDetail.fulfilled]: (state, { payload }) => {
      console.log('Fetched sucessfully')
      return { ...state, selected: payload, loading: false }
    },
  },
})

export const { removeSelected } = movieSlice.actions

export const getAllMovies = (state) => {
  return state.movies.movies
}

export const getAllShows = (state) => {
  return state.movies.shows
}

export const getSelectedMovie = (state) => {
  return state.movies.selected
}

export default movieSlice.reducer

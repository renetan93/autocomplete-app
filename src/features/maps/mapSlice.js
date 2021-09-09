import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  history: [
    "Midvalley",
    "KLCC",
    "Digital Mall"
  ]
}

export const mapSlice = createSlice({
  name: "map",
  initialState: initialState,
  reducers: {
    addSearchHistory: (state, action) => {
      var arr = state.history.filter(x => x !== action.payload)
      state.history = [...arr, action.payload]
    },
    clearSearchHistory: (state) => {
      state.history = []
    },
    removeSearchHistory: (state, action) => {
      state.history = state.history.filter((v) => v !== action.payload)
    },
  }
})

export const { addSearchHistory, clearSearchHistory, removeSearchHistory } = mapSlice.actions
export default mapSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import mapReducer from '../features/maps/mapSlice'

export const store = configureStore({
  reducer: {
    map: mapReducer
  }
})
import { configureStore } from '@reduxjs/toolkit'
import toastReducer from './toastSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer
  },
})
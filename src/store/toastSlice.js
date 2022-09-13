import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  toasts: []
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    }
  } 
})

export const { addToast } = toastSlice.actions;

export default toastSlice.reducer;
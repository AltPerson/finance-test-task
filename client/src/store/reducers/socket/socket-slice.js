import { createSlice } from '@reduxjs/toolkit';

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    instance: null,
  },
  reducers: {
    connect: (state, action) => {
      state.instance = action.payload;
    },
    disconnect: (state) => {
      state.instance = null;
    },
  },
});

export const { connect, disconnect } = socketSlice.actions;

export const selectSocket = (state) => state.socket.instance;

export default socketSlice.reducer;

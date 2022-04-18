import { createSlice } from '@reduxjs/toolkit';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    channels: [],
  },
  reducers: {
    addChannel: (state, { payload: { channel } }) => {
      state.channels = [channel, ...state.messages];
    },
    removeChanell: (state, { payload: { id } }) => {
      state.channels = state.channels.filter((с) => с.id !== id);
    },
  },
});

export const { addChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;

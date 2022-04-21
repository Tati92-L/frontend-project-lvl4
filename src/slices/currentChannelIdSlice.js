import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice.js';

const currentChannelIdAdapter = createEntityAdapter();

const initialState = {
  id: null,
};

const currentChannelIdSlice = createSlice({
  name: 'currentChanelId',
  initialState,
  reducers: {
    updetaCurrentChannelId: (state, action) => ({ ...state, id: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.addChannel, (state, action) => ({ ...state, id: action.payload.id }))
      .addCase(channelActions.removeChannel, (state) => ({ ...state, id: 1 }));
  },
});

export const selectors = currentChannelIdAdapter.getSelectors((state) => state.currentChannelId);

export const { updetaCurrentChannelId } = currentChannelIdSlice.actions;

export default currentChannelIdSlice.reducer;

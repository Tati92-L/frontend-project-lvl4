import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice.js';

const initialState = {
  id: null,
};

const currentChannelIdAdapter = createEntityAdapter();

const currentChannelIdSlice = createSlice({
  name: 'currentChannelId',
  initialState,
  reducers: {
    updateCurrentChannelId: (state, action) => ({ ...state, id: action.payload }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelActions.addChannel, (state, action) => ({ ...state, id: action.payload.id }))
      .addCase(channelActions.removeChannel, (state) => ({ ...state, id: 1 }));
  },
});

export const selector = currentChannelIdAdapter.getSelectors((state) => state.currentChannelId);

export const { updateCurrentChannelId } = currentChannelIdSlice.actions;

export default currentChannelIdSlice.reducer;

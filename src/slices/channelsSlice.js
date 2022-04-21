import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: (state, { payload }) => channelsAdapter.removeOne(state, payload.id),
    renameChannel: (state, { payload }) => channelsAdapter.updateOne(state, {
      id: payload.id, changes: { name: payload.name },
    }),
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);

export const { actions } = channelsSlice;

export default channelsSlice.reducer;

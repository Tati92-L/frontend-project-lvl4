import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
    addMessages: messagesAdapter.addMany,
    removeMessage: (state, { payload }) => messagesAdapter.removeOne(state, payload.id),
  },
  extraReducers: (builder) => {
    builder.addCase(channelActions.removeChannel, (state, action) => {
      const channelId = action.payload;
      const mesEntities = Object.values(state.entities);
      const restEntities = mesEntities.filter((e) => e.channelId !== channelId.id);
      messagesAdapter.setAll(state, restEntities);
    });
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);

export const { actions } = messagesSlice;

export default messagesSlice.reducer;

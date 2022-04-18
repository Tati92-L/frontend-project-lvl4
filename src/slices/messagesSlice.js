import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, { payload: { message } }) => {
      state.messages = [message, ...state.messages];
    },
    removeMessage: (state, { payload: { id } }) => {
      state.messages = state.messages.filter((с) => с.id !== id);
    },
  },
});

export const { addMessage, removeMessage } = messagesSlice.actions;

export default messagesSlice.reducer;

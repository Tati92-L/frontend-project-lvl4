import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import currentChannelIdReducer from './currentChannelIdSlice.js';

export default configureStore({
  reducer: {
    channelsStore: channelsReducer,
    messagesStore: messagesReducer,
    currentChannelIdStore: currentChannelIdReducer,
  },
});

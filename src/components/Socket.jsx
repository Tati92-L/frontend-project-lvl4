import React, { createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions as messageActions } from '../slices/messagesSlice.js';
import { actions as channelActions } from '../slices/channelsSlice.js';
import useAuth from '../hooks/index.jsx';
import logger from '../../lib/logger.js';

export const SocketContext = createContext(null);

export default function SocketContextProvider({ children, socket }) {
  const dispatch = useDispatch();
  const { loggedIn } = useAuth();

  useEffect(() => {
    socket.on('connect', () => {
      logger(socket);
    });
  }, [socket, dispatch]);

  const sendMessage = (messageText, currentChat, username) => {
    socket.emit('newMessage', { messageText, channelId: currentChat, author: username }, (response) => {
      console.log(response);
    });
  };

  const createNewChannel = ({ name, author }) => {
    socket.emit('newChannel', { name, author }, (response) => {
      console.log(response);
    });
  };

  const removeChannel = (id) => {
    socket.emit('removeChannel', { id }, (response) => {
      console.log(response);
    });
  };

  const renameChannel = ({ id, name }) => {
    socket.emit('renameChannel', { id, name }, (response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      dispatch(messageActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelActions.addChannel(channel));
    });

    socket.on('removeChannel', (channel) => {
      dispatch(channelActions.removeChannel(channel));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(channelActions.renameChannel(channel));
    });
  }, [socket, dispatch, loggedIn]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SocketContext.Provider value={{
      sendMessage, createNewChannel, removeChannel, renameChannel,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
}

/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector, useDispatch, batch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import routes from '../../routes.js';
import { actions as channelsActions, selectors as channelsSelectors } from '../../slices/channelsSlice.js';
import { updateCurrentChannelId } from '../../slices/currentChannelIdSlice.js';
import { actions as messagesActions, selectors as messageSelectors } from '../../slices/messagesSlice.js';
import useAuth from '../../hooks/useAuth.jsx';
import ChatColumn from './ChatColumn.jsx';
import ChatMessages from './ChatMessages.jsx';
import getModal from '../../ModalsElements/modal.js';
import useSocket from '../../hooks/useSocket.jsx';

const renderModal = (modalInfo, hideModal) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} onHide={hideModal} />;
};

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const getUsername = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (userId) {
    return userId.username;
  }

  return null;
};

export default function ChatPage() {
  const { loggedIn } = useAuth();
  const dispatch = useDispatch();
  const { sendMessage, createNewChannel } = useSocket();

  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const hideModal = () => setModalInfo({ type: null, item: null });
  const showModal = (type, item = null) => setModalInfo({ type, item });

  useEffect(() => {
    const fetchContent = async () => {
      if (loggedIn) {
        const response = await axios.get(routes.usersData(), { headers: getAuthHeader() });

        const { channels, currentChannelId, messages } = response.data;

        batch(() => {
          dispatch(channelsActions.addChannels(channels));
          dispatch(updateCurrentChannelId(currentChannelId));
          dispatch(messagesActions.addMessages(messages));
        });
      }
    };
    fetchContent();
  }, [dispatch]);

  const allChannels = useSelector((state) => channelsSelectors.selectAll(state));
  const allMessages = useSelector((state) => messageSelectors.selectAll(state));

  const initialChannels = allChannels.filter(({ removable }) => !removable);
  const authChannels = allChannels.filter(({ author }) => author === getUsername());
  const currentChannelId = useSelector((state) => state.currentChannelId.id);
  const channelMessages = allMessages.filter(({ channelId }) => channelId === currentChannelId);

  const currentChannel = useSelector((state) => channelsSelectors.selectById(state, currentChannelId));

  if (!loggedIn) {
    return <Navigate to="login" />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white">
        <ChatColumn channels={[...initialChannels, ...authChannels]} currentChat={currentChannelId} createNewChannel={createNewChannel} showModal={showModal} />
        <ChatMessages messages={channelMessages} currentChannelId={currentChannelId} currentChannelName={currentChannel?.name} sendMessage={sendMessage} />
        {renderModal(modalInfo, hideModal)}
      </Row>
    </Container>
  );
}

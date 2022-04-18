/* eslint-disable max-len */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import _ from 'lodash';
import { Container, Row } from 'react-bootstrap';
import routes from '../../routes.js';
// import { addChannel } from './slices/channelsSlice.js';
import useAuth from '../../hooks/index.jsx';
import ChatColumn from './ChatColumn.jsx';
import ChatMessages from './ChatMessages.jsx';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export default function ChatPage() {
  const [text, setText] = useState('');
  const { loggedIn } = useAuth();

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await axios.get(routes.usersData(), { headers: getAuthHeader() });
      console.log('data: ', data);
      setText(data.channels);
    };
    fetchContent();
  }, []);

  if (!loggedIn) {
    return <Navigate to="login" />;
  }

  // const fn = async () => {
  // const response = await axios.get('https://ru.hexlet.io');
  // const dispatch = useDispatch();
  // const handleAddChannel = (e) => {
  //   e.preventDefault();
  //   const channel = { text, id: _.uniqueId() };
  //   dispatch(addChannel({ channel }));
  //   setText('');
  // };

  // const handleUpdateNewTaskText = (e) => setText(e.target.value);

  const handleAddChannel = () => {};

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="row h-100 bg-white">
        <ChatColumn text={text} handleAddChannel={handleAddChannel} />
        <ChatMessages />
      </Row>
    </Container>
  );
}

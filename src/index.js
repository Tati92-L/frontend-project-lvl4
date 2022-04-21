/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
// @ts-nocheck

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App.jsx';
// eslint-disable-next-line import/order
import { io } from 'socket.io-client';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const socket = io();

const container = document.querySelector('#chat');

ReactDOM.render(<App socket={socket} />, container);

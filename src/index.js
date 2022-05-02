/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-filename-extension */
// @ts-nocheck

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import ReactDOM from 'react-dom';
import init from './init.jsx';
// eslint-disable-next-line import/order
import { io } from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const runApp = async () => {
  const socket = io();
  const app = await init(socket);

  const container = document.querySelector('#chat');

  ReactDOM.render(app, container);
};
runApp();

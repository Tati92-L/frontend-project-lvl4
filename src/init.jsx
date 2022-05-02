// @ts-check
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import ru from './locales/ru.js';
import App from './components/App.jsx';
import store from './slices/index.js';

export default async (socket) => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: ru,
    });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nextInstance}>
        <App socket={socket} />
      </I18nextProvider>
    </Provider>
  );
};
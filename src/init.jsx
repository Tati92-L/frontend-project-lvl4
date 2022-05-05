// @ts-check
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import filter from 'leo-profanity';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';
import ru from './locales/ru.js';
import App from './components/App.jsx';
import store from './slices/index.js';

export default async (socket) => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance.use(initReactI18next).init({
    lng: 'ru',
    resources: ru,
  });

  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));

  const rollbarConfig = {
    accessToken: `${process.env.ROLLBAR_ACCESS_TOKEN}`,
    captureUncaught: true,
    captureUnhandledRejections: true,
    payload: {
      environment: 'production',
    },
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18nextInstance}>
            <App socket={socket} />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

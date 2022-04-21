import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatPage from './ChatParts/ChatPage.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import AuthContext from '../contexts/index.jsx';
import Header from './Header.jsx';
import { SocketContextProvider } from './Socket.jsx';

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(() => !!localStorage.getItem('userId'));

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>{children}</AuthContext.Provider>
  );
}

export default function App({ socket }) {
  return (
    <AuthProvider>
      <SocketContextProvider socket={socket}>
        <Router>
          <Header />
          <div className="container p-3">
            <Routes>
              <Route path="/" element={<ChatPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </SocketContextProvider>
    </AuthProvider>
  );
}

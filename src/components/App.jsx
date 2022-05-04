import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import ChatPage from './ChatParts/ChatPage.jsx';
import Login from './Login.jsx';
import NoMatch from './NoMatch.jsx';
import AuthContext from '../contexts/index.jsx';
import Header from './Header.jsx';
import SignUp from './SignUp.jsx';
import SocketContextProvider from './Socket.jsx';
import ToastifyProvider from './Toastify.jsx';

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
    <div className="d-flex flex-column h-100 bg-light">
      <ToastifyProvider>
        <AuthProvider>
          <SocketContextProvider socket={socket}>
            <Router>
              <Header />
              <Container className="p-3">
                <Routes>
                  <Route path="/" element={<ChatPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<NoMatch />} />
                  <Route path="/signup" element={<SignUp />} />
                </Routes>
              </Container>
            </Router>
          </SocketContextProvider>
        </AuthProvider>
      </ToastifyProvider>
    </div>
  );
}

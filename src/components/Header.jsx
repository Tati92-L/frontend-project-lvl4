import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

function AuthButton() {
  const { loggedIn, logOut } = useAuth();
  const location = useLocation();
  console.log('login', loggedIn);
  return loggedIn ? (
    <Button onClick={logOut}>Выйти</Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      Войти
    </Button>
  );
}

export default function Header() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Hexlet Chat
        </Navbar.Brand>
        <AuthButton className="btn btn-primary" />
      </Container>
    </Navbar>
  );
}

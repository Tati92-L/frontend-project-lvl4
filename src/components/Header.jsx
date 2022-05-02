import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';

function AuthButton() {
  const { loggedIn, logOut } = useAuth();
  const location = useLocation();
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return loggedIn ? (
    <Button onClick={logOut}>{t('logoutBtn')}</Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      Войти
    </Button>
  );
}

export default function Header() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('logoutHead')}
        </Navbar.Brand>
        <AuthButton className="btn btn-primary" />
      </Container>
    </Navbar>
  );
}

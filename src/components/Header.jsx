import React from 'react';
import { Button, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.jsx';

function AuthButton() {
  const { loggedIn, logOut } = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return loggedIn ? <Button onClick={logOut}>{t('logoutBtn')}</Button> : null;
}

export default function Header() {
  const { t } = useTranslation('translation', { keyPrefix: 'header' });

  return (
    <Navbar bg="light" expand="lg" className="shadow-sm bg-white">
      <Container>
        <Navbar.Brand as={Link} to="/">
          {t('logoutHead')}
        </Navbar.Brand>
        <AuthButton />
      </Container>
    </Navbar>
  );
}

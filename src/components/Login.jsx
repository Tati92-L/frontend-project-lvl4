import React, { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { Button, Container, Form, Row, Col, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import useToastify from '../hooks/useToastify.jsx';
import routes from '../routes.js';
import loginImg from '../img/img.js';

export default function Login() {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const auth = useAuth();

  const { t } = useTranslation('translation', { keyPrefix: 'loginPage' });
  const { errorMessage } = useToastify();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const userSchema = object().shape({
    name: string().min(3, t('loginValidation.nameMinValid')).max(20, t('loginValidation.nameMaxValid')).required(t('loginValidation.requiredName')),
    password: string().min(6, t('loginValidation.passwordMinValid')).required(t('loginValidation.requiredPassword')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },

    userSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.loginPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        if (err.message === 'Network Error') {
          errorMessage(t('networkError'));
        }
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          inputRef.current.select();
          navigate('/login');
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={loginImg} width="160px" className="rounded-circle" alt="Войти" />
                </Col>
                <Col>
                  <Card.Title className="text-center mb-4">
                    <h2>{t('loginTitle')}</h2>
                  </Card.Title>
                  <Form onSubmit={formik.handleSubmit} className="form-floating">
                    {authFailed ? <Alert variant="danger">{t('errorMessageLogin')}</Alert> : null}
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        onChange={formik.handleChange}
                        name="username"
                        placeholder={t('loginForm.usernameLogin')}
                        className="form-control"
                        autoComplete="username"
                        required
                        id="username"
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('loginForm.usernameLogin')}</Form.Label>

                      {formik.touched.username && formik.errors.username ? (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {t('errorMessageLogin')}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        name="password"
                        placeholder={t('loginForm.passwordLogin')}
                        className="form-control"
                        autoComplete="current-password"
                        required
                        id="password"
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="password">{t('loginForm.passwordLogin')}</Form.Label>

                      {formik.touched.password && formik.errors.password ? (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {t('errorMessageLogin')}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100 mb-3">
                      {t('loginBtn')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('noAccount')} </span>
                <Link to="/signup">{t('registrationLink')}</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

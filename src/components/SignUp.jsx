import React, { useEffect, useRef, useState } from 'react';
import { object, string, ref } from 'yup';
import { useFormik } from 'formik';
import {
  Button, Container, Form, Row, Col, Card, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import useToastify from '../hooks/useToastify.jsx';
import routes from '../routes.js';
import signUpImg from '../img/signup.js';

export default function SignUp() {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation('translation', { keyPrefix: 'signUpPage' });
  const { errorMessage } = useToastify();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const userSchema = object().shape({
    username: string().min(3, t('signUpValidation.minMaxLength')).max(20, t('signUpValidation.minMaxLength')).required(t('signUpValidation.requiredName')),
    password: string().min(6, t('signUpValidation.passwordMinValid')).required(t('signUpValidation.requiredPassword')),
    confirmPassword: string().oneOf([ref('password'), null], t('signUpValidation.passwordMatch')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },

    userSchema,

    onSubmit: async (values) => {
      try {
        const response = await axios.post(routes.signUpPath(), values);
        localStorage.setItem('userId', JSON.stringify(response.data));
        auth.logIn();
        setAuthFailed(false);
        navigate('/');
      } catch (err) {
        if (err.message === 'Network Error') {
          errorMessage(t('networkError'));
        }
        if (err.isAxiosError && err.response.status === 409) {
          setAuthFailed(true);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="row justify-content-center align-content-center h-100">
        <Col xs md="8" xxl="6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">
                <Col md={6} className="d-flex align-items-center justify-content-center">
                  <img src={signUpImg} width="160px" className="rounded-circle" alt="Регистрация" />
                </Col>
                <Col>
                  <Card.Title className="text-center mb-4">
                    <h2>{t('signUpTitle')}</h2>
                  </Card.Title>
                  <Form className="form-floating" onSubmit={formik.handleSubmit}>
                    {
                    authFailed
                      ? <Alert variant="danger">{t('errorMessageSignUp')}</Alert>
                      : null
                  }
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="text"
                        onChange={formik.handleChange}
                        name="username"
                        placeholder={t('signUpForm.usernameSignUp')}
                        autoComplete="username"
                        required
                        id="username"
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('signUpForm.usernameSignUp')}</Form.Label>

                      {formik.touched.username && formik.errors.username ? (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {formik.errors.username}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        name="password"
                        placeholder={t('signUpForm.passwordSignUp')}
                        autoComplete="current-password"
                        required
                        id="password"
                        isInvalid={authFailed}
                      />
                      <Form.Label htmlFor="password">{t('signUpForm.passwordSignUp')}</Form.Label>
                      {formik.touched.password && formik.errors.password ? (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {formik.errors.password}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        onChange={formik.handleChange}
                        name="confirmPassword"
                        placeholder={t('signUpForm.confirmPassword')}
                        autoComplete="confirm-password"
                        required
                        id="username"
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                      <Form.Label htmlFor="username">{t('signUpForm.confirmPassword')}</Form.Label>
                      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                          {formik.errors.confirmPassword}
                        </Form.Control.Feedback>
                      ) : null}
                    </Form.Group>
                    <Button className="w-100" type="submit" variant="outline-primary">
                      {t('signUpBtn')}
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

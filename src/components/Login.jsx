import React, { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import {
  Button, Container, Form, Row, Col, Card,
} from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import routes from '../routes.js';

const userSchema = object().shape({
  name: string().min(3, 'Too Short!').max(20, 'Too Long!').required('Required'),
  password: string().min(6, 'Too Short!').required('Required'),
});

export default function Login() {
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },

    userSchema,

    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await axios.post(routes.loginPath(), values);
        if (response.status === 200) {
          localStorage.setItem('userId', JSON.stringify(response.data));
          auth.logIn();
          const { from } = location.state || { from: { pathname: '/' } };
          navigate(from);
        }
      } catch (err) {
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true);
          const { from } = location.pathname || { from: { pathname: '/login' } };
          navigate(from);
          inputRef.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Container className="h-100" fluid>
      <Row className="justify-content-center align-content-center h-100">
        <Col className="col-12 col-md-8 col-xxl-6">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="p-5">
                <Col md={6} className="class=" col-12 d-flex align-items-center justify-content-center>
                  <img src="./images/login.jpeg" className="rounded-circle" alt="Войти" />
                </Col>
                <Col>
                  <Card.Title className="text-center mb-4">
                    <h1>Войти</h1>
                  </Card.Title>
                  <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                    <Form.Group className="form-floating mb-3">
                      <Form.Label htmlFor="username">Ваш ник</Form.Label>
                      <Form.Control
                        onChange={formik.handleChange}
                        name="username"
                        placeholder="Ваш ник"
                        className="form-control"
                        autoComplete="username"
                        required
                        id="username"
                        isInvalid={authFailed}
                        ref={inputRef}
                      />
                    </Form.Group>
                    <Form.Group className="form-floating mb-4">
                      <Form.Label htmlFor="password">Пароль</Form.Label>
                      <Form.Control
                        onChange={formik.handleChange}
                        name="password"
                        placeholder="Пароль"
                        className="form-control"
                        autoComplete="current-password"
                        required
                        id="password"
                        type="password"
                        isInvalid={authFailed}
                      />
                      <Form.Control.Feedback type="invalid">Имя пользователя или пароль некорректны</Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" variant="outline-primary" className="w-100 mb-3 btn">
                      Войти
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                <Link to="/signup">Регистрация</Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

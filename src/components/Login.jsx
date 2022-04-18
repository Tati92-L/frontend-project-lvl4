import React, { useEffect, useRef, useState } from 'react';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
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
    <div className="col-12 col-md-6 mt-3 mt-mb-0">
      <h1 className="text-center mb-4">Login</h1>
      <Form onSubmit={formik.handleSubmit} className="p-3">
        <Form.Group>
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            name="username"
            placeholder="Your name"
            className="form-control"
            autoComplete="username"
            required
            id="username"
            isInvalid={authFailed}
            ref={inputRef}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            name="password"
            placeholder="Password"
            className="form-control"
            autoComplete="current-password"
            required
            id="password"
            type="password"
            isInvalid={authFailed}
          />
          <Form.Control.Feedback type="invalid">The username or password is incorrect</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" className="w-100 mb-3 btn">
          Submit
        </Button>
      </Form>
    </div>
  );
}

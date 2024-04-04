import React, { useState } from "react";
import { Button, Form, Message } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { validateLoginForm } from "./LoginValidation";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateLoginForm(values);
    setErrors(validationErrors);
    setSubmitted(true);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:3001/login', values);
        const { redirectTo } = response.data;

        console.log('Login response:', response.data); // Log the response data

        navigate(redirectTo);
      } catch (error) {
        console.error('Login error:', error);
        setErrors({ general: 'Invalid username or password' });
      }
    }
  };


  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} error={submitted && Object.keys(errors).length > 0}>
        <Form.Field>
          <label>Username</label>
          <input
            type='text'
            placeholder='Username'
            name="username"
            value={values.username}
            onChange={handleChange}
          />
          {submitted && errors.username && <Message error content={errors.username} />}
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            name="password"
            value={values.password}
            onChange={handleChange}
          />
          {submitted && errors.password && <Message error content={errors.password} />}
        </Form.Field>
        {submitted && errors.general && <Message error content={errors.general} />}
        <Form.Field>
          <label>Don't have an account?</label><br />
          <Link to='/register'>Sign up</Link>
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    </div>
  );
}

export default Login;

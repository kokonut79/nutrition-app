import React, { useState } from "react";
import { Button, Form, Message } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import './Register.css'; // You can define your CSS styles here
import { validateRegisterForm } from "./RegisterValidation"; // Import the validation logic for sign-up form
import axios from "axios";

function Register() {
    const [values, setValues] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateRegisterForm(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            console.log('Form submitted successfully:', values);
            axios.post('http://localhost:3001/register', values)
                .then(() => {
                    // Redirect to the login page
                    navigate('/login');
                }).then(res => console.log(res))
                .then(err => console.log(err))
                .catch(err => {
                    console.error('Error submitting form:', err);
                    // Handle error
                });
        } else {
            // Validation failed, display message
            console.log('Form validation failed:', validationErrors);
        }
    };

    return (
        <div className="register-container">
            <Form onSubmit={handleSubmit} error={Object.keys(errors).length > 0}>
                <Form.Field>
                    <label>Email</label>
                    <input
                        type='email'
                        placeholder='Email'
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    {errors.email && <Message error content={errors.email} />}
                </Form.Field>
                <Form.Field>
                    <label>Username</label>
                    <input
                        type='text'
                        placeholder='Username'
                        name="username"
                        value={values.username}
                        onChange={handleChange}
                    />
                    {errors.username && <Message error content={errors.username} />}
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
                    {errors.password && <Message error content={errors.password} />}
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <Message error content={errors.confirmPassword} />}
                </Form.Field>
                <Form.Field>
                    <label>Already have an account ?</label><br />
                    <Link to='/'>Login</Link>
                </Form.Field>
                <Button type='submit'>Sign Up</Button>
            </Form>
        </div >
    );
}

export default Register;

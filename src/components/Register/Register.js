import React from 'react'
import { FormField, Button, Form, Grid } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import './Register.css';

function Register() {
    return (
        <div className="register-container">
            <Grid className="register-grid">
                <Grid.Column className="register-form">
                    <Form>
                        <FormField>
                            <label>Username</label>
                            <input placeholder='Username' />
                        </FormField>
                        <FormField>
                            <label>Email</label>
                            <input type='email' placeholder='Email' />
                        </FormField>
                        <FormField>
                            <label>Password</label>
                            <input type='password' placeholder='Password' />
                        </FormField>
                        <FormField>
                            <label>Confirm Password</label>
                            <input type='password' placeholder='Confirm Password' />
                        </FormField>
                        <FormField>
                            <label>Already have an account? </label><br />
                            <Link to='/'>Log In</Link>
                        </FormField>
                        <Button type='submit'>Register</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </div>
    )
}

export default Register
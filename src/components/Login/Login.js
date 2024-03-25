import React from "react";
import { FormField, Button, Form, Grid } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import './Login.css'; // Import the CSS file

function Login() {
  return (
    <div className="login-container">
      <Grid className="login-grid">
        <Grid.Column className="login-form">
          <Form>
            <FormField>
              <label>Username</label>
              <input placeholder='Username' />
            </FormField>
            <FormField>
              <label>Password</label>
              <input placeholder='Password' />
            </FormField>
            <FormField>
              <label>Don't have an account? </label><br></br>
            </FormField>
            <FormField>
              <Link to='/register'> Sigh up</Link >
            </FormField>
            <Button type='submit'>Login</Button>
          </Form>
        </Grid.Column>
      </Grid>
    </div >
  );
}

export default Login;

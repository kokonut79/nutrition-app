import React from "react";
import { FormField, Button, Checkbox, Form, Grid } from 'semantic-ui-react';

function Login() {
  return (
    <Grid
      textAlign='center'
      style={{ height: '100vh' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form>
          <FormField>
            <label>Username</label>
            <input placeholder='Username' />
          </FormField>
          <FormField>
            <label>Password</label>
            <input placeholder='Password' />
          </FormField>
          <Button type='submit'>Login</Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default Login;

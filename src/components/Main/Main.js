import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Container } from 'semantic-ui-react';
import FoodsTable from '../../FoodsTable/FoodsTable';


function Main() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve user details from client-side state or local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <Container style={{ marginTop: '20px', textAlign: 'center' }}>
            {user && (
                <Header as='h2' style={{
                    backgroundColor: '#f0f0f0', padding: '10px',
                    borderRadius: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    display: 'inline-block'
                }}>
                    Welcome, {user.username}
                </Header>
            )}
            <Link to="/add-food">
                <Button primary style={{ marginLeft: '20px' }}>
                    Add Food
                </Button>
            </Link>
            <FoodsTable />
        </Container>
    );
}

export default Main;

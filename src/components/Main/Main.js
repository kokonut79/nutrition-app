import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

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
        <div>
            {user && <h2>Welcome, {user.username}</h2>}
            {/* Render your table component here */}
        </div>
    );
}
export default Main
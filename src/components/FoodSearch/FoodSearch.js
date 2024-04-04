import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'semantic-ui-react';

function FoodSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [foods, setFoods] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:3001/session');
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user from session:', error);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/foods/${user.id}`);
                setFoods(response.data);
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        };

        if (user) {
            fetchFoods();
        }
    }, [user]);

    const handleSearchChange = (event, data) => {
        setSearchTerm(data.value);
    };

    const filteredFoods = foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const foodOptions = filteredFoods.map(food => ({
        key: food.id,
        text: food.name,
        value: food.name,
    }));

    return (
        <Dropdown
            placeholder='Search foods...'
            fluid
            search
            selection
            options={foodOptions}
            value={searchTerm}
            onChange={handleSearchChange}
            className="ui fluid search selection dropdown"
        />
    );
}

export default FoodSearch;
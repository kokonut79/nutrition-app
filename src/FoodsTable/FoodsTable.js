import React, { useEffect, useState } from 'react';
import { Table } from 'semantic-ui-react';
import axios from 'axios';
import SelectedFoodsTable from '../Components/SelectedFoodsTable/SelectedFoodsTable';

function FoodsTable({ onGenerateData }) {
    const [userFoods, setUserFoods] = useState([]);
    const [user, setUser] = useState(null);
    const [selectedFoods, setSelectedFoods] = useState([])



    useEffect(() => {
        // Fetch user details from session
        axios.get('http://localhost:3001/session')
            .then(response => {
                const { user } = response.data;
                setUser(user);
                // Fetch foods data for the logged-in user from the backend API
                axios.get(`http://localhost:3001/foods/${user.id}`)
                    .then(response => {
                        // Filter foods to show only those added by the logged-in user
                        const userFoods = response.data.filter(food => food.userId === user.id);
                        setUserFoods(userFoods);
                    })
                    .catch(error => {
                        console.error('Error fetching foods:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching user session:', error);
            });
    }, [])
        ;

    const handleClick = () => {
        const storedData = localStorage.getItem("selectedFood");
        let existingProducts = storedData ? JSON.parse(storedData) : [];

        setSelectedFoods();
        localStorage.setItem("selectedFood", JSON.stringify(existingProducts));
    };

    useEffect(() => {
        onGenerateData(selectedFoods);
    }, [selectedFoods, onGenerateData]);

    return (
        <div style={{ margin: 'auto', width: '60%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Nutritional Values of Foods</h2>
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Food</Table.HeaderCell>
                        <Table.HeaderCell>Calories</Table.HeaderCell>
                        <Table.HeaderCell>Protein (g)</Table.HeaderCell>
                        <Table.HeaderCell>Fat (g)</Table.HeaderCell>
                        <Table.HeaderCell>Carbs (g)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {userFoods.map(food => (
                        <Table.Row key={food.id} onClick={() => handleClick(food)}>
                            <Table.Cell style={{ cursor: 'pointer' }}>{food.name}</Table.Cell>
                            <Table.Cell>{food.calories}</Table.Cell>
                            <Table.Cell>{food.protein}</Table.Cell>
                            <Table.Cell>{food.fat}</Table.Cell>
                            <Table.Cell>{food.carbs}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}

export default FoodsTable;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'semantic-ui-react';
import axios from 'axios';

function FoodsTable() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        // Fetch foods data from the backend API
        axios.get('http://localhost:3001/foods')
            .then(response => {
                // Set the foods state with the data received from the API
                setFoods(response.data);
            })
            .catch(error => {
                console.error('Error fetching foods:', error);
            });
    }, []);

    return (
        <div style={{ margin: 'auto', width: '60%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Nutritional Values of Foods</h2>
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
                    {foods.map(food => (
                        <Table.Row key={food.id}>
                            <Table.Cell>
                                {/* Link to the individual food page */}
                                <Link to={`/food/${food.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>{food.name}</Link>
                            </Table.Cell>
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

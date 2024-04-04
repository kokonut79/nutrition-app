import React, { useState } from 'react';
import { Table } from 'semantic-ui-react';

function SelectedFoodsTable() {
    const [selectedFoods, setSelectedFoods] = useState([]);

    // Function to add a food item to the selected foods table
    const addToSelectedFoodsTable = (food) => {
        setSelectedFoods(prevSelectedFoods => [...prevSelectedFoods, food]);
    };

    return (
        <div style={{ margin: 'auto', width: '60%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Selected Foods</h2>
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
                    {selectedFoods.map(food => (
                        <Table.Row key={food.id}>
                            <Table.Cell>{food.name}</Table.Cell>
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

export default SelectedFoodsTable;

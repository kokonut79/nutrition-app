import React from 'react';
import { Table } from 'semantic-ui-react';

function SelectedFoodsTable({ selectedFoods }) {
    // Calculate total values
    const totalValues = selectedFoods.reduce((total, food) => {
        total.calories += food.calories || 0;
        total.protein += food.protein || 0;
        total.fat += food.fat || 0;
        total.carbs += food.carbs || 0;
        return total;
    }, { calories: 0, protein: 0, fat: 0, carbs: 0 });

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
                    {selectedFoods.map((food, index) => (
                        <Table.Row key={index}>
                            <Table.Cell>{food.name}</Table.Cell>
                            <Table.Cell>{food.calories}</Table.Cell>
                            <Table.Cell>{food.protein}</Table.Cell>
                            <Table.Cell>{food.fat}</Table.Cell>
                            <Table.Cell>{food.carbs}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell>Total</Table.HeaderCell>
                        <Table.HeaderCell>{totalValues.calories}</Table.HeaderCell>
                        <Table.HeaderCell>{totalValues.protein}</Table.HeaderCell>
                        <Table.HeaderCell>{totalValues.fat}</Table.HeaderCell>
                        <Table.HeaderCell>{totalValues.carbs}</Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </div>
    );
}

export default SelectedFoodsTable;

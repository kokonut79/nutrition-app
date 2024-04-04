import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodsTable from '../../FoodsTable/FoodsTable';
import { Link } from 'react-router-dom';
import { Container, Header, Button, Grid } from 'semantic-ui-react';
import FoodSearch from '../FoodSearch/FoodSearch';
import SelectedFoodsTable from '../SelectedFoodsTable/SelectedFoodsTable';

function Main() {
    const [user, setUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFoods, setSelectedFoods] = useState([]);

    const addToSelectedFoodsTable = (food) => {
        setSelectedFoods(prevSelectedFoods => [...prevSelectedFoods, food]);
    };

    const [sharedData, setSharedData] = useState([]);

    useEffect(() => {
        const storedData = localStorage.getItem("selectedRows");
        if (storedData) {
            setSharedData(JSON.parse(storedData));
        }
        const fetchSession = async () => {
            try {
                const response = await axios.get('http://localhost:3001/session');
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        };

        fetchSession();
    }, []);

    return (
        <Container>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Column>
                    <Header as='h1'>Main Page</Header>
                    <FoodSearch setSearchQuery={setSearchQuery} />
                    <FoodsTable searchQuery={searchQuery} onGenerateData={setSharedData} />
                    <SelectedFoodsTable />

                    <div style={{ marginTop: '20px' }}>
                        <Link to="/add-food">
                            <Button primary>Add Food</Button>
                        </Link>
                    </div>
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default Main;

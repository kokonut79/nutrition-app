import React, { useState } from "react";
import { Button, Form, Message } from 'semantic-ui-react';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { validateAddFoodForm } from "./ValidateFoodForm";
import './AddFoodForm.css';

function AddFood() {
    const [formData, setFormData] = useState({
        name: '',
        calories: '',
        protein: '',
        fat: '',
        carbs: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateAddFoodForm(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            // Proceed with form submission
            console.log('Form submitted successfully:', formData);
            axios.get('http://localhost:3001/session')
                .then(response => {
                    const userId = response.data.user.id;
                    axios.post('http://localhost:3001/add-food', {
                        ...formData,
                        userId: userId
                    })
                        .then(() => {
                            // Redirect to the main page or update the food list
                            navigate('/main');
                        })
                        .catch(err => {
                            console.error('Error submitting form:', err);
                            // Handle error
                        });
                })
                .catch(error => {
                    console.error('Error getting session data:', error);
                });
        } else {
            // Validation failed, display message
            console.log('Form validation failed:', validationErrors);
        }
    };


    const handleCancel = () => {
        // Handle cancel action
        navigate('/main');
    };

    return (
        <div className="add-food-container">
            <Form className="add-food-form" onSubmit={handleSubmit} error={Object.keys(errors).length > 0}>
                <Form.Field>
                    <label>Name</label>
                    <input
                        placeholder='Name'
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <Message error content={errors.name} />}
                </Form.Field>
                <Form.Field>
                    <label>Calories</label>
                    <input
                        placeholder='Calories'
                        name="calories"
                        value={formData.calories}
                        onChange={handleChange}
                        type='number'
                    />
                    {errors.calories && <Message error content={errors.calories} />}
                </Form.Field>
                <Form.Field>
                    <label>Protein</label>
                    <input
                        placeholder='Protein'
                        name="protein"
                        value={formData.protein}
                        onChange={handleChange}
                        type='number'
                    />
                    {errors.protein && <Message error content={errors.protein} />}
                </Form.Field>
                <Form.Field>
                    <label>Fat</label>
                    <input
                        placeholder='Fat'
                        name="fat"
                        value={formData.fat}
                        onChange={handleChange}
                        type='number'
                    />
                    {errors.fat && <Message error content={errors.fat} />}
                </Form.Field>
                <Form.Field>
                    <label>Carbs</label>
                    <input
                        placeholder='Carbs'
                        name="carbs"
                        value={formData.carbs}
                        onChange={handleChange}
                        type='number'
                    />
                    {errors.carbs && <Message error content={errors.carbs} />}
                </Form.Field>

                <Button type='submit'>Add Food</Button>
                <Button secondary onClick={handleCancel}>Cancel</Button>
            </Form>
        </div>
    );
}

export default AddFood;

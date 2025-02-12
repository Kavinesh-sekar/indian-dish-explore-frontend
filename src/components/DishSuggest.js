import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip, Button,ListItem ,ListItemText} from "@mui/material";
import {getAllIncrediate,getIncrdiateBasedOnSerach}  from '../services/dishApi'
import { Link } from "react-router-dom";

const DishSuggest = () => {
    const [ingredients, setIngredients] = useState([]);  // List of all ingredients
    const [selectedIngredients, setSelectedIngredients] = useState([]);  // User-selected ingredients
    const [suggestedDishes, setSuggestedDishes] = useState([]);  // Dishes that match

    // Fetch all unique ingredients from the backend
    useEffect(() => {
        async function fetchIngredients() {
            try {
                const response = await getAllIncrediate();
                console.log('resss suffes',response);
                
                setIngredients(response)
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        }
        fetchIngredients();
    }, []);

    // Fetch dishes based on selected ingredients
    useEffect(() => {
        async function fetchDishes() {
            if (selectedIngredients.length === 0) {
                setSuggestedDishes([]);
                return;
            }
            try {
                const response = await getIncrdiateBasedOnSerach({
                    selectedIngredients :selectedIngredients
                })
                setSuggestedDishes(response);
            } catch (error) {
                console.error("Error fetching dishes:", error);
            }
        }
        fetchDishes();
    }, [selectedIngredients]);

    return (
        <div style={{ width: "50%", margin: "20px auto", textAlign: "center" }}>
            <h1>Dish Suggestion</h1>

            {/* Ingredient Selection */}
            <Autocomplete
                multiple
                options={ingredients}
                value={selectedIngredients}
                onChange={(event, newValue) => setSelectedIngredients(newValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip key={index} label={option} {...getTagProps({ index })} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} label="Select Ingredients" variant="outlined" />
                )}
                style={{ marginBottom: "20px" }}
            />

            {/* Selected Ingredients */}
            

            {/* Suggested Dishes */}
            <div style={{ marginTop: "20px" }}>
                <h2>Matching Dishes</h2>
                {suggestedDishes.length > 0 ? (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {suggestedDishes.map((dish, index) => (
                       
                            <ListItem key={dish.name} button component={Link} to={`/dish_details/${dish.name}` } >
                            <ListItemText primary={dish.name} secondary={dish.ingredients} />
                          </ListItem>
                        ))}
                    </ul>
                ) : (
                    <p>No matching dishes found.</p>
                )}
            </div>
        </div>
    );
};

export default DishSuggest;

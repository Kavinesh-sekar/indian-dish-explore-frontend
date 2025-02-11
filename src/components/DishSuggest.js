import React, { useEffect, useState } from "react";
import { Autocomplete, TextField, Chip, Button } from "@mui/material";
// import axios from "axios";

const DishSuggest = () => {
    const [ingredients, setIngredients] = useState([]);  // List of all ingredients
    const [selectedIngredients, setSelectedIngredients] = useState([]);  // User-selected ingredients
    const [suggestedDishes, setSuggestedDishes] = useState([]);  // Dishes that match

    // Fetch all unique ingredients from the backend
    useEffect(() => {
        async function fetchIngredients() {
            try {
                // const response = await axios.get("http://localhost:5000/api/ingredients");
                // setIngredients(response.data);
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
                // const response = await axios.post("http://localhost:5000/api/search-by-ingredients", {
                //     ingredients: selectedIngredients
                // });
                // setSuggestedDishes(response.data);
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
            <div>
                {selectedIngredients.length > 0 && (
                    <div>
                        <h3>Selected Ingredients:</h3>
                        {selectedIngredients.map((ingredient, index) => (
                            <Chip key={index} label={ingredient} style={{ margin: "5px" }} />
                        ))}
                    </div>
                )}
            </div>

            {/* Suggested Dishes */}
            <div style={{ marginTop: "20px" }}>
                <h2>Matching Dishes</h2>
                {suggestedDishes.length > 0 ? (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {suggestedDishes.map((dish, index) => (
                            <li key={index} style={{ fontSize: "18px", margin: "5px 0" }}>
                                🍽 {dish.name} ({dish.state})
                            </li>
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

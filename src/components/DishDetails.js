import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDishDetails } from '../services/dishApi';
import Styles from '../styles/DishDetails.module.css'
import { Card, CardContent, Typography } from '@mui/material';
const DishDetails = () => {
    const { name } = useParams();
    const [dishDetails, setDetails] = useState({});
    
    useEffect(() => {
        const getDish = async () => {
            try {
                const response = await getDishDetails(name);
                console.log('API Response:', response);
                setDetails(response);
            } catch (error) {
                console.error('Error fetching dish details:', error);
            }
        };

        if (name) {
            getDish();
        }
    }, [name]);
    
    console.log(dishDetails.name);
    

    return (
        <div className= {Styles.DishContainer}>
            <Card style={{ maxWidth: 600, margin: "20px auto" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {dishDetails.name}
        </Typography>
        <Typography variant="body1">Ingredients: {dishDetails.ingredients}</Typography>
        <Typography variant="body1">Diet: {dishDetails.diet}</Typography>
        <Typography variant="body1">Preparation Time: {dishDetails.prep_time} minutes</Typography>
        <Typography variant="body1">Cooking Time: {dishDetails.cook_time} minutes</Typography>
        <Typography variant="body1">Flavor: {dishDetails.flavor_profile}</Typography>
        <Typography variant="body1">Course: {dishDetails.course}</Typography>
        <Typography variant="body1">State: {dishDetails.state}</Typography>
        <Typography variant="body1">Region: {dishDetails.region}</Typography>
      </CardContent>
    </Card>
           
        </div>
    );
};

export default DishDetails;

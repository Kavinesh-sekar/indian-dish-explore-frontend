import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDishDetails } from "../services/dishApi";
import Styles from "../styles/DishDetails.module.css";
import { Card, CardContent, Typography } from "@mui/material";

const DishDetails = () => {
  const { name } = useParams();
  const [dishDetails, setDetails] = useState({});

  useEffect(() => {
    const getDish = async () => {
      try {
        const response = await getDishDetails(name);
        console.log("API Response:", response);
        setDetails(response);
      } catch (error) {
        console.error("Error fetching dish details:", error);
      }
    };

    if (name) {
      getDish();
    }
  }, [name]);

  return (
    <div className={Styles.DishContainer}>
      <Card sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 2, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            {dishDetails.name}
          </Typography>
          <Typography variant="body1">
            <strong>Ingredients:</strong> {dishDetails.ingredients}
          </Typography>
          <Typography variant="body1">
            <strong>Diet:</strong> {dishDetails.diet}
          </Typography>
          <Typography variant="body1">
            <strong>Preparation Time:</strong> {dishDetails.prep_time} minutes
          </Typography>
          <Typography variant="body1">
            <strong>Cooking Time:</strong> {dishDetails.cook_time} minutes
          </Typography>
          <Typography variant="body1">
            <strong>Flavor:</strong> {dishDetails.flavor_profile}
          </Typography>
          <Typography variant="body1">
            <strong>Course:</strong> {dishDetails.course}
          </Typography>
          <Typography variant="body1">
            <strong>State:</strong> {dishDetails.state}
          </Typography>
          <Typography variant="body1">
            <strong>Region:</strong> {dishDetails.region}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default DishDetails;

import React, { useEffect, useState } from "react";
import { getAllDish } from "../services/dishApi";
import Styles from "../styles/DishList.module.css";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableSortLabel,
    Select,
} from "@mui/material";

const DishList = () => {
    const [dishList, setList] = useState([]);  
    const [sortConfig, setSortConfig] = useState({ key: "name", order: "asc" }); 
    // const []
    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getAllDish();
            if (data?.data) {
                setList(data.data);
            }
        };
        fetchDishes();
    }, []);

     const sortData = (data, key, order) => {
        return [...data].sort((a, b) => {
            if (typeof a[key] === "number") {
                return order === "asc" ? a[key] - b[key] : b[key] - a[key]; 
            } else {
                return order === "asc"
                    ? a[key].toString().localeCompare(b[key].toString())
                    : b[key].toString().localeCompare(a[key].toString()); 
            }
        });
    };


    const handleSort = (column) => {
        const isAsc = sortConfig.key === column && sortConfig.order === "asc";
        const newOrder = isAsc ? "desc" : "asc"; 
        setSortConfig({ key: column, order: newOrder });

        // Sort the dish list
        setList(sortData(dishList, column, newOrder));
    };

    return (
        <>
            <div className={Styles.listcontainer}>
                <div className={Styles.filters}>

               


                    <div className={Styles.listTable}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {/* Column headers with sorting */}
                                        {[
                                            { key: "name", label: "Name" },
                                            { key: "diet", label: "Diet" },
                                            { key: "prep_time", label: "Prep Time" },
                                            { key: "flavor_profile", label: "Flavor" },
                                            { key: "state", label: "State" },
                                        ].map(({ key, label }) => (
                                            <TableCell key={key}>
                                                <TableSortLabel
                                                    active={sortConfig.key === key} // Highlight active column
                                                    direction={sortConfig.key === key ? sortConfig.order : "asc"} // Default direction
                                                    onClick={() => handleSort(key)} // Handle sorting on click
                                                >
                                                    {label}
                                                </TableSortLabel>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dishList.map((dish, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{dish.name}</TableCell>
                                            <TableCell>{dish.diet}</TableCell>
                                            <TableCell>{dish.prep_time}</TableCell>
                                            <TableCell>{dish.flavor_profile}</TableCell>
                                            <TableCell>{dish.state}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DishList;

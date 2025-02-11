import React, { useEffect, useState } from "react";
import { getAllDish,getDishDetails } from "../services/dishApi";
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
    MenuItem
} from "@mui/material";
import { Link } from "react-router-dom";

const DishList = () => {
    const [dishList, setList] = useState([]); 
    const [allDish, setAllDishList] = useState([]);  

    const [sortConfig, setSortConfig] = useState({ key: "name", order: "asc" }); 
    const [filters ,setFilters] = useState({diet :"",state : '' ,flavor : ''})

    // const []
    useEffect(() => {
        const fetchDishes = async () => {
            const data = await getAllDish();
            if (data?.data) {
                setList(data.data);
                setAllDishList(data.data);
            }
        };
        fetchDishes();
    }, []);



    useEffect(() => {
        let filteredData = allDish; 

        console.log('fffffffff',filteredData);
        

        if (filters.diet) {
        
            filteredData = filteredData.filter(dish => dish.diet === filters.diet);
        }
        if (filters.state) {
         
            filteredData = filteredData.filter(dish => dish.state === filters.state);
        }
        if (filters.flavor) {
          
            filteredData = filteredData.filter(dish => dish.flavor_profile === filters.flavor);
        }

        setList(filteredData);
    }, [filters, allDish]);

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


    const handleFilterChange = (event) =>{
      setFilters((prev)=>(
        {...prev , [event.target.name] : event.target.value}
      ))
    }

  

    return (
        <>
            <div className={Styles.listcontainer}>
                <div className={Styles.filters}>

          <Select
          value= {filters.diet}
          onChange={handleFilterChange}
          name="diet"
          displayEmpty
          style={{ minWidth: "120px" }}
        >
              <MenuItem value="">All Diet</MenuItem>
          {[...new Set(allDish.map((dish) => dish.diet))].map((diet) => (
            <MenuItem key={diet} value={diet}>
              {diet}
            </MenuItem>
          ))}
        </Select>

        <Select
                    value={filters.state}
                    onChange={handleFilterChange}
                    name="state"
                    displayEmpty
                    style={{ minWidth: "120px" }}
                >
                    <MenuItem value="">All States</MenuItem>
                    {[...new Set(allDish.map(dish => dish.state))].map(state => (
                        <MenuItem key={state} value={state}>
                            {state}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    value={filters.flavor}
                    onChange={handleFilterChange}
                    name="flavor"
                    displayEmpty
                    style={{ minWidth: "120px" }}
                >
                    <MenuItem value="">All Flavors</MenuItem>
                    {[...new Set(allDish.map(dish => dish.flavor_profile))].map(flavor => (
                        <MenuItem key={flavor} value={flavor}>
                            {flavor}
                        </MenuItem>
                    ))}
                </Select>
            

  


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
                                                    active={sortConfig.key === key} 
                                                    direction={sortConfig.key === key ? sortConfig.order : "asc"} 
                                                    onClick={() => handleSort(key)} 
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
                                           <TableCell>
                                            <Link to={`/dish_details/${dish.name}`}>{dish.name}</Link>
                                            </TableCell>
                                            
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

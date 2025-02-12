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
    MenuItem,
    TablePagination,
    Button
} from "@mui/material";
import { Link ,navigate, useNavigate} from "react-router-dom";

const DishList = () => {
    const navigate = useNavigate();
    const [dishList, setList] = useState([]);
    const [allDish, setAllDishList] = useState([]);

    const [sortConfig, setSortConfig] = useState({ key: "name", order: "asc" });
    const [filters, setFilters] = useState({ diet: "", state: "", flavor: "" });

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

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
        setPage(0); 
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

      
        setList(sortData(dishList, column, newOrder));
    };

    const handleFilterChange = (event) => {
        setFilters(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <>
            <div className={Styles.listcontainer}>
                <div className={Styles.filters}>

                    {/* Diet Filter */}
                    <Select
                        value={filters.diet}
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

                    {/* State Filter */}
                    <Select
                        value={filters.state}
                        onChange={handleFilterChange}
                        name="state"
                        displayEmpty
                        style={{ minWidth: "120px" ,minHeight:"10px"}}
                    >
                        <MenuItem value="">All States</MenuItem>
                        {[...new Set(allDish.map(dish => dish.state))].map(state => (
                            <MenuItem key={state} value={state}>
                                {state}
                            </MenuItem>
                        ))}
                    </Select>
                   

                    {/* Flavor Filter */}
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

                    <Button variant="outlined" color= "info" className={Styles.dishBtn} onClick={()=>navigate('/dish_suggester')}  >Dish Suggester</Button>
         
                    </div>

                    {/* Table with Pagination */}
                    <div className={Styles.listTable}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
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
                                    {dishList
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) 
                                        .map((dish, index) => (
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

                        {/* Pagination Component */}
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={dishList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </div>
                
            </div>
        </>
    );
};

export default DishList;

import React, { useEffect, useState } from "react";
import Styles from '../styles/header.module.css'
import { AppBar, Button, Typography ,Autocomplete,TextField} from "@mui/material";
import {getSearchResult} from '../services/dishApi'
import { useNavigate } from "react-router-dom";

const Header = ()=>{
  const [suggestionList,setSuggestionList] = useState([]);

  const [search,setSearch] = useState('');

  const navigate = useNavigate(); 
  
  useEffect(()=>{
    async function searchResult() {
      if(search.length >1){
      let response = await getSearchResult(search)
      console.log('search res',response);

      if (Array.isArray(response)) {
        setSuggestionList(response);
    } else {
        setSuggestionList([]);
    }

      
      // setSuggestionList(response)
      
    }
    else{
      setSuggestionList([])

    }
  }
  searchResult()
  },[search])

  console.log('sugggested' ,suggestionList)


    return(
        <>
        <div className={Styles.headerContainer}>

        <div className={Styles.headerLeft}>
          <h4 > Indian Cuisine</h4>

          <Button variant="outlined" color="red" onClick={()=>navigate('/dish_suggester')} >Suggestion</Button>
          </div>

          <div className={Styles.headerRight}>


<Autocomplete
    className={Styles.searchBox}
    freeSolo
    options={suggestionList} // Keep full object
    getOptionLabel={(option) => 
        typeof option === "string" ? option : `${option.name} - ${option.state} `
    } 
 
    style={{ width: 300, marginRight: "20px" }}
    renderInput={(params) => (
        <TextField
            {...params}
            label="Search"
            variant="outlined"
            style={{ backgroundColor: "white" }}
            onChange={(e) => setSearch(e.target.value)}
        />
    )}
    onChange={(event, newValue) => {
        if (newValue) {
          
            console.log("Selected Dish:", newValue.name || newValue);
            navigate(`/dish_details/${newValue.name}`);
        }
    }}
/>


            <Button variant="outlined" color="red" >Logout</Button>
        
            </div>

          </div>
        </>
    )
}
export default Header;
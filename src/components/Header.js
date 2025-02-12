import React, { useEffect, useState } from "react";
import Styles from '../styles/header.module.css'
import { AppBar, Button, Typography ,Autocomplete,TextField} from "@mui/material";
import {getSearchResult} from '../services/dishApi'
import { useNavigate } from "react-router-dom";
import { Link ,navigate} from "react-router-dom";
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

  const handleLogout = ()=>{
    navigate('/')
  }

    return(
        <>
        <div className={Styles.headerContainer}>

        <div className={Styles.headerLeft}>
        <Link to="/dish_list" className={Styles.indianCuisineLink}>
  <h4>INDIAN CUISINE</h4>
</Link>

    
          {/* <Button variant="outlined" color= "info" className={Styles.dishBtn} onClick={()=>navigate('/dish_suggester')}  >Dish Suggestion</Button> */}
          </div>

        

          <div className={Styles.headeraMiddle}>

            


<Autocomplete
    className={Styles.searchBox}
    freeSolo
    options={suggestionList} 
    getOptionLabel={(option) => 
        typeof option === "string" ? option : `${option.name} - ${option.state} `
    } 
 
    style={{ width: 400 }}
    renderInput={(params) => (
        <TextField
            {...params}
            label="Search Dish or state or ingredients "
            variant= "filled"
            style={{ backgroundColor: "white",color:"white"}}
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
</div>

<div className={Styles.headerRight}>


            <Button variant="outlined" color= "error" className={Styles.logoutBtn} onClick={handleLogout} >Logout</Button>
        
            </div>

          </div>
        </>
    )
}
export default Header;
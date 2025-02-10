import React from "react";
import Styles from '../styles/header.module.css'
import { AppBar, Button, Typography ,Autocomplete,TextField} from "@mui/material";

const Header = ()=>{
    return(
        <>
        <div className={Styles.headerContainer}>

        <div className={Styles.headerLeft}>
          <h4 > Indian Cuisine</h4>

          <Button variant="outlined" color="red" >Suggestion</Button>
          </div>

          <div className={Styles.headerRight}>

          <Autocomplete
           className={Styles.searchBox}
          freeSolo
          options={[]}
            //   getOptionLabel={(option) => option.name}
        //   style={{ width: 300, marginRight: "20px" }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search dishes"
              variant="outlined"
              style={{ backgroundColor: "white" }}
            //   onChange={(e) => setSearchQuery(e.target.value)}
             
            />
          )}
          onChange={(event, newValue) => {
            if (newValue && newValue.name) {
            //   history.push(`/dish/${newValue.name}`)
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
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Paper } from "@mui/material";
import Styles from '../styles/Login.module.css'
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [Password, setPassword] = useState('')

    const handeLogin = ()=>{
        navigate('/dish_list')
    }

    return (
        <>
            <div className={Styles.LoginContainer}>


                <Paper className={Styles.card} elevation={3}>
                    <h2>Login</h2>
                    <div className={Styles.LoginContent}>
                        <TextField id='userName'
                            label='UserName'
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            varient="standard" required />
                        <TextField id='Standard'
                            label='Password' varient="standard"
                            value={Password}
                            setPassword={(e) => setPassword(e.target.Password)}
                            required />
                        <Button variant="contained"  onClick={handeLogin} >Login</Button>
                    </div>
                </Paper>
            </div>

        </>
    )
}

export default Login;
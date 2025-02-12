import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Button, Paper ,Alert} from "@mui/material";
import Styles from '../styles/Login.module.css'
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [alters ,setAlert] = useState(false);

    const handeLogin = ()=>{
        if(userName === 'test@gmail.com' && password === 'test@123'){

            console.log('isnode login')
            setAlert(false)
            navigate('/dish_list')
        }
       else{
            setAlert(true)
       }
    }

    return (
        <>

            <div className={Styles.LoginContainer}>

                <Paper className={Styles.card} elevation={3}>

                    
            <div className={Styles.infos}>
<Alert  severity="info">UserName : test@gmail.com , Password : test@123</Alert>
{alters? <Alert  severity="error">username or Password are incorrect</Alert> :null}

</div>
                    <h2>Login</h2>
                    <div className={Styles.LoginContent}>
                        <TextField id='userName'
                            label='UserName'
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            variant="standard" required />
                       <TextField
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        variant="standard"
                        required
                    />
                        <Button variant="contained"  onClick={handeLogin} >Login</Button>
                    </div>
                </Paper>
            </div>

        </>
    )
}

export default Login;
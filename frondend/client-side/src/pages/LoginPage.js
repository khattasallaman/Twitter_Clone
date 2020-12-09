import React, { useState } from 'react'
import theme from '../util/theme2'
// react-router-dom things
import {Link} from 'react-router-dom';

// material-ui things
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid,  TextField, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';

// reduxt and axios things
import {useDispatch, useSelector} from 'react-redux'
import {clearErr, loginUser} from '../redux/actions/userActions'
const useStyles = makeStyles({
    ...theme
})
export default function LoginPage (props) {

    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {isLoading, errors} = useSelector(state => state.ui)
    // const {isLoading, errors} = useSelector(state => state.ui)

    const handleSubmit = (e) => {
        e.preventDefault();
        let userData = {email, password}
        dispatch(loginUser(userData, props.history))
    }
        const classes= useStyles();
        
        // const {classes:{formContainer, textField, button,pageTitle, currentError,signupStyle,signUpButton, questionMark, circularProg }} = useStyles();
        
        return (
            <Grid container className={classes.formContainer}>
                <Grid sm item></Grid>
                <Grid sm item>
                    <Typography variant="h4" className={classes.pageTitle}>
                        <span  style={{color:"rgb(33, 150, 243)"}}>Login</span>  
                    </Typography>
                    <form onSubmit={handleSubmit}>

                        <TextField id="email" name="email"
                         type="email" onChange={(e)=> {
                             errors.email || errors.general && dispatch(clearErr())
                             setEmail(e.target.value)}}
                         error={errors.email ? true : false}
                         helperText={errors.email}
                          value={email} label="Email" 
                          className={classes.textField} fullWidth/>


                        <TextField id="password" fullWidth
                        onChange={(e)=>{
                            errors.password || errors.general && dispatch(clearErr())
                             setPassword(e.target.value)}} name="password" 
                        error={errors.password ? true : false}
                         helperText={errors.password}
                        type="password" value={password}
                         label="Password"  className={classes.textField} 
                         />
                        {errors.general && <Typography variant="body1" className={classes.currentError}>
        {errors.general}</Typography>}
        
                        <Button type="submit" variant="contained" color="primary" className={classes.button}  disabled={isLoading}>
                            {isLoading ?<CircularProgress size={30} className={classes.circularProg}/>:"LogIn"}
                            </Button>

                        <div className={classes.signupStyle}>
                            <small>You Don't Have an Account  <span className={classes.questionMark}>?</span> Please  SignUp From <Link to="/signup" className={classes.signUpButton}> 
                                Here
                                </Link>
                            </small>
                        </div>
                        
                    </form>
                </Grid>
                <Grid sm item></Grid>
            </Grid>
        )
    
}




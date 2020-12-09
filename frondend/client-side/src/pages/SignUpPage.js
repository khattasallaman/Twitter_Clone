import React, {  useState } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from "prop-types"
import theme from '../util/theme2'

// material ui stuff
import { makeStyles } from '@material-ui/core/styles';
import { Button, Grid, TextField, Typography } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
// axios and redux
import { useDispatch, useSelector } from "react-redux"
import { clearErr, signup } from '../redux/actions/userActions';

const styles = makeStyles({
 ...theme
})

export default function SignUpPage (props) {
    
    // react hooks
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [handle, setHandle] = useState('')
    const dispatch = useDispatch();
    const {isLoading, errors} = useSelector(state => state.ui)


    const classes = styles()

    const handleSubmit = (e) => {
        let newUserData = {handle, email, password, confirmedPassword}
        // console.log("submitted successfully")
        e.preventDefault();
        dispatch(signup(newUserData, props.history))
        
    }
        return (
            <Grid container className={classes.formContainer}>
                <Grid sm item></Grid>
                <Grid sm item>
                    <Typography variant="h4" className={classes.pageTitle}>
                        <span  style={{color:"rgb(33, 150, 243)"}}>SignUp</span>  
                    </Typography>
                    <form onValidate onSubmit={handleSubmit}>

                        <TextField id="handle" name="handle"
                         type="text" onChange={(e)=> {
                            errors.handle || errors.general && dispatch(clearErr())
                             setHandle(e.target.value)}}
                         error={errors.handle ? true : false}
                         helperText={errors.handle}
                          value={handle} label="Username" 
                          className={classes.textField} fullWidth/>

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
                        <TextField id="password" fullWidth
                        onChange={(e)=> {
                            errors.confirmedPassword || errors.general && dispatch(clearErr())
                            setConfirmedPassword(e.target.value)}} name="confirmedPassword" 
                        error={errors.confirmedPassword ? true : false}
                         helperText={errors.confirmedPassword}
                        type="password" value={confirmedPassword}
                         label="Confirme Password"  className={classes.textField} 
                         />
                        {errors.general && <Typography variant="body1" className={classes.currentError}>
        {errors.general}</Typography>}
        
                        <Button type="submit" variant="contained" color="primary" className={classes.button}  disabled={isLoading}>
                            {isLoading ?<CircularProgress size={30} className={classes.circularProg}/>:"SignUp"}
                            </Button>

                        <div className={classes.signupStyle}>
                            <small>Already Have an Account  <span className={classes.questionMark}>?</span> Login From <Link to="/login" className={classes.signUpButton}> 
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
SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
}


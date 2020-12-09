import React, {  useEffect } from 'react'
import Screen from '../components/Screen'
import Profile from '../components/Profile'
import { useDispatch, useSelector } from 'react-redux'
import { getScreens } from '../redux/actions/dataActions'
import { makeStyles } from '@material-ui/core'
import ScreenSckelton from '../components/ScreenSckelton'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme2 from '../util/theme2'
import {  Grid  } from '@material-ui/core';
import LoginPage from './LoginPage'

const styles = makeStyles({
    ...theme2,
    paper:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column"
    }
})

export default function HomePage () {
    const isMobile = useMediaQuery('(min-width:564px)');

    // react hooks
    const dispatch = useDispatch()
    const {authenticated} = useSelector(state => state.user)
    const {screens, isLoading} = useSelector(state => state.data)
    useEffect(() => {
        dispatch(getScreens())
        // console.log("this is the screens  ", screens)
        return () => {
            // cleanup
        }
    }, [])

        let recentScreens = isLoading ?<ScreenSckelton/> : screens.map((screen, index)=> {
        return <Screen key={index} screen={screen} />
        })
        let HomeMarkUp = authenticated ? (<Grid container spacing={5} style={{paddingRight:"40 px", paddingTop:"40 px"}}>
        {isMobile ?
        <> 
        <Grid item sm={8} xs={12}>
            {recentScreens}
        </Grid>
        <Grid item sm={4} xs={12}>
            <Profile/>
        </Grid> 
        </>
        :
        <> 
        <Grid item sm={4} xs={12}>
            <Profile/>
        </Grid>
        <Grid item sm={8} xs={12}>
            {recentScreens}
        </Grid>
        </> 
}
    </Grid>) : 
     (<div>
         <LoginPage/>
         {/* <Paper className={classes.paper}>
            <Typography variant="body2" >
                You are not authenticated, Please Loggin or Signup if you don't have an account
            </Typography>
                <div className={classes.buttons}>
                    <Button component={Link} to="/login" variant="contained" color="primary">Login</Button> 
                    <Button component={Link} to="/signup" variant="contained" color="secondary">SignUp</Button>
                </div>
        </Paper> */}
        </div> )
        return (
            HomeMarkUp
        )
    
}

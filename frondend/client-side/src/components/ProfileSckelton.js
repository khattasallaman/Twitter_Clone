import React from 'react'
import NoImg from '../images/npImg.png'
// material ui stuff
import {  CircularProgress, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { Card, CardMedia, Typography, CardContent } from '@material-ui/core'
// icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import theme2 from '../util/theme2';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const styles = makeStyles({
    ...theme2,
    handle:{
      height:20,
      backgroundColor:"rgb(33, 150, 243)",
      width:60,
      mrgin: "0 auto 7 auto"  
    },
    fullLine:{
        height:15,
        backgroundColor:"rgba(0,0,0,0.5)",
        width:"100%",
        marginBottom:10
    },
    fullLine:{
        height:15,
        backgroundColor:"rgba(0,0,0,0.5)",
        width:"50%",
        marginBottom:10
    },
    spinner:{
        position:"absolute",
        top:"11px",
        left:"13px"
    },
    mobileSpinner:{
        position:"absolute",
        top:"11px",
        right:"13px"
    }
})
export default function ProfileSckelton() {
    const isComputer = useMediaQuery('(min-width:564px)');

    const classes = styles()
    return (
        <Paper className={classes.paper}>
            <CircularProgress size={20} thickness={2} className={isComputer ? classes.spinner : classes.mobileSpinner}/>
            <div className={classes.profile}>
                <div className="image-wrapper">
                    <img src={NoImg} alt="profile" className="profile-image"/>
                </div>
                <hr/>
                <div className="profile-details">
                    <div className={classes.handle}></div>
                    <hr/>
                    <div className={classes.fullLine}></div>
                    <div className={classes.fullLine}></div>
                    <hr/>
                        <LocationOnIcon color="primary"/> <span>Location</span>
                    <hr/>
                        <LinkIcon color="primary"/> http://website.com
                    <hr/>
                    <CalendarTodayTwoToneIcon color="primary"/> Joined Date
                </div>
            </div>
        </Paper>
    )
}

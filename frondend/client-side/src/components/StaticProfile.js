import React from 'react'
import dayjs from 'dayjs'
// material ui stuff
import { makeStyles } from '@material-ui/core/styles';
import MuiLink  from '@material-ui/core/Link';
import Paper  from '@material-ui/core/Paper';
// icons 
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import { Typography } from '@material-ui/core';
import theme2 from '../util/theme2';
import { useDispatch, useSelector } from 'react-redux';
import EditProfileDetails from './EditProfileDetails';
import SpecialButton from '../util/SpecialButton';
import { signout } from '../redux/actions/userActions';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';



const styles = makeStyles({
    ...theme2
})

export default function StaticProfile(props) {
    const classes = styles()
    const {handle, imageUrl, createdAt, bio, website, location} = props.profile
    const {creadentials:{handle:authenticated}} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(signout())
    }
    return (
        <>
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl}  alt="profile" className="profile-image"/>
                    </div>
                    <hr/>
                    <div className="profile-details">
                    <MuiLink color="primary" variant="h5">
                        @{handle}
                    </MuiLink>
                    <hr/>
            {bio && <Typography variant="body2" >{bio}</Typography>}
                    <hr/>
                    {location && (
                    <>
                    <LocationOnIcon color="primary"/> <span>{location}</span>
                    <hr/>
                    </>)}
                    {website && (
                        <>
                        <LinkIcon color="primary"/>{" "}
                        <a href={website} target="_blank" rel="noopenor noreferrer">{website}</a>
                    <hr/>
                        </>
                    )}
                    <CalendarTodayTwoToneIcon color="primary"/>{" "} <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                    </div>
                   {handle === authenticated && <span>
                    <EditProfileDetails />
                    <SpecialButton onClick={handleLogOut} placement="top" title="logout">
                        <KeyboardReturnIcon color="primary"/>
                    </SpecialButton>
                    </span>}
                   
                </div>
        </Paper>   
        </>
    )
}

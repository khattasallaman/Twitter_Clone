import React from 'react'
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
// importing redux stuff
import { useDispatch, useSelector } from 'react-redux';
import { changeImg, signout } from '../redux/actions/userActions';
// importing material ui stuff
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import CalendarTodayTwoToneIcon from '@material-ui/icons/CalendarTodayTwoTone';
import EditIcon from '@material-ui/icons/Edit';

import {  Link as MuiLink, Paper, Typography } from '@material-ui/core';
import EditProfileDetails from './EditProfileDetails';
import SpecialButton from '../util/SpecialButton';
import theme2 from '../util/theme2';
import ProfileSckelton from './ProfileSckelton';

const styles = makeStyles({
    ...theme2
})


export default function Profile() {
    
    
    const handleImageTrigger = () => {
        const img = document.getElementById("userImg");
        img.click()
    }
    const classes = styles()
    // react hooks
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(signout())
    }
    // const [image, setImage] = useState(null)

    const handleChangingImg = (e) => {
    //    console.log("the e.targetttttttttt  ",e.target.files[0]) 
        let image = e.target.files[0]
        // console.log("this isssssss the imaggge   ",image)
        let formData = new FormData();
        formData.append("image", image, image.name)
        dispatch(changeImg(formData));
    }
    
    const {creadentials:{handle, createdAt, imageUrl, bio, website, location}, isLoading, authenticated} = useSelector(state => state.user)
    return (isLoading ? <ProfileSckelton/> : (authenticated
        && <Paper className={classes.paper}>
            <div className={classes.profile}>
            <div className="image-wrapper">
               <img src={imageUrl}  alt="profile" className="profile-image"/>
               <input type="file"  hidden="hidden"  id="userImg" onChange={handleChangingImg}/>                    
                        <SpecialButton onClick={handleImageTrigger} title="Edit Profile Picture" placement="top" btnClassName="button">
                            <EditIcon color="primary"/>
                        </SpecialButton>
            </div>
            <hr/>
            <div className="profile-details">
               <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
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
               <EditProfileDetails />
                    <SpecialButton onClick={handleLogOut} placement="top" title="logout">
                        <KeyboardReturnIcon color="primary"/>
                    </SpecialButton>
            </div>
        </Paper>
        // : (<Paper className={classes.paper}>
        //     <Typography variant="body2" >
        //         <div className={classes.buttons}>
        //         No Profile Found, Please Loggin or SignUp
        //             <Button component={Link} to="/login" variant="contained" color="primary">Login</Button> 
        //             <Button component={Link} to="/signup" variant="contained" color="secondary">SignUp</Button>
        //         </div>
        //     </Typography>
        // </Paper>)
        ))
}

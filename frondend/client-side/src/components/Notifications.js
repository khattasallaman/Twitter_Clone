import React, { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
// material ui stuff
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"
// icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { markNotificationsRead } from '../redux/actions/userActions'
export default function Notifications() {
   
    dayjs.extend(relativeTime)
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null)
    const {notifications} = useSelector(state => state.user)

    const handleOpen= (e)=> {
        setAnchorEl(e.target)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }
    const onMenuOpened = ()=> {
        let unreadNotIds = notifications.filter((not)=> not.read === false).map((not)=> not.notificationId ) 
        dispatch(markNotificationsRead(unreadNotIds))
    }
    let notificationIcon;
    if(notifications && notifications.length > 0){
        let unreadNots = notifications.filter((not)=> not.read === false)
        unreadNots.length > 0 ? notificationIcon = (
            <Badge badgeContent={unreadNots.length} color="secondary">
                <NotificationsIcon/>
            </Badge>
        ) : notificationIcon = <NotificationsIcon/>
    }
    else {
        notificationIcon = <NotificationsIcon/>
    }
    let notificationsMarkup = notifications && notifications.length > 0 ? 
    notifications.map((not)=> {
        const verb = not.type === "like" ? "liked" : "commented on";
        const time = dayjs(not.createdAt).fromNow();
        const color = not.read ? "primary": "secondary"
        const icon = not.type === "like" ? (
            <FavoriteIcon color={color} style={{marginRight:10}}/>
        ):
        (
            <ChatIcon color={color} style={{marginRight:10}}/>
        )
        return (
            <MenuItem key={not.notificationId} onClick={handleClose}>
                {icon}
                <Link to={`/users/${not.recipient}/screen/${not.screenId}`}>
                    <Typography   variant="body2">
                        {not.sender} {verb} your post {time}
                    </Typography>
                </Link>
            </MenuItem>
        )
    }) : (
        <MenuItem onClick={handleClose}>
            You have no notifications yet
        </MenuItem>
    )
    
    return (
        <>
            <Tooltip placement="top" title="notificaions">
                <IconButton aria-owns={anchorEl ? "simple-menu" : undefined} aria-haspopup="true" onClick={handleOpen}>
                    {notificationIcon}
                </IconButton>   
            </Tooltip>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} onEntered={onMenuOpened}>
                {notificationsMarkup}
            </Menu>  
        </>
    )
}

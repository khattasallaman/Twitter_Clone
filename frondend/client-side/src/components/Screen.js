import React, {  useEffect } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
// redux stuff
import { useDispatch, useSelector } from 'react-redux'
// material ui stuff
import withStyles from '@material-ui/core/styles/withStyles'
import { Card, CardMedia, Typography, CardContent, makeStyles, Avatar, IconButton } from '@material-ui/core'
// icons
import DeleteScreen from './DeleteScreen'
import ScreenDialog from './ScreenDialog'
import LikeButton from './LikeButton'

// material ui Media Query stuff
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import theme2 from '../util/theme2'


var relativeTime = require('dayjs/plugin/relativeTime')


const styles = makeStyles((theme)=> ({
    ...theme2,
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    card: {
        display:"flex",
        marginBottom:10,
        position:"relative"
    },
    image:{
        minWidth:200,
        maxHeight:200,
    },
    content:{
        // padding:25,
        objectFit:"cover"
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    }

}))

export default function Screen({screen, inUserPage, openDialog}) {



  const mediaTheme = useTheme();
  const match = useMediaQuery(mediaTheme.breakpoints.up('sm'));
  const isMobile = useMediaQuery('(min-width:564px)');

    dayjs.extend(relativeTime)
        const classes = styles()
        const {userImage, userHandle, createdAt, body, likeCount, commentCount, screenId } = screen;
        // react hooks
        const { authenticated, creadentials:{handle}} = useSelector(state => state.user)
        useEffect(() => {
        
            return () => {
                // cleanup
            }
        }, [commentCount])
        let isUser = authenticated && handle === userHandle ? true : false 

       
        return (
            <Card className={classes.card}>
                {isMobile ? <CardMedia image={userImage} className={classes.image}/>:
                <Avatar src={userImage} className={classes.large}/>}
                <CardContent className={classes.content}>
                    {inUserPage ? <Typography variant="h5" color="primary">{userHandle}</Typography>
                    : <Typography variant="h5" color="primary" component={Link} to={`/users/${userHandle}`}><span className={match ?classes.dynamicSize : classes.dynamicSize_sm}>{ userHandle}</span></Typography>}
                    
                    {isUser && <DeleteScreen screenId={screenId}/>}
                    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</ Typography>
                    <Typography variant="body1" className={`${match ?classes.dynamicSize : classes.dynamicSize_sm} `} >{body}</Typography>
                     <LikeButton screenId={screenId} userHandle={userHandle} likeCount={likeCount}/>
                    <IconButton>
                        <ScreenDialog currentUserHandle={userHandle} currentScreenId={screenId} openDialog={openDialog} fromComment/>
                    </IconButton>                        
                    {commentCount > 0 &&
                    <>{commentCount} <span className={match ?classes.dynamicSize : classes.dynamicSize_sm}>{commentCount > 1 ? "comments" : "comment"}</span> </>}
                    <>
                    <ScreenDialog currentUserHandle={userHandle} currentScreenId={screenId} openDialog={openDialog}/>
                    </>
                </CardContent>
            </Card>
        )
    
}

 withStyles(styles)(Screen)

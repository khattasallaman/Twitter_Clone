import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
// material ui stuff
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
// redux  stuff
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getScreen } from '../redux/actions/dataActions';
import SpecialButton from '../util/SpecialButton';
import { Link, withRouter } from 'react-router-dom';
import theme2 from '../util/theme2';
import { Avatar, CircularProgress, IconButton, Tooltip } from '@material-ui/core';
import LikeButton from './LikeButton';
import ChatIcon from '@material-ui/icons/Chat';
import Comments from './Comments';
import CommentForm from './CommentForm';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';



function ScreenDialog(props) {
    const screenSize = useMediaQuery('(min-width:908px)');

    const styles = makeStyles((theme)=> ({
        ...theme2,
        root: {
            display: 'flex',
            '& > *': {
            margin: theme.spacing(1),
            },
        },
        invisibleHr:{
            border:"none",
            margin:4
        },
        profileImage:{
            width:180,
            height:180,
            objectFit:"cover",
            maxWidth:"80%",
            borderRadius:"50%",
            // marginBottom: 20        
        },
        dialogContent:{
            padding:20
        },
        closeButton:{
            position: "absolute",
            top: "0%",
            left: "89%",
            maxWidth:"10%"
        },
        expandMore:{
            position:"absolute",
            left: !screenSize ? "89%" : "93%",
        },
        exploreMoewDownSm:{
            position:"absolute",
            left: !screenSize ? "89%" : "93%",
            top:"67%"
        },
        spinner:{
            textAlign:"center",
            marginTop:23,
            marginBottom:23
        },
        large: {
            width: theme.spacing(12),
            height: theme.spacing(12),
        },
        sideWithPad:{
            paddingLeft:18
        },
        sideWithout:{
            paddingLeft:0,
            paddingTop:5
        },
        avatar:{
            marginRight:15,
            marginBottom:5
        }
    
}))


    const classes = styles()
    // react hooks
    const dispatch = useDispatch()
    const {screen:{screenId, createdAt, body, likeCount, commentCount, userImage, userHandle, comments}} = useSelector(state => state.data)
    const {isLoading} = useSelector(state => state.ui)
    // const {authenticated} = useSelector(state => state.user)

    const [isOpen, setIsOpen] = useState(false)
    const [oldPath, setOldPath] = useState('')
    const [newPath, setNewPath] = useState('')
    useEffect(() => {
        props.openDialog && handleOpen()
        return () => {
            // cleanup
        }
    }, [])

    // let current = window.location.pathname
    // useEffect(() => {
    //     handleOpen()
    //     return () => {
    //         // cleanup
    //     }
    // }, [current])
    // media query break points :::
    const mediaTheme = useTheme();
    const match = useMediaQuery('(min-width:796px)');
    const perfectMargin = useMediaQuery('(min-width:401px)');

    const handleOpen = ()=> {
        // window.location.pathname
        let old = window.location.pathname
        setOldPath(old)
        console.log("this is the ollll paaaaath ::    ",old)
        console.log("this is the window.location    ",window.location)
        const nPath = `/users/${props.currentUserHandle}/screen/${props.currentScreenId}`
        setNewPath(nPath)
        if(old === nPath){
            old = `/`
            console.log("this is the ollll paaaaath after change::    ",old)
            setOldPath(old)
        }
        // setOldPath(old)

        console.log("this is the newww paaaaath::    ",newPath)
        window.history.pushState(null, null, nPath)
        !isOpen && setIsOpen(true); 
        dispatch(getScreen(props.currentScreenId))
    }
   const handleClose = ()=> {
    console.log("this is the newww currrent patth::    ",oldPath)
        // window.history.pushState(null, null, oldPath)
        setIsOpen(false); 
        dispatch(clearErrors())
         props.history.push("/")
    }
    let dialogMarkup = isLoading ? <div className={classes.spinner}><CircularProgress size={120} color="primary" thickness={1}/></div>  : <Grid container >
                            <Grid item sm={2}>
                                    <Avatar src={userImage} className={classes.large}/>
                            </Grid>
                            <Grid item  sm={7} className={perfectMargin ? classes.sideWithPad : classes.sideWithout}>
                                <Typography component={Link} to={`/users/${userHandle}`} color="primary" variant="h5">
                                    @{userHandle}
                                </Typography>
                                <Typography variant="body2" color="secondary">
                                    {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                                </Typography>
                                <hr className={classes.invisibleHr}/>
                                <Typography variant="body1" >
                                    {body}
                                </Typography>
                                <LikeButton screenId={screenId} userHandle={userHandle} likeCount={likeCount}/>
                                {/* <SpecialButton title="add a comment"> */}
                                  
                                 {/* </SpecialButton> */}
                                {commentCount > 0 &&  <span>
                                                    <IconButton>
                                                        <ChatIcon  color="primary"/> 
                                                    </IconButton>
                                                    <span>{commentCount} {commentCount > 1 ? "comments" :"comment"}</span>
                                                    </span>}
                            </Grid>
                            <hr className={classes.visibleHr}/>
                            <Comments comments={comments}/>
                            <CommentForm screenId={screenId}/>
                        </Grid>
    return (
        <>
        {props.fromComment ? 
        <Tooltip title="add a comment">
            <ChatIcon  color="primary" onClick={() => handleOpen()}/> 
        </Tooltip>
        : <SpecialButton title='expand screen' onClick={handleOpen} btnClassName={ match ? classes.expandMore : classes.exploreMoewDownSm}>
        <UnfoldMoreIcon color="primary"/>
        </SpecialButton>}
        <Dialog 
        open={isOpen}
        onClose={handleClose}
        fullWidth
        maxWidth="sm">
                    <SpecialButton btnClassName={classes.closeButton} onClick={handleClose} title="close">
                        <CloseIcon color="primary"/>
                    </SpecialButton>
            
            <DialogContent className={classes.dialogContent}>
                {dialogMarkup}
            </DialogContent>

        </Dialog>
            
        </>
    )
}
export default withRouter(ScreenDialog)

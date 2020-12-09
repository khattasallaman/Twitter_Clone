import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import theme2 from '../util/theme2';
import { Avatar } from '@material-ui/core';

const styles = makeStyles((theme)=> ({
    ...theme2,
    root: {
        display: 'flex',
        '& > *': {
        margin: theme.spacing(1),
        },
    },
    commentImage:{
        maxWidth:"90%",
        height:80,
        objectFit:"cover",
        borderRadius:'50%'
    },
    sideWithPad:{
        paddingTop:10
    },
    sideWithout:{
        paddingLeft:0,
        paddingTop:5
    },
    invisibleHr:{
        border:"none",
        margin:4
    },
    medium: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    }

}))
export default function Comments({comments}) {
    const classes = styles()
    return (
        <Grid container>
            {comments.map((comment, index)=> {
            const isFromServer = comment._fieldsProto ? true : false
                if(isFromServer){
                    var {_fieldsProto : {body:fbody, createdAt:fcreatedAt, imageUrl:fimageUrl, userHandle:fuserHandle}} = comment;
                }
                if(!isFromServer) {
                    var {body, createdAt, imageUrl, userHandle} = comment;
                }
          
                return (
                    <React.Fragment key={index}>
                        <Grid item sm={12}>
                            <Grid container   direction="column">
                                <Grid item xm={12}>
                                    <Grid container   direction="row" spacing={1}>
                                        <Grid item xm={4}>
                                            <Avatar src={isFromServer ? fimageUrl.stringValue : imageUrl} className={classes.medium}/>
                                        </Grid>
                                        <Grid item xm={6} >
                                            <Typography variant="h5" component={Link} to={`users/${isFromServer ? fuserHandle.stringValue : userHandle}`}>
                                                    {isFromServer ? fuserHandle.stringValue :userHandle}
                                            </Typography>

                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item sm={12}>
                                    <div className={classes.sideWithPad }>
                                        
                                        <Typography variant="body2" color="textSecondary">
                                            {dayjs(isFromServer ? fcreatedAt.stringValue : createdAt).format("h:mm a, MMMM DD YYYY")}
                                        </Typography>
                                        <hr className={classes.invisibleHr}/>
                                        <Typography variant="body1">
                                            {isFromServer ? fbody.stringValue : body}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        {index !== comments.length - 1 && <hr className={classes.visibleHr}/>}
                    </React.Fragment>
                )
            })}
            
        </Grid>
    )
}

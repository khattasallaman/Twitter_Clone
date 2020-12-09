import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CircularProgress, Avatar } from '@material-ui/core'
import NoImg from '../images/npImg.png'
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = makeStyles((theme)=> ({
    root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    card:{
        display:"flex",
        marginBottom:25,
        position:"relative"
    },
    cardContent:{
        width:"100%",
        flexDirection:"column",
        padding:25
    },
    cover:{
        minWidth:200,
        objectFit:"cover"
    },
    handle:{
        width:60,
        height:19,
        backgroundColor:"rgb(33, 150, 243)",
        marginBottom:10
    },
    date:{
        height:14,
        width:100,
        backgroundColor:"rgba(0,0,0,0.3)",
        marginBottom:10

    },
    fullLine:{
        height:15,
        width:"70%",
        backgroundColor:"rgba(0,0,0,0.3)",
        marginBottom:10
    },
    halfLine:{
        height:15,
        width:"50%",
        backgroundColor:"rgba(0,0,0,0.4)",
        marginBottom:10
    },
    spinner:{
        position:"absolute",
        top:"11px",
        right:"13px"
    },
    large: {
        width: theme.spacing(12),
        height: theme.spacing(12),
    }
   
}))
export default function ScreenSckelton() {
    const isComputer = useMediaQuery('(min-width:564px)');
    const classes= styles()
    const content = Array.from({length:5}).map((item, index)=> (
        <Card key={index} className={classes.card}>
            <CircularProgress size={20} thickness={2} className={classes.spinner}/>
            {!isComputer ? <Avatar src={NoImg} className={classes.large}/> :
            <CardMedia className={classes.cover} image={NoImg}/>}
            <CardContent className={classes.cardContent}>
                <div className={classes.handle}></div>
                <div className={classes.date}></div>
                {/* <div className={classes.halfLine}></div> */}
                <div className={classes.fullLine}></div>
                <div className={classes.fullLine}></div>
            </CardContent>
        </Card>
    ))
    return (
        <>
         {content}   
        </>
    )
}

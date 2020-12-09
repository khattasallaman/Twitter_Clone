import React, { useState } from 'react'
// material ui stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// redux stuff
import { useDispatch, useSelector } from 'react-redux';
import theme2 from '../util/theme2';
import { CircularProgress } from '@material-ui/core';
import {submitComment} from '../redux/actions/dataActions'
const styles = makeStyles({
    ...theme2,
    button:{
        textAlign:"left",
        marginTop:10
    }

})
export default function CommentForm({screenId}) {
    // react hooks
    const [body, setBody] = useState("")
    const dispatch = useDispatch()
    const {authenticated} = useSelector(state => state.user)
    const {errors, isLoading} = useSelector(state => state.ui)
    const classes = styles()
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(submitComment(screenId,{body}))
    }
    const CommentMarkup = authenticated ?
     (<Grid item sm={12} style={{textAlign:"center"}}>
         <form onSubmit={handleSubmit}>
            <TextField 
            name="body"
            type="text"
            label="Add a Comment"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={body}
            onChange={(e)=> setBody(e.target.value)}
            fullWidth
            />
            <Button disabled={isLoading} variant="contained" type="submit" color="primary" className={classes.button}>{isLoading ? <CircularProgress size={20} color="primary"/> : "Sumbit"}</Button>
         </form>
         {/* <hr className={classes.visibleHr}/> */}
     </Grid>) 
     : null
    return (
        CommentMarkup
    )
}

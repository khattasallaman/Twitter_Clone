import React, { useState } from 'react'
import { postScreen } from '../redux/actions/dataActions'
import SpecialButton from '../util/SpecialButton'
// marerial ui stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
// icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';

// redux stuff
import { useDispatch, useSelector } from 'react-redux';
import theme from "../util/theme2"
import {CLEAR_ERRORS} from '../redux/actionTypes'
import useMediaQuery from '@material-ui/core/useMediaQuery';




export default function PostScreen() {

    const matches = useMediaQuery('(max-width:434px)');

const styles = makeStyles({
    btnDelete:{
        position:"absolute",
        left:"90%",
        top:"10%",
        color:"rgb(242, 104, 104)"
    },
    btnColor:{
        color:"rgb(242, 104, 104)"
    },
    ...theme,
    button:{
        marginTop:10
    },
    closeButton:{
        position:"absolute",
        left: matches ?"84%" : "89%",
        top:"6%",
        width:'0%'
    },
    dialog:{
        position:"relative"
    }
})


    const classes = styles()
    // react hooks
    const [isOpen, setIsOpen] = useState(false)
    const [body, setBody] = useState("")
    // const [currentErrors, setcurrentErrors] = useState({})
    const dispatch = useDispatch()
    const {errors, isLoading} = useSelector(state => state.ui)
//    setErrors()
    // const {isLoading} = useSelector(state => state.data)
    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleSubmit = (e) => {
        const currentLoc = window.location.pathname;
        e.preventDefault()
        dispatch(postScreen(body, setIsOpen, currentLoc))
    }
    return (
        <>
         <SpecialButton title="add post" placement="top" onClick={handleOpen}>
            <AddIcon />
        </SpecialButton>
        <Dialog className={classes.dialog} open={isOpen} onClose={()=> setIsOpen(false)} fullWidth maxWidth="sm">
            <Button onClick={()=> {
                setIsOpen(false);
                dispatch({type:CLEAR_ERRORS})}} className={classes.closeButton}>
                <CloseIcon color="primary" />
            </Button>
            <DialogTitle>Post Screen</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <TextField 
                    autoFocus
                    fullWidth
                    name="body"
                    label="Body"
                    rows="3"
                    multiline
                    error={errors.body ? true : false}
                    helperText={errors.body}
                    onChange={(e) => setBody(e.target.value)}
                    type="text"
                    className={classes.TextField}/>
                    <Button className={classes.button} variant="contained" color="primary" type="submit" disabled={isLoading}>{isLoading ? (<CircularProgress size={30} className={classes.circularProg}/>) : "Post" }</Button>
                </form>
            </DialogContent>
        </Dialog>
        </>
    )
}

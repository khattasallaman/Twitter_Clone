import React, { useState } from 'react'
import { deleteScreen} from '../redux/actions/dataActions'
import SpecialButton from '../util/SpecialButton'
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@material-ui/core';


export default function DeleteScreen(props) {
    const screenSize = useMediaQuery('(min-width:908px)');

    const styles = makeStyles({
        btnDelete:{
            position:"absolute",
            left: !screenSize ? "89%" : "93%",
            top:"3%",
            color:"rgb(242, 104, 104)"
        },
        btnColor:{
            color:"rgb(242, 104, 104)"
        }
    })

    const classes = styles();
    // react hooks
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    
    const handleDelete = () => {
        dispatch(deleteScreen(props.screenId))
        setIsOpen(false)
    }
    return (
        <>
            <SpecialButton title="delete screen" onClick={()=> setIsOpen(true)}
            btnClassName={classes.btnDelete}>
                <DeleteRoundedIcon />
            </SpecialButton>
            <Dialog open={isOpen} onClose={()=> setIsOpen(false)}>
                <DialogTitle>Are you sure you want to delete this post</DialogTitle>
                <DialogActions>
                    <Button color="secondary" onClick={handleDelete}><span className={classes.btnColor}> Delete</span> </Button>
                    <Button color="primary" onClick={()=> setIsOpen(false)}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

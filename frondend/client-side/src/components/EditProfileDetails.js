import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import theme from '../util/theme2'
// material ui stuff
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import  EditIcon  from '@material-ui/icons/Edit';
import { editDetails } from '../redux/actions/userActions';
import SpecialButton from '../util/SpecialButton';

const styles = makeStyles({
    ...theme,
    button:{
        float:"right"
    }
})
export default function EditProfileDetails() {
    // react hooks
    const [bio, setBio] = useState('')
    const [website, setWebsite] = useState('')
    const [location, setLocation] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    // console.log("this is the creadentials:   ",creadentials)
    const {creadentials:{bio:oldBio, location:oldLocation, website:oldWebsite}} = useSelector(state => state.user)
    useEffect(() => {
        setBio(oldBio ? oldBio : "");
        setLocation(oldLocation ? oldLocation : "");
        setWebsite(oldWebsite ? oldWebsite : "");
        return () => {
            // cleanup
        }
    }, [])
    const dispatch = useDispatch()
    const classes = styles()

    const handleSubmit = () => {
        const userDetails = {bio, website, location}
        dispatch(editDetails(userDetails))
        setIsOpen(false)
    }
    return (
        <Fragment>
                    <SpecialButton onClick={() => setIsOpen(true)} btnClassName={classes.button} title="Edit Details" placement="top">
                         <EditIcon color="primary"/>
                    </SpecialButton>
                <Dialog open={isOpen} onClose={()=> setIsOpen(false)} fullWidth maxWidth="sm">
                    <DialogTitle>Edit Your Details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                            name="bio"
                            label="Bio"
                            placeholder="A short Bio About You"
                            onChange={(e)=>setBio(e.target.value)} 
                            multiline
                            rows="3"
                            value={bio} className={classes.textField}
                            fullWidth/>

                            <TextField
                            name="website"
                            label="Website"
                            placeholder="Your Personal Website"
                            onChange={(e)=>setWebsite(e.target.value)} 
                            value={website} className={classes.textField}
                            fullWidth/>
                            
                            <TextField
                            name="location"
                            label="Location"
                            placeholder="Your Location"
                            onChange={(e)=>setLocation(e.target.value)} 
                            value={location}
                             className={classes.textField}
                             fullWidth/>

                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button color="primary" onClick={handleSubmit}>Save</Button>
                    </DialogActions>
                </Dialog>
            </Fragment>    )
}

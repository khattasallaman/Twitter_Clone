import React from 'react'
import { Button,Toolbar, AppBar } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { signout } from '../redux/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import SpecialButton from '../util/SpecialButton'
// icons
import HomeIcon from '@material-ui/icons/Home';
import PostScreen from './PostScreen'
import Notifications from './Notifications'
export default function NavbarComponent () {
        const dispatch = useDispatch()
        const {authenticated} = useSelector(state => state.user)
        // const token = localStorage.FBIdToken
        const handleSignOut = () => {
            dispatch(signout());
        }
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? 
                    (
                    <div className="nav-2">
                    <PostScreen />
                    <Link to="/" >
                        <SpecialButton title="home" placement="top" >
                            <HomeIcon/>
                        </SpecialButton>
                    </Link>
                    <Notifications />
                    <Button color="inherit"  onClick={handleSignOut}>SignOut</Button> 
                    </div>
                    ):
                     (
                    < >
                        {/* <Button color="inherit" component={Link} to="/login">LogIn</Button> */}
                        
                        {/* <Button color="inherit" component={Link} to="/">Home</Button> */}
                        
                            <Button color="inherit" component={Link} to="/signup">SignUp</Button>
                        
                    </>
                    )}
                    
                </Toolbar>

            </AppBar>
        )
    
}

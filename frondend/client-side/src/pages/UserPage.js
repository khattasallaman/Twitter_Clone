import React, { useEffect, useState } from 'react'
// material ui stuff
import Grid from '@material-ui/core/Grid';
// redux stuff
import { useDispatch, useSelector } from 'react-redux'
import { getSpecificUserData } from '../redux/actions/dataActions';
import Axios from 'axios';
import Screen from '../components/Screen';
import StaticProfile from '../components/StaticProfile';
import ScreenSckelton from '../components/ScreenSckelton';
import ProfileSckelton from '../components/ProfileSckelton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export default function UserPage(props) {
    const isMobile = useMediaQuery('(min-width:564px)');
    // const ppath = window.location.pathname
    // const isNotHere = ppath
    // useEffect(() => {
    //     window.history.pushState(null, null, ppath)
    //     return () => {
    //         // cleanup
    //     }
    // }, [ppath])
    // react hooks
    const dispatch = useDispatch()
    const [profile, setProfile] = useState(null)
    const [screenIdParam, setscreenIdParam] = useState(null)
    const {isLoading, screens} = useSelector(state => state.data)
    const handle = props.match.params.handle
    const screenId = props.match.params.screenId
    // console.log("this is the screenId from user page    ", screenId)
    // console.log("this is the screenIdParammmm from user page    ", screenIdParam)
    // console.log("this is the hannnnnndllllle  ", handle)

    useEffect(() => {
        screenId && setscreenIdParam(screenId)

        dispatch(getSpecificUserData(handle))
        Axios.get(`/users/${handle}`)
        .then((res)=> {
            // console.log("the profileeeeeee    ", res.data.user)
            setProfile(res.data.user)
        })
        .catch((err)=> 
        console.log("this is a userrrr paaage errrrror  ", err)
        )
        return () => {
            // cleanup
        }
    }, [])
    useEffect(() => {
        screenId && setscreenIdParam(screenId)
        dispatch(getSpecificUserData(handle))
        Axios.get(`/users/${handle}`)
        .then((res)=> {
            // console.log("the profileeeeeee    ", res.data.user)
            setProfile(res.data.user)
        })
        .catch((err)=> console.log("this is a userrrr paaage errrrror  ", err))
        
    }, [screenId])
    const recentScreens = isLoading
    ? <ScreenSckelton/>
    : screens === null
    ? <p>{profile.userHandle} has not posted any screen yet</p> 
    : screenIdParam
    ? screens.map((screen)=> 
        (screen.screenId === screenIdParam
    ? <Screen key={screen.screenId} openDialog={true} screen={screen} inUserPage={true}/>
    : <Screen key={screen.screenId} screen={screen} inUserPage={true}/>))
   : screens.map((screen)=> <Screen key={screen.screenId} screen={screen} inUserPage={true}/>)
    return (
        <Grid container spacing={5}>
            {isMobile ? 
            <>
                <Grid item sm={8} xs={12}>
                    {recentScreens}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {profile === null ? <ProfileSckelton />: <StaticProfile profile={profile}/>}
                </Grid>
            </>:
            <>
                <Grid item sm={4} xs={12}>
                    {profile === null ? <ProfileSckelton />: <StaticProfile profile={profile}/>}
                </Grid>
                <Grid item sm={8} xs={12}>
                    {recentScreens}
                </Grid>
            </>}
                
            </Grid>
    )
}

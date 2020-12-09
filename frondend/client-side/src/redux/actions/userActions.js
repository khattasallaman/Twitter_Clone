import {UI_IS_LOADING,SET_ERRORS ,SET_UNAUTHENTICATED,USER_IS_LOADING ,SET_USER, MARK_NOTIFICATIONS_READ} from '../actionTypes'
import axios from 'axios'
const CLEAR_ERRORS = "CLEAR_ERRORS"

// signup action creator
export const signup = (newUserData, history) => (dispatch)=> {
    dispatch({type: UI_IS_LOADING});
    axios.post('/signup',newUserData).then((res)=> {
        // console.log(res.data)
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS})
        history.push('/')
    })
    .catch((err)=> {
        // console.log("this is the errrrr   ",err);
        if(err.message === "Request failed with status code 403"){
           const err = {general:"Bad Internet Connection, you are either not connected to the internet or didn't open VPN."}
            dispatch({type:SET_ERRORS, payload:err})
            console.log("from inside ", {err})

        }
        else{
            dispatch({type:SET_ERRORS, payload:err.response && err.response.data})
        }
        // console.log("the errors ", this.state.errors)
    })
    
}

export const clearErr = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS})
}
// login action creator
export const loginUser = (userData, history) => (dispatch)=> {
    dispatch({type: UI_IS_LOADING});
    axios.post('/login',userData).then((res)=> {
        // console.log(res.data)
        setAuthorizationHeader(res.data.token)
        dispatch(getUserData());
        history.push('/')
        dispatch({type: CLEAR_ERRORS})
    })
    .catch((err)=> {
        // console.log("this is the errrrr   ",err.message);
        // console.log("this is the err.response.data:",err.response.data);
        // console.log("this is the tyyyype err.response.data   ",typeof(err.response.data));
        if(err.message === "Request failed with status code 403"){
            // err.response.data = {general:"Bad Internet Connection, Please Check To See If You Are Connected To The Internet"}
           const err = {general:"Bad Internet Connection, you are either not connected to the internet or didn't open VPN."}
            dispatch({type:SET_ERRORS, payload:err})
            console.log("from inside ", {err})

        }
        else{
             dispatch({type:SET_ERRORS, payload: err.response && err.response.data})
        console.log("the errrr  ", {err})
        }
       
    })
    
}

// signout action creator 
export const signout = () => (dispatch) => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"]
    dispatch({type:SET_UNAUTHENTICATED})
}


// changing user image action
export const changeImg = (formData) => (dispatch)=> {
    dispatch({type:USER_IS_LOADING})
    // console.log("befoooore axiosss dispatch")
    axios.post('/user/image', formData
    ).then(()=> {
        // console.log("after getting the dattta")
        dispatch(getUserData())
    })
    .catch((err)=>
     console.log(err)
     )
}

// ediding user Details action
export const editDetails = (userDetails) => (dispatch) => {
    // console.log("this is the starttt of  resss  ")
    dispatch({type:USER_IS_LOADING});
    axios.post("/user", userDetails)
    .then((res)=> {
        // console.log("this is the resss  ",res)
        dispatch(getUserData())
    })
    .catch((err)=> 
    console.log(err)
    )

}

// mark notificatoins read
export const markNotificationsRead = (notificatoinsIds) => (dispatch) => {
    console.log("the notification is wooooorkkkkkinggggggggg")
    axios.post("/notifications", notificatoinsIds)
    .then(()=> {
        dispatch({type:MARK_NOTIFICATIONS_READ})
    })
    .catch((err)=> 
    console.log("this is the notttttttification errror   ",err)
    )
} 


// helper functions 

export const getUserData = ()=> (dispatch) => {
    dispatch({type: USER_IS_LOADING});
    axios.get("/user").then((res)=> {
        dispatch({type:SET_USER, payload:res.data})
    })
    .catch((err)=> 
    console.log(err)
    )
}




const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`
        localStorage.setItem("FBIdToken", FBIdToken)
        axios.defaults.headers.common["Authorization"] = FBIdToken;
}
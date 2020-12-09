import Axios from 'axios'
import {SET_SCREENS,  SCREEN_IS_LOADING, LIKE_SCREEN, UNLIKE_SCREEN, DELETE_SCREEN, SET_SCREEN, SET_ERRORS, CLEAR_ERRORS, UI_IS_LOADING, GET_SCREEN, POST_SCREEN, STOP_UI_LOADING,SUBMIT_COMMENT} from '../actionTypes'

// getting all the screens
export const getScreens = () => (dispatch)=> {
    dispatch({type:SCREEN_IS_LOADING})
    Axios.get("/screens")
    .then((res)=> {
        dispatch({type:SET_SCREENS, payload:res.data})
    })
    .catch((err)=> 
    console.log("this is the error offffff getting all screens", err)
)
}

// liking a scree[n
export const likeScreen = (screenId) => (dispatch) =>{
    // dispatch({type:SCREEN_IS_LOADING})
    // console.log("we are in the likkkkkke actionn")
    Axios.get("/screens/" + screenId + "/like")
    .then((res)=> {
        // console.log("this is the ressssss ", res)
        dispatch({type: LIKE_SCREEN, payload:res.data})
    })
    .catch((err) => 
    console.log("this is the error offffff liking one  screen", err.response && err.response.data
    ))
}

// unnliking a screen
export const unlikeScreen = (screenId) => (dispatch) =>{
    // dispatch({type:SCREEN_IS_LOADING})
    // console.log("we are in the unnnnnnnlikkkkkke actionn")
    Axios.get("/screens/" + screenId + "/unlike")
    .then((res)=> {
        // console.log("this is the ressssss ", res)
        dispatch({type: UNLIKE_SCREEN, payload:res.data})
    })
    .catch((err) =>
     console.log("this is the error offffff unnliking one  screen", err)
     )
}

// deleting screen

export const deleteScreen = (screenId) => (dispatch) => {
    // dispatch({type: SCREEN_IS_LOADING})
    Axios.delete("/screens/" + screenId)
    .then(() => {
        dispatch({type:DELETE_SCREEN, payload:screenId})
    })
    .catch((err)=>
     console.log("this is the error offffff deleeetting one  screen", err)
     )
}

// posting one screen

export const postScreen = (screenData, setIsOpen, currentLoc) => (dispatch)=> {
    dispatch({type:UI_IS_LOADING})
    Axios.post("/screen", {body : screenData})
    .then((res)=> {
        // console.log("this is the post screeeeeeeen ", res.data)
        dispatch({type:POST_SCREEN, payload:res.data})
        dispatch({type:CLEAR_ERRORS})
        // console.log("current looooog  "+currentLoc)
        // console.log("current looooog tttype  "+ typeof(currentLoc))
        const home = "/"
       currentLoc  != "/" && window.history.pushState(null, null, home) 
        setIsOpen(false)
    })
    .catch((err)=> {
        // console.log("this is the errr   ",err)
        // console.log("this is the err.response.data ", err.response.data)

        dispatch({type:SET_ERRORS, payload:err.response.data})
    })
}

// getting one screen 

export const getScreen = (screenId) => (dispatch) => {
    dispatch({type:UI_IS_LOADING})
    Axios.get("/screens/"+screenId)
    .then((res)=> {
        dispatch({type:SET_SCREEN, payload:res.data})
        dispatch({type:STOP_UI_LOADING})
    })
    .catch((err)=> 
    console.log(err)
    )

}

// submit comment

export const submitComment = (screenId, body)=> (dispatch) => {
    dispatch({type:UI_IS_LOADING})
    Axios.post("/screens/"+screenId+"/comment", body)
    .then((res)=> {
        dispatch({type:SUBMIT_COMMENT, payload:res.data})
        dispatch({type:STOP_UI_LOADING})
        dispatch({type:CLEAR_ERRORS})
    })
    .catch((err)=> {
        // console.log("this is errrrrrrrrrrrr   " , err)
        // console.log("this is err.response.data   " , err.response.data)
        dispatch({type: SET_ERRORS, payload:err.response.data})
    })
}

export const clearErrors = ()=> (dispatch) => {
    dispatch({type:CLEAR_ERRORS})
}

export const getSpecificUserData = (handle) => (dispatch) => {
    dispatch({type:SCREEN_IS_LOADING})
    Axios.get("/users/"+ handle)
    .then((res)=> {
        dispatch({type:SET_SCREENS, payload:res.data.screens})
    })
    .catch((err)=>
     console.log("this is err.response.data   " , err.response && err.response.data)
    )
}
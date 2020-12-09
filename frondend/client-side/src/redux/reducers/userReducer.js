import {SET_AUTHENTICATED ,SET_UNAUTHENTICATED,USER_IS_LOADING ,SET_USER, LIKE_SCREEN, UNLIKE_SCREEN, MARK_NOTIFICATIONS_READ } from '../actionTypes'

const initialState = {
    authenticated:false,
    creadentials:{},
    likes:[],
    notifications:[],
    isLoading:false,
    // comments:[]
}
export const userReducer = (state=initialState, action) => {
    switch (action.type) {
        case USER_IS_LOADING:
            return {...state, isLoading:true}
        case SET_AUTHENTICATED:
            return {...state, authenticated:true}
        case SET_UNAUTHENTICATED:
            return {...state, authenticated:false}
        case SET_USER:
            return {...action.payload,  authenticated:true, isLoading:false}
        case LIKE_SCREEN:
            return { ...state, likes: [...state.likes, {
                userHandle: state.creadentials.handle,
                screenId:action.payload.screenId
            }]}
        case UNLIKE_SCREEN:
            return { ...state, likes: state.likes.filter((like)=> like.screenId !== action.payload.screenId)}
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach((not)=> {
                not.read = true
            })
            return {...state}
        default:
            return state;
    }
}
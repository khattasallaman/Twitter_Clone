import {UI_IS_LOADING, SET_ERRORS, CLEAR_ERRORS, STOP_UI_LOADING  } from '../actionTypes'

const initialState = {
    isLoading:false,
    errors:{}
}

export const uiReducer = (state = initialState, action)=>{
    switch (action.type) {
        case SET_ERRORS:
            return {...state, errors:{...action.payload}, isLoading:false}
        case CLEAR_ERRORS:
            return {...state, errors:{}, isLoading:false}
        case UI_IS_LOADING:
            return {...state, isLoading:true}
        case STOP_UI_LOADING:
            return {...state, isLoading:false}

        default:
            return state;
    }
}
import {SET_SCREENS,  SCREEN_IS_LOADING, LIKE_SCREEN, UNLIKE_SCREEN, DELETE_SCREEN, SET_SCREEN, POST_SCREEN, SUBMIT_COMMENT} from '../actionTypes'

const initialState = {
    isLoading:false,
    screens:[],
    screen:{},
    userData:{}
}

export const dataReducer = (state=initialState, action)=> {
    switch (action.type) {
        case SCREEN_IS_LOADING:
            return {...state, isLoading:true}
        case SET_SCREENS:
            return {...state, isLoading:false, screens:action.payload}  
        case LIKE_SCREEN:
        case UNLIKE_SCREEN:
            let newScreen = action.payload
            let index = state.screens.findIndex((screen)=> screen.screenId === newScreen.screenId);
            state.screens[index] = newScreen;
            if(state.screen.screenId === action.payload.screenId){
                state.screen = newScreen
            }
            return {...state}
        case DELETE_SCREEN:
            let newScreens = state.screens.filter(screen => screen.screenId !== action.payload)
            return {...state, screens: newScreens, isLoading:false}
        case POST_SCREEN:
            return {...state, isLoading:false, screens:[action.payload,...state.screens]}
        case SET_SCREEN:
            return {...state, screen:action.payload}
        case SUBMIT_COMMENT:
            const specialIndex = state.screens.findIndex((item)=> item.screenId === state.screen.screenId)
            state.screens[specialIndex] = {...state.screens[specialIndex], commentCount: state.screens[specialIndex].commentCount + 1}

        return {...state, screen:{...state.screen, comments:[action.payload, ...state.screen.comments], commentCount:state.screen.commentCount + 1}}

        default:
            return state;
    }
} 
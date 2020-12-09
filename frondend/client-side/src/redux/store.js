import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import {userReducer} from '../redux/reducers/userReducer'
import {dataReducer} from '../redux/reducers/dataReducer'
import {uiReducer} from '../redux/reducers/uiReducer'
const initialState = {};
const middleware = [thunk]

const reducers = combineReducers({
    user: userReducer,
    data: dataReducer,
    ui:uiReducer
});

const composeEnhancer = compose;
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(...middleware)));

export default store;
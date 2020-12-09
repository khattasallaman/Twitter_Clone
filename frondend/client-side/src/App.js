import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import jwtDecode from 'jwt-decode'
import themeFile from './util/theme'
// importing redux stuff
import {SET_AUTHENTICATED } from './redux/actionTypes'
import {signout, getUserData} from './redux/actions/userActions'
import { useDispatch } from 'react-redux';
// importing material ui stuff
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
// import createMuiTheme from "@material-ui/core/styles/createMuiTheme"
import {unstable_createMuiStrictModeTheme as createMuiTheme} from '@material-ui/core';

// importing the pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
// importing the component
import NavbarComponent from './components/NavbarComponent';
import AuthRoute from './util/AuthRoute';
import Axios from 'axios';
import UserPage from './pages/UserPage';

Axios.defaults.baseURL = "https://us-central1-socialapp-96509.cloudfunctions.net/api"



// creating the Mui Theme 
const theme = createMuiTheme(themeFile)

function App() {
    
    const dispatch = useDispatch()
    // console.log(localStorage)
    const token = localStorage.FBIdToken
    // dispatch({type:SET_UNAUTHENTICATED})
    if(token){
      const decodedToken = jwtDecode(token)
      // console.log(decodedToken)
      if(decodedToken.exp * 1000  < Date.now()){
        
        dispatch(signout())
        window.location.href = "/login"
      }
      else {
        dispatch({type:SET_AUTHENTICATED})
        Axios.defaults.headers.common["Authorization"] = token
        dispatch(getUserData())
      }
    }
  return (
    <div >
      <MuiThemeProvider theme={theme}>
        <Router>
          <NavbarComponent/>
        <div className="container">
            <Switch>
              <Route exact path="/" component={HomePage}/>
              <AuthRoute exact path="/login" component={LoginPage} />
              <AuthRoute exact path="/signup" component={SignUpPage} />
              <Route exact path="/users/:handle" component={UserPage}/>
              <Route exact path="/users/:handle/screen/:screenId" component={UserPage}/>
            </Switch>
        </div>
        </Router>
      </MuiThemeProvider>
        
    </div>
  );
}

export default App;

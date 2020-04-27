import React,{useRef} from 'react';
import './App.css';
import AppScreen from './components/base/AppScreen'
import styled from 'styled-components'
import {BrowserRouter as Router, Route, Switch, useLocation} from 'react-router-dom'
import Entries from './components/pages/Entries'
import Login from './components/pages/Login'
import Logs from './components/pages/Logs'
import Timer from './components/pages/Timer'
import SignUp from './components/pages/SignUp'
import PrivateRoute from './components/base/PrivateRoute'
import AuthContextProvider from './Contexts/AuthContext'
import LoginSettings from './components/pages/LoginSettings'
import SplashLogo from './components/pages/SplashLogo'
import VerifyEmail from './components/pages/VerifyEmail'





const StyledApp = styled.div`
  display:flex;
  justify-content:center;
  height:100vh;
  padding-top:2rem;
  position:relative;
  @media(max-width:1400px){
    padding:0;
    
  }
`
function App() { 

  
  return (
    <StyledApp>
      <AuthContextProvider>
      <AppScreen>
        <Switch >
          <PrivateRoute exact path='/logs'>
            <Logs/>
          </PrivateRoute>
          <PrivateRoute exact path='/entries/:id'>
            <Entries/>
          </PrivateRoute>
          <PrivateRoute exact path='/timer/:id'>
            <Timer/>
          </PrivateRoute>
          <PrivateRoute exact path='/loginsetting'>
            <LoginSettings/>
          </PrivateRoute>
          <Route exact path='/verify'>
            <VerifyEmail/>
          </Route>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/signup'>
            <SignUp/>
          </Route>
          <Route exact path='/'>
            <SplashLogo/>
          </Route>
        </Switch>
      </AppScreen>
      </AuthContextProvider>       
    </StyledApp>
  );
}

export default App;

import React, { useState } from "react"
import { BrowserRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage  from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import HomePage from "./components/HomePage.js";
import tokenProvider from './components/TokenProvider';
import StocksPage from "./components/StocksPage.js";
import authProvider from './components/AuthProvider';
require('dotenv').config()

function App() {

  console.log("Logged in: " + tokenProvider.isLoggedIn())
  console.log("Token expired: " + tokenProvider.isExpired(tokenProvider.getExpirationDate(localStorage.getItem("ACCESS_TOKEN"))));
  const [logged, setLogged] = useState(authProvider.useAuth());

  /*
  if (!tokenProvider.isLoggedIn()) {
    console.log("Token expired: " + tokenProvider.isExpired(tokenProvider.getExpirationDate(localStorage.getItem("ACCESS_TOKEN"))));
    return (
      <Router>
        <Switch>
          
          <Route path="/" exact>
            <LoginPage />
          </Route>

          <Route path="/Register" exact component={SignUpPage}>
            <SignUpPage />
          </Route>

          <Route path="/Login" exact component={LoginPage}>
            <LoginPage />
          </Route>
          <Redirect to="/Login"/>

        </Switch>
      </Router>
    )
  }
  */

  return (
    <BrowserRouter>
      <Switch>

        {!logged && <>
          <Route path="/Register" exact component={SignUpPage}>
            <SignUpPage />
          </Route>

          <Route path="/Login" exact component={LoginPage}>
            <LoginPage />
          </Route>
          <Redirect to="/Login"/>
        </>} 

        {logged && <>
          <Route path="/Register" exact component={SignUpPage}>
            <SignUpPage />
          </Route>

          <Route path="/Login" exact component={LoginPage}>
            <LoginPage />
          </Route>
          
          <Route path="/Stocks" exact component={StocksPage}>
            <StocksPage />
          </Route>

          <Route path="/Dashboard" exact component={HomePage}>
            <HomePage />
          </Route>
        </>} 

      </Switch>
    </BrowserRouter>
  )
}

export default App;

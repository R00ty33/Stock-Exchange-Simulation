import React, { useState, useEffect} from "react"
import { BrowserRouter, Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage  from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import HomePage from "./components/HomePage.js";
import tokenProvider from './components/TokenProvider';
import StocksPage from "./components/StocksPage.js";
import authProvider from './components/AuthProvider';
import PrivateRoute from './components/PrivateRoute';
import LeaderBoardPage from './components/LeaderBoardPage';
require('dotenv').config()

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Login" exact component={LoginPage}>
            <LoginPage />
          </Route>

          <Route path="/Register" exact component={SignUpPage}>
            <SignUpPage />
          </Route>

          <Route path="/Leaderboard" exact component={SignUpPage}>
            <LeaderBoardPage />
          </Route>

          <PrivateRoute exact path='/Dashboard' exact component={HomePage} />
          <PrivateRoute exact path='/Stocks' exact component={StocksPage} />

          <Route component={LoginPage}>
            <LoginPage />
          </Route>

        </Switch>
      </BrowserRouter>
    )
      //<Route component={NotFound} />

}

export default App;
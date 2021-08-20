import React from "react"
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import LoginPage  from "./components/LoginPage.js";
import SignUpPage from "./components/SignUpPage.js";
import HomePage from "./components/HomePage.js";
import tokenProvider from './components/TokenProvider';

function App() {
  const {logged} = tokenProvider.isLoggedIn();
  if (!logged) {
    return (
      <Router>
        <Switch>
          
          <Route path="/" exact><LoginPage /></Route>

          <Route path="/Register" exact component={SignUpPage}><SignUpPage /></Route>

          <Route path="/Login" exact component={LoginPage}><LoginPage /></Route>
          <Redirect to="/Login"/>

        </Switch>
      </Router>
    )
  }

  return (
    <Router>
      <Switch>
    
        <Route path="/" exact><LoginPage /></Route>

        <Route path="/Login" exact component={LoginPage}><LoginPage /></Route>

        <Route path="/Register" exact component={SignUpPage}><SignUpPage /></Route>

        <Route path="/Home" exact component={HomePage}><HomePage /></Route>

      </Switch>
    </Router>
  )
}

export default App;

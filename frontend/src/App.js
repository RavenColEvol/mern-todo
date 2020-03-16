import React from 'react';
import {Provider} from 'react-redux'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authAction";


import store from './redux/store'
import Todos from './components/Todos'
import Login from './components/Login'
import Register from './components/Register'
import NotFound from './components/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Navbar from './components/Navbar'
import Notification from './components/Notification'


if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Notification type='success' title='Test'/>
        <Navbar></Navbar>
        <Switch>
          {/* HOME PAGE */}
          <PrivateRoute exact path='/' component={Todos} />
          {/* LOGIN PAGE */}
          <Route exact path='/auth/login' component={Login} />
          {/* REGISTER PAGE */}
          <Route exact path='/auth/register' component={Register} />
          <Route component={NotFound}></Route>
          
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;

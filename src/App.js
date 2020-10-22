import React, { Component } from 'react';

import './App.css';

import { Redirect } from 'react-router-dom';

//import {Todo} from "./components/Todo";
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import {Login} from "./components/Login";
import {SignUp} from "./components/Registro";
//localStorage.setItem('email',"luis");
//localStorage.setItem('password',"123");

class App extends Component{
  constructor(props) {
    super(props);
  }  
  render(){
    return (
      <Router>
        <Switch>
            <Route path="/"
              component={Login} exact> </Route>

            <Route path="/signup"
              component={SignUp} exact> </Route>
          
            <Route path="/todo"
              component={ResponsiveDrawer} exact> </Route>

            <Route path="/logout" render={()=>{
                                    localStorage.clear();
                                    return <Redirect to="/"></Redirect>;
                                    }} exact />
        </Switch>
      </Router>
    );
  } 
}
export default App;


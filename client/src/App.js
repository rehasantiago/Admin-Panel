import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./components/Admin"
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import NewUser from './components/NewUser';

class App extends Component {
  render(){
    return (
      <div>
        <Router>
          <Navbar/>
          <br/>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/newUser" component={NewUser}/>
        </Router>
      </div>
    );
  }
}

export default App;

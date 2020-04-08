import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./components/Admin"
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';

class App extends Component {
  render(){
    return (
      <div>
        <Router>
          <Navbar/>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./components/Admin"
import Todos from './components/Todos';
import NewUser from './components/NewUser';

class App extends Component {
  render(){
    return (
      <div>
        <Router>
          <br/>
          <Route exact path="/" component={Admin} />
          <Route exact path="/todos" component={Todos} />
          <Route exact path="/newUser" component={NewUser}/>
        </Router>
      </div>
    );
  }
}

export default App;

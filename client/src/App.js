import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Admin from "./components/Admin"

class App extends Component {
  render(){
    return (
      <div>
        <Router>
          <Route exact path="/admin" component={Admin} />
        </Router>
      </div>
    );
  }
}

export default App;

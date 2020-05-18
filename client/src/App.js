import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";


export default class App extends Component {
  render() {
    return (
      <Router>
        <NavBar />
        <Route exact path='/' component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router >
    )
  }
}
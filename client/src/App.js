import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from './history';

import NavBar from "./components/NavBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.updateUser = this.updateUser.bind(this);

  }
  updateUser(user) {
    this.setState({ user: user });
  }
  render() {
    return (
      <Router history={history}>
        <NavBar user={this.state.user} />
        <Route exact
          path='/'
          render={props => (<Landing {...props} user={this.state.user} />)}
        />
        <Route exact path="/register" component={Register} />
        <Route exact
          path="/login"
          render={props => (<Login {...props} updateUser={this.updateUser} />)}
        />
      </Router >
    )
  }
}
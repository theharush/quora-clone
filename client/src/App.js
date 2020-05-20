import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from './history';

import UserNavBar from "./components/navbars/UserNavBar";
import GuestNavBar from "./components/navbars/GuestNavBar";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Register from "./components/Register";


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.updateUser = this.updateUser.bind(this);
  }
  updateUser(user) {
    this.setState({ user: user });
  }

  render() {
    if (this.state.user) {
      return (
        <Router history={history}>
          <UserNavBar user={this.state.user} />
          <Route exact
            path='/'
            render={props => (<Landing {...props} user={this.state.user} />)}
          />
        </Router>
      )
    }

    return (
      <Router history={history}>
        <GuestNavBar />
        <Route
          exact
          path="/"
          render={props => (<Login {...props} updateUser={this.updateUser} />)}
        />
        <Route exact path="/register" component={Register} />
      </Router>

    )
  }
}
import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import axios from "axios";
import { withCookies } from 'react-cookie';


import UserNavBar from "./components/navbars/UserNavBar";
import GuestNavBar from "./components/navbars/GuestNavBar";
import Landing from "./components/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Question from "./components/questions/Question";
import NewQuestion from "./components/questions/NewQuestion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLogged: false,
      loadedQuestions: []
    };
    this.updateUser = this.updateUser.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
  }

  updateUser(res) {
    const { cookies } = this.props;
    const { user } = res.data;

    console.log(res);

    let isLogged = user.name ? true : false;

    this.setState({
      user: user,
      isLogged: isLogged
    });
  }

  updateQuestions(questions) {
    this.setState({ loadedQuestions: questions });
  }

  componentDidMount() {
    axios.get("http://localhost:8000/getUser").then(req => {
      if (req.data) {
        console.log(req.data);
        this.updateUser(req.data);
      }
    });
  }

  getAppByUser() {
    if (this.state.isLogged) {
      return (
        <Router history={history}>
          <UserNavBar user={this.state.user} logoutUser={this.updateUser} />
          <Route
            exact
            path="/"
            render={props => (
              <Landing
                {...props}
                user={this.state.user}
                questions={this.state.loadedQuestions}
                updateQuestions={this.updateQuestions}
              />
            )}
          />
          <Route path="/newQuestion" render={props => (<NewQuestion {...props} user={this.state.user} />)} />
          <Route
            path="/question/:questionId"
            render={props => (
              <Question {...props} questions={this.state.loadedQuestions} />
            )}
          />
        </Router>
      );
    } else {
      return (
        <Router history={history}>
          <GuestNavBar />
          <Route
            path="/"
            render={props => <Login {...props} updateUser={this.updateUser} />}
          />
          <Route exact path="/register" component={Register} />
        </Router>
      );
    }
  }

  render() {
    return this.getAppByUser();
  }
}

export default withCookies(App);
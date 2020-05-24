import React, { Component } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import axios from "axios";

import UserNavBar from "./components/navbars/UserNavBar";
import GuestNavBar from "./components/navbars/GuestNavBar";
import Landing from "./components/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Question from "./components/questions/Question";
import NewQuestion from "./components/questions/NewQuestion";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isLogged: false,
      loadedQuestions: [],
      lastQuestionDate: Date.now(),
      SelectedFilterTag: "All",
      FilterTagChanged: false
    };
    this.updateUser = this.updateUser.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.updateQuestions = this.updateQuestions.bind(this);
    this.updateFilterTag = this.updateFilterTag.bind(this);
  }

  getQuestions() {
    const { SelectedFilterTag } = this.state,
      lastQuestionDate = this.state.FilterTagChanged ? Date.now() : this.state.lastQuestionDate

    axios.get(`http://localhost:8000/api/getQuestions?FilterTag=${SelectedFilterTag}&lastQuestionDate=${lastQuestionDate}`).then(req => {
      this.updateQuestions(req.data)
    })
  }

  updateQuestions(questions) {
    if (questions && questions.length >= 1) {
      this.setState({
        loadedQuestions: questions,
        lastQuestionDate: Date.parse(questions[questions.length - 1].created_date),
        FilterTagChanged: false
      });
    } else {
      this.setState({
        loadedQuestions: [],
        lastQuestionDate: Date.now(),
        FilterTagChanged: false
      })
    }
  }

  updateUser(user) {
    let isLogged = user.name ? true : false;

    this.setState({
      user: user,
      isLogged: isLogged
    });
  }


  updateFilterTag(e) {
    const name = e.target.name;

    this.setState({
      SelectedFilterTag: name,
      FilterTagChanged: true
    }, () => this.getQuestions())
  }

  componentDidMount() {
    axios.get("http://localhost:8000/getUser").then(res => {
      if (res.data) {
        this.updateUser(res.data);
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
                lastQuestionDate={this.state.lastQuestionDate}
                SelectedFilterTag={this.state.SelectedFilterTag}
                getQuestions={this.getQuestions}
                updateQuestions={this.updateQuestions}
                updateFilterTag={this.updateFilterTag}
              />
            )}
          />
          <Route
            path="/newQuestion"
            render={props => (
              <NewQuestion
                {...props}
                questions={this.state.loadedQuestions}
                updateQuestions={this.updateQuestions}
              />
            )}
          />
          <Route
            path="/question/:questionId"
            render={props => (
              <Question
                {...props}
                questions={this.state.loadedQuestions}
                updateQuestions={this.updateQuestions}
              />
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

import React, { Component } from "react";
import axios from "axios";

import QuestionList from "./questions/QuestionList";
import TagFilter from "./questions/TagFilter"

export default class Landing extends Component {
  constructor(props) {
    super(props);

    this.getMoreQuestions = this.getMoreQuestions.bind(this);
  }
  getMoreQuestions() {
    axios
      .get(`http://localhost:8000/api/questions/${this.props.lastQuestionDate}`)
      .then(req => {
        this.props.updateQuestions(req.data);
      });
  }

  render() {
    const name = this.props.user ? this.props.user.name : "undefined";
    return (
      <div>
        <p>Hello {name} </p>

        <TagFilter
          SelectedFilterTag={this.props.SelectedFilterTag}
          updateFilterTag={this.props.updateFilterTag}
        />

        <QuestionList questions={this.props.questions} />

        <button onClick={this.getMoreQuestions}>Get Sum' More</button>
      </div>
    );
  }

  componentDidMount() {
    axios.get("http://localhost:8000/api/questions").then(req => {
      this.props.updateQuestions(req.data);
    });
  }
}

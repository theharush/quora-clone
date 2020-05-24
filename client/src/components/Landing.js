import React, { Component } from "react";

import QuestionList from "./questions/QuestionList";
import TagFilter from "./questions/TagFilter"

export default class Landing extends Component {
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

        <button onClick={this.props.getQuestions}>Get Sum' More</button>
      </div>
    );
  }

  componentDidMount() {
    this.props.getQuestions();
  }
}

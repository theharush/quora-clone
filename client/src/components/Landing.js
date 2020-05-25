import React, { Component } from "react";

import QuestionList from "./questions/QuestionList";
import TagFilter from "./questions/TagFilter"

export default class Landing extends Component {
  render() {
    return (
      <div className="container">
        <div className="flex-container">
          <div className="tag-filter-container">
            <TagFilter
              SelectedFilterTag={this.props.SelectedFilterTag}
              updateFilterTag={this.props.updateFilterTag}
            />
          </div>
          <div className="feed">
            <QuestionList questions={this.props.questions} />
            <button onClick={this.props.getQuestions}>Get Sum' More</button></div>
        </div>
      </div>

    );
  }

  componentDidMount() {
    this.props.getQuestions();
  }
}

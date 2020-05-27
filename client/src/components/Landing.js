import React, { Component } from "react";

import QuestionList from "./questions/QuestionList";
import TagFilter from "./questions/TagFilter"

import "../style/questionList.css";
import "../style/tagFilter.css";


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
          <div className="feed-container">
            <QuestionList questions={this.props.questions} />
            <button
              onClick={this.props.getQuestions}
              className="btn btn-primary btn-block"
            >
              Get Sum' More
            </button>
          </div>
        </div>
      </div>

    );
  }
}

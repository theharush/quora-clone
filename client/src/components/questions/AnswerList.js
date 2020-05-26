import React, { Component } from "react";

import AnswerListItem from "./AnswerListItem";

export default class AnswerList extends Component {
  render() {
    let answers = this.props.answers.map(answer => (
      <AnswerListItem answer={answer} key={answer._id} />
    ));

    return <ul className="answer-list"> {answers} </ul>;
  }
}

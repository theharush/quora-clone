import React, { Component } from "react";

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: null
    };
  }
  UNSAFE_componentWillMount() {
    const {
      match: { params }
    } = this.props;

    const question = this.props.questions.find(
      question => question._id === params.questionId
    );

    this.setState({
      question: question
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.question.question}</h1>
        <div class="question-actions">
          <a href="#" class="inline">
            Answer
          </a>
          <a href="#" class="inline">
            Follow
          </a>
        </div>
        <div class="answer-count" id="answerCount">
          {this.state.question.answers.length} Answers
        </div>
      </div>
    );
  }
}

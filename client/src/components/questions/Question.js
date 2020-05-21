import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        question: "Loading...",
        answers: []
      }
    };

    this.setQuestionState = this.setQuestionState.bind(this);
  }

  getQuestionFromState(questions, questionId) {
    const question = questions.find(
      question => question._id === questionId
    );
    if (question) {
      this.setQuestionState(question);
      return true;
    } else return false;
  }

  getQuestionFromServer(questionId) {
    axios.get(`http://localhost:8000/api/question/${questionId}`).then(
      req => {
        this.setQuestionState(req.data)
      }
    )
  }

  setQuestionState(question) {
    this.setState({
      question: question
    })
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;

    if (this.props.questions) {
      if (!this.getQuestionFromState(this.props.questions, params.questionId))
        this.getQuestionFromServer(params.questionId);
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.question.question}</h1>
        <div class="question-actions">
          <Link to="#" class="inline">
            Answer
          </Link>
          <Link to="#" class="inline">
            Follow
          </Link>
        </div>
        <div class="answer-count" id="answerCount">
          {this.state.question.answers.length} Answers
        </div>
      </div>
    );
  }
}

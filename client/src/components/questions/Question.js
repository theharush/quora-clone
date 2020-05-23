import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import AnswerList from "./AnswerList";
import AnswerForm from "./AnswerForm";

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: {
        question: "Loading...",
        tag: "Loading...",
        answers: [],
        questionId: ""
      }
    };

    this.setQuestionState = this.setQuestionState.bind(this);
  }

  getQuestionFromState(questions, questionId) {
    const question = questions.find(question => question._id === questionId);
    if (question) {
      this.setQuestionState(question);
      return true;
    } else return false;
  }

  getQuestionFromServer(questionId) {
    axios.get(`http://localhost:8000/api/question/${questionId}`).then(req => {
      if (req.data.question) this.setQuestionState(req.data);
    });
  }

  setQuestionState(question) {
    this.setState({
      question: question
    });
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
    let answerList;
    if (this.state.question.answers !== undefined) {
      answerList = <AnswerList answers={this.state.question.answers} />;
    }
    return (
      <div>
        <p>{this.state.question.tag}</p>

        <h1>{this.state.question.question}</h1>
        <div className="question-actions">
          <Link to="#" className="inline">
            Answer
          </Link>
          <Link to="#" className="inline">
            Follow
          </Link>
        </div>
        <div className="answer-count" id="answerCount">
          {this.state.question.answers.length} Answers
        </div>

        {answerList}

        <AnswerForm
          questionId={this.state.question._id}
          questions={this.props.questions}
          updateQuestions={this.props.updateQuestions}
          setQuestionState={this.setQuestionState}
        />
      </div>
    );
  }
}

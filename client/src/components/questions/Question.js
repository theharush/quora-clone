import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

import AnswerList from "./AnswerList";
import AnswerForm from "./AnswerForm";

import "../../style/question.css";

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
    axios.get(`/api/question/${questionId}`).then(req => {
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
    let answerList, created_date;
    if (this.state.question.answers !== undefined) {
      answerList = <AnswerList answers={this.state.question.answers} />;
    }
    created_date = moment(this.state.question.created_date).format('MMMM Do YYYY, h:mm');

    return (
      <div className="container mt-3">
        <div className="card question-card">
          <div className="card-body">
            <div className="info">
              <p>{this.state.question.tag}</p>
              <p>{created_date}</p>
            </div>
            <h1>{this.state.question.question}</h1>
          </div>
          <div className="card-body answer-list-container">

            <div className="answer-count" id="answerCount">
              {this.state.question.answers.length} Answers
            </div>

            {answerList}

          </div>

          <div className="flex-container pt-0">
            <AnswerForm
              questionId={this.state.question._id}
              questions={this.props.questions}
              updateQuestions={this.props.updateQuestions}
              setQuestionState={this.setQuestionState}
            />
          </div>
        </div>
      </div>
    );
  }
}

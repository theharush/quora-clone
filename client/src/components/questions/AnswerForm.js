import React, { Component } from "react";
import axios from "axios";

export default class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const answer = {
      answer: this.state.answer
    };

    axios
      .post(
        `http://localhost:8000/api/question/${this.props.questionId}`,
        answer
      )
      .then(res => {
        if (res.data.question) {
          let updatedQuestions = [];

          const index = this.props.questions.findIndex(
            x => x.questionId === res.data.questionId
          );

          if (index) {
            updatedQuestions = [...this.props.questions];
            updatedQuestions[index] = res.data;
          } else {
            updatedQuestions = [res.data];
          }

          this.props.updateQuestions(updatedQuestions);
          this.props.setQuestionState(res.data);
        } else {
        }
      });
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Answer:
          <input
            name="answer"
            type="text"
            value={this.state.question}
            onChange={this.handleInputChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

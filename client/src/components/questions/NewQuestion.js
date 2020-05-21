import React, { Component } from "react";
import axios from "axios";
import history from "../../history";

export default class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      errMsg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const question = {
      question: this.state.question
    };

    console.log(question);

    axios.post("http://localhost:8000/api/postQuestion", question).then(res => {
      if (res.data.question) {
        const updatedQuestions = [...this.props.questions, res.data];
        this.props.updateQuestions(updatedQuestions);

        history.push(`/question/${res.data._id}`);
      } else {
        console.log(res.data.errMsg);
        this.setState({ errMsg: res.data.errMsg });
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
        <h5>{this.state.errMsg.message}</h5>
        <label>
          Question:
          <input
            name="question"
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

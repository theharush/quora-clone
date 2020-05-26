import React, { Component } from "react";
import axios from "axios";
import history from "../../history";

export default class NewQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: "",
      question: "",
      errMsg: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const question = {
      tag: this.state.tag,
      question: this.state.question
    };

    axios.post("/api/postQuestion", question).then(res => {
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
    let errMsg = null;
    if (this.state.errMsg.message)
      errMsg = (
        <div class="alert alert-danger" role="alert">
          {this.state.errMsg.message}
        </div>
      )

    return (
      <div className="flex-container">
        <div className="card form-card">
          <form onSubmit={this.handleSubmit} className="card-body">
            {errMsg}
            <div className="form-group">
              <label for="tag">Tag:</label>
              <input
                className="form-control"
                name="tag"
                type="text"
                value={this.state.tag}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label for="question"> Question:</label>
              <input
                className="form-control"
                name="question"
                type="text"
                value={this.state.question}
                onChange={this.handleInputChange}
              />
            </div>

            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Submit"
            />
          </form>
        </div>
      </div>
    );
  }
}

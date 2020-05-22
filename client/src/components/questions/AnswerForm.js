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

        axios.post(`http://localhost:8000/api/question/${this.props.questionId}`, answer).then(res => {
            if (res.question) {
                const updatedQuestions = [...this.props.questions];
                const index = updatedQuestions.findIndex(x => x.questionId === res.questionId);
                updatedQuestions[index] = res;

                this.props.updateQuestions(updatedQuestions);
            } else {
                console.log(res);
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

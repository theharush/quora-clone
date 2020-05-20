import React, { Component } from "react";
import { Link } from "react-router-dom"

export default class QuestionList extends Component {
    render() {
        let questions = this.props.questions.map((question) => (
            <li key={question._id}>
                <Link to={`/question/${question._id}`}><h2>{question.Question}</h2></Link>
                <h5>{question.Answers.length} Answers</h5>
            </li >
        ))

        return <ul> {questions} </ul>;
    }
}
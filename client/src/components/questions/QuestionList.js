import React, { Component } from "react";

import QuestionListItem from "./QuestionListItem";

export default class QuestionList extends Component {
    render() {
        let questions = this.props.questions.map((question) => (
            <QuestionListItem
                question={question}
                key={question._id}
            />
        ))

        return <ul class="feed"> {questions} </ul>;
    }
}
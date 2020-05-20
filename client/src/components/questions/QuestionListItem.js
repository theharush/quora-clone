import React from "react";
import { Link } from "react-router-dom"

export default function QuestionListItem(props) {
    return (
        <li>
            <Link to={`/question/${props.question._id}`}><h2>{props.question.Question}</h2></Link>
            <h5>{props.question.Answers.length} Answers</h5>
        </li >
    )
}
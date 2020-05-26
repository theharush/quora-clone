import React from "react";
import { Link } from "react-router-dom";

export default function QuestionListItem(props) {
  return (
    <li className="card feed-item">
      <div className="card-body">
        <Link to={`/question/${props.question._id}`}>
          <h3>{props.question.question}</h3>
        </Link>
        <p>
          <strong>{props.question.tag}</strong> | {props.question.answers.length} Answers
        </p>
      </div>
    </li>
  );
}

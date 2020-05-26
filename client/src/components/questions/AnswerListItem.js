import React from "react";

export default function AnswerListItem(props) {
  return (
    <li className="answer">
      <p><strong>{props.answer.name}</strong> Answered at: {props.answer.created_date}</p>
      <h5>{props.answer.answer}</h5>
    </li>
  );
}

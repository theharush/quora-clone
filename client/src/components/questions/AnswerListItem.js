import React from "react";

export default function AnswerListItem(props) {
  return (
    <li>
      <h5>{props.answer.name}</h5>
      <h6>{props.answer.answer}</h6>
    </li>
  );
}

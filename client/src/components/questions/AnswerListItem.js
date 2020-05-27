import React from "react";
import moment from "moment";

export default function AnswerListItem(props) {
  let created_date = moment(props.answer.created_date).format('MMMM Do YYYY, h:mm');

  return (
    <li className="answer">
      <div className="info">
        <p><strong>{props.answer.name}</strong> </p>
        <p> {created_date}</p>
      </div>
      <h5>{props.answer.answer}</h5>
    </li>
  );
}

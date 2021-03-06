import React from "react";

const Question = ({ number, question, onAnswer }) => {
  return (
    <div className="question">
      <h1>Question #{number}</h1>
      <p>{question && question.text}</p>
      <ul>
        {question &&
          question.answers.map((answer, i) => {
            return (
              <button
                className="choiceButton"
                onClick={() => onAnswer(answer)}
                key={i}
              >
                {answer}
              </button>
            );
          })}
      </ul>
    </div>
  );
};

export default Question;

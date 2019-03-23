import React from "react";
import NewGameButton from "./newGameButton";

const Score = ({ score, questions, answers, onReset }) => {
  return (
    <React.Fragment>
      <h1>Score: {score}</h1>
      <ul>
        {questions.map((question, i) => {
          const answer = answers[i];
          const color = answer ? "green" : "red";
          return (
            <li key={i}>
              <h3>{question.text}</h3>
              <div>
                <h4 style={{ color: color }}>{question.correct_answer}</h4>
              </div>
            </li>
          );
        })}
      </ul>
      <NewGameButton onReset={onReset} />
    </React.Fragment>
  );
};

export default Score;

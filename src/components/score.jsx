import React from "react";
import NewGameButton from "./newGameButton";

const Score = ({ score, questions, answers, onReset }) => {
  return (
    <div className="scoreReport">
      <h1>Score: {((score / questions.length) * 100).toFixed(0)}%</h1>
      <ul>
        {questions.map((question, i) => {
          const answer = answers[i];
          const colorClass = answer ? "correct" : "incorrect";
          return (
            <li className="scoreReportQuestion" key={i}>
              <h3>
                <span className="accentText">Question #{i + 1}:</span>
                {question.text}
              </h3>
              <h4 className={colorClass}>{question.correct_answer}</h4>
            </li>
          );
        })}
      </ul>
      <NewGameButton onReset={onReset} />
    </div>
  );
};

export default Score;

import React from "react";
import NewGameButton from "./newGameButton";

const Options = ({ onReset }) => {
  return (
    <header>
      <div className="filler" />
      <h1>Silly React Quiz</h1>
      <div className="filler">
        <NewGameButton onReset={onReset} />
      </div>
      <div className="clear-fix" />
    </header>
  );
};

export default Options;

import React from "react";

const NewGameButton = ({ onReset }) => {
  return (
    <button className="resetButton" onClick={onReset}>
      New Game
    </button>
  );
};

export default NewGameButton;

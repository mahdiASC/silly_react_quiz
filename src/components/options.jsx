import React from "react";
import NewGameButton from "./newGameButton";

const Options = ({ onReset }) => {
  return (
    <div>
      <NewGameButton onReset={onReset} />
    </div>
  );
};

export default Options;

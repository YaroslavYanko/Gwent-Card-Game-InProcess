import React from "react";



const StartGame = ({startGame}) => {
  return (
    <>
      <div className="overlay"></div>
      <div className="modal">
        <button type="button" onClick={startGame}>
          Start New Game
        </button>
      </div>
    </>
  );
};

export default StartGame;

import React from "react";
import { clearState } from "./StartNewGame";
// import classes from "../BattleMap.module.css";

const Winner = ({
  userOne,
  userTwo,
  hideWinnerBaner,
  setUserOne,
  setUserTwo,
  startGame
}) => {

 function testEnd(){
  document.location.reload();
 }

  return (
    <>
      <button type="button">Start New Game</button>
      <div className={`overlay ${hideWinnerBaner ? null : "hiddenMod"}`}></div>
      <div className={`modal_winGame ${hideWinnerBaner ? null : "hiddenMod"}`}>
        <h1>{userOne.winRaund === 2 ? userOne.name : userTwo.name} Win Game</h1>
        <button
          type="button"
          onClick={testEnd}
        >
          Start New Game
        </button>
      </div>
      <div
        className={`overlay_winGame ${hideWinnerBaner ? null : "hiddenMod"}`}
      ></div>
    </>
  );
};

export default Winner;

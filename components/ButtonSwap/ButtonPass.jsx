import React, { useEffect } from "react";
import classes from "../../page/BattleMap.module.css";
//import { DeckCardProvider } from "../../context/DeckCardContext";

const ButtonPass = ({ skipMove ,setPlayerPass}) => {

  let timeOut = 0;
  function  skipRoundBTNDown () {
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      setPlayerPass(true)

      skipMove()
    }, 2000);
  }

  function skipRoundBTNUp() {
    clearTimeout(timeOut);
  }


  return (
    <button
      onMouseDown={skipRoundBTNDown}
      onMouseUp={skipRoundBTNUp}
      type="button"
      className={classes.btnPass}
    >
      <p>PASS</p>
    </button>
  );
};

export default ButtonPass;

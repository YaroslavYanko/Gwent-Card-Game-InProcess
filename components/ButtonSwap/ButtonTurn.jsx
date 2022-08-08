import React from "react";
import classes from "../../page/BattleMap.module.css";

const ButtonTurn = ({changePlayer}) => {
  return (
    <button
      onClick={changePlayer}
      type="button"
      className={classes.btnChangeTurn}
    >
      <p>END TURN</p>
    </button>
  );
};

export default ButtonTurn;

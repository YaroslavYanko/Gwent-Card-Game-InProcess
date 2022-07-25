import React from 'react'
import classes from './IconsWinner.module.css'

const IconsWinner = ({useWinnerOne,useWinnerTwo}) => {

  return (
    <div className={classes.aceContainer}>
    <div className={classes.aceBox}>
      <img
       draggable={false}
        className={useWinnerOne >= 1 ? classes.activeAce : classes.ace}
        src="battleCard/ace.png"
        alt="ace"
      />
      <img
       draggable={false}
        className={useWinnerOne >= 2 ? classes.activeAce : classes.ace}
        src="battleCard/ace.png"
        alt="ace"
      />
    </div>
    <div className={classes.aceBox}>
      <img
       draggable={false}
        className={useWinnerTwo >= 1 ? classes.activeAce : classes.ace}
        src="battleCard/ace.png"
        alt="ace"
      />
      <img
      draggable={false}
        className={useWinnerTwo >= 2 ? classes.activeAce : classes.ace}
        src="battleCard/ace.png"
        alt="ace"
      />
    </div>
  </div>
  )
}

export default IconsWinner
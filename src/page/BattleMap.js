import React, { useContext, useState, useEffect } from "react";
import classes from "./BattleMap.module.css";

import UserTwoCards from "../components/BattleCardsUserTwo/UserTwoCards";
import UserOneCards from "../components/BattleCardsUserOne/UserOneCards";

import DeckCardProvider from "../context/DeckCardContext";
import IconsWinner from "../components/IconsWinner/IconsWinner";

//import UserOneContainar from "../components/BattleCardsUserOne/UserOneContainar";
import { clearBattleLinesCards } from "../RoundEnd/RoundEnd";
import StartGame from "./ModalWindow/StartGame";
import Winner from "./ModalWindow/Winner";
import ButtonTurn from "../components/ButtonSwap/ButtonTurn";
import ButtonPass from "../components/ButtonSwap/ButtonPass";

const BattleMap = () => {
  const [useFirstLineLengthOne, setFirstLineLengthOne] = useState(null);
  const [useFirstLineLengthTwo, setFirstLineLengthTwo] = useState(null);
  const [hideWinnerBaner, setHideWinnerBaner] = useState(false);
  const [showButtonChangePlayer, setShowButtonChangePlayer] = useState(true);
  const [playerPass, setPlayerPass] = useState(false);
  const {
    userOne,
    userTwo,
    setUserOne,
    setUserTwo,
    randomCartUserOne,
    randomCartUserTwo,
    winnerRound,
    //endGame
  } = useContext(DeckCardProvider);

  function allPointsUser1(card, firstLineLengthOne) {
    // we add the cards that were used
    
    setUserOne((state) => ({
      ...state,
      cardsUsed: [
        ...state.cardsUsed,
        ...state.cards.filter((ca) => card.getAttribute("alt") === ca.id),
      ],
      winPoints: state.winPoints + Number(card.dataset.power),
      cardsFromMap: [...userOne.cardsFromMap, card],
    }));

    setFirstLineLengthOne(firstLineLengthOne);
  }
  function allPointsUser2(card, firstLineLengthTwo) {
    //console.log(useFirstLineLengthOne)
    // we add the cards that were used
    setUserTwo((state) => ({
      ...state,
      cardsUsed: [
        ...state.cardsUsed,
        ...state.cards.filter((ca) => card.getAttribute("alt") === ca.id),
      ],
      winPoints: state.winPoints + Number(card.dataset.power),
      cardsFromMap: [...userTwo.cardsFromMap, card],
    }));
    console.log(userOne.cardsFromMap);
    setFirstLineLengthTwo(firstLineLengthTwo);
  }

  function roundEnd() {
    setShowButtonChangePlayer(true);

    winnerRound();

    setUserOne((state) => ({
      ...state,
      winPoints: 0,
    }));
    setUserTwo((state) => ({
      ...state,
      winPoints: 0,
    }));
    clearBattleLinesCards([...userOne.cardsFromMap, ...userTwo.cardsFromMap]);

    randomCartUserOne();
    randomCartUserTwo();

    setFirstLineLengthOne(1);
    setFirstLineLengthTwo(1);
    setPlayerPass(false);
  }

  //Викликати в UseEffect при тому якщо в грявця закінчились карти
  function skipMove() {
    if (userOne.activePlayer === true) {
      setUserOne((state) => ({ ...state, activePlayer: false }));
      setUserTwo((state) => ({ ...state, activePlayer: true }));
      console.log("userTwo", userOne.activePlayer);
    }
    if (userTwo.activePlayer === true) {
      setUserTwo((state) => ({ ...state, activePlayer: false }));
      setUserOne((state) => ({ ...state, activePlayer: true }));
      console.log("userTwo", userTwo.activePlayer);
    }
  }

  useEffect(() => {
    if (useFirstLineLengthOne === 0 && useFirstLineLengthTwo === 0) {
      roundEnd();
    }

    //skipMove();
  }, [useFirstLineLengthOne, useFirstLineLengthTwo]);

  //////////// Сhange Player when we click
  function changePlayer() {
    // If someone doesn't have cards
    if (userOne.activePlayer === true && useFirstLineLengthTwo === 0) {
      roundEnd();
    }
    if (userTwo.activePlayer === true && useFirstLineLengthOne === 0) {
      roundEnd();
    }

    setShowButtonChangePlayer(true);

    setUserOne((state) => ({ ...state, activePlayer: !state.activePlayer }));

    if (userOne.activePlayer === true) {
      userOne.cardsInHand.forEach((img) => {
        img.setAttribute("draggable", true);
      });
    }

    setUserTwo((state) => ({ ...state, activePlayer: !state.activePlayer }));

    if (userTwo.activePlayer === true) {
      userTwo.cardsInHand.forEach((img) => {
        img.setAttribute("draggable", true);
      });
    }

    // if (useFirstLineLengthOne === 0 && useFirstLineLengthTwo === 0){
    //   roundEnd();
    // }
  }

  //End raund when we press the button 2s
  //ДОРОБИТИ : при зажимі зміня гравця і після ходів рахувати очки

  function startGame() {
    randomCartUserOne();
    randomCartUserTwo();

    setHideWinnerBaner((state) => !state);

    const modal = document.querySelector(".modal");
    const overlay = document.querySelector(".overlay");
    modal.classList.add("hiddenMod");
    overlay.classList.add("hiddenMod");
  }

  // function winGame() {
  //   //e.target.parentElement.classList.remove("hiddenMod");

  // }

  //Game winner
  // let winner = false;
  // function winnerBanner(){
  //   if (userOne.winRaund === 1) {
  //     winner = true;
  //   }
  //   if (userTwo.winRaund === 1) {
  //     winner = true;
  //   }

  //   if (userOne.winRaund === 2) {
  //     winner = true;
  //   }
  //   if (userTwo.winRaund === 2) {
  //     winner = true;
  //   }

  // }
  // useEffect(() => {

  // }, [userOne.winRaund, userTwo.winRaund]);

  return (
    <div className={classes.map}>
      {/* <button onClick={endGame}>CLICK</button> */}
      <div className={classes.borderMap}>
        <div className={classes.boxUsers}>
          <section className={classes.boxUser_one}>
            <div className={classes.user_one_score}>
              <span className={classes.score}>{userOne.winPoints}</span>
            </div>
          </section>
   
          {/* ////////////////////// */}
          <div className={classes.passBlock}>
            {playerPass ? (
              <button className={classes.roundEnd} onClick={roundEnd}>
                <p>ROUND END</p>
              </button>
            ) : showButtonChangePlayer ? (
              <ButtonPass skipMove={skipMove} setPlayerPass={setPlayerPass} />
            ) : (
              <ButtonTurn changePlayer={changePlayer} />
            )}
{/*            
            <ButtonPass skipMove={skipMove} setPlayerPass={setPlayerPass} />
            <ButtonTurn changePlayer={changePlayer} /> */}
          </div>
          {/* ///////////////////// */}
          <section className={classes.boxUser_two}>
            <div className={classes.user_two_score}>
              <span className={classes.score}>{userTwo.winPoints}</span>
            </div>
          </section>
        </div>
        {/* ////////////// */}
        <IconsWinner
          useWinnerOne={userOne.winRaund}
          useWinnerTwo={userTwo.winRaund}
        />

        <div className={classes.battleCardMap}>
          {/* /////////////User 1/////////////// */}

          <UserOneCards
            setShowButtonChangePlayer={setShowButtonChangePlayer}
            setFirstLineLengthOne={setFirstLineLengthOne}
            useFirstLineLengthTwo={useFirstLineLengthTwo}
            allPoints={allPointsUser1}
            userOne={userOne}
            setUserOne={setUserOne}
            playerPass={playerPass}
          />

          {/* /////////////User 2/////////////// */}

          <UserTwoCards
            setShowButtonChangePlayer={setShowButtonChangePlayer}
            setFirstLineLengthTwo={setFirstLineLengthTwo}
            useFirstLineLengthOne={useFirstLineLengthOne}
            allPoints={allPointsUser2}
            userTwo={userTwo}
            setUserTwo={setUserTwo}
            playerPass={playerPass}
          />
        </div>
      </div>

      <StartGame startGame={startGame} />

      {userTwo.winRaund === 2 ? (
        <Winner
          hideWinnerBaner={hideWinnerBaner}
          userOne={userOne}
          userTwo={userTwo}
          setUserOne={setUserOne}
          setUserTwo={setUserTwo}
          startGame={startGame}
        />
      ) : null}
      {userOne.winRaund === 2 ? (
        <Winner
          hideWinnerBaner={hideWinnerBaner}
          userOne={userOne}
          userTwo={userTwo}
          setUserOne={setUserOne}
          setUserTwo={setUserTwo}
          startGame={startGame}
        />
      ) : null}
    </div>
  );
};

export default BattleMap;

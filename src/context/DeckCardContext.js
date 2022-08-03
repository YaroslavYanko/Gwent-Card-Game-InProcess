import { createContext, useState, useEffect } from "react";
import { useDeck1, useDeck2 } from "./decksOfAllCards";

const DeckCardContext = createContext();

export function DeckCardProvider({ children }) {
  const initialStateUserOne = {
    name: "User One",
    winPoints: 0,
    winRaund: 0,
    numberOfDestroyedCards: 0,
    cardsUsed: [],
    cards: [],
    cardsFromMap: [],
    cardsInHand: [],
    activePlayer: false,
    playerPass: false,
    mainDeck: 0,
  };

  const initialStateUserTwo = {
    name: "User Two",
    winPoints: 0,
    winRaund: 0,
    numberOfDestroyedCards: 0,
    cardsUsed: [],
    cards: [],
    cardsFromMap: [],
    cardsInHand: [],
    activePlayer: true,
    playerPass: false,
    mainDeck: 0,
  };

  const [userOne, setUserOne] = useState({
    name: "User One",
    winPoints: 0,
    winRaund: 0,
    numberOfDestroyedCards: 0,
    cardsUsed: [],
    cards: [],
    cardsFromMap: [],
    cardsInHand: [],
    activePlayer: false,
    canAttack:true,
    playerPass: false,
    mainDeck: 0,
  });
  const [userTwo, setUserTwo] = useState({
    name: "User Two",
    winPoints: 0,
    winRaund: 0,
    numberOfDestroyedCards: 0,
    cardsUsed: [],
    cards: [],
    cardsFromMap: [],
    cardsInHand: [],
    activePlayer: true,
    canAttack:true,
    playerPass: false,
    mainDeck: 0,
  });

  function randomCartUserOne() {
    for (let i = 0; i < 4; i++) {
      let num = Math.floor(Math.random() * useDeck1.length - 1);

      let removeCard = useDeck1.splice(num, 1);

      setUserOne((state) => ({
        ...state,
        cards: [...state.cards, ...removeCard],
        numberOfDestroyedCards: userOne.cardsUsed.length,
        mainDeck: useDeck1.length,
      }));

      // //we remove cards from the deck and before we add to the setUser card
      // setDeck1((state) => state.filter((arr, i) => arr.id !== userOne.cards.id));
    }
  }

  function randomCartUserTwo() {
    for (let i = 0; i < 4; i++) {
      let num = Math.floor(Math.random() * useDeck2.length);
      let removeCard = useDeck2.splice(num, 1);

      setUserTwo((state) => ({
        ...state,
        cards: [...state.cards, ...removeCard],
        numberOfDestroyedCards: userTwo.cardsUsed.length,
        mainDeck: useDeck2.length,
      }));
    }
  }

  function winnerRound() {
    if (userOne.winPoints === userTwo.winPoints) {
      setUserOne((state) => ({
        ...state,

        winRaund: state.winRaund + 1,
      }));
      setUserTwo((state) => ({
        ...state,

        winRaund: state.winRaund + 1,
      }));
    }

    userOne.winPoints > userTwo.winPoints
      ? setUserOne((state) => ({
          ...state,

          winRaund: state.winRaund + 1,
        }))
      : setUserTwo((state) => ({
          ...state,

          winRaund: state.winRaund + 1,
        }));
  }

  // function endGame() {

  //   const oldCartUserOne = [...userOne.cards];
  //   const oldCartUserTwo = [...userTwo.cards];
  //   useDeck1.push(...oldCartUserOne);
  //   useDeck2.push(...oldCartUserTwo);

  //   setUserOne({ ...initialStateUserOne });
  //   setUserTwo({ ...initialStateUserTwo });

  //   randomCartUserOne();
  //   randomCartUserTwo();
  // }

  return (
    <DeckCardContext.Provider
      value={{
        userOne,
        userTwo,
        setUserOne,
        setUserTwo,
        randomCartUserOne,
        randomCartUserTwo,
        winnerRound,
        //endGame,
      }}
    >
      {children}
    </DeckCardContext.Provider>
  );
}

export default DeckCardContext;

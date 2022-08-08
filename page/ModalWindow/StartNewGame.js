
const initialStateUserOne = {
    name: "User One",
    winPoints: 0,
    winRaund: 0,
    numberOfDestroyedCards: 0,
    cardsUsed: [],
    cards: [],
    cardsFromMap: [],
    cardsInHand:[],
    activePlayer: false,
    playerPass:false,
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
    cardsInHand:[],
    activePlayer: true,
    playerPass:false,
    mainDeck: 0,
  };

export  function clearState (setUserOne,setUserTwo){
    console.log('hey')
    setUserOne({...initialStateUserOne})
    setUserTwo({...initialStateUserTwo})
    //startGame()
  }
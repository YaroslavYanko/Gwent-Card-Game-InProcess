// import UserOneCards from "../components/BattleCardsUserOne/UserOneCards";
// import UserTwoCards from "../components/BattleCardsUserTwo/UserTwoCards";

export function clearBattleLinesCards([...cardsSecondLine]) {

  cardsSecondLine.forEach((element) => {

    element.remove();
  });
}



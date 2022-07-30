import React, { useState, useRef, useEffect } from "react";

import classes from "../../components/Cards.module.css";

const UserTwoCards = ({
  allPoints,
  userTwo,
  setUserTwo,
  useFirstLineLengthOne,
  setFirstLineLengthTwo,
  setShowButtonChangePlayer,
  playerPass,
  attackCard,
}) => {
  const [card, setCard] = useState(0);

  const firstLineLength = useRef();
  const secondLine = useRef();
  const thirdLine = useRef();

  function dragStart(e) {
    ///////////////////////////////////

    setCard(e.target);
    setTimeout(() => {
      e.target.classList.add(classes.hidden);
    }, 0);
  }
  function dragEnd(e) {
    e.target.classList.remove(classes.hidden);
  }
  function dragEnter(e) {
    e.target.classList.add(classes.dropList);
  }
  function dragOver(e) {
    e.preventDefault();
  }
  function dragDrop(e) {
    if (userTwo.activePlayer) {
      e.target.classList.remove(classes.dropList);
      card.setAttribute("draggable", false);
      card.classList.add(classes.usedCard);
      e.target.append(card);

      allPoints(card, firstLineLength.current.childNodes.length, [
        ...secondLine.current.childNodes,
        ...thirdLine.current.childNodes,
      ]);

      //changePlayer();
      setFirstLineLengthTwo(firstLineLength.current.childNodes.length);
      //When your deck is empty
      // if (firstLineLength.current.childNodes.length === 0) {
      //   roundEnd();
      // }

      setUserTwo((state) => ({
        ...state,
        cardsInHand: firstLineLength.current.childNodes,
      }));
      if (!playerPass && useFirstLineLengthOne !== 0) {
        firstLineLength.current.childNodes.forEach((img) => {
          img.setAttribute("draggable", false);
        });
      }

      setShowButtonChangePlayer(false);
    }
  }
  function dragLeave(e) {
    e.target.classList.remove(classes.dropList);
  }
  useEffect(() => {
    secondLine.current.childNodes.forEach((el) =>
      el.setAttribute("draggable", false)
    );
    thirdLine.current.childNodes.forEach((el) =>
      el.setAttribute("draggable", false)
    );
  }, [userTwo.activePlayer]);

  return (
    <section className={classes.battleCardUser_two}>
      <div className={classes.reboundBlock}>
        <span className={classes.deckCardsNumUserTwo}>
          {userTwo.numberOfDestroyedCards}
        </span>
        <input
          draggable={false}
          className={classes.packCard}
          type="image"
          src="battleCard/other-graveyard.png"
          alt="pack"
        />
      </div>

      <div className={classes.battleBlock}>
        <div
          ref={thirdLine}
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dragDrop(e)}
          onDragOver={(e) => dragOver(e)}
          className={classes.battleCardUser_two_thirdLine}
        ></div>
        <div
          ref={secondLine}
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dragDrop(e)}
          onDragOver={(e) => dragOver(e)}
          className={classes.battleCardUser_two_secondLine}
        ></div>
        <div
          ref={firstLineLength}
          className={classes.battleCardUser_two_firstLine}
        >
          {userTwo.cards.map((card, i) => {
            return (
              <div
                className={classes.battleCard_wraper}
                draggable={userTwo.activePlayer}
                key={i}
                onDragStart={(e) => dragStart(e)}
                onDragEnd={(e) => dragEnd(e)}
                data-id={card.id}
                data-power={card.power}
              >
                <img
                onClick={attackCard}
                  data-power={card.power}
                  draggable={false}
                  className={classes.battleCard}
                  src={card.img}
                  alt={card.img}
                  data-user={'user2'}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className={classes.packBlock}>
        <span className={classes.deckCardsNumUserTwo}>{userTwo.mainDeck}</span>
        <input
          draggable={false}
          className={classes.packCard}
          type="image"
          src="battleCard/pack.png"
          alt="pack"
        />
      </div>
    </section>
  );
};

export default UserTwoCards;

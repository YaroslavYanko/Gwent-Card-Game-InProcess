import React, { useState, useRef } from "react";

import classes from "../../components/Cards.module.css";

const UserOneCards = ({
  allPoints,
  userOne,
  setUserOne,
  useFirstLineLengthTwo,
  setFirstLineLengthOne,
  setShowButtonChangePlayer,
  playerPass,
}) => {
  const [card, setCard] = useState(null);

  const firstLineLength = useRef();
  const secondLineLength = useRef()
  const thirdLineLength = useRef()

  // const secondLine = useRef();
  // const thirdLine = useRef();

  ////////////////////////Drop/////////////////////
  const handleHoverCard = function (e) {
    const link = e.target;
    link.style.transition = "all 0.5s ease-in-out";
    link.classList.add("activeCard");
  };

  const handlerOutCard = function (e) {
    const link = e.target;

    link.style.transition = "all 0.2s ease-in-out";
    link.classList.remove("activeCard");
  };

  function dragStart(e) {
    ///////////////////////////////////////////////////////////

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
    if (userOne.activePlayer) {
      card.setAttribute("draggable", false);

      e.target.classList.remove(classes.dropList);

      card.classList.add(classes.usedCard);
      e.target.append(card);

      allPoints(card);
      setFirstLineLengthOne(firstLineLength.current.childNodes.length);

      setUserOne((state) => ({
        ...state,
        cardsInHand: firstLineLength.current.childNodes,
      }));
      if (!playerPass && useFirstLineLengthTwo !== 0) {
        firstLineLength.current.childNodes.forEach((img) => {
          img.setAttribute("draggable", false);
        });
      }
      // firstLineLength.current.childNodes.forEach(el=>el.remove())
      setShowButtonChangePlayer(false);
      ///////////Передати довжину блоку з картами після закінчення раунду
      //////////після видачі нових карт

      //When your deck is empty
      // if (firstLineLength.current.childNodes.length === 0) {
      //   roundEnd();
      //   console.log('stop')
      // }
    }
  }
  function dragLeave(e) {
    e.target.classList.remove(classes.dropList);
  }

  return (
    <section className={classes.battleCardUser_one}>
      <div className={classes.reboundBlock}>
        <input
          draggable={false}
          className={classes.packCard}
          type="image"
          src="battleCard/other-graveyard.png"
          alt="pack"
        />
        <span className={classes.deckCardsNum}>
          {userOne.numberOfDestroyedCards}
        </span>
      </div>
      <div className={`${classes.battleBlock} ${classes.rev}`}>
        <div
        ref={thirdLineLength}
          id="thirdLine"
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dragDrop(e)}
          onDragOver={(e) => dragOver(e)}
          className={classes.battleCardUser_one_thirdLine}
        ></div>
        <div
         ref={secondLineLength}
          id="secondLine"
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dragDrop(e)}
          onDragOver={(e) => dragOver(e)}
          className={classes.battleCardUser_one_secondLine}
        ></div>
        <div
          ref={firstLineLength}
          id="firstLine"
          className={classes.battleCardUser_one_firstLine}
        >
          {userOne.cards?.map((card, i) => {
            return (
              <img
                draggable={true}
                key={i}
                onDragStart={(e) => dragStart(e)}
                onDragEnd={(e) => dragEnd(e)}
                onMouseEnter={handleHoverCard}
                onMouseOut={handlerOutCard}
                className={classes.battleCard}
                src={card.img}
                alt={card.id}
                data-user={"user1"}
                data-power={card.power}
              />
            );
          })}
        </div>
      </div>
      <div className={classes.packBlock}>
        <input
          draggable={false}
          className={classes.packCard}
          type="image"
          src="battleCard/pack.png"
          alt="pack"
        />
        <span className={classes.deckCardsNum}>{userOne.mainDeck}</span>
      </div>
    </section>
  );
};

export default UserOneCards;

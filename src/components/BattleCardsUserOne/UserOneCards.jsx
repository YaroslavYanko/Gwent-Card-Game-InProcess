import React, { useState, useRef, useEffect } from "react";

import classes from "../../components/Cards.module.css";

const UserOneCards = ({
  allPoints,
  userOne,
  setUserOne,
  useFirstLineLengthTwo,
  setFirstLineLengthOne,
  setShowButtonChangePlayer,
  playerPass,
  attackCard,
}) => {
  const [card, setCard] = useState(null);

  const firstLineLength = useRef();
  const secondLine = useRef();
  const thirdLine = useRef();

  // const cardInBattle = useRef();

  // const center = useRef();

  // const targetAttack = useRef();

  // const secondLine = useRef();
  // const thirdLine = useRef();

  ////////////////////////Drop/////////////////////

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
      console.log(card);
      card.setAttribute("draggable", false);
      card.parentElement.setAttribute("draggable", false);
      console.log(card.parentElement);
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

  useEffect(() => {
    secondLine.current.childNodes.forEach((el) =>
      el.setAttribute("draggable", false)
    );
    thirdLine.current.childNodes.forEach((el) =>
      el.setAttribute("draggable", false)
    );
  }, [userOne.activePlayer]);

  // function rotateF1(e) {
  //   const { left, top, height, width } = e.target.getBoundingClientRect();

  //   console.log(left, top, height, width);
  //   center.current = {
  //     x: left + width / 2,
  //     y: top + height / 2,
  //   };
  //   targetAttack.current = e.target;

  // }

  // document.addEventListener("mousemove", (e) => {
  //   if (!center.current) {
  //     return;
  //   }
  //   let coordinates = {
  //     x: e.clientX - center.current.x,
  //     y: -(e.clientY - center.current.y),
  //   };

  //   let angle = Math.round(
  //     (Math.atan2(coordinates.x, coordinates.y) * 180) / Math.PI
  //   );

  //   if (angle >= 20 && angle <= 160) {
  //     targetAttack.current.nextSibling.style.transform = `rotate(${angle}deg)`;
  //   }
  // });

  // document.addEventListener("mouseup", () => {
  //   center.current = null;
  // });

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
          ref={thirdLine}
          id="thirdLine"
          onDragEnter={(e) => dragEnter(e)}
          onDragLeave={(e) => dragLeave(e)}
          onDrop={(e) => dragDrop(e)}
          onDragOver={(e) => dragOver(e)}
          className={classes.battleCardUser_one_thirdLine}
        ></div>
        <div
          ref={secondLine}
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
              <div
                // onMouseDown={rotateF1}
                className={classes.battleCard_wraper}
                draggable={userOne.activePlayer}
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
                  data-user={"user1"}
                />
                {/* <div className={classes.arrowAttack}></div> */}
              </div>
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

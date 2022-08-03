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
  cardsUsedUserTwo,
}) => {
  const [card, setCard] = useState(0);

  const firstLineLength = useRef();
  const secondLine = useRef();
  const thirdLine = useRef();

  function addAboutCard(e) {
    // e.target.nextSibling.style.display = "block";
  }
  function removeAboutCard(e) {
    // e.target.nextSibling.style.display = "none";
  }

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
      card.firstChild.nextSibling.setAttribute("data-user", "user2");

      card.classList.add(classes.usedCard);
      e.target.append(card);

      cardsUsedUserTwo(card);
      allPoints(secondLine.current.childNodes, thirdLine.current.childNodes);
      setFirstLineLengthTwo(firstLineLength.current.childNodes.length);

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

  // function attackCard(e) {
  //   let attackDMG;
  //   let hp
  //   if (userTwo.activePlayer && userTwo.canAttack) {
  //     if (e.target.getAttribute("data-user") === "user2"){
  //       attackDMG = e.target.getAttribute("data-attack");
  //       console.log(attackDMG)
  //     }
  //     if (e.target.getAttribute("data-user") === "user1"){
  //       hp = e.target.getAttribute("data-power")

  //     }
  //     console.log(hp)
  //   }
  // console.log(e.target)

  // }

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
                <span>{card.power}</span>
                <img
                  onMouseOver={addAboutCard}
                  onMouseOut={removeAboutCard}
                  onClick={attackCard}
                  data-power={card.power}
                  data-attack={card.attack}
                  draggable={false}
                  className={classes.battleCard}
                  src={card.img}
                  alt={card.img}
                  data-id={card.id}
                />
                  <span>{card.attack}</span>

                {/* <div className={`${classes.cardInfo}`}>
                  <p>Some text</p>
                </div> */}
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

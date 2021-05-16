import { useContext } from "react";
import { CardContext } from "../../../../contexts/CardContext";
import { DeckContext } from "../../../../contexts/DeckContext";

import styles from "../../../../styles/Home/modal/CardModal.module.css";

export default function Buttons() {
  const { updateReview, nextCard, currentCard } = useContext(CardContext);

  const { updateInfo } = useContext(DeckContext);

  const calcTime = (degree) => {
    const daysToReview = (currentCard.reviewTime - 1) * degree;
    return daysToReview;
  };

  return (
    <>
      <button
        onClick={() => {
          let isToNotRepeat = false;

          if (currentCard.isNew) {
            updateInfo("newCardReviewed", currentCard.deckId);
          }

          if (currentCard.isRepeat) {
            isToNotRepeat = true;
          }
          updateReview(calcTime(1), false, isToNotRepeat).then(() => {
            nextCard();
            if (currentCard.isRepeat) {
              updateInfo("cardRepeatReviewed", currentCard.deckId);
            }
          });
        }}
        className={styles.buttonRed}
      >
        Difícil
        <br />
        <small>{calcTime(1)} dias</small>
      </button>
      <button
        onClick={() => {
          let isToNotRepeat = false;
          if (currentCard.isNew) {
            updateInfo("newCardReviewed", currentCard.deckId);
          }

          if (currentCard.isRepeat) {
            isToNotRepeat = true;
          }
          updateReview(calcTime(5), false, isToNotRepeat).then(() => {
            nextCard();
            if (currentCard.isRepeat) {
              updateInfo("cardRepeatReviewed", currentCard.deckId);
            }
          });
        }}
        className={styles.buttonYellow}
      >
        Médio
        <br />
        <small>{calcTime(5)} dias</small>
      </button>
      <button
        onClick={() => {
          let isToNotRepeat = false;

          if (currentCard.isNew) {
            updateInfo("newCardReviewed", currentCard.deckId);
          }

          if (currentCard.isRepeat) {
            isToNotRepeat = true;
          }
          updateReview(calcTime(7), false, isToNotRepeat).then(() => {
            nextCard();
            if (currentCard.isRepeat) {
              updateInfo("cardRepeatReviewed", currentCard.deckId);
            }
          });
        }}
        className={styles.buttonGreen}
      >
        Fácil
        <br />
        <small>{calcTime(7)} dias</small>
      </button>
    </>
  );
}

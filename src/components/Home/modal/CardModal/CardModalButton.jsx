import { useContext } from "react";
import { CardContext } from "../../../../contexts/CardContext";
import { DeckContext } from "../../../../contexts/DeckContext";

export default function Buttons() {
  const { updateReview, nextCard, currentCard } = useContext(CardContext);

  const { updateInfo } = useContext(DeckContext);

  return (
    <>
      <div style={{ margin: "2rem" }}>
        <button
          onClick={() => {
            if (currentCard.isNew)
              updateInfo("newCardReviewed", currentCard.deckId);
            updateReview(0, true).then(() => {
              nextCard();
              if (!currentCard.isRepeat) {
                updateInfo("repeatReview", currentCard.deckId);
              }
            });
          }}
        >
          Repetir <br />
          <small>{"<"} 1min</small>
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
            updateReview(3, false, isToNotRepeat).then(() => {
              nextCard();
              if (currentCard.isRepeat) {
                updateInfo("cardRepeatReviewed", currentCard.deckId);
              }
            });
          }}
        >
          Difícil
          <br />
          <small>2 dias</small>
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
            updateReview(5, false, isToNotRepeat).then(() => {
              nextCard();
              if (currentCard.isRepeat) {
                updateInfo("cardRepeatReviewed", currentCard.deckId);
              }
            });
          }}
        >
          Médio
          <br />
          <small>5 dias</small>
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
            updateReview(7, false, isToNotRepeat).then(() => {
              nextCard();
              if (currentCard.isRepeat) {
                updateInfo("cardRepeatReviewed", currentCard.deckId);
              }
            });
          }}
        >
          Fácil
          <br />
          <small>7 dias</small>
        </button>
      </div>
    </>
  );
}

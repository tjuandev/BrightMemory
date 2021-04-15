import { useContext } from "react";
import { CardContext } from "../../../../contexts/CardContext";

export default function Buttons() {
  const { updateReview, nextCard, repeatedCardsArray } = useContext(
    CardContext
  );

  return (
    <>
      <div style={{ margin: "2rem" }}>
        <button
          onClick={() => {
            updateReview(0).then(() => {
              nextCard(true);
              console.log(repeatedCardsArray);
            });
          }}
        >
          Repetir <br />
          <small>{"<"} 1min</small>
        </button>
        <button
          onClick={() => {
            updateReview(3).then(() => {
              nextCard();
            });
          }}
        >
          Difícil
          <br />
          <small>2 dias</small>
        </button>
        <button
          onClick={() => {
            updateReview(5).then(() => {
              nextCard();
            });
          }}
        >
          Médio
          <br />
          <small>5 dias</small>
        </button>
        <button
          onClick={() => {
            updateReview(7).then(() => {
              nextCard();
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

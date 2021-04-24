import { useContext, useEffect } from "react";
import { CardContext } from "../../../../contexts/CardContext";
import { DeckContext } from "../../../../contexts/DeckContext";
import { ModalContext } from "../../../../contexts/ModalContext";

import CardModalButton from "./CardModalButton";

import styles from "../../../../styles/Home/modal/CardModal.module.css";

export default function CardModal({ name, deckId }) {
  const {
    fetchCards,
    currentCard,
    showAnswer,
    isAnswerShowing,
    isStudyFinished,
  } = useContext(CardContext);

  const { loading } = useContext(DeckContext);
  const { deactivateModal } = useContext(ModalContext);

  useEffect(() => {
    fetchCards(deckId);
  }, []);

  return (
    <div className={styles.modalContainer}>
      <div>
        {loading ? (
          "loading"
        ) : (
          <>
            <h2>Card de {name}</h2>
            <button // Custom Close Button
              onClick={() => {
                deactivateModal("CardModal");
                showAnswer(false);
              }}
              className="closeButton"
            >
              X
            </button>

            <div style={{ textAlign: "center" }}>
              {isStudyFinished ? (
                <h2>Congrats!</h2>
              ) : (
                <div className={styles.cardInfo}>
                  <div className={styles.frontCard}>
                    <strong>{currentCard.front || ""}</strong>
                  </div>

                  {isAnswerShowing ? (
                    <>
                      <hr />
                      <div className={styles.backCard}>
                        <strong>{currentCard.back || ""}</strong>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {isAnswerShowing ? (
                    <CardModalButton />
                  ) : (
                    <button onClick={() => showAnswer(true)}>
                      Mostrar Resposta
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

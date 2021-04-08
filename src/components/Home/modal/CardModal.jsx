import { useContext, useEffect } from "react";
import { DeckContext } from "../../../contexts/DeckContext";
import { ModalContext } from "../../../contexts/ModalContext";

import styles from "../../../styles/Home/modal/CardModal.module.css";

export default function CardModal({ name, id }) {
  const {
    loading,
    fetchCards,
    cardsArray,
    currentCard,
    showAnswer,
    isAnswer,
    nextCard,
    isStudyFinished,
  } = useContext(DeckContext);
  const { deactivateModal } = useContext(ModalContext);

  useEffect(() => {
    fetchCards(id);
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
              className={styles.closeButton}
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

                  {isAnswer ? (
                    <>
                      <hr />
                      <div className={styles.backCard}>
                        <strong>{currentCard.back || ""}</strong>
                      </div>
                    </>
                  ) : (
                    ""
                  )}

                  {isAnswer ? (
                    <>
                      <div style={{ margin: "2rem" }}>
                        <button>Difícil</button>
                        <button>Médio</button>
                        <button onClick={nextCard}>Fácil</button>
                      </div>
                    </>
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

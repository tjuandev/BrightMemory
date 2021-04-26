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
    <div className="modalContainer">
      <div className={styles.cardModalContainer}>
        {loading ? (
          "loading"
        ) : (
          <>
            <header className="modalHeader">
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
            </header>

            {isStudyFinished ? (
              <div className={styles.endStudies}>
                <h2>
                  Parabéns, você estudou todos os cards que tinha para estudar
                  hoje nesse deck!!! Você pode sair agora.
                </h2>
              </div>
            ) : (
              <>
                <main className={styles.mainContent}>
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
                  </div>
                </main>
                <footer>
                  <div className={styles.buttonContainer}>
                    {isAnswerShowing ? (
                      <CardModalButton />
                    ) : (
                      <button
                        onClick={() => showAnswer(true)}
                        className={styles.showAnswerButton}
                      >
                        Mostrar Resposta
                      </button>
                    )}
                  </div>
                </footer>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

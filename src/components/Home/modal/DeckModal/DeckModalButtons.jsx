import { useContext } from "react";
import { DeckContext } from "../../../../contexts/DeckContext";
import { ModalContext } from "../../../../contexts/ModalContext";
import { CardContext } from "../../../../contexts/CardContext";

import styles from "../../../../styles/Home/modal/DeckModal.module.css";

export default function DeckModalButtons({ deckId, reviewInfo }) {
  const { deleteAllCards, cardsArray } = useContext(CardContext);
  const { deleteDeck, fetchDecks, userId } = useContext(DeckContext);
  const { deactivateModal, activateModal } = useContext(ModalContext);

  const review = reviewInfo.cardsToday > 0 || reviewInfo.newCards > 0;

  return (
    <div className={styles.buttonsContainer}>
      <button
        className={`button-red ${styles.Button}`}
        onClick={() => {
          deleteDeck(deckId);
          deleteAllCards(deckId);
          fetchDecks(userId);
          deactivateModal("DeckModal");
        }}
      >
        Deletar Card
      </button>
      <button
        onClick={() => {
          activateModal("CreateCardModal");
          deactivateModal("DeckModal");
        }}
        className={`button-blue ${styles.Button}`}
      >
        Criar Card
      </button>
      <button
        onClick={() => {
          if (review) {
            return activateModal("CardModal");
          }
          return;
        }}
        className={`button-green ${
          review ? styles.allowed : styles.notAllowed
        } ${styles.Button}`}
      >
        Estudar
      </button>
    </div>
  );
}

import { useContext } from "react";
import { DeckContext } from "../../../../contexts/DeckContext";
import { ModalContext } from "../../../../contexts/ModalContext";
import { CardContext } from "../../../../contexts/CardContext";

import styles from "../../../../styles/Home/modal/DeckModal.module.css";

export default function DeckModalButtons({ deckId }) {
  const { deleteAllCards, cardsArray } = useContext(CardContext);
  const { deleteDeck, fetchDecks, userId } = useContext(DeckContext);
  const { deactivateModal, activateModal } = useContext(ModalContext);

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
          if (cardsArray.length > 0) {
            activateModal("CardModal");
          }
          return;
        }}
        className={`button-green ${
          cardsArray.length > 0 ? styles.allowed : styles.notAllowed
        } ${styles.Button}`}
      >
        Estudar
      </button>
    </div>
  );
}

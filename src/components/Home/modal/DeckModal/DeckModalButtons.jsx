import { useContext } from "react";
import { DeckContext } from "../../../../contexts/DeckContext";
import { ModalContext } from "../../../../contexts/ModalContext";
import { CardContext } from "../../../../contexts/CardContext";

import styles from "../../../../styles/Home/modal/DeckModal.module.css";

export default function DeckModalButtons({ deckId }) {
  const { deleteAllCards } = useContext(CardContext);
  const { deleteDeck, fetchDecks, userId } = useContext(DeckContext);
  const { deactivateModal, activateModal } = useContext(ModalContext);

  return (
    <div className={styles.buttonsContainer}>
      <button
        onClick={() => {
          activateModal("CardModal");
        }}
        className={`button-green ${styles.Button}`}
      >
        Estudar
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
    </div>
  );
}

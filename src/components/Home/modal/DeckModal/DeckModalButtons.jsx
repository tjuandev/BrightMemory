import { useContext } from "react";
import { DeckContext } from "../../../../contexts/DeckContext";
import { ModalContext } from "../../../../contexts/ModalContext";

import styles from "../../../../styles/Home/modal/DeckModal.module.css";

export default function DeckModalButtons({ id }) {
  const { deleteDeck } = useContext(DeckContext);
  const { deactivateModal, activateModal } = useContext(ModalContext);

  return (
    <div className={styles.buttonsContainer}>
      <button
        onClick={() => activateModal("CardModal")}
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
        Create Card
      </button>
      <button
        className={`button-red ${styles.Button}`}
        onClick={() => {
          deleteDeck(id);
          deactivateModal("DeckModal");
        }}
      >
        Delete Card
      </button>
    </div>
  );
}

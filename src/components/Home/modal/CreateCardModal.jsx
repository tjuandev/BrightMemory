import { useContext } from "react";
import { DeckContext } from "../../../contexts/DeckContext";
import { ModalContext } from "../../../contexts/ModalContext";

import styles from "../../../styles/Home/modal/CreateCardModal.module.css";
import ClipLoader from "react-spinners/ClipLoader";

export default function CreateCardModal({ id }) {
  const { loading, Loading, createCards } = useContext(DeckContext);
  const { deactivateModal } = useContext(ModalContext);

  return (
    <div className={styles.modalContainer}>
      <div>
        {loading ? (
          <ClipLoader color="#000" loading={true} size={50} />
        ) : (
          <>
            <strong>Crie seu Deck</strong>
            <button
              onClick={() => deactivateModal("CreateCardModal")}
              className={styles.closeButton}
            >
              X
            </button>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createCards(id, e.target.front.value, e.target.back.value);
              }}
            >
              <label htmlFor="front">Parte Frontal</label>
              <input type="text" name="front" />
              <br />
              <label htmlFor="back">Parte Posterior</label>
              <input type="text" name="back" />
              <br />
              <button type="submit">Feito!😊</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

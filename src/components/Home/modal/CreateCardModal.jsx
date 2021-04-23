import { useContext } from "react";
import { DeckContext } from "../../../contexts/DeckContext";

import styles from "../../../styles/Home/modal/CreateCardModal.module.css";
import ClipLoader from "react-spinners/ClipLoader";

import CloseModal from "./CloseModal";
import { CardContext } from "../../../contexts/CardContext";

export default function CreateCardModal({ id }) {
  const { loading, Loading, updateInfo, fetchDecks, userId } = useContext(
    DeckContext
  );
  const { createCard } = useContext(CardContext);

  return (
    <div className={styles.modalContainer}>
      <div>
        {loading ? (
          <ClipLoader color="rgba(0, 0, 0, 0.4)" loading={true} size={50} />
        ) : (
          <>
            <strong>Crie seu Deck</strong>
            <CloseModal modal="CreateCardModal" />
            <form
              onSubmit={(e) => {
                Loading(true);
                e.preventDefault();
                createCard(id, e.target.front.value, e.target.back.value).then(
                  () => {
                    updateInfo("newCard", id).then(() => {
                      fetchDecks(userId).then(() => {
                        Loading(false);
                      });
                    });
                  }
                );
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

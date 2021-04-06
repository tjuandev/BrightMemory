import { useContext } from "react";
import { DeckContext } from "../../../contexts/DeckContext";
import { ModalContext } from "../../../contexts/ModalContext";

import styles from "../../../styles/Home/modal/CreateDeckModal.module.css";

import firebase from "../../../../firebase";

export default function CreateDeckModal() {
  const { loading, Loading, fetchDecks } = useContext(DeckContext);
  const { deactivateModal } = useContext(ModalContext);

  const db = firebase.firestore();

  return (
    <div className={styles.modalContainer}>
      <div>
        {loading ? (
          "loading"
        ) : (
          <>
            <strong>Crie seu Deck</strong>
            <button
              onClick={() => deactivateModal("CreateDeckModal")}
              className={styles.closeButton}
            >
              X
            </button>
            <form
              onSubmit={(item) => {
                item.preventDefault();
                Loading(true);

                const deckSchema = {
                  name: item.target.deck_name.value,
                  description: item.target.deck_description.value,
                  pendent: false,
                  photo_id: 1,
                  cards_number: 0,
                  created_at: new Date().getTime(),
                };

                db.collection("decks")
                  .add(deckSchema)
                  .then(() => {
                    fetchDecks();
                    Loading(false);
                    deactivateModal("CreateDeckModal");
                  });
              }}
            >
              <label htmlFor="deck_name">Nome do Deck</label>
              <input
                type="text"
                name="deck_name"
                required
                placeholder="Digite o nome aqui"
              />
              <label htmlFor="deck_description">Descrição</label>
              <textarea
                name="deck_description"
                id="deck_description"
                cols="30"
                rows="10"
                maxLength="255"
                placeholder="Digite sua descrição aqui."
                required
              ></textarea>
              <button type="submit">Feito!</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

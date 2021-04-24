import { useContext } from "react";
import { DeckContext } from "../../../contexts/DeckContext";
import { ModalContext } from "../../../contexts/ModalContext";

import styles from "../../../styles/Home/modal/CreateDeckModal.module.css";
import CloseModal from "./CloseModal";

export default function CreateDeckModal() {
  const { loading, Loading, fetchDecks, userId, createDeck } = useContext(
    DeckContext
  );
  const { deactivateModal } = useContext(ModalContext);

  return (
    <div className="modalContainer">
      <div className={styles.createDeckContainer}>
        <header className="modalHeader">
          <strong>Crie seu Deck</strong>
          <CloseModal modal="CreateDeckModal" />
        </header>

        <form
          className={styles.form}
          onSubmit={async (item) => {
            item.preventDefault();
            Loading(true);

            createDeck(item).then(() => {
              fetchDecks(userId);
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
            placeholder="Digite o nome do seu deck aqui"
          />

          <label htmlFor="deck_description">Descrição</label>
          <textarea
            name="deck_description"
            id="deck_description"
            cols="30"
            rows="10"
            placeholder="Digite a descrição aqui"
            required
          ></textarea>

          <label htmlFor="deckColor">Escolhar uma cor</label>
          <div className={styles.colorsContainer}>
            <input type="checkbox" className="bgWhite"></input>
            <input type="checkbox" className="bgRed"></input>
            <input type="checkbox" className="bgYellow"></input>
            <input type="checkbox" className="bgGreen"></input>
            <input type="checkbox" className="bgPurple"></input>
            <input type="checkbox" className="bgPink"></input>
          </div>

          <button type="submit">Feito!</button>
        </form>
      </div>
    </div>
  );
}

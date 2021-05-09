import { useContext, useState } from "react";
import { DeckContext } from "../../../contexts/DeckContext";
import { ModalContext } from "../../../contexts/ModalContext";

import styles from "../../../styles/Home/modal/CreateDeckModal.module.css";
import CloseModal from "./CloseModal";

export default function CreateDeckModal() {
  const { loading, loadingDeck, fetchDecks, userId, createDeck } = useContext(
    DeckContext
  );
  const { deactivateModal } = useContext(ModalContext);

  const [color, setColor] = useState(null);

  return (
    <div className="modalContainer">
      <div className={`${styles.createDeckContainer} ${color}`}>
        <header className="modalHeader" style={{ marginBottom: "1rem" }}>
          <strong>Crie seu Deck</strong>
          <CloseModal modal="CreateDeckModal" />
        </header>

        <form
          className={styles.form}
          onSubmit={async (item) => {
            item.preventDefault();
            loadingDeck(true);

            createDeck(item, color).then(() => {
              fetchDecks(userId);
              loadingDeck(false);
              deactivateModal("CreateDeckModal");
            });
          }}
        >
          <label htmlFor="deck_name">Nome do Deck:</label>
          <input
            type="text"
            name="deck_name"
            required
            placeholder="Digite o nome do seu deck aqui"
          />

          <label htmlFor="deck_photoUrl">Url de Imagem (opcional):</label>
          <input type="url" name="deck_url" placeholder="Cole a URL aqui" />

          <label htmlFor="deck_description">Descrição:</label>
          <textarea
            name="deck_description"
            id="deck_description"
            cols="30"
            rows="10"
            placeholder="Digite a descrição aqui"
            required
            minLength="50"
            maxLength="250"
          ></textarea>

          <label htmlFor="deckColor">Escolhar uma cor:</label>

          <div className={styles.colorsContainer}>
            <button
              className="bgRed"
              onClick={() => setColor("bgRed")}
              type="button"
            />
            <button
              className="bgYellow"
              onClick={() => setColor("bgYellow")}
              type="button"
            />
            <button
              className="bgGreen"
              onClick={() => setColor("bgGreen")}
              type="button"
            />
            <button
              className="bgPurple"
              onClick={() => setColor("bgPurple")}
              type="button"
            />
            <button
              className="bgPink"
              onClick={() => setColor("bgPink")}
              type="button"
            />
          </div>

          <button type="submit">Criar</button>
        </form>
      </div>
    </div>
  );
}

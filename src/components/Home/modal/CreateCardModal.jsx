import { useContext } from "react";
import { DeckContext } from "../../../contexts/DeckContext";

import styles from "../../../styles/Home/modal/CreateCardModal.module.css";
import ClipLoader from "react-spinners/ClipLoader";

import CloseModal from "./CloseModal";
import { CardContext } from "../../../contexts/CardContext";

export default function CreateCardModal({ id }) {
  const { updateInfo, fetchDecks, userId } = useContext(DeckContext);
  const { createCard, finishStudy, loading, loadingCards } = useContext(
    CardContext
  );

  return (
    <div className="modalContainer">
      <div className={styles.createCardModalContainer}>
        {loading ? (
          <div className="LoadingContainer">
            <ClipLoader color="rgba(0, 0, 0, 0.4)" loading={true} size={50} />
            <p>Estamos criando seu deck...</p>
          </div>
        ) : (
          <>
            <header className="modalHeader">
              <strong>Crie seu Card</strong>
              <CloseModal modal="CreateCardModal" />
            </header>
            <form
              onSubmit={(e) => {
                loadingCards(true);
                e.preventDefault();
                createCard(id, e.target.front.value, e.target.back.value).then(
                  () => {
                    updateInfo("newCard", id).then(() => {
                      fetchDecks(userId).then(() => {
                        loadingCards(false);
                        finishStudy(false);
                      });
                    });
                  }
                );
              }}
            >
              <label htmlFor="front">Parte Frontal</label>
              <textarea
                type="text"
                name="front"
                required
                placeholder="Digite aqui a parte frontal do seu card (perguntas, novas palavras...)."
              />
              <br />
              <label htmlFor="back">Parte Posterior</label>
              <textarea
                type="text"
                name="back"
                required
                placeholder="Digite aqui a parte posterior (respostas, traduções...)."
              />
              <br />
              <button type="submit" className={styles.button}>
                Feito
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

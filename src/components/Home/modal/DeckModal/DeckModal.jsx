import { useContext } from "react";
import { DeckContext } from "../../../../contexts/DeckContext";
import { ModalContext } from "../../../../contexts/ModalContext";

import DeckModalButtons from "./DeckModalButtons";

import styles from "../../../../styles/Home/modal/DeckModal.module.css";

export default function CreateDeckModal({ name, description, photo_id, id }) {
  const { loading } = useContext(DeckContext);
  const { activateModal, deactivateModal } = useContext(ModalContext);

  return (
    <div className="modalContainer">
      <div className={styles.customSize}>
        {loading ? (
          "loading"
        ) : (
          <>
            <header className="modalHeader" style={{ marginBottom: "2.5rem" }}>
              <strong>Gerenciar Deck</strong>
              <button
                onClick={() => deactivateModal("DeckModal")}
                className="closeButton"
              >
                X
              </button>
            </header>
            <div className={styles.deckInfoContainer}>
              <div className={styles.deckInfo}>
                <div className="deck">
                  <img src="/react.png" alt="react-icon-deck" />
                  <strong>{name}</strong>
                </div>
                <DeckModalButtons id={id} />
              </div>
              <div className={styles.deckStudyInfo}>
                <ul>
                  <li>
                    <strong style={{ color: "var(--red)" }}>
                      Revisão Crítica:
                    </strong>{" "}
                    5
                  </li>
                  <li>
                    <strong style={{ color: "var(--green)" }}>
                      Revisão Atual:
                    </strong>{" "}
                    10
                  </li>
                  <li>
                    <strong style={{ color: "var(--blue)" }}>
                      Novos Cards:
                    </strong>{" "}
                    3
                  </li>
                  <li>
                    <strong>Total de Cards: </strong>
                    42
                  </li>
                </ul>

                <p>
                  <strong>Descrição: </strong>
                  {description}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

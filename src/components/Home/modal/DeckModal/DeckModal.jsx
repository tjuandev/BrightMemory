import DeckModalButtons from "./DeckModalButtons";
import CloseModal from "../CloseModal";
import styles from "../../../../styles/Home/modal/DeckModal.module.css";

export default function DeckModal({
  name,
  photo_url,
  description,
  deckId,
  reviewInfo,
  colorClass,
}) {
  return (
    <div className="modalContainer">
      <div className={styles.deckModalContainer}>
        <header className="modalHeader">
          <strong>Gerenciar Deck</strong>
          <CloseModal modal="DeckModal" />
        </header>
        <div className={styles.deckInfoContainer}>
          <div className={styles.deckInfo}>
            <div className={`${styles.deckImage} ${colorClass}`}>
              <img src={photo_url || "/logo-home.svg"} alt="react-icon-deck" />
              <strong>{name}</strong>
            </div>
            <DeckModalButtons deckId={deckId} reviewInfo={reviewInfo} />
          </div>
          <div className={styles.deckStudyInfo}>
            <p>
              <strong>Descrição: </strong>
              {description}
            </p>

            <ul>
              {/* <li>
                    <strong style={{ color: "var(--red)" }}>
                      Revisão Crítica:
                    </strong>{" "}
                    {reviewInfo.cardsToRepeat}
                  </li> NOTE Future Update*/}
              <li>
                <strong style={{ color: "var(--green)" }}>
                  Revisão Atual:
                </strong>{" "}
                {reviewInfo.cardsToday}
              </li>
              <li>
                <strong style={{ color: "var(--blue)" }}>Novos Cards:</strong>{" "}
                {reviewInfo.newCards}
              </li>
              <li>
                <strong>Total de Cards: </strong>
                {reviewInfo.allCards}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

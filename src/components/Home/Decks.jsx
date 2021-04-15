import { useContext, useEffect } from "react";
import Deck from "./Deck";

import { v4 as uuidv4 } from "uuid";
import { DeckContext } from "../../contexts/DeckContext";

import styles from "../../styles/Home/Decks.module.css";
import { ModalContext } from "../../contexts/ModalContext";

export default function Decks() {
  const { deckArray, fetchDecks, userId } = useContext(DeckContext);
  const { activateModal } = useContext(ModalContext);

  useEffect(() => {
    if (userId) {
      fetchDecks(userId);
    }
  }, [userId]);

  return (
    <div className={styles.decksContainer}>
      {deckArray.map((deck) => {
        return (
          <Deck
            name={deck.name}
            description={deck.description}
            photo_id={deck.photo_id}
            cards={deck.cards}
            deck_id={deck._id}
            key={uuidv4()}
            activateModal={activateModal}
            reviewInfo={{
              newCards: deck.review_info.newCards,
              all_cards: deck.all_cards,
            }}
          />
        );
      })}
    </div>
  );
}

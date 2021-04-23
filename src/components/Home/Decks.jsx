import { useContext, useEffect } from "react";
import Deck from "./Deck";

import { v4 as uuidv4 } from "uuid";
import { DeckContext } from "../../contexts/DeckContext";

import styles from "../../styles/Home/Decks.module.css";
import { ModalContext } from "../../contexts/ModalContext";
import { CardContext } from "../../contexts/CardContext";

export default function Decks() {
  const { deckArray, fetchDecks, userId, updateInfo } = useContext(DeckContext);
  const { cardsToStudy } = useContext(CardContext);
  const { activateModal } = useContext(ModalContext);

  useEffect(() => {
    if (userId) {
      fetchDecks(userId).then((decks) => {
        if (decks.length > 0) {
          decks.forEach((deck) => {
            cardsToStudy(deck._id).then((cardsToStudy) => {
              updateInfo("reviewsToday", deck._id, cardsToStudy.length);
            });
          });
        }
      });
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
            deckId={deck._id}
            key={uuidv4()}
            activateModal={activateModal}
            reviewInfo={{
              cardsToRepeat: deck.review_info.repeat_cards,
              cardsToday: deck.review_info.cards_today,
              newCards: deck.review_info.new_cards,
              allCards: deck.all_cards,
            }}
          />
        );
      })}
    </div>
  );
}

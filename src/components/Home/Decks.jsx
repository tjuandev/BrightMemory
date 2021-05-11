import { useContext, useEffect } from "react";
import Deck from "./Deck";

import { v4 as uuidv4 } from "uuid";
import { DeckContext } from "../../contexts/DeckContext";

import styles from "../../styles/Home/Decks.module.css";
import { ModalContext } from "../../contexts/ModalContext";
import { CardContext } from "../../contexts/CardContext";

import ClipLoader from "react-spinners/ClipLoader";

export default function Decks() {
  const { deckArray, fetchDecks, userId, updateInfo, loading, loadingDeck } =
    useContext(DeckContext);
  const { cardsToStudy } = useContext(CardContext);
  const { activateModal } = useContext(ModalContext);

  useEffect(() => {
    loadingDeck(true);
    if (userId) {
      fetchDecks(userId).then((decks) => {
        if (decks.length > 0) {
          decks.forEach((deck) => {
            loadingDeck(false);
            cardsToStudy(deck._id).then((cardsToStudy) => {
              updateInfo("reviewsToday", deck._id, cardsToStudy.length);
            });
          });
        } else {
          loadingDeck(false);
        }
      });
    }
  }, [userId]);

  return (
    <>
      {loading ? (
        <div className={styles.message}>
          <ClipLoader size={60} color="var(--text-light)" />
          <h2>Aguarde enquanto carregamos os seus decks...</h2>
        </div>
      ) : (
        <>
          {deckArray.length === 0 ? (
            <div className={styles.message}>
              <h2>
                Você ainda não possui nenhum Deck criado, clique no botão{" "}
                <button className={styles.createButtonDeactivated} disabled>
                  +
                </button>{" "}
                para criar um.
              </h2>
            </div>
          ) : (
            <main className={styles.decksContainer}>
              {deckArray.map((deck) => {
                return (
                  <Deck
                    name={deck.name}
                    photo_url={deck.photo_url}
                    description={deck.description}
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
                    colorClass={deck.color_class}
                  />
                );
              })}
            </main>
          )}
        </>
      )}
    </>
  );
}

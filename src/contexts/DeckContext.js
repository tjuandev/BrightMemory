import { createContext, useState } from "react";
import firebase from "../../firebase";

const DeckContext = createContext({});

const DeckContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [deckArray, setDeckArray] = useState([]);

  const [cardsArray, setCardsArray] = useState([]);
  const [currentCard, setCurrentCard] = useState({ front: "", back: "" });

  const [isAnswer, setIsAnswer] = useState(false);
  const [isStudyFinished, setIsStudyFinished] = useState(false);

  const db = firebase.firestore();

  function fetchUserInfo(name, email, picture) {
    const data = { name, email, picture };

    setUserInfo(data);
  }

  let decks = []; // Var global to decks.

  function fetchDecks() {
    db.collection("decks")
      .orderBy("created_at", "desc")
      .get()
      .then((snap) => {
        snap.forEach((deck) => {
          decks = [...decks, { ...deck.data(), id: deck.id }];
        });
        setDeckArray(decks);
      });
  }

  let cards = [];

  function fetchCards(id) {
    db.collection("decks")
      .doc(id)
      .collection("cards")
      .get()
      .then((snap) => {
        snap.forEach((card) => {
          cards = [...cards, card.data()];
        });

        setCurrentCard(cards[0]);
        setCardsArray(cards);
      });
  }

  function createCards(id, front, back) {
    Loading(true);
    db.collection("decks")
      .doc(id)
      .collection("cards")
      .add({
        front,
        back,
        next_review: new Date(),
        reviewed_time: 0,
      })
      .then(() => {
        Loading(false);
      });
  }

  function deleteDeck(id) {
    Loading(true);
    db.collection("decks")
      .doc(id)
      .delete()
      .then(() => {
        const changedArray = deckArray.filter((deck) => {
          if (deck.id !== id) {
            return true;
          }
        });
        setDeckArray(changedArray);
        Loading(false);
      });
  }

  function Loading(active) {
    setLoading(active || false);
  }

  function showAnswer(active) {
    setIsAnswer(active || false);
  }

  function nextCard() {
    let newCardArray = cardsArray.filter((card) => {
      if (currentCard === card) {
        return false;
      }
      return true;
    });

    showAnswer(false);

    if (cardsArray.length > 1) {
      setCardsArray(newCardArray);
      setCurrentCard(newCardArray[0]);
    } else {
      setIsStudyFinished(true);
    }
  }

  return (
    <DeckContext.Provider
      value={{
        fetchUserInfo,
        deckArray,
        cardsArray,
        currentCard,
        fetchDecks,
        fetchCards,
        createCards,
        deleteDeck,
        loading,
        Loading,
        isAnswer,
        showAnswer,
        nextCard,
        isStudyFinished,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export { DeckContext, DeckContextProvider };

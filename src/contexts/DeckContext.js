import { createContext, useState } from "react";

const DeckContext = createContext({});

const DeckContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [deckArray, setDeckArray] = useState([]);

  const [cardsArray, setCardsArray] = useState([]);
  const [currentCard, setCurrentCard] = useState({ front: "", back: "" });

  const [isAnswer, setIsAnswer] = useState(false);
  const [isStudyFinished, setIsStudyFinished] = useState(false);

  function fetchUserInfo(name, email, picture) {
    const data = { name, email, picture };

    setUserInfo(data);
  }

  let decks = []; // Var global to decks.

  async function fetchDecks() {
    // Feito
    const data = await fetch("/api/deck/get", {
      method: "GET",
    });
    data.json().then((deck) => {
      deck.forEach(() => {
        decks = [...deck];
      });

      setDeckArray(decks);
    });
  }

  let cards = [];

  async function fetchCards(id) {
    Loading(true);
    const data = await fetch("/api/card/get", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    data.json().then((deck) => {
      cards = [...deck[0].cards];
      setCurrentCard(cards[0]);
      setCardsArray(cards);
      Loading(false);
    });
  }

  function createCards(id, front, back) {
    Loading(true);
    fetch("/api/card/create", {
      method: "POST",
      body: JSON.stringify({ id, front, back }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      Loading(false);
    });
  }

  async function deleteDeck(id) {
    Loading(true);

    await fetch("/api/deck/delete", {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      const changedArray = deckArray.filter((deck) => {
        if (deck._id !== id) {
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

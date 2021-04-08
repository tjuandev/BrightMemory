import { createContext, useState } from "react";

const DeckContext = createContext({});

const DeckContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [deckArray, setDeckArray] = useState([]);

  const [cardsArray, setCardsArray] = useState([]);
  const [currentCard, setCurrentCard] = useState({ front: "", back: "" });

  const [isAnswer, setIsAnswer] = useState(false);
  const [isStudyFinished, setIsStudyFinished] = useState(false);

  const [userId, setUserId] = useState(null);

  let decks = []; // Var global to decks.

  async function fetchDecks(id) {
    // Feito
    const data = await fetch("/api/deck/get", {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-Type": "application/json",
      },
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

  async function getUserId(email) {
    const userId = await fetch("/api/auth/getUserId", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    userId.json().then((data) => {
      setUserId(data);
    });
  }

  return (
    <DeckContext.Provider
      value={{
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
        getUserId,
        userId,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export { DeckContext, DeckContextProvider };

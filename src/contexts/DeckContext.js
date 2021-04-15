import { createContext, useState } from "react";

const DeckContext = createContext({});

const DeckContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [deckArray, setDeckArray] = useState([]);

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

  async function createDeck(schema) {
    return await fetch("/api/deck/create", {
      method: "POST",
      body: JSON.stringify(schema),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function updateInfo(action, deckId) {
    return await fetch("api/deck/updateInfo", {
      method: "POST",
      body: JSON.stringify({ action: action, deckId: deckId }),
      headers: {
        "Content-Type": "application/json",
      },
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
        fetchDecks,
        createDeck,
        deleteDeck,
        updateInfo,
        loading,
        Loading,
        getUserId,
        userId,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export { DeckContext, DeckContextProvider };

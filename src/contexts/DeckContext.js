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
    const deck = await data.json();

    deck.forEach(() => {
      decks = [...deck];
    });

    setDeckArray(decks);

    return deck;
  }

  async function createDeck(item, color) {
    const deckSchema = {
      name: item.target.deck_name.value,
      photo_url: item.target.deck_url.value,
      description: item.target.deck_description.value,
      userId,
      pendent: false,
      review_info: {
        repeat_cards: 0,
        new_cards: 0,
        cards_today: 0,
      },
      all_cards: 0,
      cards_number: 0,
      color_class: color ? color : "bgPurple",
      created_at: new Date().getTime(),
    };

    return await fetch("/api/deck/create", {
      method: "POST",
      body: JSON.stringify(deckSchema),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function updateInfo(action, deckId, cardsToStudyLength = 0) {
    await fetch("api/deck/updateInfo", {
      method: "POST",
      body: JSON.stringify({
        action,
        deckId,
        cardsToStudyLength,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetchDecks(userId);
  }

  async function deleteDeck(id) {
    loadingDeck(true);

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
      loadingDeck(false);
    });
  }

  function loadingDeck(bool) {
    setLoading(bool);
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
      setUserId(data._id);
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
        loadingDeck,
        getUserId,
        userId,
      }}
    >
      {children}
    </DeckContext.Provider>
  );
};

export { DeckContext, DeckContextProvider };

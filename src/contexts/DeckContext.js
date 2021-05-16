import { createContext, useState } from "react";
import axios from "axios";

const DeckContext = createContext({});

const DeckContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [deckArray, setDeckArray] = useState([]);

  const [userId, setUserId] = useState(null);

  let decks = [];

  async function fetchDecks(id) {
    const request = await axios.post("/api/deck/get", {
      id,
    });
    const deck = request.data;

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

    return await axios.post("/api/deck/create", deckSchema);
  }

  async function updateInfo(action, deckId, cardsToStudyLength = 0) {
    await axios.post("api/deck/updateInfo", {
      action,
      deckId,
      cardsToStudyLength,
    });

    await fetchDecks(userId);
  }

  async function deleteDeck(id) {
    loadingDeck(true);

    await axios
      .post("/api/deck/delete", {
        id,
      })
      .then(() => {
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
    const userId = await axios.post("/api/auth/getUserId", {
      email,
    });

    setUserId(userId.data._id);
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

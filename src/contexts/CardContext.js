import { createContext, useState } from "react";

import axios from "axios";

export const CardContext = createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardsArray, setCardsArray] = useState([]);
  const [currentCard, setCurrentCard] = useState({ front: "", back: "" });
  const [isAnswerShowing, setIsAnswerShowing] = useState(false);
  const [isStudyFinished, setIsStudyFinished] = useState(false);

  const [loading, setLoading] = useState(false);

  async function fetchCards(deckId) {
    let cards = [];
    const response = await axios.post("/api/card/get", {
      deckId,
    });

    cards = response.data;
    setCurrentCard(cards[0]);
    setCardsArray([...cards]);
  }

  async function cardsToStudy(deckId) {
    const response = await axios.post("/api/card/getReviewToday", {
      deckId,
    });
    return await response.data;
  }

  async function createCard(deckId, front, back) {
    const today = new Date();
    return await axios.post("/api/card/create", {
      deckId,
      front,
      back,
      reviewWhen: today,
      reviewTime: 2,
      isNew: true,
      isRepeat: false,
    });
  }

  async function deleteAllCards(deckId) {
    return await axios.delete("/api/card/deleteAll", {
      deckId,
    });
  }

  async function updateReview(daysToReview, isNotToRepeat = false) {
    return await axios.post("/api/card/review", {
      currentCard,
      daysToReview,
      isNotToRepeat,
    });
  }

  function showAnswer(active) {
    setIsAnswerShowing(active || false);
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
    } else if (cardsArray.length === 1) {
      setIsStudyFinished(true);
    }
  }

  function loadingCards(bool) {
    setLoading(bool);
  }

  function finishStudy(bool) {
    setIsStudyFinished(bool);
  }

  return (
    <CardContext.Provider
      value={{
        fetchCards,
        createCard,
        deleteAllCards,
        showAnswer,
        updateReview,
        nextCard,
        cardsToStudy,
        finishStudy,
        loadingCards,
        isAnswerShowing,
        currentCard,
        cardsArray,
        isStudyFinished,
        loading,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

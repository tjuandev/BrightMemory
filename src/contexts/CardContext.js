import { createContext, useState } from "react";

export const CardContext = createContext({});

export const CardContextProvider = ({ children }) => {
  const [cardsArray, setCardsArray] = useState([]);
  const [currentCard, setCurrentCard] = useState({ front: "", back: "" });
  const [isAnswerShowing, setIsAnswerShowing] = useState(false);
  const [isStudyFinished, setIsStudyFinished] = useState(false);
  /* const [repeatedCardsArray, setRepeatedCardsArray] = useState([]); */

  const [loading, setLoading] = useState(false);

  async function fetchCards(deckId) {
    let cards = [];

    const data = await fetch("/api/card/get", {
      method: "POST",
      body: JSON.stringify({ deckId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    data.json().then((cardFetchArray) => {
      cards = [...cardFetchArray];
      setCurrentCard(cards[0]);
      setCardsArray([...cards]);
    });
  }

  async function cardsToStudy(deckId) {
    const data = await fetch("/api/card/getReviewToday", {
      method: "POST",
      body: JSON.stringify({ deckId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await data.json();
  }

  async function createCard(deckId, front, back) {
    const today = new Date();

    return await fetch("/api/card/create", {
      method: "POST",
      body: JSON.stringify({
        deckId,
        front,
        back,
        reviewWhen: today,
        reviewTime: 2,
        isNew: true,
        isRepeat: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function deleteAllCards(deckId) {
    return await fetch("/api/card/deleteAll", {
      method: "DELETE",
      body: JSON.stringify({
        deckId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async function updateReview(
    daysToReview,
    repeat = false,
    isNotToRepeat = false
  ) {
    return await fetch("/api/card/review", {
      method: "POST",
      body: JSON.stringify({
        currentCard,
        daysToReview,
        repeat,
        isNotToRepeat,
      }),
      headers: {
        "Content-Type": "application/json",
      },
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
    // FIXME Pode ser que tenha um problema nesses operadores lógicos!!!

    if (cardsArray.length > 1) {
      setCardsArray(newCardArray);
      setCurrentCard(newCardArray[0]);
    } /* else if (cardsArray.length === 1 && repeatedCardsArray.length > 0) {
      setCardsArray([...repeatedCardsArray]);
      setRepeatedCardsArray([]); } // Transferência de Dados 
      NOTE => Future Update */ else if (cardsArray.length === 1) {
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

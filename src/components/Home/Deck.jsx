export default function Deck({
  name,
  photo_url,
  description,
  deckId,
  activateModal,
  reviewInfo,
  colorClass,
}) {
  const reviewNumber =
    reviewInfo.cardsToday + reviewInfo.newCards + reviewInfo.cardsToRepeat;

  return (
    <div
      className={`deck ${colorClass}`}
      style={{ cursor: "pointer" }}
      onClick={() => {
        activateModal(
          "DeckModal",
          name,
          photo_url,
          description,
          deckId,
          reviewInfo,
          colorClass
        );
      }}
    >
      {reviewNumber > 0 ? <button>{reviewNumber}</button> : ""}
      <img src={photo_url || "/logo-home.svg"} alt="imagem-do-deck" />
      <strong>{name}</strong>
    </div>
  );
}

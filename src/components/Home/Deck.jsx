export default function Deck({
  name,
  description,
  deckId,
  activateModal,
  reviewInfo,
}) {
  return (
    <div
      className="deck"
      style={{ cursor: "pointer" }}
      onClick={() => {
        activateModal("DeckModal", name, description, deckId, reviewInfo);
      }}
    >
      <button>
        {reviewInfo.cardsToday + reviewInfo.newCards + reviewInfo.cardsToRepeat}
      </button>
      <img src="/react.png" alt="react-icon-deck" />
      <strong>{name}</strong>
    </div>
  );
}

export default function Deck({
  name,
  description,
  deck_id,
  activateModal,
  review_info,
}) {
  return (
    <div
      className="deck"
      style={{ cursor: "pointer" }}
      onClick={() =>
        activateModal("DeckModal", name, description, deck_id, review_info)
      }
    >
      <span>20</span>
      <img src="/react.png" alt="react-icon-deck" />
      <strong>{name}</strong>
    </div>
  );
}

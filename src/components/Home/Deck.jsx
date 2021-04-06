export default function Deck({ name, description, deck_id, activateModal }) {
  return (
    <div
      className="deck"
      style={{ cursor: "pointer" }}
      onClick={() => activateModal("DeckModal", name, description, deck_id)}
    >
      <span>37</span>
      <img src="/react.png" alt="react-icon-deck" />
      <strong>{name}</strong>
    </div>
  );
}

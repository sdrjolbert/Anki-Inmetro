// Deck.jsx

import React, { useState } from 'react';
import Card from '../Card/Card';

function Deck({
  deck,
  onDeleteCard,
  onUpdateCard,
  onDeleteDeck,
  onUpdateDeck,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [deckName, setDeckName] = useState(deck.name);

  const handleSave = () => {
    onUpdateDeck({ ...deck, name: deckName });
    setIsEditing(false);
  };

  return (
    <div className="deck">
      {isEditing ? (
        <div className="deck-edit">
          <input
            type="text"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="card">
          <div className="card-header">
            {deck.name}
            <button onClick={() => setIsEditing(true)}>Edit Deck</button>
            <button onClick={() => onDeleteDeck(deck.name)}>Delete Deck</button>
          </div>
          <div className="card-content">
            <ul>
              {deck.cards.map((card, index) => (
                <li key={index}>
                  <Card
                    card={card}
                    onDelete={() => onDeleteCard(deck.name, card.id)}
                    onUpdate={(updatedCard) =>
                      onUpdateCard(deck.name, updatedCard)
                    }
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Deck;

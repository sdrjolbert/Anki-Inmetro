// AddCard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCard({ decks, onAddCard }) {
  const [deck, setDeck] = useState(decks[0]?.name || '');  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    onAddCard(deck, { front, back });
    setFront('');
    setBack('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Deck:
          <select value={deck} onChange={(e) => setDeck(e.target.value)}>
            {decks.map((deck, index) => (
              <option key={index} value={deck.name}>
                {deck.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Front:
          <input
            type="text"
            value={front}
            onChange={(e) => setFront(e.target.value)}
          />
        </label>
        <label>
          Back:
          <input
            type="text"
            value={back}
            onChange={(e) => setBack(e.target.value)}
          />
        </label>
        <button type="submit">Add Card</button>
      </form>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default AddCard;
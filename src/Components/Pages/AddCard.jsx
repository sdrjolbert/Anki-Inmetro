import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddCard({ decks, onAddCard }) {
  const [deck, setDeck] = useState(decks[0]?.name || '');
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const navigate = useNavigate();

  const handleFrontChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setFront(value);
    }
  };

  const handleBackChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setBack(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (front && back) {
      onAddCard(deck, { front, back });
      setFront('');
      setBack('');
    }
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
            onChange={handleFrontChange}
            placeholder="Frente do Card (máx. 150 caracteres)"
            required
          />
        </label>
        <label>
          Back:
          <input
            type="text"
            value={back}
            onChange={handleBackChange}
            placeholder="Verso do Card (máx. 150 caracteres)"
            required
          />
        </label>
        <button type="submit">Add Card</button>
      </form>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default AddCard;

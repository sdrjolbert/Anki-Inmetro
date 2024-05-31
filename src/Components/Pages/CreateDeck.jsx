// CreateDeck.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateDeck({ onCreate }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate({ name, cards: [] });
    setName('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Deck Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">Create Deck</button>
      </form>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default CreateDeck;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateDeck({ onCreate }) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    const { value } = event.target;
    if (value.length <= 15) {
      setName(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      eval(name);
    } catch (error) {
      console.error('Error executing script:', error);
    }
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
            onChange={handleNameChange}
            placeholder="Nome do Deck (máx. 15 caracteres)"
            required
          />
        </label>
        <button type="submit">Create Deck</button>
      </form>
      <button onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
}

export default CreateDeck;

// ReadDeck.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';

function ReadDeck({ decks }) {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);
  const navigate = useNavigate();

  const handleDeckChange = (event) => {
    const deckName = event.target.value;
    const deck = decks.find((deck) => deck.name === deckName);
    setSelectedDeck(deck);
    setCurrentCardIndex(0);
    setShowBack(false);
    setReadingStarted(false);
  };

  const handleStartReading = () => {
    setReadingStarted(true);
  };

  const handleFlipCard = () => {
    setShowBack(!showBack);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => prevIndex + 1);
    setShowBack(false);
  };

  const handleReturn = () => {
    setSelectedDeck(null);
    setCurrentCardIndex(0);
    setShowBack(false);
    setReadingStarted(false);
  };

  if (!selectedDeck) {
    return (
      <div>
        <select onChange={handleDeckChange}>
          <option value="">Select a deck</option>
          {decks.map((deck, index) => (
            <option key={index} value={deck.name}>
              {deck.name}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (!readingStarted) {
    return (
      <div>
        <h2>{selectedDeck.name}</h2>
        <button onClick={handleStartReading}>Iniciar leitura</button>
      </div>
    );
  }

  if (currentCardIndex >= selectedDeck.cards.length) {
    return (
      <div>
        <h2>Deck finalizado</h2>
        <button onClick={handleReturn}>Retornar</button>
      </div>
    );
  }

  return (
    <div>
      <Card card={selectedDeck.cards[currentCardIndex]} showBack={showBack} />
      {showBack ? (
        <button onClick={handleNextCard}>Próximo card</button>
      ) : (
        <button onClick={handleFlipCard}>Virar card</button>
      )}
    </div>
  );
}

export default ReadDeck;
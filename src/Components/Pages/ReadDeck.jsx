import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import Deck from '../Deck/Deck';
import '../../App.css';

function ReadDeck({
  decks,
  onDeleteCard,
  onUpdateCard,
  onDeleteDeck,
  onUpdateDeck,
}) {
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

  const handleGoBack = () => {
    navigate(-1); // Navega para a página anterior
  };

  if (!selectedDeck) {
    return (
      <div className="container">
        <select onChange={handleDeckChange}>
          <option value="">Selecione um baralho</option>
          {decks.map((deck, index) => (
            <option key={index} value={deck.name}>
              {deck.name}
            </option>
          ))}
        </select>
        <button onClick={handleGoBack}>Voltar</button>
      </div>
    );
  }

  if (!readingStarted) {
    return (
      <div className="container">
        <h2>{selectedDeck.name}</h2>
        <button onClick={handleStartReading}>Iniciar leitura</button>
        <button onClick={handleGoBack}>Voltar</button>
      </div>
    );
  }

  if (currentCardIndex >= selectedDeck.cards.length) {
    return (
      <div className="container">
        <h2>Deck finalizado</h2>
        <button onClick={handleReturn}>Retornar</button>
        <button onClick={handleGoBack}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="container">
      <Card card={selectedDeck.cards[currentCardIndex]} showBack={showBack} />
      {showBack ? (
        <button onClick={handleNextCard}>Próximo card</button>
      ) : (
        <button onClick={handleFlipCard}>Virar card</button>
      )}
      <button onClick={handleGoBack}>Voltar</button>
      {/* Adicione a exibição do deck com as funções de manipulação */}
      <Deck
        deck={selectedDeck}
        onDeleteCard={onDeleteCard}
        onUpdateCard={onUpdateCard}
        onDeleteDeck={onDeleteDeck}
        onUpdateDeck={onUpdateDeck}
      />
    </div>
  );
}

export default ReadDeck;

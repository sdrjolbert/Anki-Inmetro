import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import '../../App.css';

function ReadDeck({ decks, onDeleteCard, onUpdateCard }) {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [cardContent, setCardContent] = useState('');
  const [frontContent, setFrontContent] = useState('');
  const [backContent, setBackContent] = useState('');
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
    const card = selectedDeck.cards[currentCardIndex];
    setFrontContent(card.front);
    setBackContent(card.back);
  };

  const handleFlipCard = () => {
    setShowBack(!showBack);
  };

  const handleNextCard = () => {
    const nextIndex = currentCardIndex + 1;
    if (nextIndex < selectedDeck.cards.length) {
      setCurrentCardIndex(nextIndex);
      setShowBack(false);
      const card = selectedDeck.cards[nextIndex];
      setFrontContent(card.front);
      setBackContent(card.back);
    }
  };

  const handleReturn = () => {
    setSelectedDeck(null);
    setCurrentCardIndex(0);
    setShowBack(false);
    setReadingStarted(false);
  };

  const handleGoBack = () => {
    setSelectedDeck(null);
    setCurrentCardIndex(0);
    setShowBack(false);
    setReadingStarted(false);
  };

  const handleEditCard = () => {
    setEditMode(true);
    const card = selectedDeck.cards[currentCardIndex];
    setFrontContent(card.front);
    setBackContent(card.back);
  };

  const handleSaveCard = () => {
    const updatedCard = {
      ...selectedDeck.cards[currentCardIndex],
      front: frontContent,
      back: backContent,
    };
    onUpdateCard(selectedDeck.name, updatedCard);
    setEditMode(false);
  };

  const handleDeleteCard = () => {
    onDeleteCard(selectedDeck.name, selectedDeck.cards[currentCardIndex].id);
    handleNextCard();
  };

  const handleCardContentChange = (event) => {
    setCardContent(event.target.value);
  };

  if (!selectedDeck) {
    return (
      <div className="container read-deck-container">
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
      <div className="container read-deck-container">
        <h2>{selectedDeck.name}</h2>
        <button onClick={handleStartReading}>Iniciar leitura</button>
        <button onClick={handleGoBack}>Voltar</button>
      </div>
    );
  }

  if (currentCardIndex >= selectedDeck.cards.length) {
    return (
      <div className="container read-deck-container">
        <h2>Deck finalizado</h2>
        <button onClick={handleReturn}>Retornar</button>
      </div>
    );
  }

  return (
    <div className="container read-deck-container">
      <Card
        card={selectedDeck.cards[currentCardIndex]}
        isEditing={editMode}
        showBack={showBack}
        frontContent={frontContent}
        backContent={backContent}
        setFrontContent={setFrontContent}
        setBackContent={setBackContent}
      />
      <div className="button-group">
        {editMode ? (
          <button className="save-button" onClick={handleSaveCard}>
            Salvar
          </button>
        ) : (
          <button className="edit-button" onClick={handleEditCard}>
            Editar
          </button>
        )}
        <button className="flip-button" onClick={handleFlipCard}>
          {showBack ? 'Mostrar frente' : 'Mostrar verso'}
        </button>
        <button className="delete-button" onClick={handleDeleteCard}>
          Excluir
        </button>
        <button className="next-card-button" onClick={handleNextCard}>
          Próximo card
        </button>
      </div>
    </div>
  );
}

export default ReadDeck;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import '../../App.css';

function ReadDeck({ decks, onDeleteCard, onUpdateCard }) {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [frontContent, setFrontContent] = useState('');
  const [backContent, setBackContent] = useState('');
  const [reviewedCards, setReviewedCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedDeck) {
      setReviewedCards(new Array(selectedDeck.cards.length).fill(false));
    }
  }, [selectedDeck]);

  const handleDeckChange = (event) => {
    const deckName = event.target.value;
    const deck = decks.find((deck) => deck.name === deckName);
    setSelectedDeck(deck);
    setCurrentCardIndex(0);
    setShowBack(false);
    setReadingStarted(false);
    setReviewedCards(new Array(deck.cards.length).fill(false));
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
    setReviewedCards((prev) => {
      const newReviewed = [...prev];
      newReviewed[currentCardIndex] = true;
      return newReviewed;
    });
    const nextIndex = currentCardIndex + 1;
    if (nextIndex < selectedDeck.cards.length) {
      setCurrentCardIndex(nextIndex);
      setShowBack(false);
      const card = selectedDeck.cards[nextIndex];
      setFrontContent(card.front);
      setBackContent(card.back);
    } else {
      setShowBack(false);
    }
  };

  const handleReturn = () => {
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

  const handleReadAgain = () => {
    setCurrentCardIndex(0);
    setReviewedCards(new Array(selectedDeck.cards.length).fill(false));
    setShowBack(false);
    setReadingStarted(true);
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
        <button onClick={handleReturn}>Voltar</button>
      </div>
    );
  }

  if (!readingStarted) {
    return (
      <div className="container read-deck-container">
        <h2>{selectedDeck.name}</h2>
        <button onClick={handleStartReading}>Iniciar leitura</button>
        <button onClick={handleReturn}>Voltar</button>
      </div>
    );
  }

  if (currentCardIndex >= selectedDeck.cards.length) {
    const reviewedCount = reviewedCards.filter(Boolean).length;
    return (
      <div className="container read-deck-container">
        <h2>Deck finalizado</h2>
        <p>
          Você revisou {reviewedCount} de {selectedDeck.cards.length} cards.
        </p>
        <div className="button-group">
          <button className="next-card-button" onClick={handleReadAgain}>
            Ler novamente
          </button>
          <button className="next-card-button" onClick={handleReturn}>
            Selecionar outro deck
          </button>
        </div>
      </div>
    );
  }

  const reviewedCount = reviewedCards.filter(Boolean).length;

  return (
    <div className="container read-deck-container">
      <div className="progress">
        Revisados: {reviewedCount}/{selectedDeck.cards.length}
      </div>
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

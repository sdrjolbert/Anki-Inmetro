import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../Card/Card';
import '../../App.css';
import { UserContext } from '../../UserContext';
import axios from 'axios';

function ReadDeck({ decks, onDeleteCard, onUpdateCard }) {
  const [selectedDeck, setSelectedDeck] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [readingStarted, setReadingStarted] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [frontContent, setFrontContent] = useState('');
  const [backContent, setBackContent] = useState('');
  const [reviewedCards, setReviewedCards] = useState([]);
  const { incrementCardsReadCount } = useContext(UserContext);
  const { incrementEasyCardsCount } = useContext(UserContext);
  const { incrementDifficultCardsCount } = useContext(UserContext)
  // const [easyCardsCount, setEasyCount] = useState(0);
  // const [difficultCount, setDifficultCount] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const [deck, setDeck] = useState('');
  const [deckList, setDeckList] = useState([]);
  const token = window.localStorage.getItem("token");
   const [message, setMessage] = useState(
    "Nada ainda, selecione o deck e escolha a frente e o verso do card!"
  );
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    const handleDeckList = async () => {
      try {
        const response = await axios.get("https://api-anki-inmetro.vercel.app/api/deck/get-deck", { headers: { Authorization: `Bearer ${token}` } });
        const { decks: d } = response.data;
        setDeckList(d);
      } catch(err) {
        console.error(err.response.statusText);
        setMessage(err.response.statusText);
      }
    }
    handleDeckList();
  }, [token]);

  useEffect(() => {
  if (deckList.length > 0) {
    setDeck(deckList[0].filename);
  }
}, [deckList]);

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
    incrementCardsReadCount(); // Incrementa o contador de cartas lidas
    const nextIndex = currentCardIndex + 1;
    if (nextIndex < selectedDeck.cards.length) {
      setCurrentCardIndex(nextIndex);
      setShowBack(false);
      const card = selectedDeck.cards[nextIndex];
      setFrontContent(card.front);
      setBackContent(card.back);
    } else {
      setCurrentCardIndex(nextIndex); // Atualizar para além do último card para indicar finalização
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
    const updatedCards = selectedDeck.cards.filter(
      (_, index) => index !== currentCardIndex,
    );
    onDeleteCard(selectedDeck.name, selectedDeck.cards[currentCardIndex].id);
    setSelectedDeck({ ...selectedDeck, cards: updatedCards });
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };
  

  const handleReadAgain = () => {
    setCurrentCardIndex(0);
    setReviewedCards(new Array(selectedDeck.cards.length).fill(false));
    setShowBack(false);
    setReadingStarted(true);
  };

  const handleFrontContentChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setFrontContent(value);
    }
  };

  const handleBackContentChange = (event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      setBackContent(value);
    }
  };

  if (!selectedDeck) {
    return (
      <div className="container read-deck-container">
        <label>
          Deck:
          <select value={deck} onChange={(e) => { setDeck(e.target.value) }}>
            {deckList.map((deck, index) => (
              <option key={index} value={deck.filename}>
                {deck.filename}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    );
  }

  if (!readingStarted) {
    return (
      <div className="container read-deck-container">
        <h2>{selectedDeck.name}</h2>
        <button onClick={handleStartReading}>Iniciar leitura</button>
        <button onClick={() => navigate(-1)}>Voltar</button>
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

  const handleEasyCard = () => {
    incrementEasyCardsCount()
    setShowBack(false);
    setShowOptions(false);
    handleNextCard(); // Move para o próximo card
  };

  const handleDifficultCard = () => {
    incrementDifficultCardsCount()
    setShowBack(false);
    setShowOptions(false);
    handleNextCard(); // Move para o próximo card
  };


  const handleShowCard = () => {
    setShowBack(true);
    setShowOptions(true);
  };

  const handleRestart = () => {
    // setCurrentCardIndex(0);
    setShowBack(false);
    setShowOptions(false);
    // Resetar contadores se necessário
  };


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
        handleFrontContentChange={handleFrontContentChange}
        handleBackContentChange={handleBackContentChange}
      />
      <div className="button-group">
      {!showOptions && (
          <button className="show-card-button" onClick={handleShowCard}>
            Mostrar card
          </button>
        )}
        {showOptions && (
          <>
            <button className="again-button" onClick={handleRestart}>
              Novamente
            </button>
            <button className="easy-button" onClick={handleEasyCard}>
              Fácil
            </button>
            <button className="difficult-button" onClick={handleDifficultCard}>
              Difícil
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ReadDeck;
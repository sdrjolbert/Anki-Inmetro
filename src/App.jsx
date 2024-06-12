import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateDeck from './Components/Pages/CreateDeck';
import AddCard from './Components/Pages/AddCard';
import ReadDeck from './Components/Pages/ReadDeck';
import HomePage from './Components/Pages/HomePage';
import Login from './Components/Login/Login';
import Menu from './Components/Menu/Menu'; // Importe o componente Menu
import './App.css';

function App() {
  const [decks, setDecks] = useState([]);

  const handleCreateDeck = (deck) => {
    setDecks((prevDecks) => [...prevDecks, deck]);
  };

  const handleAddCard = (deckName, card) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === deckName
          ? { ...deck, cards: [...deck.cards, card] }
          : deck,
      ),
    );
  };

  const handleDeleteCard = (deckName, cardId) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === deckName
          ? { ...deck, cards: deck.cards.filter((card) => card.id !== cardId) }
          : deck,
      ),
    );
  };

  const handleUpdateCard = (deckName, updatedCard) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === deckName
          ? {
              ...deck,
              cards: deck.cards.map((card) =>
                card.id === updatedCard.id ? updatedCard : card,
              ),
            }
          : deck,
      ),
    );
  };

  const handleDeleteDeck = (deckName) => {
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.name !== deckName));
  };

  const handleUpdateDeck = (updatedDeck) => {
    setDecks((prevDecks) =>
      prevDecks.map((deck) =>
        deck.name === updatedDeck.name ? updatedDeck : deck,
      ),
    );
  };

  return (
    <div className="container flex-container">
      <BrowserRouter>
        <Menu /> {/* Adiciona o menu de navegação */}
        <main className="login form">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="login/*" element={<Login />} />
            <Route
              path="createdeck/*"
              element={<CreateDeck onCreate={handleCreateDeck} />}
            />
            <Route
              path="addcard/*"
              element={<AddCard decks={decks} onAddCard={handleAddCard} />}
            />
            <Route
              path="readdeck/*"
              element={
                <ReadDeck
                  decks={decks}
                  onDeleteCard={handleDeleteCard}
                  onUpdateCard={handleUpdateCard}
                  onDeleteDeck={handleDeleteDeck}
                  onUpdateDeck={handleUpdateDeck}
                />
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateDeck from './Components/Pages/CreateDeck';
import AddCard from './Components/Pages/AddCard';
import ReadDeck from './Components/Pages/ReadDeck';
import HomePage from './Components/Pages/HomePage';
import Login from './Components/Login/Login';
import Deck from './Components/Deck/Deck';
import './App.css';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { UserStorage } from './UserContext';

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
    <div>
      <BrowserRouter>
      <UserStorage>
          <Header />
          <div className="container flex-container content">
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
                <Route path="readdeck/*" element={<ReadDeck decks={decks} />} />
              </Routes>
              {decks.map((deck, index) => (
                <Deck
                  key={index}
                  deck={deck}
                  onDeleteCard={handleDeleteCard}
                  onUpdateCard={handleUpdateCard}
                  onDeleteDeck={handleDeleteDeck}
                  onUpdateDeck={handleUpdateDeck}
                />
              ))}
            </main>
          <Footer /> 
          </div>
      </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;

// Deck.jsx
import React from 'react';
import Card from '../Card/Card';

function Deck({ deck }) {
  return (
    <div>
      <h2>{deck.name}</h2>
      <ul>
        {deck.cards.map((card, index) => (
          <li key={index}>
            <Card card={card} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Deck;
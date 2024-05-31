// Card.jsx
import React from 'react';

function Card({ card, showBack }) {
  if (showBack) {
    return (
      <div>
        <h3>Back</h3>
        <p>{card.back}</p>
      </div>
    );
  } else {
    return (
      <div>
        <h3>Front</h3>
        <p>{card.front}</p>
      </div>
    );
  }
}

export default Card;
// Card.jsx

import React, { useState } from 'react';
import '../../App.css';

function Card({
  card,
  isEditing,
  showBack,
  frontContent,
  backContent,
  setFrontContent,
  setBackContent,
}) {
  return (
    <div className="flip-card">
      <div className={`flip-card-inner ${showBack ? 'show-back' : ''}`}>
        <div className="flip-card-front">
          <div className="card-header">
            {isEditing ? 'Edit Front' : 'Front'}
          </div>
          {isEditing ? (
            <textarea
              className="card-content"
              value={frontContent}
              onChange={(e) => setFrontContent(e.target.value)}
            />
          ) : (
            <div className="card-content">{card.front}</div>
          )}
        </div>
        <div className="flip-card-back">
          <div className="card-header">{isEditing ? 'Edit Back' : 'Back'}</div>
          {isEditing ? (
            <textarea
              className="card-content"
              value={backContent}
              onChange={(e) => setBackContent(e.target.value)}
            />
          ) : (
            <div className="card-content">{card.back}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

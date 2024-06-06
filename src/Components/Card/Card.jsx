// Card.jsx

import React, { useState } from 'react';
import '../../App.css';

function Card({ card, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showBack, setShowBack] = useState(false);
  const [frontContent, setFrontContent] = useState(card.front);
  const [backContent, setBackContent] = useState(card.back);

  const handleSave = () => {
    onUpdate({ ...card, front: frontContent, back: backContent });
    setIsEditing(false);
  };

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
      <div className="card-actions">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => setShowBack(!showBack)}>
              {showBack ? 'Show Front' : 'Show Back'}
            </button>
            <button onClick={onDelete}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Card;

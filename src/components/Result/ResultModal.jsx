import React from 'react';
import classNames from 'classnames';
import './ResultModal.css';

export const ResultModal = (props) => {
  const resultModalClasses = classNames('modal-overlay', {
    'modal-open': props.isgameOver
  });

  const winnerMessage = props.winner ? `Winner is ${props.winner}.` : 'It is a tie.';

  return (
    <div className={resultModalClasses} aria-live="assertive">
      <div id="game-result-modal">
        <div id="result-container">
          <div id="winner-container">
            <span>{winnerMessage}</span>
          </div>
        </div>
        <div id="new-game-container">
          <button
            id="new-game-button"
            onClick={props.newgameClick}
          >
            Start New Game
          </button>
        </div>
      </div>
    </div>
  );
};

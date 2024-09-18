import React, { useState } from 'react';
import { calculateWinner } from '../../utils/winnerCalculation';
import { Board } from '../Board/Board';
import { ResultModal } from '../Result/ResultModal';
import './MainGame.css';

export const MainGame = () => {
  const [cellValues, setCellValues] = useState(['', '', '', '', '', '', '', '', '']);
  const [isXNext, setIsXNext] = useState(true);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(null); // Initialized with null
  const [numberOfTurnsLeft, setNumberOfTurnsLeft] = useState(9);
  const [winningCombination, setWinningCombination] = useState([]);

  const isCellEmpty = (cellIndex) => cellValues[cellIndex] === '';

  const restartGame = () => {
    setCellValues(['', '', '', '', '', '', '', '', '']);
    setIsXNext(true);
    setIsGameOver(false);
    setNumberOfTurnsLeft(9);
    setWinner(null); // Reset winner to null
    setWinningCombination([]);
  };

  const onCellClicked = (cellIndex) => {
    if (isCellEmpty(cellIndex)) {
      const newCellValues = [...cellValues];
      newCellValues[cellIndex] = isXNext ? 'X' : 'O';
      const newNumberOfTurnsLeft = numberOfTurnsLeft - 1;

      const calcResult = calculateWinner(newCellValues, newNumberOfTurnsLeft, cellIndex);

      setCellValues(newCellValues);
      setIsXNext(!isXNext);
      setIsGameOver(calcResult.hasResult);
      setNumberOfTurnsLeft(newNumberOfTurnsLeft);
      setWinner(calcResult.winner);
      setWinningCombination(calcResult.winningCombination);

      // Handle tie game
      if (newNumberOfTurnsLeft === 0 && !calcResult.hasResult) {
        setIsGameOver(true);
        setWinner('Tie');
      }
    }
  };

  return (
    <>        
      <div id="game">
        <h1>Tic Tac Toe</h1>
        <Board 
          cellValues={cellValues} 
          winningCombination={winningCombination}
          cellClicked={onCellClicked}  
        />
      </div>
      <ResultModal 
        isGameOver={isGameOver}
        winner={winner}
        newGameClick={restartGame}
      />
    </>
  );
};

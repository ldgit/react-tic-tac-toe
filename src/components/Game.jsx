import React, { useState } from 'react';
import Board from './Board';
import Status from './Status';
import TimeTravelButton from './TimeTravelButton';
import { calculateWinner } from '../helpers';

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  function getNextValue() {
    return xIsNext ? 'X' : 'O';
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  function handleClick(i) {
    const gameHistory = history.slice(0, stepNumber + 1);
    const { squares } = gameHistory[gameHistory.length - 1];

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = getNextValue();

    setHistory(gameHistory.concat([{ squares: newSquares }]));
    setStepNumber(gameHistory.length);
    setXIsNext(!xIsNext);
  }

  const { squares } = history[stepNumber];
  const winner = calculateWinner(squares);
  const moves = history.map((step, moveIndex) => {
    const description = moveIndex ? `Go to move ${moveIndex}` : 'Go to game start';

    return (
      // eslint-disable-next-line react/no-array-index-key
      <li key={moveIndex}>
        <TimeTravelButton highlight={stepNumber === moveIndex} onClick={() => { jumpTo(moveIndex); }}>
          {description}
        </TimeTravelButton>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <Status description={winner ? 'Winner' : 'Next player'} player={winner || getNextValue()} />
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

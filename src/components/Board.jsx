import React from 'react';
import Square from './Square';

export default function Board({ squares, onClick }) {
  function renderSquare(i, squareTestId) {
    return <Square value={squares[i]} onClick={() => onClick(i)} squareTestId={squareTestId} />;
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare('0', 'topLeftSquare')}
        {renderSquare('1', 'topMiddleSquare')}
        {renderSquare('2', 'topRightSquare')}
      </div>
      <div className="board-row">
        {renderSquare('3', 'centerLeftSquare')}
        {renderSquare('4', 'centerMiddleSquare')}
        {renderSquare('5')}
      </div>
      <div className="board-row">
        {renderSquare('6', 'bottomLeftSquare')}
        {renderSquare('7', 'bottomMiddleSquare')}
        {renderSquare('8', 'bottomRightSquare')}
      </div>
    </div>
  );
}

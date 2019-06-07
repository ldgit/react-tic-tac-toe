import React from 'react';
import Square from './Square';

export default function Board({
  squares,
  onClick,
  testId,
  className,
  specialIcons = false,
}) {
  function renderSquare(i, squareTestId) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        squareTestId={squareTestId}
        specialIcons={specialIcons}
      />
    );
  }

  return (
    <div data-testid={testId} className={className}>
      {renderSquare('0', 'topLeftSquare')}
      {renderSquare('1', 'topMiddleSquare')}
      {renderSquare('2', 'topRightSquare')}
      {renderSquare('3', 'centerLeftSquare')}
      {renderSquare('4', 'centerMiddleSquare')}
      {renderSquare('5', 'centerRightSquare')}
      {renderSquare('6', 'bottomLeftSquare')}
      {renderSquare('7', 'bottomMiddleSquare')}
      {renderSquare('8', 'bottomRightSquare')}
    </div>
  );
}

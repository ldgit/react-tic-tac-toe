import React from 'react';

export default function Square({ value, onClick, squareTestId }) {
  return (
    <button className="square" onClick={onClick} data-testid={squareTestId} type="button">
      {value}
    </button>
  );
}

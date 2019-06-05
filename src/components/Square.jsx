import React from 'react';
import { getSquareClasses } from '../helpers';

export default function Square({ value, onClick, squareTestId, specialIcons }) {
  const classes = getSquareClasses({ value, specialIcons });

  return (
    <button
      className={classes}
      onClick={onClick}
      data-testid={squareTestId}
      type="button"
    >
      {value}
    </button>
  );
}

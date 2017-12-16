import React from 'react';
import Title from './Title';
import Board from './Board';

export default function Game() {
  return (
    <div>
      <Title name="React" />
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </div>
  );
}

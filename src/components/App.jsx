import React from 'react';
import Game from './Game';
import Title from './Title';
import UltimateGame from './UltimateGame';

export default function App() {
  return (
    <div>
      <Title name="React" />
      <div className="table">
        <div className="table-cell">
          <UltimateGame />
        </div>
        <div className="table-cell table-large-padding">
          <Game />
        </div>
      </div>
    </div>
  );
}

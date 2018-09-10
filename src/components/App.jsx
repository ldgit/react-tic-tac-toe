import React from 'react';
import Game from './Game';
import Title from './Title';
import UltimateGame from './UltimateGame';

export default function App() {
  return (
    <div className="table">
      <div className="table-cell table-small-padding">
        <Title name="React" />
        <UltimateGame />
      </div>
      <div className="table-cell table-large-padding">
        <h2>The classic!</h2>
        <Game />
      </div>
    </div>
  );
}

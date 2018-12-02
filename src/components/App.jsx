import React from 'react';
import ReactDom from 'react-dom';
import Game from './Game';
import Title from './Title';
import UltimateGame from './UltimateGame';

function App() {
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

export default function renderApp(document) {
  const app = document.createElement('div');
  document.body.appendChild(app);
  ReactDom.render(<App />, app);
}

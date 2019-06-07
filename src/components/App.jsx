import React from 'react';
import ReactDom from 'react-dom';
import Title from './Title';
import UltimateGame from './UltimateGame';

function App() {
  return (
    <div className="container">
      <Title name="React" />
      <UltimateGame />
    </div>
  );
}

export default function renderApp(document) {
  const app = document.createElement('div');
  document.body.appendChild(app);
  ReactDom.render(<App />, app);
}

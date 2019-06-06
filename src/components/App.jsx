import React from 'react';
import ReactDom from 'react-dom';
import Title from './Title';
import UltimateGame from './UltimateGame';

function App() {
  return (
    <>
      <Title name="React" />
      <UltimateGame />
    </>
  );
}

export default function renderApp(document) {
  const app = document.createElement('div');
  document.body.appendChild(app);
  ReactDom.render(<App />, app);
}

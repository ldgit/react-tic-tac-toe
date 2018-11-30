import React, { useState } from 'react';

export default function LoadGame({ onLoadGameClick }) {
  const [gameToImport, setGameToImport] = useState({});

  function handleOnChange(event) {
    setGameToImport(event.target.value);
  }

  function handleLoadGameClick() {
    if (!isValidJSON(gameToImport)) {
      // eslint-disable-next-line no-alert
      window.alert('Invalid save game JSON');
      return;
    }

    onLoadGameClick(JSON.parse(gameToImport));
  }

  return (
    <span>
      <textarea data-testid="importGameTextarea" onChange={handleOnChange} />
      <br />
      <button type="button" onClick={handleLoadGameClick}>Load game</button>
    </span>
  );
}

function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (e) {
    return false;
  }
}
